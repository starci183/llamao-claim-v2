"use client";

import { Button } from "@/components/common/button";
import { useContract } from "@/hooks/use-contract";
import { useSigner } from "@/hooks/use-signer";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import axiosClient from "@/service/axios-client";
import Block from "@/svg/Block";
import Smile from "@/svg/Smile";
import { useAppKit } from "@reown/appkit/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { parseEther } from "ethers";

type MintStatus = "idle" | "failed" | "minted";

type ErrorType =
  | "insufficient_funds"
  | "user_rejected"
  | "network_error"
  | "contract_error"
  | "api_error"
  | "unknown_error";

export default function MintButton() {
  const { open } = useAppKit();
  const {
    address,
    isConnected,
    loading: signerLoading,
    sendTransaction,
    fetchBalance,
  } = useSigner();
  const { toast } = useToast();

  // slug can be string | string[]
  const params = useParams();
  const slugParam = params?.slug as string | string[] | undefined;
  const collectionId = useMemo(
    () => (Array.isArray(slugParam) ? slugParam[0] : slugParam ?? ""),
    [slugParam]
  );

  const { balance } = useContract(collectionId);
  const [mintStatus, setMintStatus] = useState<MintStatus>("idle");
  const [txPending, setTxPending] = useState(false);

  // ——— auto-clear only for "failed" ———
  const resetTimerRef = useRef<number | null>(null);
  // Enhanced error classification
  const classifyError = useCallback(
    (error: unknown): { type: ErrorType; message: string } => {
      const err = error as {
        shortMessage?: string;
        message?: string;
        data?: { message?: string };
        error?: { message?: string };
        info?: { error?: { message?: string } };
        cause?: { message?: string };
        reason?: string;
        code?: string | number;
        status?: number;
      };

      const rawMessage =
        [
          err?.shortMessage,
          err?.message,
          err?.data?.message,
          err?.error?.message,
          err?.info?.error?.message,
          err?.cause?.message,
          err?.reason,
        ].find(Boolean) || "Transaction failed";

      const lowerMessage = rawMessage.toLowerCase();

      // Insufficient funds
      if (
        lowerMessage.includes("insufficient funds") ||
        lowerMessage.includes("insufficient balance") ||
        lowerMessage.includes("funds for gas") ||
        lowerMessage.includes("intrinsic transaction cost") ||
        lowerMessage.includes("balance too low")
      ) {
        return {
          type: "insufficient_funds",
          message:
            "Insufficient funds. Please add more MONAD to your wallet and try again.",
        };
      }

      // User rejection
      if (
        lowerMessage.includes("user rejected") ||
        lowerMessage.includes("user denied") ||
        lowerMessage.includes("rejected the request") ||
        lowerMessage.includes("user cancelled")
      ) {
        return {
          type: "user_rejected",
          message: "Transaction was cancelled. Please try again when ready.",
        };
      }

      // Network errors
      if (
        lowerMessage.includes("network error") ||
        lowerMessage.includes("connection error") ||
        lowerMessage.includes("timeout") ||
        lowerMessage.includes("failed to fetch") ||
        err?.code === "NETWORK_ERROR" ||
        err?.status === 503 ||
        err?.status === 502
      ) {
        return {
          type: "network_error",
          message:
            "Network connection issue. Please check your connection and try again.",
        };
      }

      // Contract/blockchain errors
      if (
        lowerMessage.includes("execution reverted") ||
        lowerMessage.includes("contract call") ||
        lowerMessage.includes("invalid opcode") ||
        lowerMessage.includes("out of gas") ||
        err?.code === "CALL_EXCEPTION"
      ) {
        return {
          type: "contract_error",
          message:
            "Smart contract error. The transaction could not be completed.",
        };
      }

      // API errors
      if (
        err?.status === 400 ||
        err?.status === 401 ||
        err?.status === 403 ||
        err?.status === 404 ||
        err?.status === 500 ||
        lowerMessage.includes("api error") ||
        lowerMessage.includes("server error")
      ) {
        return {
          type: "api_error",
          message: "Server error. Please try again in a few moments.",
        };
      }

      // Unknown error
      return {
        type: "unknown_error",
        message:
          rawMessage.length > 100
            ? `${rawMessage.slice(0, 100)}...`
            : rawMessage,
      };
    },
    []
  );

  const startFailedTimer = useCallback(() => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    setMintStatus("failed");
    resetTimerRef.current = window.setTimeout(() => {
      setMintStatus("idle");
      resetTimerRef.current = null;
    }, 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  // Reflect on-chain balance
  useEffect(() => {
    const balNum =
      typeof balance === "string" ? Number(balance) : Number(balance ?? 0);
    if (!Number.isFinite(balNum)) return;
    if (balNum > 0 && mintStatus !== "minted") {
      setMintStatus("minted");
    }
  }, [balance, mintStatus]);

  const isLocked =
    signerLoading ||
    txPending ||
    mintStatus === "failed" ||
    mintStatus === "minted";
  const icon =
    mintStatus === "failed" ? (
      <Block />
    ) : mintStatus === "minted" ? (
      <Smile />
    ) : undefined;

  const handleMintNFT = useCallback(async () => {
    if (!address || !collectionId || isLocked) return;

    setTxPending(true);
    try {
      // Pre-check minimum balance 0.75 MONAD
      try {
        const balStr = await fetchBalance();
        if (balStr) {
          // Compare using BigInt for precision
          const onchainBal = parseEther(balStr);
          const minRequired = BigInt(parseEther("0.75"));
          if (onchainBal < minRequired) {
            throw new Error(
              "You must have greater than 0.75 MONAD to mint this NFT."
            );
          }
        }
      } catch (bErr) {
        const errorInfo = classifyError(bErr);
        console.error("Balance check failed:", bErr);
        toast({
          message: errorInfo.message,
          variant: "error",
          duration: 5000,
        });
        startFailedTimer();
        return;
      }

      const { data } = await axiosClient.post("/mint-nft", {
        chain: "monad-testnet",
        collectionId,
        wallet: { address, chain: "monad-testnet" },
        nftAmount: 1,
        kind: "public",
        protocol: "ERC1155",
        tokenId: 0,
      });

      const step0 = data?.steps?.[0];
      const p = step0?.params;
      if (!p?.to || !p?.from || !p?.data) {
        throw new Error("Mint route is missing required transaction params.");
      }

      const rawValue = p.value ?? "0x0";
      const value: string =
        typeof rawValue === "string"
          ? rawValue.trim() || "0x0"
          : String(rawValue);

      const tx = await sendTransaction({
        to: p.to,
        from: p.from,
        data: p.data,
        value: BigInt(value), // string, not bigint
      });

      toast({
        message: "You have successfully minted the NFTs",
        action: (
          <Button
            intent="primary"
            onClick={() =>
              window.open(
                `https://monad-testnet.socialscan.io/tx/${tx.hash}`,
                "_blank"
              )
            }
            className="text-white transition px-3 py-1 rounded-md text-xs"
          >
            View on explorer
          </Button>
        ),
        variant: "success",
        duration: 10000,
      });

      // Persist success (no auto-reset)
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      setMintStatus("minted");
    } catch (error: unknown) {
      const errorInfo = classifyError(error);

      // Enhanced logging with error context
      console.error("Mint failed:", {
        error,
        errorType: errorInfo.type,
        message: errorInfo.message,
        collectionId,
        address,
      });

      // Show user-friendly error message
      toast({
        message: errorInfo.message,
        variant: "error",
        duration: errorInfo.type === "user_rejected" ? 3000 : 5000,
      });

      startFailedTimer();
    } finally {
      setTxPending(false);
    }
  }, [
    address,
    collectionId,
    isLocked,
    sendTransaction,
    fetchBalance,
    startFailedTimer,
    toast,
    classifyError,
  ]);

  if (!collectionId) {
    return (
      <Button intent="gradient" disabled className="w-[120px]">
        Mint
      </Button>
    );
  }

  return isConnected ? (
    <Button
      intent="gradient"
      onClick={handleMintNFT}
      disabled={isLocked}
      doubleIcon
      icon={icon}
      className={cn(
        "max-w-[80px] md:max-w-[120px] px-6 w-full max-h-[18px] md:max-h-[38px] h-full flex items-center justify-center text-xs sm:text-sm md:text-base transition-all duration-150",
        "hover:scale-105",
        mintStatus === "failed" && "ring-2 from-[#FFACAD] to-[#FF5E61]",
        mintStatus === "minted" && "ring-2 from-[#ACFFC4] to-[#E2FFCB]"
      )}
      aria-live="polite"
    >
      {signerLoading || txPending
        ? "Processing..."
        : mintStatus === "minted"
        ? "Minted"
        : mintStatus === "failed"
        ? "Failed"
        : "Mint"}
    </Button>
  ) : (
    <Button intent="gradient" onClick={() => open()}>
      Connect Wallet
    </Button>
  );
}
