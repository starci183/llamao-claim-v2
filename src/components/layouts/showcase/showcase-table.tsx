/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NftMetadata, useContract } from "@/hooks/use-contract";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { ShowcaseCard } from "./showcase-card";
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
    "0x913bf9751fe18762b0fd6771edd512c7137e42bb"
  );
  const [nftMetadata, setNftMetadata] = useState<NftMetadata | null>(null);

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of showcase table when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className={cn("w-full", wrapperClassName)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg h-64"
            >
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (balance === "0") {
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
    <div className={cn("w-full space-y-4", wrapperClassName)}>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
          className
        )}
      >
        {/* {currentItems.map((item, index) => (
          <ShowcaseCard
            key={item.id}
            imgSrc={item.image}
            text={item.title}
            state={item.category}
            priority={index < 3} // Prioritize loading for first 3 items
            wrapperClassName="h-full"
            className="w-full h-auto object-cover"
          />
        ))} */}
        {nftMetadata && balance !== "0" && (
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
            description={
              nftMetadata?.description
                ? `${nftMetadata?.description}\nYou have: ${balance} nft`
                : `You have: ${balance} nft`
            }
            wrapperClassName="mb-4"
            className="w-full h-auto object-cover"
            loading={loading}
            balance={balance}
          />
        )}
      </div>

      {/* Pagination Component */}
      {/* {totalPages > 1 && balance !== "0" && (
        <ShowcasePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={loading}
        />
      )} */}
    </div>
  );
}
