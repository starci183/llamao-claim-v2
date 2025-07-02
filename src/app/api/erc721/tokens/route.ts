import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { erc721Abi } from "@/lib/abis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractAddress, owner } = body;

    if (!contractAddress || !owner) {
      return NextResponse.json(
        { error: "Contract address and owner are required" },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    const contract = new ethers.Contract(contractAddress, erc721Abi, provider);

    // Get contract info
    const [name, symbol, balance] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.balanceOf(owner),
    ]);

    // Get tokens of owner (if function exists)
    let tokens: Array<{ tokenId: number; uri: string }> = [];
    try {
      const tokenIds = await contract.tokensOfOwner(owner);

      tokens = await Promise.all(
        tokenIds.slice(0, 20).map(async (tokenId: bigint) => {
          // Limit to first 20 tokens
          try {
            const uri = await contract.tokenURI(tokenId);
            return {
              tokenId: Number(tokenId),
              uri,
            };
          } catch {
            return {
              tokenId: Number(tokenId),
              uri: "N/A",
            };
          }
        })
      );
    } catch {
      // tokensOfOwner function might not exist, that's okay
    }

    return NextResponse.json({
      contractInfo: {
        address: contractAddress,
        name,
        symbol,
      },
      owner,
      balance: balance.toString(),
      tokens,
      totalTokensShown: tokens.length,
    });
  } catch (error) {
    console.error("Error getting ERC721 tokens:", error);
    return NextResponse.json(
      { error: "Failed to get NFT tokens" },
      { status: 500 }
    );
  }
}
