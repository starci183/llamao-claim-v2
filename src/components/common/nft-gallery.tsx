import React from "react";
import Image from "next/image";
import { useNFTs } from "@/hooks/use-nfts";

/**
 * Example component showing how to use the useNFTs hook
 */
export function NFTGallery() {
  const {
    collections,
    totalCount,
    isLoading,
    error,
    isWalletConnected,
    walletAddress,
    refetch,
  } = useNFTs({
    // Add your contract addresses here
    contractAddresses: [
      // "0x1234567890123456789012345678901234567890", // Example ERC721
      // "0x0987654321098765432109876543210987654321", // Example ERC1155
    ],
    autoFetch: true,
  });

  if (!isWalletConnected) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-gray-600">
          Please connect your wallet to view your NFTs
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p>Loading your NFTs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-4">
          <h3 className="text-lg font-semibold">Error Loading NFTs</h3>
          <p>{error}</p>
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">No NFTs Found</h3>
        <p className="text-gray-600 mb-4">
          You don&apos;t have any NFTs in your wallet for the configured contracts.
        </p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your NFT Collection</h2>
          <p className="text-gray-600">
            {totalCount} NFTs found in {collections.length} collections
          </p>
          <p className="text-sm text-gray-500">
            Wallet: {walletAddress}
          </p>
        </div>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-8">
        {collections.map((collection) => (
          <div key={collection.contractAddress} className="border rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{collection.name}</h3>
              <p className="text-gray-600">
                {collection.symbol} • {collection.tokenType} • {collection.tokens.length} tokens
              </p>
              <p className="text-xs text-gray-500 font-mono">
                {collection.contractAddress}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {collection.tokens.map((nft) => (
                <div
                  key={`${nft.contractAddress}-${nft.tokenId}`}
                  className="border rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  {nft.metadata?.image && (
                    <Image
                      src={nft.metadata.image}
                      alt={nft.metadata.name || `Token #${nft.tokenId}`}
                      width={300}
                      height={192}
                      className="w-full h-48 object-cover rounded mb-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <div>
                    <h4 className="font-semibold truncate">
                      {nft.metadata?.name || `Token #${nft.tokenId}`}
                    </h4>
                    
                    <p className="text-sm text-gray-600">
                      Token ID: {nft.tokenId}
                    </p>
                    
                    {nft.tokenType === "ERC1155" && nft.balance && (
                      <p className="text-sm text-gray-600">
                        Balance: {nft.balance}
                      </p>
                    )}
                    
                    {nft.metadata?.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {nft.metadata.description}
                      </p>
                    )}

                    {nft.metadata?.attributes && nft.metadata.attributes.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-700">Attributes:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {nft.metadata.attributes.slice(0, 3).map((attr, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-1 py-0.5 rounded"
                            >
                              {attr.trait_type}: {attr.value}
                            </span>
                          ))}
                          {nft.metadata.attributes.length > 3 && (
                            <span className="inline-block text-gray-500 text-xs">
                              +{nft.metadata.attributes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Simple NFT list component for minimal display
 */
export function SimpleNFTList({ 
  contractAddresses, 
  className = "" 
}: { 
  contractAddresses?: string[];
  className?: string;
}) {
  const { allNFTs, isLoading, error, isWalletConnected } = useNFTs({
    contractAddresses,
    autoFetch: true,
  });

  if (!isWalletConnected) {
    return <div className={className}>Wallet not connected</div>;
  }

  if (isLoading) {
    return <div className={className}>Loading NFTs...</div>;
  }

  if (error) {
    return <div className={className}>Error: {error}</div>;
  }

  return (
    <div className={className}>
      <h3>Your NFTs ({allNFTs.length})</h3>
      <ul className="space-y-2">
        {allNFTs.map((nft) => (
          <li key={`${nft.contractAddress}-${nft.tokenId}`} className="flex items-center space-x-2">
            {nft.metadata?.image && (
              <Image 
                src={nft.metadata.image} 
                alt="" 
                width={32}
                height={32}
                className="w-8 h-8 rounded object-cover"
              />
            )}
            <span>
              {nft.metadata?.name || `Token #${nft.tokenId}`}
              {nft.balance && ` (${nft.balance})`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
