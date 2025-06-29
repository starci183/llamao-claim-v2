import { cn } from "@/lib/utils";
import Image from "next/image";

type MintContentRightPageProps = {
  className?: string;
  endDate?: string;
  maximumLlamaoPerWallet?: number;
  description?: string;
};

export default function MintContentRightPage({
  className,
  endDate,
  maximumLlamaoPerWallet,
  description = "Llamao is a collection of 10,000 unique llamas on the Solana blockchain, each with its own distinct traits and characteristics. These digital collectibles are designed to be fun, engaging, and visually appealing, making them perfect for collectors and enthusiasts alike.",
}: MintContentRightPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full pl-2 sm:pl-5 pt-6 sm:pt-6",
        className
      )}
    >
      <div className="flex flex-col items-start justify-center w-full h-full font-pp-mondwest text-[#602C2C] pl-1 sm:pl-2">
        {/* end date */}
        <div className="flex flex-row items-center justify-between w-full gap-1 xs:gap-2">
          <h6 className="text-[9px] sm:text-sm whitespace-nowrap pointer-events-none">
            Ends In
          </h6>
          <div
            className="flex items-center justify-center mr-0.5"
            style={{
              backgroundImage: 'url("/images/llamao_retangle_small.svg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <span className="text-[8px] sm:text-xs w-full m-1 sm:m-1.5">
              {endDate || "April 28th, 2025"}
            </span>
          </div>
        </div>
        {/* maximum llamao per wallet */}
        <div className="flex flex-row items-center justify-between w-full gap-1 xs:gap-2">
          <div className="flex flex-row items-center gap-1 xs:gap-2 relative group">
            <h6
              className="text-[9px] sm:text-sm whitespace-nowrap max-w-[80px] md:max-w-[120px] truncate pointer-events-none"
              title="Maximum Llamao per Wallet"
            >
              Maximum Llamao per Wallet
            </h6>
            <Image
              src="/icons/llamao_info.svg"
              alt="llamao_info"
              width={14}
              height={14}
              quality={100}
              className="cursor-pointer w-[10%] h-auto"
            />
            {/* Tooltip info */}
            <div className="absolute left-full top-full z-20 mt-2 -translate-x-[18%] hidden group-hover:flex flex-col min-w-[100px] bg-[#FEFBEA] border border-[#B2A280] rounded-md shadow-lg p-2 text-[11px] text-[#602C2C] font-pp-neuebit animate-fade-in pointer-events-none">
              <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-[#FEFBEA] border-l border-t border-[#B2A280]"></div>
              <span className="font-bold">Minimum 1 NFT</span>
              <span>You can only mint once.</span>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/llamao_square.svg"
              alt="llamao retangle"
              width={24}
              height={24}
              className="mx-auto w-[18px] sm:w-[24px] h-auto"
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] sm:text-xs flex items-center justify-center">
              {maximumLlamaoPerWallet || 1}
            </span>
          </div>
        </div>
      </div>
      {/* description */}
      <div className="flex flex-col items-center justify-center w-full mt-2">
        <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md h-auto flex items-center justify-center">
          <Image
            src="/images/llamao_description.svg"
            alt="llamao description"
            width={240}
            height={128}
            className="w-full h-auto pointer-events-none"
          />
          <h5 className="absolute top-[10%] left-[22%] -translate-x-1/2 -translate-y-1/2 text-[8px] sm:text-sm md:text-md text-[#B2A280] font-pp-mondwest font-bold z-10 whitespace-nowrap">
            Description
          </h5>
          {/* content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] md:text-sm text-[#602C2C] font-pp-neuebit w-full px-3 md:px-4 truncate max-w-[120vw] whitespace-normal sm:max-w-full">
            <span className="block sm:hidden">
              {description.split(". ").slice(0, 2).join(". ")}.
              <span className="inline">
                <span className="sr-only">
                  {description.split(". ").slice(2).join(". ")}
                </span>
                ...
              </span>
            </span>
            <span className="hidden sm:block">
              {description}
            </span>
          </div>
        </div>
      </div>
      {/* <MintButton /> */}
    </div>
  );
}
