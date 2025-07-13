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
  description,
}: MintContentRightPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full",
        className
      )}
    >
      <div className="flex flex-col items-start justify-center w-full h-full font-pp-mondwest text-[#602C2C] gap-1 md:gap-2.5 pt-2 pl-0.5 sm:pl-1.5">
        {/* end date */}
        <div className="flex flex-row items-center justify-between w-full gap-1 xs:gap-2 h-3">
          <h6 className="text-[8px] sml:text-[9px] sm:text-sm whitespace-nowrap pointer-events-none">
            Ends In
          </h6>
          <div
            className="flex items-center justify-center sml:mr-0.5 bg-no-repeat bg-contain md:bg-cover bg-center py-0.5 px-1 md:w-[80px]"
            style={{
              backgroundImage: 'url("/images/llamao_retangle_small_new.png")',
            }}
          >
            <span className="text-[6px] sml:text-[8px] sm:text-xs">
              {endDate || "April 28th, 2025"}
            </span>
          </div>
        </div>
        {/* maximum llamao per wallet */}
        <div className="flex flex-row items-center justify-between w-full gap-1 xs:gap-2 h-3">
          <div className="flex flex-row items-center gap-1 xs:gap-2 relative group">
            <h6
              className="text-[8px] sml:text-[9px] sm:text-sm whitespace-nowrap max-w-[80px] md:max-w-[120px] truncate pointer-events-none"
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
          <div
            className="flex items-center justify-center mr-1 bg-no-repeat bg-center bg-contain px-1 md:px-2"
            style={{
              backgroundImage: 'url("/images/llamao_square_new.png")',
            }}
          >
            <span className="text-[6px] sml:text-[8px] sm:text-xs">
              {maximumLlamaoPerWallet || 1}
            </span>
          </div>
        </div>
      </div>
      {/* description */}
      <div className="relative flex flex-col items-center justify-center w-full mt-2">
        <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md h-auto flex items-center justify-center">
          <Image
            src="/images/llamao_description_new.png"
            alt="llamao description"
            width={240}
            height={128}
            className="w-full h-auto pointer-events-none"
          />
          <h5 className="absolute top-[16%] left-[21%] -translate-x-1/2 -translate-y-1/2 text-[6px] sml:text-[8px] sm:text-sm md:text-md text-[#FFFFFF] font-pp-mondwest font-bold z-10 whitespace-nowrap">
            Description
          </h5>
          {/* content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6px] sml:text-[8px] md:text-sm text-[#602C2C] font-pp-neuebit w-full px-3.5 sml:px-4 sm:px-6 md:px-8 truncate max-w-[120vw] whitespace-normal sm:max-w-full">
            <span className="block sm:hidden">
              {description}
              <span className="inline">
                <span className="sr-only">
                  These digital collectibles are designed to be fun, engaging,
                  and visually appealing, making them perfect for collectors and
                  enthusiasts alike.
                </span>
                ...
              </span>
            </span>
            <span className="hidden sm:block">{description}</span>
          </div>
        </div>
      </div>
      {/* <MintButton /> */}
    </div>
  );
}
