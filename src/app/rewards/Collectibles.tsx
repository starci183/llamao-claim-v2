"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/layouts/main-layout";
import { NFT_DUMMY } from "@/lib/nft-data";
import CollectibleCard from "./CollectibleCard";

export default function Collectibles() {
    const nfts = NFT_DUMMY
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center w-full",
        "px-2 sm:px-4 lg:px-0"
      )}
    >
      {/* Main Content */}
      <div className={cn("flex-1 w-full flex justify-center")}>
        <MainLayout
          text="Collectibles"
          headerIcon="/gifs/llamao_majestic_run.gif"
          className={cn(
            "w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl overflow-hidden space-y-2",
            "p-1.5 sm:p-2 md:p-3 lg:p-4"
          )}
        >
          <div className="text-sm text-gray-500">
          The snapshot for all 10 llamaosim NFTs was taken at 9:30 AM UTC on 20 October. Any NFTs traded after this time will not count toward eligibility. Only holders who owned all 10 NFTs before the snapshot are qualified.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.values(nfts).map((item) => (
              <div key={item.address}>
                <CollectibleCard {...item} />
              </div>
            ))}
          </div>
        </MainLayout>
      </div>
    </motion.div>
  );
}