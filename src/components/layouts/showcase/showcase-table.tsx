"use client";

import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useShowcaseData } from "@/hooks/use-showcase-data";
import { useWalletAddress } from "@/hooks/use-wallet-address";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ShowcaseCard from "./showcase-card";
import ShowcasePagination from "./showcase-pagination";

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
  category?: string;
  itemsPerPage?: number;
  userAddress?: string;
  showOnlyMyItems?: boolean;
}

export default function ShowcaseTable({
  className,
  wrapperClassName = "w-full",
  category,
  itemsPerPage = 6,
  userAddress,
  showOnlyMyItems = false,
}: ShowcaseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { address, isConnected } = useWalletAddress();

  // Use the showcase data hook for regular items
  const {
    items: showcaseItems,
    isLoading: showcaseLoading,
    error: showcaseError,
  } = useShowcaseData({
    page: currentPage,
    itemsPerPage,
    category: category !== "nft" ? category : undefined,
    userAddress: !showOnlyMyItems ? userAddress : address,
  });

  const totalItems = showcaseItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = showcaseItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const isLoading = showOnlyMyItems ?? showcaseLoading;
  const error = showcaseError;

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, showOnlyMyItems]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of showcase table when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-28 w-full rounded-lg" />
              <div className="space-y-2 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (paginatedItems.length === 0) {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {showOnlyMyItems
                ? "No Items in Your Collection"
                : "No items found"}
            </h3>
            <p className="text-sm text-gray-500">
              {showOnlyMyItems
                ? "Connect your wallet and own some NFTs to see them here."
                : category
                ? `No items in the "${category}" category yet.`
                : "No showcase items available."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Error Loading Items
            </h3>
            <p className="text-sm text-gray-500">
              {error.message || "An unexpected error occurred."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", wrapperClassName)}>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
          className
        )}
      >
        {paginatedItems.map((item: ShowcaseItem, index: number) => (
          <ShowcaseCard
            key={item.id || index}
            imgSrc={item.image}
            text={item.title}
            state={item.category}
            priority={index < 3}
            wrapperClassName="h-full"
            className="w-full h-auto object-cover"
          />
        ))}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <ShowcasePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      )}
    </div>
  );
}
