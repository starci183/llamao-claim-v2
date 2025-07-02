import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { erc777Abi } from "@/lib/abis";
import type { ERC777SendDto, TransactionResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ERC777SendDto = await request.json();
    const { contractAddress, to, amount, data = "0x" } = body;

    if (!contractAddress || !to || !amount) {
      return NextResponse.json(
        { error: "Contract address, to address, and amount are required" },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    const contract = new ethers.Contract(contractAddress, erc777Abi, provider);

    // Get token info
    const [name, symbol, granularity] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.granularity(),
    ]);

    // Convert amount to proper units (ERC777 doesn't have decimals, uses granularity)
    const amountInWei = ethers.parseEther(amount); // Assuming 18 decimals for simplicity

    // Check if amount is valid according to granularity
    if (amountInWei % granularity !== BigInt(0)) {
      return NextResponse.json(
        {
          error: `Amount must be a multiple of granularity (${granularity.toString()})`,
        },
        { status: 400 }
      );
    }

    // Estimate gas for the transaction
    const gasEstimate = await contract.send.estimateGas(to, amountInWei, data);

    const response: TransactionResponse = {
      success: true,
      gasUsed: gasEstimate.toString(),
    };

    return NextResponse.json({
      message: "ERC777 send prepared successfully",
      tokenInfo: {
        name,
        symbol,
        granularity: granularity.toString(),
      },
      amountInWei: amountInWei.toString(),
      gasEstimate: gasEstimate.toString(),
      response,
    });
  } catch (error) {
    console.error("Error preparing ERC777 send:", error);
    return NextResponse.json(
      { error: "Failed to prepare token send" },
      { status: 500 }
    );
  }
}
