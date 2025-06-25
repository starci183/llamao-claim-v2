import { cn } from "@/lib/utils";

type MintContentRightPageProps = {
  className?: string;
  endDate?: string;
  maximumLlamaoPerWallet?: number;
};

export default function MintContentRightPage({
  className,
  endDate,
  maximumLlamaoPerWallet,
}: MintContentRightPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full h-full",
        className
      )}
    >
      <div className="flex flex-col items-start justify-center w-full h-full font-pp-mondwest text-[#602C2C] gap-2">
        {/* end date */}
        <div className="flex flex-row items-center justify-between w-[35%]">
          <h6 className="text-base">Ends In</h6>
          <span className="text-sm">{endDate || "April 28th, 2025"}</span>
        </div>
        {/* maximum llamao per wallet */}
        <div className="flex flex-row items-center justify-between w-[33%]">
          <h6 className="text-base">Maximum Llamao per Wallet</h6>
          <span className="text-sm">{maximumLlamaoPerWallet || 1}</span>
        </div>
      </div>
      {/* <MintButton /> */}
    </div>
  );
}
