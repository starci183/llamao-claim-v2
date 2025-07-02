import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { erc1155Abi } from "@/lib/abis";
import type { Test1155RequestDto, Test1155ResponseDto } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: Test1155RequestDto = await request.json();

    const tokenId = body?.tokenId || 0;
    const owner = body?.owner || "0x80C34fC701De7caF7036Db13011DC843Aa76d73c";

    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    // Initialize contract
    const contract = new ethers.Contract(
      "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB",
      erc1155Abi,
      provider
    );

    const uriCollection = await contract.contractURI();
    console.log("Collection URI:", uriCollection);

    // Call view functions
    const [rawUri, rawBal] = await Promise.all([
      contract.uri(tokenId),
      contract.balanceOf(owner, tokenId),
    ]);

    const isERC721 = await contract.supportsInterface("0x80ac58cd");
    const isERC721Metadata = await contract.supportsInterface("0x5b5e139f");
    const isERC1155 = await contract.supportsInterface("0xd9b67a26");

    console.log("Interface support:", {
      isERC721,
      isERC721Metadata,
      isERC1155,
    });

    const response: Test1155ResponseDto = {
      uri: rawUri,
      balance: rawBal.toString(),
      contractURI: uriCollection,
      supportsInterfaces: {
        isERC721,
        isERC721Metadata,
        isERC1155,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in test-1155 API:", error);
    return NextResponse.json(
      { error: "Failed to test ERC1155 contract" },
      { status: 500 }
    );
  }
}
