/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useContracts } from "@/hooks/use-contracts";
import { cn } from "@/lib/utils";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ShowcaseCard } from "./showcase-card";
import ShowcasePagination from "./showcase-pagination";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { MONAD_CONTRACT_ADDRESSES } from "@/contance";

interface ShowcaseItem {
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
}

interface ShowcaseTableProps {
  className?: string;
  wrapperClassName?: string;
  items?: ShowcaseItem[]; // (optional) legacy/manual items, still supported
  category?: string;
  loading?: boolean; // external loading if you still need it
  itemsPerPage?: number;

  /** NEW: one or more ERC-1155 contract addresses to read */
  contracts?: readonly string[];

  /** NEW: show only contracts where user owns balance > 0 (default: true) */
  showOnlyOwned?: boolean;

  /** NEW: tokenId to read (default 0) */
  tokenId?: number | bigint;

  /** NEW: chainId override (default 10143) */
  chainId?: number;
}

export default function ShowcaseTable({
  className,
  wrapperClassName = "w-full",
  items = [],
  category,
  loading: externalLoading = false,
  itemsPerPage = 6,
  contracts = MONAD_CONTRACT_ADDRESSES,
  showOnlyOwned = true,
  tokenId = 0,
  chainId,
}: ShowcaseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // --- Load many contracts at once ---
  const { rows, loading: contractsLoading } = useContracts(contracts, {
    tokenId,
    chainId,
  });

  // Owned filter (ERC-1155 balance > 0)
  const ownedRows = useMemo(
    () => rows.filter((r) => r.balance && r.balance !== "0"),
    [rows]
  );

  // What we actually display (owned vs all)
  const displayRows = showOnlyOwned ? ownedRows : rows;

  // Legacy category filter (if you still use items[])
  const filteredItems = useMemo(() => {
    return category ? items.filter((i) => i.category === category) : items;
  }, [items, category]);

  const totalPages = Math.ceil(displayRows.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, showOnlyOwned, contracts.join(",")]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Lock container height while loading (Option A) ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [lockedMinH, setLockedMinH] = useState<number | null>(null);
  const loading = externalLoading || contractsLoading;

  useLayoutEffect(() => {
    if (loading && containerRef.current) {
      setLockedMinH(containerRef.current.offsetHeight);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && lockedMinH != null) {
      const t = setTimeout(() => setLockedMinH(null), 300);
      return () => clearTimeout(t);
    }
  }, [loading, lockedMinH]);
  // ------------------------------------------------------

  // Fixed skeleton sizes
  const imageWidth = 140;
  const imageHeight = 140;
  const fixedSizeStyle = {
    width: imageWidth,
    height: imageHeight,
    aspectRatio: `${imageWidth} / ${imageHeight}`,
  };

  // Pagination slice
  const start = (currentPage - 1) * itemsPerPage;
  const pageRows = displayRows.slice(start, start + itemsPerPage);

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full space-y-4 md:min-w-[550px] md:min-h-[200px]",
        wrapperClassName
      )}
      style={lockedMinH ? { minHeight: lockedMinH } : undefined}
    >
      {loading ? (
        // ----- SKELETON GRID -----
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: Math.max(contracts.length, 3) }).map(
            (_, index) => (
              <div
                key={`showcase-skeleton-${index}`}
                className={cn(
                  "flex flex-col items-center justify-between box-shadow-showcase-card bg-[#C3C3C3] overflow-hidden p-2 space-y-2",
                  wrapperClassName
                )}
              >
                <div className="relative bg-gray-200" style={fixedSizeStyle}>
                  <Skeleton className="w-full h-full box-shadow-showcase-item" />
                </div>
                <div className="p-1.5 w-full box-shadow-showcase-item">
                  <Skeleton className="h-6 w-full mx-auto" />
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        // ----- CONTENT AFTER LOADING -----
        <>
          {pageRows.length === 0 ? (
            <div className={cn("w-full", wrapperClassName)}>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No items found
                  </h3>
                  <p className="text-sm text-gray-500">
                    {showOnlyOwned
                      ? "You don’t own any of these NFTs yet."
                      : "No showcase items available."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                className
              )}
            >
              {pageRows.map((row) => (
                <ShowcaseCard
                  key={row.contractAddress}
                  onClick={() => {
                    if (!row.contractAddress) return;
                    window.open(
                      `https://magiceden.io/mint-terminal/monad-testnet/${row.contractAddress}`,
                      "_blank"
                    );
                  }}
                  imgSrc={row.metadata?.image}
                  text={row.metadata?.name ?? "NFT"}
                  state="nft"
                  description={
                    row.balance && row.balance !== "0" ? "owned" : "—"
                  }
                  wrapperClassName="mb-4"
                  className="w-full h-auto object-cover"
                  loading={false}
                  balance={row.balance}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <ShowcasePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              disabled={false}
            />
          )}
        </>
      )}
    </div>
  );
}
