import { useMemo } from "react";
import useSWR from "swr";

export interface ShowcaseItem {
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
}

export interface PaginatedShowcaseData {
  items: ShowcaseItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UseShowcaseDataParams {
  page: number;
  itemsPerPage: number;
  category?: string;
  userAddress?: string;
  keepPreviousData?: boolean;
}

export interface UseShowcaseDataReturn extends PaginatedShowcaseData {
  isLoading: boolean;
  isValidating: boolean;
  error: Error | null;
  mutate: () => void;
}

// API data fetcher function for SWR
const fetchShowcaseData = async (
  page: number,
  itemsPerPage: number,
  category?: string,
  userAddress?: string
): Promise<PaginatedShowcaseData> => {
  try {
    // Build API URL with query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
    });

    if (category) {
      params.set("category", category);
    }

    if (userAddress) {
      params.set("userAddress", userAddress);
    }

    // Make API call to showcase endpoint
    const response = await fetch(`/api/showcase?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid response format");
    }

    return {
      items: data.items || [],
      totalCount: data.totalCount || 0,
      totalPages: data.totalPages || 0,
      currentPage: data.currentPage || page,
      hasNextPage: data.hasNextPage || false,
      hasPreviousPage: data.hasPreviousPage || false,
    };
  } catch (error) {
    console.error("Error fetching showcase data:", error);

    // Return empty result if API fails
    console.warn("API error occurred, returning empty result");

    return {
      items: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
};

export function useShowcaseData({
  page,
  itemsPerPage,
  category,
  userAddress,
  keepPreviousData = true,
}: UseShowcaseDataParams): UseShowcaseDataReturn {
  // Create a stable cache key including user address
  const cacheKey = useMemo(
    () =>
      `showcase-${page}-${itemsPerPage}-${category || "all"}-${
        userAddress || "all"
      }`,
    [page, itemsPerPage, category, userAddress]
  );

  // SWR configuration optimized for smooth pagination
  const swrConfig = useMemo(
    () => ({
      keepPreviousData,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 seconds
      focusThrottleInterval: 60000, // 1 minute
    }),
    [keepPreviousData]
  );

  const { data, error, isLoading, isValidating, mutate } =
    useSWR<PaginatedShowcaseData>(
      cacheKey,
      () => fetchShowcaseData(page, itemsPerPage, category, userAddress),
      swrConfig
    );

  return {
    items: data?.items || [],
    totalPages: data?.totalPages || 0,
    totalCount: data?.totalCount || 0,
    currentPage: data?.currentPage || page,
    hasNextPage: data?.hasNextPage || false,
    hasPreviousPage: data?.hasPreviousPage || false,
    isLoading: isLoading && !data, // Only true on initial load
    isValidating,
    error: error || null,
    mutate,
  };
}
