"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";

interface TokenOperationsProps {
  className?: string;
}

type TokenType = "ERC20" | "ERC721" | "ERC1155" | "ERC777";

export default function TokenOperations({
  className = "",
}: TokenOperationsProps) {
  const [activeTab, setActiveTab] = useState<TokenType>("ERC20");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [contractAddress, setContractAddress] = useState("");
  const [address, setAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenId, setTokenId] = useState("");

  const clearResults = () => {
    setResults("");
    setError(null);
  };

  const makeApiCall = async (
    endpoint: string,
    payload: Record<string, unknown>
  ) => {
    setLoading(true);
    clearResults();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResults(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "API call failed");
    } finally {
      setLoading(false);
    }
  };

  const checkERC20Balance = () => {
    if (!contractAddress || !address) {
      setError("Contract address and address are required");
      return;
    }
    makeApiCall("/api/erc20/balance", { contractAddress, address });
  };

  const prepareERC20Transfer = () => {
    if (!contractAddress || !toAddress || !amount) {
      setError("Contract address, to address, and amount are required");
      return;
    }
    makeApiCall("/api/erc20/transfer", {
      contractAddress,
      to: toAddress,
      amount,
    });
  };

  const getERC721Tokens = () => {
    if (!contractAddress || !address) {
      setError("Contract address and owner address are required");
      return;
    }
    makeApiCall("/api/erc721/tokens", { contractAddress, owner: address });
  };

  const prepareERC721Transfer = () => {
    if (!contractAddress || !address || !toAddress || !tokenId) {
      setError("All fields are required for ERC721 transfer");
      return;
    }
    makeApiCall("/api/erc721/transfer", {
      contractAddress,
      from: address,
      to: toAddress,
      tokenId: parseInt(tokenId),
    });
  };

  const prepareERC1155Transfer = () => {
    if (!contractAddress || !address || !toAddress || !tokenId || !amount) {
      setError("All fields are required for ERC1155 transfer");
      return;
    }
    makeApiCall("/api/erc1155/transfer", {
      contractAddress,
      from: address,
      to: toAddress,
      id: parseInt(tokenId),
      amount,
    });
  };

  const prepareERC777Send = () => {
    if (!contractAddress || !toAddress || !amount) {
      setError("Contract address, to address, and amount are required");
      return;
    }
    makeApiCall("/api/erc777/send", { contractAddress, to: toAddress, amount });
  };

  const renderTabContent = () => {
    const inputClass = "p-2 border rounded w-full";

    switch (activeTab) {
      case "ERC20":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Contract Address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="To Address (for transfer)"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Amount (for transfer)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={checkERC20Balance}
                disabled={loading}
                intent="gradient"
              >
                Check Balance
              </Button>
              <Button
                onClick={prepareERC20Transfer}
                disabled={loading}
                intent="secondary"
              >
                Prepare Transfer
              </Button>
            </div>
          </div>
        );

      case "ERC721":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Contract Address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Owner Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="To Address (for transfer)"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                placeholder="Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={getERC721Tokens}
                disabled={loading}
                intent="gradient"
              >
                Get Tokens
              </Button>
              <Button
                onClick={prepareERC721Transfer}
                disabled={loading}
                intent="secondary"
              >
                Prepare Transfer
              </Button>
            </div>
          </div>
        );

      case "ERC1155":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Contract Address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="From Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="To Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                placeholder="Token ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={prepareERC1155Transfer}
                disabled={loading}
                intent="gradient"
              >
                Prepare Transfer
              </Button>
            </div>
          </div>
        );

      case "ERC777":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Contract Address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="To Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={prepareERC777Send}
                disabled={loading}
                intent="gradient"
              >
                Prepare Send
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-6 p-4 ${className}`}>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Token Operations Dashboard</h2>
        <p className="text-sm text-gray-600 mb-6">
          Interact with ERC-20, ERC-721, ERC-1155, and ERC-777 tokens on Monad
          Testnet
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {(["ERC20", "ERC721", "ERC1155", "ERC777"] as TokenType[]).map(
          (tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              intent={activeTab === tab ? "gradient" : "secondary"}
              className="min-w-[80px]"
            >
              {tab}
            </Button>
          )
        )}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">{activeTab} Operations</h3>
        {renderTabContent()}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Results Display */}
      {results && (
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Results</h3>
          <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto max-h-96">
            {results}
          </pre>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2">Processing...</p>
        </div>
      )}
    </div>
  );
}
