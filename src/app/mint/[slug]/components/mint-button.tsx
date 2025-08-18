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
        const msg =
          bErr instanceof Error ? bErr.message : "Insufficient funds.";
        toast({ message: msg, variant: "error", duration: 5000 });
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
      const normalizeWalletErrorMessage = (err: unknown): string => {
        const e = err as {
          shortMessage?: string;
          message?: string;
          data?: { message?: string };
          error?: { message?: string };
          info?: { error?: { message?: string } };
          cause?: { message?: string };
          reason?: string;
        };
        const candidates = [
          e?.shortMessage,
          e?.message,
          e?.data?.message,
          e?.error?.message,
          e?.info?.error?.message,
          e?.cause?.message,
          e?.reason,
        ].filter(Boolean) as string[];
        const raw = candidates[0] || "Transaction failed";
        const lower = raw.toLowerCase();
        if (
          lower.includes("insufficient funds") ||
          lower.includes("insufficient balance") ||
          lower.includes("funds for gas") ||
          lower.includes("intrinsic transaction cost") ||
          lower.includes("balance too low")
        ) {
          return "Insufficient funds. Please top up your wallet and try again.";
        }
        if (
          lower.includes("user rejected") ||
          lower.includes("user denied") ||
          lower.includes("rejected the request")
        ) {
          return "You rejected the transaction.";
        }
        return raw;
      };

      const friendly = normalizeWalletErrorMessage(error);
      console.error("Mint failed:", error);
      toast({
        message: friendly,
        variant: "error",
        duration: 5000,
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
