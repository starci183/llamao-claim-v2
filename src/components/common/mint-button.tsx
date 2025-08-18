"use client";

import { Button } from "@/components/common/button";
import { useToast } from "@/hooks/use-toast";
import axiosClient from "@/service/axios-client";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
  type Provider,
} from "@reown/appkit/react";
import {
  BrowserProvider,
  JsonRpcSigner,
  formatEther,
  parseEther,
} from "ethers";
import { useEffect, useState } from "react";
import Smile from "@/svg/Smile";
import Block from "@/svg/Block";
import { cn } from "@/lib/utils";

export default function MintButton() {
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { chainId } = useAppKitNetworkCore();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setBalance] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mintStatus, setMintStatus] = useState<
    "idle" | "pending" | "minted" | "failed"
  >("idle");

  useEffect(() => {
    const fetchAndSetBalance = async () => {
      try {
        if (!walletProvider || !address) return;
        const provider = new BrowserProvider(walletProvider, chainId);
        const signer = new JsonRpcSigner(provider, address);
        const rawBalance = await signer.provider.getBalance(address);
        setBalance(formatEther(rawBalance));
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchAndSetBalance();
  }, [walletProvider, address, chainId]);

  const handleMintNFT = async () => {
    if (!address) return;

    setLoading(true);
    setMintStatus("pending");

    try {
      // Minimum MONAD balance requirement
      try {
        const precheckProvider = new BrowserProvider(walletProvider, chainId);
        const currentBalance = await precheckProvider.getBalance(address);
        const minRequired = parseEther("0.75");
        if (currentBalance < minRequired) {
          throw new Error(
            "You must have greater than 0.75 MONAD to mint this NFT."
          );
        }
      } catch (bErr) {
        if (bErr instanceof Error) {
          toast({ message: bErr.message, variant: "error" });
          setMintStatus("failed");
          return;
        }
      }

      const { data } = await axiosClient.post("/mint-nft", {
        chain: "monad-testnet",
        collectionId: "0x913bf9751fe18762b0fd6771edd512c7137e42bb",
        wallet: {
          address,
          chain: "monad-testnet",
        },
        nftAmount: 1,
        kind: "public",
        protocol: "ERC1155",
        tokenId: 0,
      });

      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = new JsonRpcSigner(provider, address);

      try {
        const tx = await signer.sendTransaction({
          to: data.steps[0].params.to,
          from: data.steps[0].params.from,
          data: data.steps[0].params.data,
          value: BigInt(data.steps[0].params.value),
        });
        setMintStatus("minted");
        toast({
          message: "You have minted successfully with tx hash: " + tx.hash,
          action: (
            <button
              onClick={() =>
                window.open(`https://testnet.monad.xyz/tx/${tx.hash}`, "_blank")
              }
            >
              View on explorer
            </button>
          ),
          variant: "success",
        });
      } catch (signError) {
        const normalizeWalletErrorMessage = (error: unknown): string => {
          const err = error as {
            shortMessage?: string;
            message?: string;
            data?: { message?: string };
            error?: { message?: string };
            info?: { error?: { message?: string } };
            cause?: { message?: string };
            reason?: string;
          };
          const candidates = [
            err?.shortMessage,
            err?.message,
            err?.data?.message,
            err?.error?.message,
            err?.info?.error?.message,
            err?.cause?.message,
            err?.reason,
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

        const friendlyMessage = normalizeWalletErrorMessage(signError);
        console.error("Transaction signing failed:", signError);
        setMintStatus("failed");
        throw new Error(friendlyMessage);
      }
    } catch (err) {
      console.error("Mint failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast({
        message: errorMessage,
        variant: "error",
      });
      setMintStatus("failed");
    } finally {
      setLoading(false);
    }
  };

  let buttonContent;
  if (mintStatus === "pending") {
    buttonContent = (
      <div className="">
        <span className="loader mr-1" /> Pending
      </div>
    );
  } else if (mintStatus === "minted") {
    buttonContent = (
      <div className="flex items-center gap-1">
        <Smile className="w-4 h-4" /> Minted <Smile className="w-4 h-4" />
      </div>
    );
  } else if (mintStatus === "failed") {
    buttonContent = (
      <div className="flex items-center gap-1">
        <Block className="w-4 h-4" /> Failed <Block className="w-4 h-4" />
      </div>
    );
  } else {
    buttonContent = loading ? "Processing..." : "Llamao";
  }

  return (
    <div>
      {isConnected ? (
        <>
          <Button
            intent="gradient"
            onClick={handleMintNFT}
            disabled={loading || mintStatus === "pending"}
            className={cn(
              "min-w-[80px] md:min-w-[116.7796630859375px] w-full max-h-[23.27118682861328px] md:max-h-[46.27118682861328px] h-full flex items-center justify-center text-sm sm:text-base md:text-lg",
              mintStatus === "pending" &&
                "bg-[linear-gradient(90deg,_#FFFFFF_0%,_#757575_100%)] text-black",
              mintStatus === "minted" &&
                "bg-[linear-gradient(90deg,_#ACFFC4_0%,_#E2FFCB_100%)] text-black",
              mintStatus === "failed" &&
                "bg-[linear-gradient(90deg,_#FFACAD_0%,_#FF5E61_100%)] text-black"
            )}
          >
            {buttonContent}
          </Button>
        </>
      ) : (
        <button onClick={() => open()}>Connect Wallet</button>
      )}
    </div>
  );
}
