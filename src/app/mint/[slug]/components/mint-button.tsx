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

type MintStatus = "idle" | "failed" | "minted";

export default function MintButton() {
  const { open } = useAppKit();
  const {
    address,
    isConnected,
    loading: signerLoading,
    sendTransaction,
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
    } catch {
      toast({
        message: "You have failed to mint the NFTs",
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
