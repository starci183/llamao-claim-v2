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
}
export default function MintContentLeftPage({
  className = "",
  storyNumber = 1,
  storyTitle = "Llamao’s Last Supper",

  storyImage = "/gifs/llamao_last_supper.gif",
  totalMinted = 10,
  currentPage = 1,
  totalPages = 10,
  // minting = false,
  loading = false,
}: MintContentLeftPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center w-full h-full gap-1 sm:gap-2",
        className
      )}
    >
      <h1 className="text-[#B2A280] font-pp-mondwest text-[11px] sml:text-xs sm:text-xl md:text-2xl">
        Story {storyNumber}
      </h1>
      {/* image */}
      <div>
        {loading ? (
          <Skeleton />
        ) : (
          <Image
            src={storyImage}
            // TODO: enable when has data
            alt={storyTitle}
            width={120}
            height={60}
            className="min-w-[95px] sm:min-w-[190px] md:min-w-[200px] lg:min-w-[220px] max-h-[50px] sml:max-h-[60px] md:max-h-[90px] aspect-[4/3] object-contain"
          />
        )}
      </div>
      {/* title */}
      <div
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
            className="w-full h-[24px] sml:h-[28px] sm:h-[52px] md:h-[58px] lg:h-[62px] object-contain"
            quality={100}
            priority
          />
          <span
            className="
            absolute text-[#CF573C] text-nowrap
            text-[9px] sml:text-[10px] sm:text-base md:text-lg xl:text-xl
            font-pp-mondwest
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            "
          >
            {loading ? <Skeleton className="w-1/2" /> : `"${storyTitle}"`}
          </span>
        </div>
      </div>
      {/* progress */}
      <div className="w-full">
        <div className="flex items-center justify-between w-full px-1">
          <p className="text-[7px] sml:text-[9px] sm:text-sm text-[#CF573C] font-pp-mondwest">
            Total Minted: {totalMinted}
          </p>
          {/* Tính phần trăm progress */}
          <span className="text-[7px] sml:text-[9px] sm:text-sm text-[#B2A280] font-pp-mondwest">
            {/* TODO: Implement this with real data */}
            {/* {totalPages > 0
              ? ((totalMinted / (totalPages * 10)) * 100).toFixed(2)
              : 0} */}
            80 %
          </span>
        </div>
        <div className="mx-2 h-1 md:h-2 bg-[#AD7757] relative overflow-hidden">
          <div
            className="h-full bg-[#D7B594] transition-all duration-500"
            style={{
              // TODO: Implement this with real data
              // width: `${
              //   totalPages > 0 ? (totalMinted / (totalPages * 10)) * 100 : 0
              // }%`,
              width: "80%",
            }}
          />
        </div>
      </div>
      {/* pagination */}
      <div className="flex items-center w-full flex-0 px-2">
        <div className="flex-1 h-0.5 md:h-1 bg-[#8f52bc]" />
        <div className="border-2 h-2 md:h-3 lg:h-4 border-t-0 border-b-0 border-l-[#8f52bc] border-r-[#8f52bc] flex items-center justify-center">
          <span className="mx-2 text-[9px] sm:text-sm md:text-lg font-pp-mondwest text-[#8f52bc] drop-shadow-lg">
            {loading ? (
              <Skeleton className="w-6 h-6" />
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
