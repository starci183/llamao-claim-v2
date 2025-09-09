"use client";

import { Button } from "@/components/common/button";
import MissionCard from "@/components/layouts/portal/mission-card";
import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { MONAD_CONTRACT_ADDRESSES, PRIMARY_MONAD_CONTRACT } from "@/contance";
import { NftMetadata, useContracts } from "@/hooks/use-contracts"; // <-- NEW
import { useNftMetadata } from "@/hooks/use-nft-meta-data";

type ExtendedNftMetadata = NftMetadata & { address?: string };
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import LetLlamaoButton from "./let-llmao-button";

type Props = {
  /** optionally override the default list of contracts */
  contracts?: readonly string[];
  /** tokenId to check/preview (default 0) */
  tokenId?: number | bigint;
  /** chainId override (default 10143) */
  chainId?: number;
};

export default function LlamaoismContent({
  contracts = MONAD_CONTRACT_ADDRESSES,
  tokenId = 0,
  chainId,
}: Props) {
  const router = useRouter();
  const { listData } = useNftMetadata();
  const { areAllMissionsFulfilled } = useAuth();

  // Load all contracts at once
  const { rows } = useContracts(contracts, {
    tokenId,
    chainId,
  });

  // Owned rows = any contract where user balance > 0
  const ownedRows = useMemo(
    () => rows.filter((r) => r.balance && r.balance !== "0"),
    [rows]
  );

  // For quick lookup by NFT name
  const ownedNameSet = useMemo(
    () =>
      new Set(
        ownedRows.map((r) => r.metadata?.name).filter(Boolean) as string[]
      ),
    [ownedRows]
  );

  // Any minted?
  const hasMinted = ownedRows.length > 0;

  // All eligibility checks must be true
  // TODO: add season 2 checks
  const isMintAble = areAllMissionsFulfilled;

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
            {(listData ?? [])
              //CHANGE PAGE YOU WANT TO SHOW HERE
              .filter((data: ExtendedNftMetadata) => data.name === "Page 6")
              .map((data: ExtendedNftMetadata, i: number) => {
                // First try to match by address (most reliable)
                let matchedRow = data.address
                  ? rows.find(
                      (r) =>
                        r.contractAddress?.toLowerCase() ===
                        data.address?.toLowerCase()
                    )
                  : null;

                // Fallback: try to match by name if address matching fails
                if (!matchedRow) {
                  matchedRow =
                    rows.find((r) => r.metadata?.name === data.name) ?? null;
                }
                const linkContract =
                  matchedRow?.contractAddress ??
                  data.address ??
                  PRIMARY_MONAD_CONTRACT;
                return (
                  <MissionCard
                    key={`${data.name}-${i}`}
                    text={data.name}
                    link={`/mint/${linkContract}`}
                    // mark as minted if any owned NFT has the same name
                    status={ownedNameSet.has(data.name)}
                    onClick={() => {
                      router.push(`/mint/${linkContract}`);
                    }}
                    disabled={!isMintAble}
                  />
                );
              })}
          </div>

          <LetLlamaoButton
            allMissionsCompleted={isMintAble}
            onMintClick={() => {
              // default to primary if you just want a generic CTA
              router.push(`/mint/${PRIMARY_MONAD_CONTRACT}`);
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
            <div className="flex flex-col gap-2">
              {ownedRows.map((row) => (
                <MissionCard
                  key={row.contractAddress}
                  text={`${row.metadata?.name ?? "NFT"}`}
                  link={`/mint/${row.contractAddress}`}
                  status={true}
                  onClick={() => {
                    router.push(`/mint/${row.contractAddress}`);
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
