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
import { BrowserProvider, JsonRpcSigner, formatEther } from "ethers";
import { useEffect, useState } from "react";

export default function MintButton() {
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { chainId } = useAppKitNetworkCore();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setBalance] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
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

    fetchBalance();
  }, [walletProvider, address, chainId]);

  const handleMintNFT = async () => {
    if (!address) return;

    setLoading(true);

    try {
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

        toast({
          title: "Minted",
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
        if (
          (signError as Error).message?.includes("user rejected") ||
          (signError as Error).message?.includes("User rejected")
        ) {
          throw new Error("You rejected the transaction.");
        } else {
          console.error("Transaction signing failed:", signError);
          throw new Error("Transaction signing failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Mint failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast({
        message: errorMessage,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isConnected ? (
        <>
          <Button
            intent="gradient"
            onClick={handleMintNFT}
            disabled={loading}
            className="max-w-[80px] md:max-w-[120px] w-full max-h-[18px] md:max-h-[38px] h-full flex items-center justify-center text-xs sm:text-sm md:text-base"
          >
            {loading ? "Processing..." : "Llamao"}
          </Button>
          {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
        </>
      ) : (
        <button onClick={() => open()}>Connect Wallet</button>
      )}
    </div>
  );
}
