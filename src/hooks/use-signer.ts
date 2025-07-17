"use client";

import {
    useAppKitAccount,
    useAppKitNetworkCore,
    useAppKitProvider,
    type Provider,
} from "@reown/appkit/react";
import { BrowserProvider, JsonRpcSigner, formatEther } from "ethers";
import { useCallback, useEffect, useState } from "react";

export function useSigner() {
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    const { chainId } = useAppKitNetworkCore();
    const { address, isConnected } = useAppKitAccount();
    const [balance, setBalance] = useState<string>("");
    const [loading, setLoading] = useState(false);

    // Create signer instance
    const getSigner = useCallback((): JsonRpcSigner | null => {
        if (!walletProvider || !address || !isConnected) return null;

        try {
            const provider = new BrowserProvider(walletProvider, chainId);
            return new JsonRpcSigner(provider, address);
        } catch (error) {
            console.error("Error creating signer:", error);
            return null;
        }
    }, [walletProvider, address, chainId, isConnected]);

    // Get provider instance
    const getProvider = useCallback((): BrowserProvider | null => {
        if (!walletProvider) return null;

        try {
            return new BrowserProvider(walletProvider, chainId);
        } catch (error) {
            console.error("Error creating provider:", error);
            return null;
        }
    }, [walletProvider, chainId]);

    // Fetch balance
    const fetchBalance = useCallback(async (): Promise<string | null> => {
        try {
            if (!walletProvider || !address) return null;

            const provider = getProvider();
            if (!provider) return null;

            const rawBalance = await provider.getBalance(address);
            const formattedBalance = formatEther(rawBalance);
            setBalance(formattedBalance);
            return formattedBalance;
        } catch (error) {
            console.error("Error fetching balance:", error);
            return null;
        }
    }, [walletProvider, address, getProvider]);

    // Send transaction
    const sendTransaction = useCallback(async (transactionParams: {
        to: string;
        from: string;
        data: string;
        value: bigint;
    }) => {
        const signer = getSigner();
        if (!signer) {
            throw new Error("Signer not available");
        }

        setLoading(true);
        try {
            const tx = await signer.sendTransaction(transactionParams);
            return tx;
        } finally {
            setLoading(false);
        }
    }, [getSigner]);

    // Auto-fetch balance when dependencies change
    useEffect(() => {
        if (isConnected && address) {
            fetchBalance();
        }
    }, [isConnected, address, fetchBalance]);

    return {
        signer: getSigner(),
        provider: getProvider(),
        balance,
        address,
        isConnected,
        loading,
        fetchBalance,
        sendTransaction,
    };
}
