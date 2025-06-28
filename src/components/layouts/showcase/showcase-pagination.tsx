"use client";

import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "@/svg";
import { memo, useCallback } from "react";

interface ShowcasePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  disabled?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

const ShowcasePagination = memo(function ShowcasePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  disabled = false,
  showPageNumbers = true,
  maxVisiblePages = 5,
}: ShowcasePaginationProps) {
  // Handle navigation
  const handlePrevious = useCallback(() => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, disabled, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, disabled, onPageChange]);

  const handlePageClick = useCallback(
    (page: number) => {
      if (page !== currentPage && !disabled) {
        onPageChange(page);
      }
    },
    [currentPage, disabled, onPageChange]
  );

  // Calculate visible page numbers
  const getVisiblePages = useCallback(() => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages, maxVisiblePages]);

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();
  const showFirstPage = visiblePages[0] > 1;
  const showLastPage = visiblePages[visiblePages.length - 1] < totalPages;
  const showFirstEllipsis = visiblePages[0] > 2;
  const showLastEllipsis =
    visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 sm:gap-2 p-2 bg-[#C3C3C3] box-shadow-showcase-pagination",
        className
      )}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <Button
        intent="primary"
        onClick={handlePrevious}
        disabled={currentPage === 1 || disabled}
        className={cn(
          "flex items-center justify-center p-1 sm:p-2 min-w-8 sm:min-w-10 h-8 sm:h-8 text-xs sm:text-sm",
          (currentPage === 1 || disabled) && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Go to previous page"
      >
        <ArrowLeft />
      </Button>

      {/* First Page */}
      {showFirstPage && (
        <>
          <Button
            intent={1 === currentPage ? "gradient" : "primary"}
            onClick={() => handlePageClick(1)}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center min-w-8 sm:min-w-10 h-8 sm:h-8 text-xs sm:text-sm font-bold",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label={`Go to page 1`}
            aria-current={1 === currentPage ? "page" : undefined}
          >
            1
          </Button>
          {showFirstEllipsis && (
            <span className="px-1 text-xs sm:text-sm text-gray-600 select-none">
              ...
            </span>
          )}
        </>
      )}

      {/* Visible Page Numbers */}
      {showPageNumbers &&
        visiblePages.map((page) => (
          <Button
            key={page}
            intent={page === currentPage ? "gradient" : "primary"}
            onClick={() => handlePageClick(page)}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center min-w-8 sm:min-w-10 h-8 sm:h-8 text-xs sm:text-sm font-bold",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        ))}

      {/* Last Page */}
      {showLastPage && (
        <>
          {showLastEllipsis && (
            <span className="px-1 text-xs sm:text-sm text-gray-600 select-none">
              ...
            </span>
          )}
          <Button
            intent={totalPages === currentPage ? "gradient" : "primary"}
            onClick={() => handlePageClick(totalPages)}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center min-w-8 sm:min-w-10 h-8 sm:h-8 text-xs sm:text-sm font-bold",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label={`Go to page ${totalPages}`}
            aria-current={totalPages === currentPage ? "page" : undefined}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        intent="primary"
        onClick={handleNext}
        disabled={currentPage === totalPages || disabled}
        className={cn(
          "flex items-center justify-center p-1 sm:p-2 min-w-8 sm:min-w-10 h-8 sm:h-8 text-xs sm:text-sm",
          (currentPage === totalPages || disabled) &&
            "opacity-50 cursor-not-allowed"
        )}
        aria-label="Go to next page"
      >
        <ArrowRight />
      </Button>

      {/* Page Info */}
      {/* <div className="hidden sm:flex items-center ml-2 text-xs text-gray-700">
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </div> */}
    </div>
  );
});

ShowcasePagination.displayName = "ShowcasePagination";

export default ShowcasePagination;
