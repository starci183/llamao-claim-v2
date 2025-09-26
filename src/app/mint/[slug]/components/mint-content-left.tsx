import { Skeleton } from "@/components/ui/skeleton/skeleton";
import type { NftMetadata } from "@/hooks/use-contract";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MintContentLeftPageProps {
  className?: string;
  storyNumber?: number;
  storyTitle?: string;
  storyImage?: string;
  totalMinted?: number;
  currentPage?: number;
  totalPages?: number;
  minting?: boolean;
  loading?: boolean;
  nftMetadata?: NftMetadata;
  totalSupply?: number;
}
export default function MintContentLeftPage({
  className = "",
  storyNumber = 10,
  storyTitle = "Llamao's Last Supper",
  storyImage = "/gifs/llamao_last_supper.gif",
  totalMinted = 10,
  currentPage = 1,
  totalPages = 10,
  // minting = false,
  loading = false,
  totalSupply,
}: MintContentLeftPageProps) {
  const computedTotal =
    typeof totalSupply === "number" &&
    Number.isFinite(totalSupply) &&
    totalSupply > 0
      ? totalSupply
      : 0;
  const rawPercent =
    computedTotal > 0 ? (totalMinted / computedTotal) * 100 : 0;
  const clampedPercent = Math.min(100, Math.max(0, rawPercent));
  const displayPercent = (() => {
    if (!Number.isFinite(clampedPercent)) return 0;
    if (clampedPercent > 0 && clampedPercent < 1)
      return Number(clampedPercent.toFixed(2));
    return Math.round(clampedPercent);
  })();
  console.log(storyNumber);
  return (
    <div
      className={cn(
        "p-1 sm:p-2 flex flex-col justify-center items-center w-full h-full gap-1 sm:gap-2",
        className
      )}
    >
      <h1 className="text-[#B2A280] font-pp-mondwest text-[0.6875rem] sml:text-xs sm:text-xl md:text-2xl">
        Story 10
      </h1>
      {/* image */}
      <div>
        {loading ? (
          <Skeleton />
        ) : (
          <Image
            src={storyImage}
            alt={storyTitle}
            width={240}
            height={180}
            className="w-full max-w-[8.5rem] xs:max-w-[10rem] sm:max-w-[14.5rem] md:max-w-[16rem] lg:max-w-[18rem] h-auto max-h-[4rem] xs:max-h-[4.5rem] sm:max-h-[5.5rem] md:max-h-[9.5rem] object-contain"
          />
        )}
      </div>
      {/* title */}
      {/* <div
        className="
         flex items-center justify-center
         w-full h-4 sm:h-6 md:h-10 lg:h-14 
         font-pp-mondwest text-[#B2A280] 
        "
      >
        <div className="w-full h-full relative flex items-center justify-center">
          <Image
            src="/images/llamao_retangle_large_new.png"
            alt="llamao_retangle_large_new"
            width={350}
            height={100}
            className="w-full h-[1.5rem] sml:h-[1.75rem] sm:h-[3.25rem] md:h-[3.625rem] lg:h-[3.875rem] object-contain"
            quality={100}
            priority
          />
          <span
            className="
            absolute text-[#CF573C] text-nowrap
            text-[0.5625rem] sml:text-[0.625rem] sm:text-base md:text-lg xl:text-xl
            font-pp-mondwest
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            "
          >
            {loading ? <Skeleton className="w-1/2" /> : `"${storyTitle}"`}
          </span>
        </div>
      </div> */}
      {/* progress */}
      <div className="w-full">
        <div className="flex items-center justify-between w-full px-0.5 sm:px-1">
          <p className="text-[0.4375rem] sml:text-[0.5625rem] sm:text-sm text-[#CF573C] font-pp-mondwest truncate text-left">
            Total Minted: {totalMinted}/{totalSupply}
          </p>
          {/* Tính phần trăm progress */}
          <span className="text-[0.4375rem] sml:text-[0.5625rem] sm:text-sm text-[#B2A280] font-pp-mondwest flex-shrink-0 ml-1">
            {displayPercent}%
          </span>
        </div>
        <div className="mx-1 sm:mx-2 h-1 md:h-2 bg-[#AD7757] relative overflow-hidden">
          <div
            className="h-full bg-[#D7B594] transition-all duration-500"
            style={{
              width: `${clampedPercent}%`,
            }}
          />
        </div>
      </div>
      {/* pagination */}
      <div className="flex items-center w-full flex-0 px-1 sm:px-2">
        <div className="flex-1 h-0.5 md:h-1 bg-[#8f52bc]" />
        <div className="border-2 h-2 xs:h-2.5 sm:h-3 md:h-3 lg:h-4 border-t-0 border-b-0 border-l-[#8f52bc] border-r-[#8f52bc] flex items-center justify-center">
          <span className="mx-1 xs:mx-1.5 sm:mx-2 text-[0.5rem] xs:text-[0.5625rem] sm:text-sm md:text-lg font-pp-mondwest text-[#8f52bc] drop-shadow-lg">
            {loading ? (
              <Skeleton className="w-4 h-4" />
            ) : (
              `${currentPage}/${totalPages}`
            )}
          </span>
        </div>
        <div className="flex-1 h-0.5 md:h-1 bg-[#8f52bc]" />
      </div>
    </div>
  );
}
