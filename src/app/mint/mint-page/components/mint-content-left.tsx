import { Skeleton } from "@/components/ui/skeleton/skeleton";
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
  storyTitle = "Default Story Title",
  storyImage = "/gifs/llamao_about_background.gif",
  totalMinted = 0,
  currentPage = 1,
  totalPages = 10,
  minting = false,
  loading = false,
}: MintContentLeftPageProps) {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h1 className="text-[#B2A280] font-pp-mondwest text-lg sm:text-xl md:text-2xl">
        Story {storyNumber}
      </h1>
      {/* image */}
      <div className="">
        {loading ? (
          <Skeleton />
        ) : (
          <Image
            src={storyImage}
            alt={storyTitle}
            width={120}
            height={60}
            className="min-w-[240px] max-h-[122px]"
          />
        )}
      </div>
      {/* title */}
      <h3 className="text-[#CF573C]">
        {loading ? <Skeleton className="w-1/2" /> : storyTitle}
      </h3>
      {/* progress */}
      {/* pagination */}
    </div>
  );
}
