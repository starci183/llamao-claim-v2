import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { erc20Abi } from "@/lib/abis";
import type { ERC20BalanceDto, TokenBalanceResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ERC20BalanceDto = await request.json();
    const { contractAddress, address } = body;

    if (!contractAddress || !address) {
      return NextResponse.json(
        { error: "Contract address and address are required" },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(
      "https://testnet-rpc.monad.xyz",
      10143
    );

    const contract = new ethers.Contract(contractAddress, erc20Abi, provider);

    // Get token info
    const [balance, decimals] = await Promise.all([
      contract.balanceOf(address),
      contract.decimals(),
    ]);

    const formattedBalance = ethers.formatUnits(balance, decimals);

    const response: TokenBalanceResponse = {
      address,
      balance: balance.toString(),
      decimals: Number(decimals),
      formattedBalance,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error getting ERC20 balance:", error);
    return NextResponse.json(
      { error: "Failed to get token balance" },
      { status: 500 }
    );
  }
}
