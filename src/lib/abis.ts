// ERC-721 ABI
export const erc721Abi = [
  // ERC-165
  "function supportsInterface(bytes4 interfaceId) external view returns (bool)",

  // ERC-721 Core
  "function balanceOf(address owner) external view returns (uint256 balance)",
  "function ownerOf(uint256 tokenId) external view returns (address owner)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external",
  "function safeTransferFrom(address from, address to, uint256 tokenId) external",
  "function transferFrom(address from, address to, uint256 tokenId) external",
  "function approve(address to, uint256 tokenId) external",
  "function setApprovalForAll(address operator, bool _approved) external",
  "function getApproved(uint256 tokenId) external view returns (address operator)",
  "function isApprovedForAll(address owner, address operator) external view returns (bool)",

  // ERC-721 Metadata
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)",

  // ERC-721 Enumerable (if implemented)
  "function totalSupply() external view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
  "function tokenByIndex(uint256 index) external view returns (uint256)",

  // Custom functions that might be implemented
  "function tokensOfOwner(address owner) external view returns (uint256[] memory)",
  "function contractURI() external view returns (string memory)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
] as const;

// ERC-1155 ABI
export const erc1155Abi = [
  // ERC-165
  "function supportsInterface(bytes4 interfaceId) external view returns (bool)",

  // ERC-1155 Core
  "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) external",
  "function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data) external",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
  "function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory)",
  "function setApprovalForAll(address operator, bool approved) external",
  "function isApprovedForAll(address account, address operator) external view returns (bool)",

  // ERC-1155 Metadata
  "function uri(uint256 id) external view returns (string memory)",

  // Additional common functions
  "function contractURI() external view returns (string memory)",
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",

  // Events
  "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
  "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)",
  "event ApprovalForAll(address indexed account, address indexed operator, bool approved)",
  "event URI(string value, uint256 indexed id)",
] as const;

// ERC-20 ABI
export const erc20Abi = [
  // ERC-20 Core
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function decimals() external view returns (uint8)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
] as const;

// ERC-777 ABI
export const erc777Abi = [
  // ERC-777 Core
  "function name() external view returns (string memory)",
  "function symbol() external view returns (string memory)",
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function granularity() external view returns (uint256)",
  "function defaultOperators() external view returns (address[] memory)",
  "function isOperatorFor(address operator, address tokenHolder) external view returns (bool)",
  "function authorizeOperator(address operator) external",
  "function revokeOperator(address operator) external",
  "function send(address to, uint256 amount, bytes calldata data) external",
  "function operatorSend(address from, address to, uint256 amount, bytes calldata data, bytes calldata operatorData) external",
  "function burn(uint256 amount, bytes calldata data) external",
  "function operatorBurn(address from, uint256 amount, bytes calldata data, bytes calldata operatorData) external",

  // Events
  "event Sent(address indexed operator, address indexed from, address indexed to, uint256 amount, bytes data, bytes operatorData)",
  "event Minted(address indexed operator, address indexed to, uint256 amount, bytes data, bytes operatorData)",
  "event Burned(address indexed operator, address indexed from, uint256 amount, bytes data, bytes operatorData)",
  "event AuthorizedOperator(address indexed operator, address indexed tokenHolder)",
  "event RevokedOperator(address indexed operator, address indexed tokenHolder)",
] as const;

// Common interface IDs for reference
export const INTERFACE_IDS = {
  ERC165: "0x01ffc9a7",
  ERC20: "0x36372b07",
  ERC721: "0x80ac58cd",
  ERC721_METADATA: "0x5b5e139f",
  ERC721_ENUMERABLE: "0x780e9d63",
  ERC777: "0xe58e113c",
  ERC1155: "0xd9b67a26",
  ERC1155_METADATA: "0x0e89341c",
} as const;
