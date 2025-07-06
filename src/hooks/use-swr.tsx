import axios from "axios";
import useSWR from "swr";

export type UseERC20BalanceParams = {
  contractAddress: string;
  address: string;
  enabled?: boolean;
};

export type ERC20Transfer = {
  from: string;
  to: string;
  value: string;
  txHash: string;
  timestamp: string;
};

export type ERC721Token = {
  tokenId: string;
  uri: string;
};

export type ERC721Transfer = {
  from: string;
  to: string;
  tokenId: string;
  txHash: string;
  timestamp: string;
};

export type ERC777Token = {
  tokenId: string;
  uri: string;
};

export type ERC777Transfer = {
  from: string;
  to: string;
  tokenId: string;
  txHash: string;
  timestamp: string;
};

export type ERC1155Transfer = {
  from: string;
  to: string;
  id: string;
  value: string;
  txHash: string;
  timestamp: string;
};

export function useERC20Balance({
  contractAddress,
  address,
  enabled = true,
}: UseERC20BalanceParams) {
  const shouldFetch = Boolean(contractAddress && address && enabled);
  const { data, error, isLoading, mutate } = useSWR<{
    balance: string;
    decimals: number;
    formattedBalance: string;
  }>(
    shouldFetch ? ["erc20-balance", contractAddress, address] : null,
    async () => {
      const res = await axios.post("/api/erc20/balance", {
        contractAddress,
        address,
      });
      return res.data;
    }
  );
  return { data, isLoading, error, refetch: mutate };
}

export function useERC20Tranfers({
  contractAddress,
  address,
  enabled = true,
}: UseERC20BalanceParams) {
  const shouldFetch = Boolean(contractAddress && address && enabled);
  const { data, error, isLoading, mutate } = useSWR<ERC20Transfer[]>(
    shouldFetch ? ["erc20-transfers", contractAddress, address] : null,
    async () => {
      const res = await axios.post("/api/erc20/transfers", {
        contractAddress,
        address,
      });
      return res.data;
    }
  );
  return { data, isLoading, error, refetch: mutate };
}

export function useERC721Tokens({
  contractAddress,
  address,
  enabled = true,
}: UseERC20BalanceParams) {
  const shouldFetch = Boolean(contractAddress && address && enabled);
  const { data, error, isLoading, mutate } = useSWR<ERC721Token[]>(
    shouldFetch ? ["erc721-tokens", contractAddress, address] : null,
    async () => {
      const res = await axios.post("/api/erc721/tokens", {
        contractAddress,
        address,
      });
      return res.data;
    }
  );
  return { data, isLoading, error, refetch: mutate };
}

export function useERC721Transfers({
  contractAddress,
  address,
  enabled = true,
}: UseERC20BalanceParams) {
  const shouldFetch = Boolean(contractAddress && address && enabled);
  const { data, error, isLoading, mutate } = useSWR<ERC721Transfer[]>(
    shouldFetch ? ["erc721-transfers", contractAddress, address] : null,
    async () => {
      const res = await axios.post("/api/erc721/transfers", {
        contractAddress,
        address,
      });
      return res.data;
    }
  );
  return { data, isLoading, error, refetch: mutate };
}

export function useERC777Tokens({
  contractAddress,
  address,
  enabled = true,
}: UseERC20BalanceParams) {
  const shouldFetch = Boolean(contractAddress && address && enabled);
  const { data, error, isLoading, mutate } = useSWR<ERC777Token[]>(
    shouldFetch ? ["erc777-tokens", contractAddress, address] : null,
    async () => {
      const res = await axios.post("/api/erc777/tokens", {
        contractAddress,
        address,
      });
      return res.data;
    }
  );
  return { data, isLoading, error, refetch: mutate };
}

export function useERC777Transfers({
  contractAddress,
  address,
  enabled = true,
}: UseERC20BalanceParams) {
  const shouldFetch = Boolean(contractAddress && address && enabled);
  const { data, error, isLoading, mutate } = useSWR<ERC777Transfer[]>(
    shouldFetch ? ["erc777-transfers", contractAddress, address] : null,
    async () => {
      const res = await axios.post("/api/erc777/transfers", {
        contractAddress,
        address,
      });
      return res.data;
    }
  );
  return { data, isLoading, error, refetch: mutate };
}

export function useERC1155Transfers({
  contractAddress,
  address,
  enabled = true,
}: UseERC20BalanceParams) {
  const shouldFetch = Boolean(contractAddress && address && enabled);
  const { data, error, isLoading, mutate } = useSWR<ERC1155Transfer[]>(
    shouldFetch ? ["erc1155-transfers", contractAddress, address] : null,
    async () => {
      const res = await axios.post("/api/erc1155/transfers", {
        contractAddress,
        address,
      });
      return res.data;
    }
  );
  return { data, isLoading, error, refetch: mutate };
}

export function useSWRWithAxios<T>(
  key: string,
  fetcher: () => Promise<T>,
  options = {}
) {
  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, {
    ...options,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    refetch: mutate,
  };
}
