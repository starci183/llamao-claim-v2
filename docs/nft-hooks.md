# NFT Hooks Documentation

This documentation covers the NFT hooks available in the project for fetching and managing NFTs from user wallets.

## Overview

The project provides several hooks for working with NFTs:

- `useNFTs` - Main hook for getting NFTs from user's wallet
- `useNFTsFromContract` - Hook for getting NFTs from a specific contract
- `useFilteredNFTs` - Hook with built-in filtering capabilities
- `useWalletNFTs` - Lower-level hook (used internally)

## useNFTs Hook

The main hook for getting NFTs from a user's connected wallet.

### Basic Usage

```tsx
import { useNFTs } from "@/hooks/use-nfts";

function MyComponent() {
  const {
    collections,
    allNFTs,
    totalCount,
    isLoading,
    error,
    isWalletConnected,
    walletAddress,
    refetch,
  } = useNFTs();

  if (!isWalletConnected) {
    return <div>Please connect your wallet</div>;
  }

  if (isLoading) {
    return <div>Loading NFTs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your NFTs ({totalCount})</h2>
      {allNFTs.map((nft) => (
        <div key={`${nft.contractAddress}-${nft.tokenId}`}>
          {nft.metadata?.name || `Token #${nft.tokenId}`}
        </div>
      ))}
    </div>
  );
}
```

### With Specific Contract Addresses

```tsx
const { collections, isLoading, error } = useNFTs({
  contractAddresses: [
    "0x1234567890123456789012345678901234567890", // Your ERC721 contract
    "0x0987654321098765432109876543210987654321", // Your ERC1155 contract
  ],
  autoFetch: true,
});
```

### With ERC1155 Token IDs

```tsx
const { collections } = useNFTs({
  contractAddresses: ["0x1234567890123456789012345678901234567890"],
  erc1155TokenIds: {
    "0x1234567890123456789012345678901234567890": ["1", "2", "3", "10"],
  },
});
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `contractAddresses` | `string[]` | `[]` | Array of contract addresses to fetch NFTs from |
| `erc1155TokenIds` | `object` | `{}` | For ERC1155 contracts, specify which token IDs to check |
| `autoFetch` | `boolean` | `true` | Whether to automatically fetch NFTs when wallet is connected |
| `enabled` | `boolean` | `true` | Whether the hook should be enabled |

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `collections` | `NFTCollection[]` | Array of NFT collections from the user's wallet |
| `allNFTs` | `NFTItem[]` | All NFT items flattened from collections |
| `totalCount` | `number` | Total number of NFTs across all collections |
| `isLoading` | `boolean` | Loading state |
| `error` | `string \| null` | Error message if any |
| `isWalletConnected` | `boolean` | Whether wallet is connected |
| `walletAddress` | `string \| undefined` | Current wallet address |
| `refetch` | `() => void` | Function to manually refetch NFTs |
| `clearNFTs` | `() => void` | Function to clear the current NFT data |

## useNFTsFromContract Hook

Hook for getting NFTs from a specific contract.

```tsx
import { useNFTsFromContract } from "@/hooks/use-nfts";

function SingleContractNFTs() {
  const {
    collection,
    nfts,
    isLoading,
    error,
  } = useNFTsFromContract("0x1234567890123456789012345678901234567890", {
    erc1155TokenIds: ["1", "2", "3"],
    autoFetch: true,
  });

  return (
    <div>
      {collection && (
        <div>
          <h2>{collection.name}</h2>
          <p>{nfts.length} NFTs</p>
        </div>
      )}
    </div>
  );
}
```

## useFilteredNFTs Hook

Hook with built-in filtering capabilities.

```tsx
import { useFilteredNFTs } from "@/hooks/use-nfts";

function FilteredNFTs() {
  const { collections, allNFTs } = useFilteredNFTs({
    contractAddresses: ["0x1234567890123456789012345678901234567890"],
    filterBy: {
      tokenType: "ERC721",
      hasMetadata: true,
      hasImage: true,
      attributeFilter: (attributes) => {
        return attributes?.some(attr => 
          attr.trait_type === "Rarity" && attr.value === "Legendary"
        );
      },
    },
  });

  return (
    <div>
      <h2>Legendary ERC721 NFTs with Images</h2>
      {allNFTs.map((nft) => (
        <div key={`${nft.contractAddress}-${nft.tokenId}`}>
          {nft.metadata?.name}
        </div>
      ))}
    </div>
  );
}
```

