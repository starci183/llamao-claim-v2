"use client";

import type { ShowcaseItem } from "@/hooks/use-showcase-data";
import { useShowcaseData } from "@/hooks/use-showcase-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ShowcaseCard } from "./showcase-card";
import ShowcasePagination from "./showcase-pagination";

interface ShowcaseTableProps {
  className?: string;
  wrapperClassName?: string;
  category?: string;
  itemsPerPage?: number;
}

export default function ShowcaseTable({
  className,
  wrapperClassName = "w-full",
  category,
  itemsPerPage = 6,
}: ShowcaseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Use SWR hook with keepPreviousData for smooth transitions
  const { items, totalPages, totalCount, isLoading, isValidating, error } =
    useShowcaseData({
      page: currentPage,
      itemsPerPage,
      category,
      keepPreviousData: true,
    });

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of showcase table when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state (initial load)
  if (isLoading && items.length === 0) {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg h-64"
            >
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
        {/* Loading pagination placeholder */}
        <div className="mt-6 flex justify-center">
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Failed to load showcase items
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {error.message || "Something went wrong while fetching data."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!isLoading && items.length === 0) {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No items found
            </h3>
            <p className="text-sm text-gray-500">
              {category
                ? `No items in the "${category}" category yet.`
                : "No showcase items available."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", wrapperClassName)}>
      {/* Loading indicator for subsequent pages (when previous data is shown) */}
      {isValidating && items.length > 0 && (
        <div className="mb-4 flex justify-center">
          <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
            <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span>Loading new data...</span>
          </div>
        </div>
      )}

      {/* Showcase grid */}
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
          isValidating &&
            items.length > 0 &&
            "opacity-75 transition-opacity duration-200",
          className
        )}
      >
        {items.map((item: ShowcaseItem, index: number) => (
          <ShowcaseCard
            key={`${item.id}-${currentPage}`}
            imgSrc={item.image}
            text={item.title}
            state={item.category}
            priority={index < 3}
            wrapperClassName="h-full"
            className="w-full h-auto object-cover"
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <ShowcasePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={isLoading}
            isValidating={isValidating}
            keepPreviousData={true}
          />
        </div>
      )}

      {/* Data info */}
      {totalCount > 0 && (
        <div className="mt-4 flex justify-center">
          <div className="text-sm text-gray-500">
            Showing {items.length} of {totalCount} items
            {category && (
              <span className="ml-1">in &ldquo;{category}&rdquo; category</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
