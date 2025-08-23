/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { erc1155Abi } from "@/abi/erc-1155";
import {
    Provider,
    useAppKitAccount,
    useAppKitProvider,
} from "@reown/appkit/react";
import { BrowserProvider, ethers } from "ethers";
import { useEffect, useMemo, useRef, useState } from "react";

export type NftMetadata = {
    image: string;
    name: string;
    description: string;
};

const DEFAULT_CHAIN_ID = 10143;

export type ContractData = {
    contract?: ethers.Contract;
    contractAddress?: string;
    contractURI?: string;
    tokenURI?: string;
    balance?: string;       // user's balance of tokenId
    ipfsID?: string;
    totalMinted?: string;   // totalSupply for tokenId
    metadata?: NftMetadata | null;
};

type UseContractsOptions = {
    chainId?: number;
    tokenId?: number | bigint; // default 0
};

function normalizeIPFS(url: string | undefined) {
    if (!url) return url;
    if (url.startsWith("ipfs://")) {
        return `https://ipfs.io/ipfs/${url.replace("ipfs://", "")}`;
    }
    return url;
}

export function useContracts(
    addresses: readonly string[] | undefined,
    opts: UseContractsOptions = {}
) {
    const { address: userAddress } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<Provider>("eip155");

    const [rows, setRows] = useState<ContractData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const tokenIdBig = useMemo<bigint>(() => {
        const t = opts.tokenId ?? 0;
        return typeof t === "bigint" ? t : BigInt(t);
    }, [opts.tokenId]);

    const chainId = opts.chainId ?? DEFAULT_CHAIN_ID;

    const stableAddrs = useMemo(
        () => (addresses ? [...addresses] : []),
        [addresses]
    );

    const refreshRef = useRef<() => void>(() => { });

    useEffect(() => {
        let disposed = false;

        async function load() {
            if (!walletProvider || !userAddress || stableAddrs.length === 0) {
                setRows([]);
                return;
            }

            setLoading(true);
            setError(undefined);

            try {
                const provider = new BrowserProvider(walletProvider, chainId);

                const settled = await Promise.allSettled(
                    stableAddrs.map(async (addr) => {
                        const contract = new ethers.Contract(addr, erc1155Abi, provider);

                        // Call contract functions individually with error handling
                        const results = await Promise.allSettled([
                            contract.contractURI().catch(() => ""),
                            contract.uri(tokenIdBig).catch(() => ""),
                            contract.balanceOf(userAddress, tokenIdBig).catch(() => BigInt(0)),
                            contract.totalSupply(tokenIdBig).catch(() => BigInt(0)),
                        ]);

                        const contractURI = results[0].status === 'fulfilled' ? results[0].value : "";
                        const tokenURI = results[1].status === 'fulfilled' ? results[1].value : "";
                        const balance = results[2].status === 'fulfilled' ? results[2].value : BigInt(0);
                        const totalSupply = results[3].status === 'fulfilled' ? results[3].value : BigInt(0);

                        // Fetch metadata (best-effort)
                        let metadata: NftMetadata | null = null;
                        const metaUrl = normalizeIPFS(tokenURI);
                        try {
                            const res = await fetch(metaUrl!);
                            if (res.ok) metadata = (await res.json()) as NftMetadata;
                        } catch {
                            // ignore metadata fetch errors
                        }

                        return {
                            contract,
                            contractAddress: addr,
                            contractURI,
                            tokenURI,
                            balance: balance.toString(),
                            ipfsID: tokenURI ? tokenURI.split("/").pop() : "",
                            totalMinted: totalSupply.toString(),
                            metadata,
                        } as ContractData;
                    })
                );

                const ok = settled
                    .filter((s): s is PromiseFulfilledResult<ContractData> => s.status === "fulfilled")
                    .map((s) => s.value);

                if (!disposed) {
                    setRows(ok);
                    const rejected = settled.filter((s) => s.status === "rejected");
                    if (rejected.length && ok.length === 0) {
                        setError("Failed to load all contracts.");
                    }
                }
            } catch (e: any) {
                if (!disposed) setError(e?.message ?? "Unknown error");
            } finally {
                if (!disposed) setLoading(false);
            }
        }

        refreshRef.current = load;
        load();
        return () => {
            disposed = true;
        };
    }, [walletProvider, userAddress, chainId, tokenIdBig, JSON.stringify(stableAddrs)]);

    const refresh = () => refreshRef.current();

    return { rows, loading, error, refresh };
}

/**
 * Backward-compatible single-contract wrapper.
 * Keeps your existing API working: useContract("0x...")
 */
export function useContract(contractAddress?: string, opts?: UseContractsOptions) {
    const { rows, loading, error, refresh } = useContracts(
        contractAddress ? [contractAddress] : [],
        opts
    );
    const first = rows[0] ?? {};
    return { ...first, loading, error, refresh };
}
