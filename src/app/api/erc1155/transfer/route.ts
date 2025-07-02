import { ethers } from "ethers";
import { erc1155Abi } from "../../../../lib/abis";
import type { ERC1155TransferDto, TransactionResponse } from "@/types";

export async function POST(request: any) {
  try {
    const body: ERC1155TransferDto = await request.json();
    const { contractAddress, from, to, id, amount, data = "0x" } = body;

    if (!contractAddress || !from || !to || id === undefined || !amount) {
      return json(
        { error: "Contract address, from, to, id, and amount are required" },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    const contract = new ethers.Contract(contractAddress, erc1155Abi, provider);

    // Check balance
    const balance = await contract.balanceOf(from, id);
    console.log(`Balance of token ID ${id} for ${from}:`, balance.toString());

    if (BigInt(balance) < BigInt(amount)) {
      return NextResponse.json(
        { error: "Insufficient token balance" },
        { status: 400 }
      );
    }

    // Get token URI
    const uri = await contract.uri(id).catch(() => "N/A");

    // Estimate gas for the transaction
    const gasEstimate = await contract.safeTransferFrom.estimateGas(
      from,
      to,
      id,
      amount,
      data
    );

    const response: TransactionResponse = {
      success: true,
      gasUsed: gasEstimate.toString(),
    };

    return NextResponse.json({
      message: "ERC1155 transfer prepared successfully",
      tokenInfo: {
        id,
        amount,
        balance: balance.toString(),
        uri,
      },
      gasEstimate: gasEstimate.toString(),
      response,
    });
  } catch (error) {
    console.error("Error preparing ERC1155 transfer:", error);
    return NextResponse.json(
      { error: "Failed to prepare token transfer" },
      { status: 500 }
    );
  }
}
