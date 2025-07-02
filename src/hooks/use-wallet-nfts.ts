import { getWalletNFTCollection, NFTCollection } from "@/lib/nft-utils";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

interface UseWalletNFTsParams {
  walletAddress?: string;
  contractAddresses: string[];
  erc1155TokenIds?: { [contractAddress: string]: string[] };
  enabled?: boolean;
}

interface UseWalletNFTsReturn {
  collections: NFTCollection[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useWalletNFTs({
  walletAddress,
  contractAddresses,
  erc1155TokenIds = {},
  enabled = true,
}: UseWalletNFTsParams): UseWalletNFTsReturn {
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    if (!walletAddress || !enabled || contractAddresses.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use public RPC endpoints that don't require API keys
      const getRpcUrl = () => {
        if (process.env.NEXT_PUBLIC_RPC_URL) {
          return process.env.NEXT_PUBLIC_RPC_URL;
        }

        // Fallback to public RPCs (these are free but may have rate limits)
        const publicRpcs = [
          "https://eth.llamarpc.com", // Llama RPC (public)
          "https://rpc.flashbots.net", // Flashbots (public)
          "https://ethereum.publicnode.com", // PublicNode (public)
          "https://1rpc.io/eth", // 1RPC (public)
          "https://eth.rpc.blxrbdn.com", // bloXroute (public)
        ];

        // Randomly select one to distribute load
        return publicRpcs[Math.floor(Math.random() * publicRpcs.length)];
      };

      const provider = new ethers.JsonRpcProvider(getRpcUrl());

      const nftCollections = await getWalletNFTCollection(
        walletAddress,
        contractAddresses,
        provider,
        erc1155TokenIds
      );

      setCollections(nftCollections);
    } catch (err) {
      console.error("Error fetching NFTs:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch NFTs");
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, contractAddresses, enabled, erc1155TokenIds]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  const refetch = useCallback(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return {
    collections,
    isLoading,
    error,
    refetch,
  };
}
