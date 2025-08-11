/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NftMetadata, useContract } from "@/hooks/use-contract";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { ShowcaseCard } from "./showcase-card";
import ShowcasePagination from "./showcase-pagination";
import { PRIMARY_MONAD_CONTRACT } from "@/contance";
import { Skeleton } from "@/components/ui/skeleton/skeleton";

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
  items?: ShowcaseItem[];
  category?: string;
  loading?: boolean;
  itemsPerPage?: number;
}

// Sample data for demonstration
const SAMPLE_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "1",
    title: "Llamao Meme #1",
    image: "/gifs/llamao_majestic_run.gif",
    category: "meme",
    description: "Epic Llamao running animation",
  },
  {
    id: "2",
    title: "Community Art #1",
    image: "/gifs/llamao_zenmonad.gif",
    category: "community",
    description: "Zen Llamao meditation",
  },
  {
    id: "3",
    title: "Llamao Banner",
    image: "/gifs/llamao_promote_banner.gif",
    category: "arts",
    description: "Promotional banner design",
  },
  {
    id: "4",
    title: "About Background",
    image: "/gifs/llamao_about_background.gif",
    category: "arts",
    description: "Background animation for about page",
  },
  {
    id: "5",
    title: "Llamao PFP #1",
    image: "/images/llamao_title.png",
    category: "pfps",
    description: "Classic Llamao profile picture",
  },
  {
    id: "6",
    title: "Llamao PFP #2",
    image: "/images/home.svg",
    category: "pfps",
    description: "Home themed profile picture",
  },
  {
    id: "7",
    title: "Llamao Meme #2",
    image: "/gifs/llamao_majestic_run.gif",
    category: "meme",
    description: "Another epic Llamao animation",
  },
  {
    id: "8",
    title: "Community Art #2",
    image: "/gifs/llamao_zenmonad.gif",
    category: "community",
    description: "More community artwork",
  },
  {
    id: "9",
    title: "Llamao Art #3",
    image: "/gifs/llamao_promote_banner.gif",
    category: "arts",
    description: "Creative art piece",
  },
  {
    id: "10",
    title: "Background Art",
    image: "/gifs/llamao_about_background.gif",
    category: "arts",
    description: "Background design artwork",
  },
  {
    id: "11",
    title: "Profile Picture #3",
    image: "/images/llamao_title.png",
    category: "pfps",
    description: "Another profile picture option",
  },
  {
    id: "12",
    title: "Home Design",
    image: "/images/home.svg",
    category: "pfps",
    description: "Home design themed picture",
  },
  {
    id: "13",
    title: "Llamao Meme #3",
    image: "/gifs/llamao_majestic_run.gif",
    category: "meme",
    description: "Third meme in the collection",
  },
  {
    id: "14",
    title: "Community Contribution",
    image: "/gifs/llamao_zenmonad.gif",
    category: "community",
    description: "Community contributed content",
  },
  {
    id: "15",
    title: "Art Collection #4",
    image: "/gifs/llamao_promote_banner.gif",
    category: "arts",
    description: "Fourth art piece in collection",
  },
];

export default function ShowcaseTable({
  className,
  wrapperClassName = "w-full",
  items = SAMPLE_SHOWCASE_ITEMS,
  category,
  loading = false,
  itemsPerPage = 6,
}: ShowcaseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { tokenURI, balance, contractAddress } = useContract(
    PRIMARY_MONAD_CONTRACT
  );
  const [nftMetadata, setNftMetadata] = useState<NftMetadata | null>(null);

  // --- Lock container height while loading (Option A) ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [lockedMinH, setLockedMinH] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (loading && containerRef.current) {
      setLockedMinH(containerRef.current.offsetHeight);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && lockedMinH != null) {
      const t = setTimeout(() => setLockedMinH(null), 300); // optional smooth release
      return () => clearTimeout(t);
    }
  }, [loading, lockedMinH]);
  // ------------------------------------------------------

  useEffect(() => {
    if (!tokenURI) return;
    fetch(tokenURI)
      .then((res) => res.json())
      .then((data) => setNftMetadata(data))
      .catch((err) => {
        setNftMetadata(null);
        console.error("Error fetching NFT metadata:", err);
      });
  }, [tokenURI]);

  const filteredItems = useMemo(() => {
    return category
      ? items.filter((item) => item.category === category)
      : items;
  }, [items, category]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const imageWidth = 140;
  const imageHeight = 140;

  const fixedSizeStyle = {
    width: imageWidth,
    height: imageHeight,
    aspectRatio: `${imageWidth} / ${imageHeight}`,
  };

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
        // ----- SKELETON GRID (measured for min-height lock) -----
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
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
          ))}
        </div>
      ) : (
        // ----- CONTENT AFTER LOADING -----
        <>
          {balance === "0" ? (
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
          ) : (
            <div
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
                className
              )}
            >
              {nftMetadata && (
                <ShowcaseCard
                  onClick={() => {
                    window.open(
                      `https://magiceden.io/mint-terminal/monad-testnet/${contractAddress}`,
                      "_blank"
                    );
                  }}
                  imgSrc={nftMetadata?.image}
                  text={nftMetadata?.name ? `${nftMetadata?.name}` : "NFT"}
                  state="nft"
                  description={"owned"}
                  wrapperClassName="mb-4"
                  className="w-full h-auto object-cover"
                  loading={false}
                  balance={balance}
                />
              )}
              {/* If you later render more items, keep the grid consistent with the skeleton */}
            </div>
          )}

          {/* Pagination (kept disabled for now, enable when using item slices) */}
          {/* {totalPages > 1 && balance !== "0" && (
            <ShowcasePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              disabled={false}
            />
          )} */}
        </>
      )}
    </div>
  );
}
