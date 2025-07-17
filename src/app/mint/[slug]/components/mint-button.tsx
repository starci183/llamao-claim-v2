"use client";

import { Button } from "@/components/common/button";
import { useSigner } from "@/hooks/use-signer";
import { useToast } from "@/hooks/use-toast";
import axiosClient from "@/service/axios-client";
import { useAppKit } from "@reown/appkit/react";

export default function MintButton() {
  const { open } = useAppKit();
  const { address, isConnected, loading, sendTransaction } = useSigner();
  const { toast } = useToast();

  const handleMintNFT = async () => {
    if (!address) return;

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

      try {
        const tx = await sendTransaction({
          to: data.steps[0].params.to,
          from: data.steps[0].params.from,
          data: data.steps[0].params.data,
          value: BigInt(data.steps[0].params.value),
        });

        toast({
          title: "Minted",
          message: "You have minted successfully with tx hash: " + tx.hash,
          action: (
            <Button
              intent="primary"
              onClick={() =>
                window.open(
                  `https://monad-testnet.socialscan.io/tx/${tx.hash}`,
                  "_blank"
                )
              }
              className=" text-white transition px-3 py-1 rounded-md text-xs"
            >
              View on explorer
            </Button>
          ),
          variant: "success",
          duration: 10000,
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
