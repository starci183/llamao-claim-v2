import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { erc721Abi } from "@/lib/abis";
import type { Test721RequestDto, Test721ResponseDto } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: Test721RequestDto = await request.json();

    const owner = body?.owner || "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3";

    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    const contract = new ethers.Contract(
      "0x06D235F0D8ff77c499A6F647a4d44636acf8584A",
      erc721Abi,
      provider
    );

    const uriCollection = await contract.contractURI();
    console.log("Collection URI:", uriCollection);

    const isERC721 = await contract.supportsInterface("0x80ac58cd");
    const isERC721Metadata = await contract.supportsInterface("0x5b5e139f");
    const isERC1155 = await contract.supportsInterface("0xd9b67a26");

    console.log("Interface support:", {
      isERC721,
      isERC721Metadata,
      isERC1155,
    });

    const tokenIds = await contract.tokensOfOwner(owner);

    const tokens: Array<{ tokenId: number; uri: string }> = [];
    await Promise.all(
      tokenIds.map(async (tokenId: bigint) => {
        try {
          const uri = await contract.tokenURI(tokenId);
          tokens.push({
            tokenId: Number(tokenId),
            uri,
          });
        } catch (error) {
          console.error(`Error getting URI for token ${tokenId}:`, error);
        }
      })
    );

    const response: Test721ResponseDto = {
      tokens,
      contractURI: uriCollection,
      supportsInterfaces: {
        isERC721,
        isERC721Metadata,
        isERC1155,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in test-721 API:", error);
    return NextResponse.json(
      { error: "Failed to test ERC721 contract" },
      { status: 500 }
    );
  }
}
