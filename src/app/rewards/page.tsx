"use client";
import React, { useState } from "react";
import Collectibles from "./Collectibles";
import { cn } from "@/lib/utils";
import { RewardProgress } from "./RewardProgress";
import { motion } from "motion/react";
import { Button } from "@/components/common/button";
import {
  RewardTab,
  setOpenClaimRewardsDialog,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import AddressButton from "./AddressButton";
import { useWalletContext } from "@/context/wallet-context";
import Image from "next/image";
import Carousel from "./Carousel";
import { DialogContainer } from "./DialogContainer";
import { useAuth } from "@/providers/auth-provider";
const Page = () => { 
  const [addrHovered, setAddrHovered] = useState(false);
  const { address, walletInfo } = useWalletContext();
  const rewardTab = useAppSelector((state) => state.nftReducer.rewardTab);
  const dispatch = useAppDispatch();
  const { user } = useAuth()
  if (!address || !walletInfo) {
    return <div></div>;
  }
  return (
    <div className="py-12">
      <div className="w-full flex justify-center gap-4">
        <Button
          className="w-[100px]"
          onClick={() => {
            window.open("https://llamao.xyz", "_blank");
          }}
        >
          Mint Portal
        </Button>
        <AddressButton
          hovered={addrHovered}
          setHoveredAction={setAddrHovered}
          address={address}
          walletInfo={walletInfo}
        />
        <Button
          disabled
          className="w-[100px]"
          onClick={() => {
            window.open("https://llamao.xyz", "_blank");
          }}
        >
          Community
        </Button>
      </div>
      <div className="h-6" />
      <nav className="w-full flex justify-center gap-4">
        <Button
          intent={"ghost"}
          onClick={() => window.open("https://x.com/llamao_", "_blank")}
          className={cn("text-sm text-gray-300 p-0 whitespace-nowrap")}
        >
          Twitter
        </Button>
        <Button
          intent={"ghost"}
          onClick={() =>
            window.open("https://discord.com/invite/llamao", "_blank")
          }
          className={cn("text-sm text-gray-300 p-0 whitespace-nowrap")}
        >
          Discord
        </Button>
      </nav>
      <div className="h-12" />
      <div>
        <motion.div
          className={cn("relative text-6xl text-white font-bold text-center")}
          animate={{
            y: [0, -10, 0], // nảy lên rồi xuống
          }}
          style={{
            textShadow: `0 8px 0 #28248c`,
          }}
          transition={{
            duration: 2, // chu kỳ 2s
            ease: "easeInOut",
            repeat: Infinity, // lặp vô hạn
          }}
        >
          Claim Chapter Rewards
        </motion.div>
      </div>
      <div className="h-12" />
      <Image
        src="/left.gif"
        alt="llamao_promote_banner"
        width={300}
        height={300}
        className="mx-auto"
      />
      <div className="h-12" />
      {rewardTab === RewardTab.FcfsWhitelist && (
        <>
          <RewardProgress total={10} />
          <div className="h-4" />
          <Collectibles />
          {!user?.winner.winLlamaoAwakening && (
            <>
              <div className="h-12" />
              <div className="text-center text-sm text-gray-300">
                Your address is currently not whitelisted. Whitelisting is required
                to claim the final reward.
              </div>
            </>
          )}
          <div className="h-12" />
          <div className= "w-full flex justify-center">
            <Button intent="gradient" disabled={!user?.winner.winLlamaoAwakening} onClick={() => dispatch(setOpenClaimRewardsDialog(true))}>
              Claim Rewards
            </Button>
          </div>
        </>
      )}
      <div className="h-12" />
      <Carousel />
      <DialogContainer />
    </div>
  );
};

export default Page;
