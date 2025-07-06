// Common types for the application

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// NFT Contract Testing Types
export interface Test1155RequestDto {
  owner?: string;
  tokenId?: number;
}

export interface Test1155ResponseDto {
  balance?: string;
  uri?: string;
  contractURI?: string;
  supportsInterfaces?: {
    isERC721: boolean;
    isERC721Metadata: boolean;
    isERC1155: boolean;
  };
}

export interface Test721RequestDto {
  owner?: string;
}

export interface Test721ResponseDto {
  tokens: Array<{
    tokenId: number;
    uri: string;
  }>;
  contractURI?: string;
  supportsInterfaces?: {
    isERC721: boolean;
    isERC721Metadata: boolean;
    isERC1155: boolean;
  };
}

// Smart Contract Types
export interface ContractInfo {
  address: string;
  name: string;
  symbol: string;
  contractURI?: string;
  totalSupply?: string;
}

export interface NFTToken {
  tokenId: number;
  uri: string;
  owner?: string;
  metadata?: {
    name?: string;
    description?: string;
    image?: string;
    attributes?: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
}

// Token Contract Types
export interface TokenInfo {
  name: string;
  symbol: string;
  decimals?: number;
  totalSupply: string;
  contractAddress: string;
}

// ERC-20 Types
export interface ERC20TransferDto {
  contractAddress: string;
  to: string;
  amount: string;
  fromAddress?: string; // For transferFrom
}

export interface ERC20ApproveDto {
  contractAddress: string;
  spender: string;
  amount: string;
}

export interface ERC20BalanceDto {
  contractAddress: string;
  address: string;
}

export interface ERC20AllowanceDto {
  contractAddress: string;
  owner: string;
  spender: string;
}

// ERC-777 Types
export interface ERC777SendDto {
  contractAddress: string;
  to: string;
  amount: string;
  data?: string; // hex string
}

export interface ERC777BurnDto {
  contractAddress: string;
  amount: string;
  data?: string; // hex string
}

export interface ERC777OperatorDto {
  contractAddress: string;
  operator: string;
  tokenHolder?: string;
}

// ERC-721 Types (extending existing)
export interface ERC721TransferDto {
  contractAddress: string;
  from: string;
  to: string;
  tokenId: number;
}

export interface ERC721ApproveDto {
  contractAddress: string;
  to: string;
  tokenId: number;
}

export interface ERC721MintDto {
  contractAddress: string;
  to: string;
  tokenId?: number;
  tokenURI?: string;
}

// ERC-1155 Types (extending existing)
export interface ERC1155TransferDto {
  contractAddress: string;
  from: string;
  to: string;
  id: number;
  amount: string;
  data?: string;
}

export interface ERC1155BatchTransferDto {
  contractAddress: string;
  from: string;
  to: string;
  ids: number[];
  amounts: string[];
  data?: string;
}

export interface ERC1155MintDto {
  contractAddress: string;
  to: string;
  id: number;
  amount: string;
  data?: string;
}

// Response Types
export interface TransactionResponse {
  success: boolean;
  txHash?: string;
  error?: string;
  gasUsed?: string;
  gasPrice?: string;
}

export interface TokenBalanceResponse {
  address: string;
  balance: string;
  decimals?: number;
  formattedBalance?: string;
}

export interface TokenAllowanceResponse {
  owner: string;
  spender: string;
  allowance: string;
  decimals?: number;
  formattedAllowance?: string;
}
