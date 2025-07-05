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

const CONTRACT_ADDRESS = "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB";
const CHAIN_ID = 10143;

type ContractData = {
    contract?: ethers.Contract;
    contractAddress?: string;
    contractURI?: string;
    tokenURI?: string;
    balance?: string;
    ipfsID?: string;
};

export const useContract = () => {
    const { address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<Provider>("eip155");
    const [data, setData] = useState<ContractData>({});

    useEffect(() => {
        let isMounted = true;

        const fetchContractData = async () => {
            if (!walletProvider || !address) return;

            try {
                const provider = new BrowserProvider(walletProvider, CHAIN_ID);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, erc1155Abi, provider);

                const [contractURI, tokenURI, balance] = await Promise.all([
                    contract.contractURI(),
                    contract.uri(0),
                    contract.balanceOf(address, 0),
                ]);

                if (isMounted) {
                    setData({
                        contract,
                        contractAddress: CONTRACT_ADDRESS,
                        contractURI,
                        tokenURI,
                        balance: balance.toString(),
                        ipfsID: tokenURI.split("/").pop(),
                    });
                }
            } catch (error) {
                console.error("Error fetching contract data:", error);
            }
        };

        fetchContractData();
        return () => {
            isMounted = false;
        };
    }, [walletProvider, address]);

    return data;
};
