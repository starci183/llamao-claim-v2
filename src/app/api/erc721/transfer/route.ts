import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { erc721Abi } from "../../../../lib/abis";
import type { ERC721TransferDto, TransactionResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ERC721TransferDto = await request.json();
    const { contractAddress, from, to, tokenId } = body;

    if (!contractAddress || !from || !to || tokenId === undefined) {
      return NextResponse.json(
        { error: "Contract address, from, to, and tokenId are required" },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    const contract = new ethers.Contract(contractAddress, erc721Abi, provider);

    // Verify token exists and get owner
    const [owner, tokenURI] = await Promise.all([
      contract.ownerOf(tokenId),
      contract.tokenURI(tokenId).catch(() => "N/A"),
    ]);

    if (owner.toLowerCase() !== from.toLowerCase()) {
      return NextResponse.json(
        { error: "Token is not owned by the from address" },
        { status: 400 }
      );
    }

    // Estimate gas for the transaction
    const gasEstimate = await contract.transferFrom.estimateGas(
      from,
      to,
      tokenId
    );

    const response: TransactionResponse = {
      success: true,
      gasUsed: gasEstimate.toString(),
    };

    return NextResponse.json({
      message: "NFT transfer prepared successfully",
      tokenInfo: {
        tokenId,
        owner,
        tokenURI,
      },
      gasEstimate: gasEstimate.toString(),
      response,
    });
  } catch (error) {
    console.error("Error preparing ERC721 transfer:", error);
    return NextResponse.json(
      { error: "Failed to prepare NFT transfer" },
      { status: 500 }
    );
  }
}
