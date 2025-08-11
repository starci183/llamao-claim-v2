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
import { useEffect, useRef, useState } from "react";

type MintStatus = "idle" | "failed" | "minted";

export default function MintButton() {
  const { open } = useAppKit();
  const { address, isConnected, loading, sendTransaction } = useSigner();
  const { toast } = useToast();
  const { slug } = useParams();
  const [mintStatus, setMintStatus] = useState<MintStatus>("idle");
  const { balance } = useContract(slug as string);
  console.log(balance);

  // single timer to auto-clear transient statuses
  const resetTimerRef = useRef<number | null>(null);
  const startStatusTimer = (status: Exclude<MintStatus, "idle">) => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    setMintStatus(status);
    resetTimerRef.current = window.setTimeout(() => {
      setMintStatus("idle");
      resetTimerRef.current = null;
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  useEffect(() => {
    console.log("asdasd", Number(balance));
    if (Number(balance) > 0) {
      setMintStatus("minted");
    }
  }, [balance, mintStatus]);

  const handleMintNFT = async () => {
    if (!address) return;

    try {
      const { data } = await axiosClient.post("/mint-nft", {
        chain: "monad-testnet",
        collectionId: slug,
        wallet: { address, chain: "monad-testnet" },
        nftAmount: 1,
        kind: "public",
        protocol: "ERC1155",
        tokenId: 0,
      });

      try {
        const tx = await sendTransaction({
          to: data.steps[0].params.to,
          from: data.steps[0].params.from,
          data: data.steps[0].params.data,
          value: BigInt(data.steps[0].params.value),
        });

        // success UI: toast + show "Minted" for 5s
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

        startStatusTimer("minted");
      } catch (signError) {
        if (
          (signError as Error).message?.includes("user rejected") ||
          (signError as Error).message?.includes("User rejected")
        ) {
          throw new Error("You rejected the transaction.");
        } else {
          console.error("Transaction signing failed:", signError);
          throw new Error("You have failed to mint the NFTs");
        }
      }
    } catch (err) {
      console.error("Mint failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast({ message: errorMessage, variant: "error" });
      startStatusTimer("failed");
    }
  };

  const isLocked =
    loading || mintStatus === "failed" || mintStatus === "minted";
  const icon =
    mintStatus === "failed" ? (
      <Block />
    ) : mintStatus === "minted" ? (
      <Smile />
    ) : null;

  return (
    <div>
      {isConnected ? (
        <>
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
            {loading
              ? "Processing..."
              : mintStatus === "minted"
              ? "Minted"
              : mintStatus === "failed"
              ? "Failed"
              : "Mint"}
          </Button>
        </>
      ) : (
        <button onClick={() => open()}>Connect Wallet</button>
      )}
    </div>
  );
}
