"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import useSWR from "swr";
import { ethers } from "ethers";
import { erc1155Abi } from "@/abi/erc-1155";
import { addOwnedNFT, useAppDispatch } from "@/redux";
import { useEffect } from "react";

export interface CollectibleCardProps {
  address: string;
  name: string;
  description: string;
  image: string;
  TBA?: string;
  index: number;
}

export async function fetchTokenBalance(
  contractAddress: string,
  userAddress: string,
  tokenId = 0
): Promise<number> {
  try {
    const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
    const contract = new ethers.Contract(contractAddress, erc1155Abi, provider);

    const balance = await contract.balanceOf(userAddress, tokenId);
    return parseInt(balance.toString());
  } catch (err) {
    console.error("Error fetching balance:", err);
    throw err; // important — let SWR handle retry
  }
}

export default function CollectibleCard({
  address,
  name,
  description,
  image,
  index,
}: CollectibleCardProps) {
  const { walletAddress } = useAuth();
  const dispatch = useAppDispatch();
  const {
    data: balance,
    isValidating,
  } = useSWR(
    walletAddress ? ["nft-balance", address, walletAddress] : null,
    () => fetchTokenBalance(address, walletAddress!),
    {
      shouldRetryOnError: true,
      revalidateOnFocus: false,
      onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
        // Retry forever, but wait progressively longer each time
        const delay = Math.min(5000 * retryCount, 30000); // max 30s
        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), delay);
      },
    }
  );

  const owned = balance && balance > 0;
  useEffect(() => {
    console.log("owned", owned);
    if (owned) {
      dispatch(addOwnedNFT(index));
    }
  }, [owned, index, dispatch]);

  return (
    <div
      key={address}
      className={cn(
        "flex flex-col items-center bg-[#C3C3C3] box-shadow-showcase-card",
        "overflow-hidden p-2 space-y-2 cursor-pointer transition-all duration-300",
        "hover:scale-[1.02] hover:bg-[#D0D0D0]"
      )}
      onClick={() =>
        window.open(
          `https://magiceden.io/mint-terminal/monad-testnet/${address}`,
          "_blank"
        )
      }
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image src={image} alt={name} fill className={cn(
            "object-cover transition-all duration-300",
            !owned && "grayscale brightness-75"
          )} />
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
          {name}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>

        {walletAddress && (
          <p className="text-xs text-gray-700 mt-1">
            {owned
              ? `Owned`
              : isValidating
              ? "Checking balance..."
              : "Not owned"}
          </p>
        )}
      </div>
    </div>
  );
}