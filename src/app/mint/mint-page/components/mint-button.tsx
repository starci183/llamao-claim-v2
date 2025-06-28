"use client";

import axiosClient from "@/service/axios-client";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetworkCore,
  useAppKitProvider,
  type Provider,
} from "@reown/appkit/react";
import { BrowserProvider, JsonRpcSigner, formatEther } from "ethers";
import { useEffect, useState } from "react";

export default function MintButton() {
  const { walletProvider } = useAppKitProvider<Provider>("eip155");
  const { chainId } = useAppKitNetworkCore();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletProvider || !address) return;
      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = new JsonRpcSigner(provider, address);
      const rawBalance = await signer.provider.getBalance(address);
      setBalance(formatEther(rawBalance));
    };

    fetchBalance();
  }, [walletProvider, address, chainId]);

  const handleMintNFT = async () => {
    if (!address) return;
    try {
      const { data } = await axiosClient.post("/mint-nft", {
        chain: "monad-testnet",
        collectionId: "0x913bf9751fe18762b0fd6771edd512c7137e42bb",
        wallet: {
          address,
          chain: "monad-testnet",
        },
        nftAmount: 1,
        kind: "public",
        protocol: "ERC1155",
        tokenId: 0,
      });

      const provider = new BrowserProvider(walletProvider, chainId);
      const signer = new JsonRpcSigner(provider, address);

      try {
        const tx = await signer.sendTransaction({
          to: data.steps[0].params.to,
          from: data.steps[0].params.from,
          data: data.steps[0].params.data,
          value: BigInt(data.steps[0].params.value),
        });

        console.log("Transaction hash:", tx.hash);
      } catch (signError) {
        if (
          (signError as Error).message?.includes("user rejected") ||
          (signError as Error).message?.includes("User rejected")
        ) {
          console.log("User rejected the transaction");
        } else {
          console.error("Transaction signing failed:", signError);
        }
      }
    } catch (error) {
      console.error("Mint failed:", error);
    }
  };

  return (
    <div>
      <h1>Reown AppKit Mint Demo</h1>

      {isConnected ? (
        <>
          <p>
            <strong>Connected address:</strong> {address}
          </p>
          <p>
            <strong>Balance:</strong> {balance} MON
          </p>
        </>
      ) : (
        <button onClick={() => open()}>Connect Wallet</button>
      )}

      <button onClick={handleMintNFT} className="mt-4">
        Mint NFT
      </button>
    </div>
  );
}
