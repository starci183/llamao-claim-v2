import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { erc20Abi } from "../../../../lib/abis";
import type { ERC20TransferDto, TransactionResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ERC20TransferDto = await request.json();
    const { contractAddress, to, amount, fromAddress } = body;

    if (!contractAddress || !to || !amount) {
      return NextResponse.json(
        { error: "Contract address, to address, and amount are required" },
        { status: 400 }
      );
    }

    // Note: This is a read-only operation for gas estimation
    // Actual transaction requires user's wallet signature
    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    const contract = new ethers.Contract(contractAddress, erc20Abi, provider);

    // Get token decimals for proper formatting
    const decimals = await contract.decimals();
    const amountInWei = ethers.parseUnits(amount, decimals);

    // Estimate gas for the transaction
    let gasEstimate: bigint;
    if (fromAddress) {
      // For transferFrom, we need to estimate gas differently
      gasEstimate = await contract.transferFrom.estimateGas(
        fromAddress,
        to,
        amountInWei
      );
    } else {
      // For regular transfer
      gasEstimate = await contract.transfer.estimateGas(to, amountInWei);
    }

    const response: TransactionResponse = {
      success: true,
      gasUsed: gasEstimate.toString(),
      error: undefined,
    };

    return NextResponse.json({
      message: "Transfer prepared successfully",
      gasEstimate: gasEstimate.toString(),
      amountInWei: amountInWei.toString(),
      response,
    });
  } catch (error) {
    console.error("Error preparing ERC20 transfer:", error);
    return NextResponse.json(
      { error: "Failed to prepare token transfer" },
      { status: 500 }
    );
  }
}
