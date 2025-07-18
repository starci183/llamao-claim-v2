"use client";

import { Button } from "@/components/common/button";
import MissionCard from "@/components/layouts/portal/mission-card";
import Tabs, { TabsList, TabsTrigger } from "@/components/ui/tabs/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";

const missionGroups = [
  {
    title: "A. Llamaoism Guidebook",
    bg: "bg-[url('/gifs/llamao_newpope.gif')] bg-cover",
    missions: [
      { text: "1. LLAMAO", status: true, link: "/mint" },
      { text: "2. LLAMAO", status: false, link: "/mint" },
    ],
  },
  {
    title: "B. Llamaoism Guidebook",
    bg: "bg-[url('/gifs/llamao_newpope.gif')] bg-cover",
    missions: [
      { text: "1. LLAMAO", status: true, link: "/mint" },
      { text: "2. LLAMAO", status: false, link: "/mint-playbook" },
    ],
  },
];

export default function LlamaoismContent() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-2">
      <Tabs defaultValue="new">
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
      </Tabs>
      {missionGroups.map((group) => (
        <div key={group.title} className=" overflow-hidden mb-2 space-y-2">
          <div
            className={`text-xs md:text-sm h-full font-bold p-2 box-shadow-primary ${group.bg} text-white bg-center`}
          >
            {group.title}
          </div>
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
        intent={"gradient"}
        className="w-full flex items-center justify-center text-base py-2 transform transition-all hover:scale-105"
      >
        Let’s llamao
      </Button>
    </div>
  );
}
