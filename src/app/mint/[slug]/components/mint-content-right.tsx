import { cn } from "@/lib/utils";
import Image from "next/image";

type MintContentRightPageProps = {
  className?: string;
  TBA?: string;
  maximumLlamaoPerWallet?: number;
  description?: string;
};

export default function MintContentRightPage({
  className,
  TBA,
  maximumLlamaoPerWallet,
  description,
}: MintContentRightPageProps) {
  const date = new Date().toLocaleDateString();
  return (
    <div
      className={cn(
        "p-1 md:p-2 flex flex-col items-center justify-center w-full h-full",
        className
      )}
    >
      <div className="flex flex-col items-start justify-center w-full h-full font-pp-mondwest text-[#602C2C] gap-1 md:gap-2.5 pt-2 pl-0.5 sm:pl-1.5">
        {/* end date */}
        <div className="flex flex-row items-center justify-between w-full gap-1 xs:gap-2 h-3 min-w-0">
          <h6 className="text-[0.5rem] sml:text-[0.5625rem] sm:text-sm whitespace-nowrap pointer-events-none flex-shrink-0">
            TBA :
          </h6>
          <div
            className="flex items-center justify-center sml:mr-0.5 bg-no-repeat bg-contain md:bg-cover bg-center py-0.5 px-1 flex-shrink-0 min-w-[3rem] xs:min-w-[3.5rem] sm:min-w-[4rem] md:w-[5rem]"
            style={{
              backgroundImage: 'url("/images/llamao_retangle_small_new.png")',
            }}
          >
            <span className="text-[0.375rem] sml:text-[0.5rem] sm:text-xs truncate">
              {TBA || date}
            </span>
          </div>
        </div>
        {/* maximum llamao per wallet */}
        <div className="flex flex-row items-center justify-between w-full gap-1 xs:gap-2 h-3 min-w-0">
          <div className="flex flex-row items-center gap-1 xs:gap-2 relative group min-w-0 flex-1">
            <h6
              className="text-[0.5rem] sml:text-[0.5625rem] sm:text-sm whitespace-nowrap max-w-[4rem] xs:max-w-[5rem] md:max-w-[7.5rem] truncate pointer-events-none"
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
              className="cursor-pointer w-3 h-3 xs:w-3.5 xs:h-3.5 flex-shrink-0"
            />
            {/* Tooltip info */}
            <div className="absolute left-full top-full z-20 mt-2 -translate-x-[18%] hidden group-hover:flex flex-col min-w-[6.25rem] bg-[#FEFBEA] border border-[#B2A280] rounded-md shadow-lg p-2 text-[0.6875rem] text-[#602C2C] font-pp-neuebit animate-fade-in pointer-events-none">
              <div className="absolute -top-2 left-4 w-3 h-3 rotate-45 bg-[#FEFBEA] border-l border-t border-[#B2A280]"></div>
              <span className="font-bold">Minimum 1 NFT</span>
              <span>You can only mint once.</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center mr-1 bg-no-repeat bg-center bg-contain px-1 md:px-2 flex-shrink-0 min-w-[2rem] xs:min-w-[2.5rem] sm:min-w-[3rem]"
            style={{
              backgroundImage: 'url("/images/llamao_square_new.png")',
            }}
          >
            <span className="text-[0.375rem] sml:text-[0.5rem] sm:text-xs">
              {maximumLlamaoPerWallet || 1}
            </span>
          </div>
        </div>
      </div>
      {/* description */}
      <div className="relative flex flex-col items-center justify-center w-full mt-1 sm:mt-2">
        <div className="relative w-full max-w-[14rem] xs:max-w-[15rem] sm:max-w-sm md:max-w-md h-auto flex items-center justify-center">
          <Image
            src="/images/llamao_description_new.png"
            alt="llamao description"
            width={240}
            height={128}
            className="w-full h-auto pointer-events-none"
          />
          <h5 className="absolute top-[16%] left-[21%] -translate-x-1/2 -translate-y-1/2 text-[0.375rem] sml:text-[0.5rem] sm:text-sm md:text-md text-[#FFFFFF] font-pp-mondwest font-bold z-10 whitespace-nowrap">
            Description
          </h5>
          {/* content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3 xs:-translate-y-4 sml:-translate-y-5 md:-translate-y-8 text-[0.375rem] sml:text-[0.5rem] md:text-sm text-[#602C2C] font-pp-neuebit w-full px-2.5 xs:px-3.5 sml:px-5 sm:px-6 md:px-8 max-h-[2.5rem] xs:max-h-[2.8125rem] sml:max-h-[3.75rem] md:max-h-[6.25rem] whitespace-normal overflow-auto">
            <span className="block">{description}</span>
          </div>
        </div>
      </div>
      {/* <MintButton /> */}
    </div>
  );
}
