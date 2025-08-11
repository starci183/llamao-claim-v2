"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";
import type {
  Test721RequestDto,
  Test721ResponseDto,
  Test1155RequestDto,
  Test1155ResponseDto,
} from "@/types";

interface ContractTestingProps {
  className?: string;
}

export default function ContractTesting({
  className = "",
}: ContractTestingProps) {
  const [loading, setLoading] = useState(false);
  const [erc721Results, setErc721Results] = useState<Test721ResponseDto | null>(
    null
  );
  const [erc1155Results, setErc1155Results] =
    useState<Test1155ResponseDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testERC721 = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload: Test721RequestDto = {
        owner: "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3",
      };

      const data = (await fetch("/api/test-721", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json())) as Test721ResponseDto;
      setErc721Results(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to test ERC-721 contract";
      setError(errorMessage);
      console.error("ERC-721 Test Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const testERC1155 = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload: Test1155RequestDto = {
        owner: "0x80C34fC701De7caF7036Db13011DC843Aa76d73c",
        tokenId: 0,
      };

      const data = (await fetch("/api/test-1155", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json())) as Test1155ResponseDto;
      setErc1155Results(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to test ERC-1155 contract";
      setError(errorMessage);
      console.error("ERC-1155 Test Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-6 p-4 ${className}`}>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Smart Contract Testing</h2>
        <p className="text-sm text-gray-600 mb-6">
          Test ERC-721 and ERC-1155 contracts on Monad Testnet
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={testERC721}
          disabled={loading}
          intent="gradient"
          className="min-w-[150px]"
        >
          {loading ? "Testing..." : "Test ERC-721"}
        </Button>

        <Button
          onClick={testERC1155}
          disabled={loading}
          intent="gradient"
          className="min-w-[150px]"
        >
          {loading ? "Testing..." : "Test ERC-1155"}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {erc721Results && (
        <div className="bg-white text-black border border-gray-300 rounded-lg p-4 w-full">
          <h3 className="text-lg font-semibold mb-3">ERC-721 Results</h3>
          <div className="space-y-2 text-sm">
            <p className="break-words">
              <strong>Contract URI:</strong>
              <span className="block mt-1 text-xs font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                {erc721Results.contractURI}
              </span>
            </p>
            <p>
              <strong>Tokens Found:</strong> {erc721Results.tokens.length}
            </p>
            {erc721Results.supportsInterfaces && (
              <div>
                <strong>Interface Support:</strong>
                <ul className="ml-4 list-disc">
                  <li>
                    ERC-721:{" "}
                    {erc721Results.supportsInterfaces.isERC721 ? "✅" : "❌"}
                  </li>
                  <li>
                    ERC-721 Metadata:{" "}
                    {erc721Results.supportsInterfaces.isERC721Metadata
                      ? "✅"
                      : "❌"}
                  </li>
                  <li>
                    ERC-1155:{" "}
                    {erc721Results.supportsInterfaces.isERC1155 ? "✅" : "❌"}
                  </li>
                </ul>
              </div>
            )}
            {erc721Results.tokens.length > 0 && (
              <div>
                <strong>Tokens:</strong>
                <div className="ml-4 space-y-1">
                  {erc721Results.tokens.slice(0, 5).map((token) => (
                    <div key={token.tokenId} className="text-xs break-words">
                      <span className="font-semibold">
                        Token #{token.tokenId}:
                      </span>
                      <span className="block mt-1 font-mono bg-gray-100 p-1 rounded text-xs overflow-x-auto">
                        {token.uri}
                      </span>
                    </div>
                  ))}
                  {erc721Results.tokens.length > 5 && (
                    <div className="text-xs text-gray-500">
                      ... and {erc721Results.tokens.length - 5} more tokens
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {erc1155Results && (
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">ERC-1155 Results</h3>
          <div className="space-y-2 text-sm">
            <p className="break-words">
              <strong>Contract URI:</strong>
              <span className="block mt-1 text-xs font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                {erc1155Results.contractURI}
              </span>
            </p>
            <p className="break-words">
              <strong>Token URI:</strong>
              <span className="block mt-1 text-xs font-mono bg-gray-100 p-2 rounded overflow-x-auto">
                {erc1155Results.uri}
              </span>
            </p>
            <p>
              <strong>Balance:</strong> {erc1155Results.balance}
            </p>
            {erc1155Results.supportsInterfaces && (
              <div>
                <strong>Interface Support:</strong>
                <ul className="ml-4 list-disc">
                  <li>
                    ERC-721:{" "}
                    {erc1155Results.supportsInterfaces.isERC721 ? "✅" : "❌"}
                  </li>
                  <li>
                    ERC-721 Metadata:{" "}
                    {erc1155Results.supportsInterfaces.isERC721Metadata
                      ? "✅"
                      : "❌"}
                  </li>
                  <li>
                    ERC-1155:{" "}
                    {erc1155Results.supportsInterfaces.isERC1155 ? "✅" : "❌"}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
