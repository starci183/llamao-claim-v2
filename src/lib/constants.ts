// Monad Testnet RPC URL
export const MONAD_TESTNET_RPC = "https://testnet-rpc.monad.xyz";

// Categories for NFT classification
export const NFT_CATEGORIES = [
  "art",
  "collectible",
  "gaming",
  "music",
  "photography",
  "sport",
  "trading-card",
  "utility",
  "virtual-world",
  "other",
] as const;

export type NFTCategory = (typeof NFT_CATEGORIES)[number];
