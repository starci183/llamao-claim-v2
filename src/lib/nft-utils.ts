import { ethers } from "ethers";
import { erc721Abi, erc1155Abi, INTERFACE_IDS } from "./abis";

export interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  [key: string]: unknown;
}

export interface NFTItem {
  contractAddress: string;
  tokenId: string;
  tokenType: "ERC721" | "ERC1155";
  name?: string;
  symbol?: string;
  tokenUri?: string;
  metadata?: NFTMetadata;
  balance?: string; // For ERC1155
}

export interface NFTCollection {
  contractAddress: string;
  name: string;
  symbol: string;
  tokenType: "ERC721" | "ERC1155";
  tokens: NFTItem[];
}

/**
 * Check if a contract supports a specific interface
 */
export async function supportsInterface(
  contractAddress: string,
  interfaceId: string,
  provider: ethers.Provider
): Promise<boolean> {
  try {
    const contract = new ethers.Contract(contractAddress, erc721Abi, provider);
    return await contract.supportsInterface(interfaceId);
  } catch (error) {
    console.error("Error checking interface support:", error);
    return false;
  }
}

/**
 * Get ERC-721 tokens owned by an address
 */
export async function getERC721Tokens(
  contractAddress: string,
  ownerAddress: string,
  provider: ethers.Provider
): Promise<NFTItem[]> {
  try {
    const contract = new ethers.Contract(contractAddress, erc721Abi, provider);
    const tokens: NFTItem[] = [];

    // Check if contract supports ERC721
    const isERC721 = await supportsInterface(
      contractAddress,
      INTERFACE_IDS.ERC721,
      provider
    );
    if (!isERC721) {
      throw new Error("Contract does not support ERC721");
    }

    // Try to get tokens using tokensOfOwner if available
    try {
      const tokenIds = await contract.tokensOfOwner(ownerAddress);

      for (const tokenId of tokenIds) {
        let tokenUri = "";
        try {
          tokenUri = await contract.tokenURI(tokenId);
        } catch (error) {
          console.warn(`Could not get tokenURI for token ${tokenId}:`, error);
        }

        tokens.push({
          contractAddress,
          tokenId: tokenId.toString(),
          tokenType: "ERC721",
          tokenUri,
        });
      }
    } catch {
      console.warn(
        "tokensOfOwner not available, trying balance-based approach"
      );

      const balance = await contract.balanceOf(ownerAddress);
      const balanceNum = parseInt(balance.toString());

      // If enumerable extension is available
      try {
        for (let i = 0; i < balanceNum; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);
          let tokenUri = "";

          try {
            tokenUri = await contract.tokenURI(tokenId);
          } catch (error) {
            console.warn(`Could not get tokenURI for token ${tokenId}:`, error);
          }

          tokens.push({
            contractAddress,
            tokenId: tokenId.toString(),
            tokenType: "ERC721",
            tokenUri,
          });
        }
      } catch {
        console.warn("Contract does not support enumerable extension");
      }
    }

    return tokens;
  } catch (error) {
    console.error("Error getting ERC721 tokens:", error);
    return [];
  }
}

/**
 * Get ERC-1155 token balances for an address
 */
export async function getERC1155Tokens(
  contractAddress: string,
  ownerAddress: string,
  tokenIds: string[],
  provider: ethers.Provider
): Promise<NFTItem[]> {
  try {
    const contract = new ethers.Contract(contractAddress, erc1155Abi, provider);
    const tokens: NFTItem[] = [];

    // Check if contract supports ERC1155
    const isERC1155 = await supportsInterface(
      contractAddress,
      INTERFACE_IDS.ERC1155,
      provider
    );
    if (!isERC1155) {
      throw new Error("Contract does not support ERC1155");
    }

    // Get balances for specified token IDs
    if (tokenIds.length > 0) {
      const accounts = new Array(tokenIds.length).fill(ownerAddress);
      const balances = await contract.balanceOfBatch(accounts, tokenIds);

      for (let i = 0; i < tokenIds.length; i++) {
        const balance = balances[i].toString();
        if (parseInt(balance) > 0) {
          let tokenUri = "";
          try {
            tokenUri = await contract.uri(tokenIds[i]);
          } catch (error) {
            console.warn(`Could not get URI for token ${tokenIds[i]}:`, error);
          }

          tokens.push({
            contractAddress,
            tokenId: tokenIds[i],
            tokenType: "ERC1155",
            tokenUri,
            balance,
          });
        }
      }
    }

    return tokens;
  } catch (error) {
    console.error("Error getting ERC1155 tokens:", error);
    return [];
  }
}

/**
 * Get contract metadata (name, symbol)
 */
export async function getContractMetadata(
  contractAddress: string,
  provider: ethers.Provider
): Promise<{ name: string; symbol: string }> {
  try {
    // Try ERC721 first
    const contract721 = new ethers.Contract(
      contractAddress,
      erc721Abi,
      provider
    );

    try {
      const name = await contract721.name();
      const symbol = await contract721.symbol();
      return { name, symbol };
    } catch {
      // Try ERC1155
      const contract1155 = new ethers.Contract(
        contractAddress,
        erc1155Abi,
        provider
      );
      try {
        const name = await contract1155.name();
        const symbol = await contract1155.symbol();
        return { name, symbol };
      } catch {
        return { name: "Unknown", symbol: "UNK" };
      }
    }
  } catch (error) {
    console.error("Error getting contract metadata:", error);
    return { name: "Unknown", symbol: "UNK" };
  }
}

/**
 * Fetch metadata from token URI
 */
export async function fetchTokenMetadata(
  tokenUri: string
): Promise<NFTMetadata | null> {
  try {
    // Handle IPFS URIs
    if (tokenUri.startsWith("ipfs://")) {
      tokenUri = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    const response = await fetch(tokenUri);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as NFTMetadata;
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return null;
  }
}

/**
 * Get complete NFT collection for a wallet address
 */
export async function getWalletNFTCollection(
  walletAddress: string,
  contractAddresses: string[],
  provider: ethers.Provider,
  erc1155TokenIds: { [contractAddress: string]: string[] } = {}
): Promise<NFTCollection[]> {
  const collections: NFTCollection[] = [];

  for (const contractAddress of contractAddresses) {
    try {
      // Get contract metadata
      const { name, symbol } = await getContractMetadata(
        contractAddress,
        provider
      );

      // Check contract type and get tokens
      const isERC721 = await supportsInterface(
        contractAddress,
        INTERFACE_IDS.ERC721,
        provider
      );
      const isERC1155 = await supportsInterface(
        contractAddress,
        INTERFACE_IDS.ERC1155,
        provider
      );

      let tokens: NFTItem[] = [];

      if (isERC721) {
        tokens = await getERC721Tokens(
          contractAddress,
          walletAddress,
          provider
        );
      } else if (isERC1155) {
        const tokenIds = erc1155TokenIds[contractAddress] || [];
        tokens = await getERC1155Tokens(
          contractAddress,
          walletAddress,
          tokenIds,
          provider
        );
      }

      if (tokens.length > 0) {
        // Fetch metadata for tokens
        for (const token of tokens) {
          if (token.tokenUri) {
            const metadata = await fetchTokenMetadata(token.tokenUri);
            if (metadata) {
              token.metadata = metadata;
            }
          }
        }

        collections.push({
          contractAddress,
          name,
          symbol,
          tokenType: isERC721 ? "ERC721" : "ERC1155",
          tokens,
        });
      }
    } catch (error) {
      console.error(`Error processing contract ${contractAddress}:`, error);
    }
  }

  return collections;
}
