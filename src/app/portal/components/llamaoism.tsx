"use client";

import { Button } from "@/components/common/button";
import MissionCard from "@/components/layouts/portal/mission-card";
import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { PRIMARY_MONAD_CONTRACT } from "@/contance";
import { NftMetadata, useContract } from "@/hooks/use-contract";
import { useNftMetadata } from "@/hooks/use-nft-meta-data";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import LetLlamaoButton from "./let-llmao-button";

export default function LlamaoismContent() {
  const router = useRouter();
  const { balance } = useContract(PRIMARY_MONAD_CONTRACT);
  const { data: nftMetadata, listData } = useNftMetadata();
  const { user } = useAuth();

  // Correct minted flag: hasMinted = true when balance > 0
  const hasMinted = useMemo(() => !!balance && balance !== "0", [balance]);

  // All eligibility checks must be true
  const isMintAble = Boolean(
    user?.followX && user?.commentXPost && user?.joinDiscord && user?.likeXPost
  );

  const [tab, setTab] = useState<"new" | "minted">("new");

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-2">
      <Tabs value={tab} onValueChange={(v) => setTab(v as "new" | "minted")}>
        <TabsList className="bg-transparent">
          <TabsTrigger
            value="new"
            variant="primary"
            className="bg-none transform transition-all hover:scale-105"
          >
            New
          </TabsTrigger>
          <TabsTrigger
            value="minted"
            variant="primary"
            className={cn(
              "transform transition-all hover:scale-105",
              !hasMinted && "opacity-50 cursor-not-allowed"
            )}
            disabled={!hasMinted}
          >
            Minted
          </TabsTrigger>
        </TabsList>

        {/* ---------------- New tab ---------------- */}
        <TabsContent value="new" className="mt-2">
          <div className="flex flex-col gap-2">
            {listData.map((data: NftMetadata, i: number) => (
              <MissionCard
                key={i}
                text={data.name}
                link={`/mint/${PRIMARY_MONAD_CONTRACT}`}
                //check if the nft is minted
                status={data.name === nftMetadata?.name}
                onClick={() => {
                  if (!false) router.push(data.image);
                }}
              />
            ))}
          </div>

          <LetLlamaoButton
            allMissionsCompleted={isMintAble}
            onMintClick={() => {
              router.push("/mint");
            }}
          />
        </TabsContent>

        {/* ---------------- Minted tab ---------------- */}
        <TabsContent value="minted" className="mt-2">
          {!hasMinted ? (
            <div className="rounded-lg border border-[#B2A280]/40 bg-[#FEFBEA] p-4 text-center">
              <h3 className="text-sm font-semibold text-[#602C2C]">
                You haven’t minted any NFTs
              </h3>
              <p className="mt-1 text-xs text-[#7A5F5F]">
                Check your eligibility to mint NFTs
              </p>
              <div className="mt-3">
                <Button
                  intent="secondary"
                  className="px-3 py-1.5 text-sm"
                  onClick={() => setTab("new")}
                >
                  Check eligibility
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <MissionCard
                text={`${nftMetadata?.name} ${balance}`}
                link={"/mint"}
                status={true}
                onClick={() => {}}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
