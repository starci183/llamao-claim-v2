"use client";

import { useAppSelector } from "@/redux";
interface RewardProgressProps {
  total: number;
}

export const RewardProgress = ({ total }: RewardProgressProps) => {
  const ownedNFTs = useAppSelector((state) => state.nftReducer.ownedNFTs);
  const ownedNFTsCount = Object.values(ownedNFTs).filter(Boolean).length;
  const progress = Math.min((ownedNFTsCount / total) * 100, 100);
  return (
    <div className="w-full flex flex-col items-center justify-center text-center">
      {/* Text phần trăm */}
      <p className="text-xs sm:text-sm text-white/80 mt-2">
        {ownedNFTsCount} / {total} pages —{" "}
        <span className="font-semibold text-white">{Math.floor(progress)}%</span>
      </p>
    </div>
  );
};