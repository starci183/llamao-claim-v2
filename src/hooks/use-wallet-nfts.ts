import { getWalletNFTCollection, NFTCollection } from "@/lib/nft-utils";
import { ethers } from "ethers";
import useSWR from "swr";

interface UseWalletNFTsParams {
  walletAddress?: string;
  contractAddresses: string[];
  tokenIds?: { [contractAddress: string]: string[] };
  enabled?: boolean;
}

interface UseWalletNFTsReturn {
  collections: NFTCollection[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function getRpcUrl() {
  if (process.env.NEXT_PUBLIC_RPC_URL) {
    return process.env.NEXT_PUBLIC_RPC_URL;
  }
  const publicRpcs = [
    "https://eth.llamarpc.com",
    "https://rpc.flashbots.net",
    "https://ethereum.publicnode.com",
    "https://1rpc.io/eth",
    "https://eth.rpc.blxrbdn.com",
  ];
  return publicRpcs[Math.floor(Math.random() * publicRpcs.length)];
}

async function fetchNFTsFn([
  walletAddress,
  contractAddresses,
  tokenIds,
]: [string, string[], { [contractAddress: string]: string[] }?]) {
  if (!walletAddress || !contractAddresses.length) return [];
  const provider = new ethers.JsonRpcProvider(getRpcUrl());
  return getWalletNFTCollection(
    walletAddress,
    contractAddresses,
    provider,
    tokenIds || {}
  );
}

export function useWalletNFTs({
  walletAddress,
  contractAddresses,
  tokenIds = {},
  enabled = true,
}: UseWalletNFTsParams): UseWalletNFTsReturn {
  const shouldFetch = Boolean(
    walletAddress && contractAddresses.length && enabled
  );
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? [walletAddress, contractAddresses, tokenIds] : null,
    fetchNFTsFn
  );

  return {
    collections: data || [],
    isLoading: isLoading || false,
    error: error
      ? error instanceof Error
        ? error.message
        : "Failed to fetch NFTs"
      : null,
    refetch: mutate,
  };
}
