"use client";

import { Button } from "@/components/common/button";
import MissionCard from "@/components/layouts/portal/mission-card";
import Tabs, {
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs/tabs";
import { MONAD_CONTRACT_ADDRESS } from "@/contance";
import { useWalletContext } from "@/context/wallet-context";
import { useContract } from "@/hooks/use-contract";
import { useNftMetadata } from "@/hooks/use-nft-meta-data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const missionGroups = [
  {
    title: "A. Llamaoism Guidebook",
    bg: "bg-[url('/gifs/llamao_newpope.gif')] bg-cover",
    missions: [
      { text: "1. LLAMAO", status: true, link: "/mint" },
      { text: "2. LLAMAO", status: false, link: "/mint" },
    ],
  },
];

export default function LlamaoismContent() {
  const router = useRouter();
  const { isConnected } = useWalletContext();
  const { toast } = useToast();
  const { balance } = useContract(MONAD_CONTRACT_ADDRESS);
  const { data: nftMetadata } = useNftMetadata();
  const { user } = useAuth();

  // Correct minted flag: hasMinted = true when balance > 0
  const hasMinted = useMemo(() => !!balance && balance !== "0", [balance]);

  // All eligibility checks must be true
  const isMintAble = Boolean(
    user?.followX && user?.commentXPost && user?.joinDiscord && user?.likeXPost
  );

  const [tab, setTab] = useState<"new" | "minted">("new");

  const mintDisabled = !isConnected || !isMintAble || hasMinted;

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
            className="transform transition-all hover:scale-105"
          >
            Minted
          </TabsTrigger>
        </TabsList>

        {/* ---------------- New tab ---------------- */}
        <TabsContent value="new" className="mt-2">
          {missionGroups.map((group) => (
            <div key={group.title} className="overflow-hidden mb-2 space-y-2">
              {/* Optional header bg */}
              {/* <div className={`text-xs md:text-sm h-full font-bold p-2 box-shadow-primary ${group.bg} text-white bg-center`}>
                {group.title}
              </div> */}
              <div className="flex flex-col gap-2">
                {group.missions.map((mission, i) => (
                  <MissionCard
                    key={i}
                    text={mission.text}
                    link={mission.link}
                    status={mission.status}
                    onClick={() => {
                      if (!mission.status) router.push(mission.link);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          <Button
            icon={
              <Image
                src={"/gifs/llamao_zenmonad.gif"}
                alt="llamao_zenmonad"
                width={24}
                height={24}
                className="w-6 h-auto"
                priority
              />
            }
            doubleIcon
            disabled={mintDisabled}
            intent={"gradient"}
            className={cn(
              "w-full flex items-center justify-center text-base py-2 transform transition-all hover:scale-105",
              mintDisabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => {
              if (!isConnected) {
                toast({ message: "Please connect your wallet to proceed." });
                return;
              }
              if (!isMintAble) {
                toast({ message: "Please complete all missions to proceed." });
                return;
              }
              if (hasMinted) {
                toast({ message: "You have already minted." });
                return;
              }
              router.push("/mint");
            }}
          >
            Let’s llamao
          </Button>
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
