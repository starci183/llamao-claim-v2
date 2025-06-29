import Progress from "@/components/common/progess";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
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
}
export default function MintContentLeftPage({
  className = "",
  storyNumber = 1,
  storyTitle = "Llamao’s Last Supper",
  storyImage = "/gifs/llamao_last_supper.gif",
  currentPage = 1,
  totalPages = 10,
  loading = false,
}: MintContentLeftPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center w-full h-full mt-1.5 gap-1.5 sm:gap-4",
        className
      )}
    >
      <h1 className="text-[#B2A280] font-pp-mondwest text-xs sm:text-xl md:text-2xl">
        Story {storyNumber}
      </h1>
      {/* image */}
      <div>
        {loading ? (
          <Skeleton className="min-w-[95px] sm:min-w-[190px] md:min-w-[200px] lg:min-w-[230px] max-h-[120px]" />
        ) : (
          <Image
            src={storyImage}
            alt={storyTitle}
            width={120}
            height={60}
            className="min-w-[95px] sm:min-w-[190px] md:min-w-[200px] lg:min-w-[230px] max-h-[120px] aspect-[230/120] object-contain"
          />
        )}
      </div>
      {/* title */}
      <div
        className="flex items-center justify-center w-full h-4 sm:h-6 md:h-10 lg:h-12 font-pp-mondwest text-[#B2A280] sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl"
        style={{
          backgroundImage: "url(/images/llamao_retangle_small.svg)",
          backgroundSize: "cover",
        }}
      >
        <span className="text-[#CF573C] text-[10px] sm:text-lg">
          {loading ? <Skeleton className="w-1/2" /> : `"${storyTitle}"`}
        </span>
      </div>
      {/* progress */}
      <Progress max={100} value={10} label="Total Minted" />

      {/* pagination */}
      <div className="flex items-center w-full flex-0">
        <div className="flex-1 h-0.5 md:h-1 bg-[#CF573C]" />
        <div className="border-2 h-2 md:h-3 lg:h-4 border-t-0 border-b-0 border-l-[#CF573C] border-r-[#CF573C] flex items-center justify-center">
          <span className="mx-2 text-[9px] sm:text-sm md:text-lg font-pp-mondwest text-[#CF573C] drop-shadow-lg">
            {loading ? (
              <Skeleton className="w-6 h-6" />
            ) : (
              `${currentPage}/${totalPages}`
            )}
          </span>
        </div>
        <div className="flex-1 h-0.5 md:h-1 bg-[#CF573C]" />
      </div>
    </div>
  );
}
