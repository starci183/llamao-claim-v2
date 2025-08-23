import { erc1155Abi } from "@/abi/erc-1155";
import {
    Provider,
    useAppKitAccount,
    useAppKitProvider,
} from "@reown/appkit/react";
import { BrowserProvider, ethers } from "ethers";
import { useEffect, useState } from "react";

export type NftMetadata = {
    image: string;
    name: string;
    description: string;
};

// const CONTRACT_ADDRESS = "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB";
const CHAIN_ID = 10143;

type ContractData = {
    contract?: ethers.Contract;
    contractAddress?: string;
    contractURI?: string;
    tokenURI?: string;
    balance?: string;
    ipfsID?: string;
    totalMinted?: string;
};

export const useContract = (
    contractAddress: string,
) => {
    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    const [data, setData] = useState<ContractData>({});

    useEffect(() => {
        let isMounted = true;

        const fetchContractData = async () => {
            if (!walletProvider || !address) return;

            try {
                const provider = new BrowserProvider(walletProvider, CHAIN_ID);
                const contract = new ethers.Contract(contractAddress, erc1155Abi, provider);

                // Call contract functions individually with error handling
                const results = await Promise.allSettled([
                    contract.contractURI().catch(() => ""),
                    contract.uri(0).catch(() => ""),
                    contract.balanceOf(address, 0).catch(() => BigInt(0)),
                    contract.totalSupply(0).catch(() => BigInt(0))
                ]);

                const contractURI = results[0].status === 'fulfilled' ? results[0].value : "";
                const tokenURI = results[1].status === 'fulfilled' ? results[1].value : "";
                const balance = results[2].status === 'fulfilled' ? results[2].value : BigInt(0);
                const totalSupply = results[3].status === 'fulfilled' ? results[3].value : BigInt(0);


                if (isMounted) {
                    setData({
                        contract,
                        contractAddress: contractAddress,
                        contractURI,
                        tokenURI,
                        balance: balance.toString(),
                        ipfsID: tokenURI ? tokenURI.split("/").pop() : "",
                        totalMinted: totalSupply.toString(),
                    });
                }
            } catch (error) {
                console.error(`Error fetching contract data for ${contractAddress}:`, error);
                // Set fallback data even on error
                if (isMounted) {
                    setData({
                        contract: undefined,
                        contractAddress: contractAddress,
                        contractURI: "",
                        tokenURI: "",
                        balance: "0",
                        ipfsID: "",
                        totalMinted: "0",
                    });
                }
            }
        };

        fetchContractData();
        return () => {
            isMounted = false;
        };
    }, [walletProvider, address]);

    return data;
};
