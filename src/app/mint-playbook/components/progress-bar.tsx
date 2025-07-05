import { cn } from "@/lib/utils";
import React from "react";

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  percentLabel?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  label = "Total Minted:",
  percentLabel,
  className = "",
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn(
        "w-full bg-[#663931] p-1 md:p-3 flex flex-col items-center ",
        className
      )}
    >
      <div className="w-full flex flex-row justify-between items-center mb-1">
        <span className="text-[#E7D5B3] font-pp-mondwest text-xs md:text-lg lg:text-xl">
          {label} {max}
        </span>
        <span className="text-[#E7D5B3] font-pp-mondwest text-xs md:text-lg lg:text-xl">
          {percentLabel ? percentLabel : `${percent.toFixed(2)}%`}
        </span>
      </div>
      <div className="w-full h-3 md:h-5 bg-[#E7D5B3] overflow-hidden">
        <div
          className="h-full bg-[#A97B5B] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