### Filter Options

| Filter | Type | Description |
|--------|------|-------------|
| `tokenType` | `"ERC721" \| "ERC1155"` | Filter by token standard |
| `hasMetadata` | `boolean` | Filter NFTs that have metadata |
| `hasImage` | `boolean` | Filter NFTs that have images |
| `attributeFilter` | `function` | Custom function to filter by attributes |

## Data Types

### NFTItem

```typescript
interface NFTItem {
  contractAddress: string;
  tokenId: string;
  tokenType: "ERC721" | "ERC1155";
  name?: string;
  symbol?: string;
  tokenUri?: string;
  metadata?: NFTMetadata;
  balance?: string; // For ERC1155
}
```

### NFTCollection

```typescript
interface NFTCollection {
  contractAddress: string;
  name: string;
  symbol: string;
  tokenType: "ERC721" | "ERC1155";
  tokens: NFTItem[];
}
```

### NFTMetadata

```typescript
interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  [key: string]: unknown;
}
```

## Example Components

### NFT Gallery Component

```tsx
import { useNFTs } from "@/hooks/use-nfts";

export function NFTGallery() {
  const { collections, isLoading, error, isWalletConnected } = useNFTs({
    contractAddresses: ["0x1234567890123456789012345678901234567890"],
  });

  if (!isWalletConnected) {
    return <div>Connect your wallet to view NFTs</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {collections.map((collection) =>
        collection.tokens.map((nft) => (
          <div key={`${nft.contractAddress}-${nft.tokenId}`} className="border p-4 rounded">
            {nft.metadata?.image && (
              <img src={nft.metadata.image} alt={nft.metadata.name} className="w-full h-48 object-cover" />
            )}
            <h3>{nft.metadata?.name || `Token #${nft.tokenId}`}</h3>
            <p>Collection: {collection.name}</p>
          </div>
        ))
      )}
    </div>
  );
}
```

### Simple NFT Counter

```tsx
import { useNFTs } from "@/hooks/use-nfts";

export function NFTCounter() {
  const { totalCount, isLoading, isWalletConnected } = useNFTs();

  if (!isWalletConnected) return null;
  if (isLoading) return <span>Loading...</span>;

  return <span>You have {totalCount} NFTs</span>;
}
```

## Configuration

### Adding Contract Addresses

You can modify the default contract addresses in the hook file:

```typescript
// In src/hooks/use-nfts.ts
const DEFAULT_CONTRACT_ADDRESSES: string[] = [
  "0x1234567890123456789012345678901234567890", // Your ERC721 contract
  "0x0987654321098765432109876543210987654321", // Your ERC1155 contract
];
```

### Environment Variables

The hook uses the following environment variables for RPC configuration:

- `NEXT_PUBLIC_RPC_URL` - Custom RPC URL (optional, falls back to public RPCs)

## Error Handling

The hooks provide comprehensive error handling:

```tsx
const { error, refetch } = useNFTs();

if (error) {
  return (
    <div>
      <p>Error loading NFTs: {error}</p>
      <button onClick={refetch}>Try Again</button>
    </div>
  );
}
```

## Performance Considerations

1. **Auto-fetch**: Set `autoFetch: false` if you want to control when NFTs are fetched
2. **Contract addresses**: Only include contracts you need to minimize API calls
3. **ERC1155 Token IDs**: Specify only the token IDs you're interested in
4. **Conditional rendering**: Use `enabled: false` to disable the hook conditionally

## Common Patterns

### Loading States with Skeleton

```tsx
function NFTGalleryWithSkeleton() {
  const { collections, isLoading } = useNFTs();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-64 rounded"></div>
        ))}
      </div>
    );
  }

  // ... render actual NFTs
}
```

### Refetch on Wallet Change

```tsx
function NFTGallery() {
  const { collections, walletAddress, refetch } = useNFTs();

  useEffect(() => {
    if (walletAddress) {
      refetch();
    }
  }, [walletAddress, refetch]);

  // ... component logic
}
```

This documentation should help you get started with using the NFT hooks in your project!
