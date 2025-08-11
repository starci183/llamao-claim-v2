"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/common/button";
import Popover from "@/components/ui/tooltip/tooltip";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useWalletContext } from "@/context/wallet-context";

export type LetLlamaoButtonProps = {
  allMissionsCompleted: boolean;
  onMintClick: () => void;
};

export default function LetLlamaoButton({
  allMissionsCompleted,
  onMintClick,
}: LetLlamaoButtonProps) {
  const [mintHovered, setMintHovered] = useState(false);
  const mintAnchorRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useWalletContext();
  const { toast } = useToast();

  const handleClick = () => {
    if (!isConnected) {
      toast({ message: "Please connect your wallet to proceed." });
      return;
    }
    if (!allMissionsCompleted) {
      toast({ message: "Please complete all missions to proceed." });
      return;
    }
    onMintClick();
  };

  return (
    <motion.div className={cn("mt-2 relative")}>
      <div
        className="relative"
        ref={mintAnchorRef}
        onMouseEnter={() => setMintHovered(true)}
        onMouseLeave={() => setMintHovered(false)}
      >
        <Button
          icon={
            <Image
              src={"/gifs/llamao_zenmonad.gif"}
              alt="llamao_zenmonad"
              width={24}
              height={24}
              className={cn("w-6 h-6")}
              priority
            />
          }
          doubleIcon
          intent={"gradient"}
          className={cn(
            "w-full flex items-center justify-center text-base py-2",
            "transform transition-all hover:scale-105",
            "from-[#D550D5] to-[#805fD4]",
            !allMissionsCompleted && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleClick}
          disabled={!allMissionsCompleted}
        >
          Let&apos;s Llamao
        </Button>

        <Popover
          open={mintHovered && !allMissionsCompleted}
          anchorRef={mintAnchorRef as React.RefObject<HTMLElement>}
          side="bottom"
          align="center"
          offset={12}
          onClose={() => setMintHovered(false)}
        >
          <div className="relative z-20 flex flex-col min-w-[240px] max-w-[320px] bg-[#FEFBEA] border border-[#B2A280] rounded-md shadow-lg px-3 py-2 text-[12px] text-[#602C2C] font-pp-neuebit animate-fade-in">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#FEFBEA] border-l border-t border-[#B2A280]" />
            <span className="text-center text-xl">
              Please do all the quests to be able to mint
            </span>
          </div>
        </Popover>
      </div>
    </motion.div>
  );
}
