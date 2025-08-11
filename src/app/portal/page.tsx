"use client";

import { Button } from "@/components/common/button";
import Mission from "@/components/layouts/portal/mission";
import Select from "@/components/ui/select/select";
import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { useWalletContext } from "@/context/wallet-context";
import { useAuth } from "@/providers/auth-provider";
import { userService } from "@/service/user/user-service";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConnectWalletButton from "../../components/button-connect-wallet";
import AddressButton from "./components/address-button";
import LlamaoismContent from "./components/llamaoism";

export default function Portal() {
  const [hovered, setHovered] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [tabValue, setTabValue] = useState("eligibility");

  const { isConnected, address, walletInfo } = useWalletContext();
  const { user, walletAddress, refreshUser, isAuthenticated, accessToken } =
    useAuth();
  const navigation = useRouter();
  const { toast } = useToast();

  const handleMissionClick = async (missionType: string) => {
    if (!walletAddress) {
      toast({ message: "Wallet not connected", variant: "error" });
      return;
    }

    try {
      switch (missionType) {
        case "followX":
          await userService.updateFollowX();
          break;
        case "joinDiscord":
          await userService.updateJoinDiscord();
          break;
        case "likeXPost":
          await userService.updateLikeXPost();
          break;
        case "commentXPost":
          await userService.updateCommentXPost();
          break;
      }

      // Refetch user data after successful update
      await refreshUser();

      toast({ message: "Mission status updated", variant: "success" });
    } catch {
      toast({ message: "Failed to update mission status", variant: "error" });
    }
  };

  const missions = [
    {
      text: "Follow Llamao on X",
      link: "https://x.com/intent/follow?screen_name=cifarmonsol",
      status: user?.followX || false,
      type: "followX" as const,
    },
    {
      text: "Join our Llamao's Discord",
      link: "https://discord.gg/dYHEMU4b",
      status: user?.joinDiscord || false,
      type: "joinDiscord" as const,
    },
    {
      text: "Like X Posts",
      link: "",
      status: user?.likeXPost || false,
      type: "likeXPost" as const,
    },
    {
      text: "Comment on X",
      link: "/portal/rewards",
      status: user?.commentXPost || false,
      type: "commentXPost" as const,
    },
  ];

  // Filter missions based on status
  const filteredMissions = missions.filter((mission) => {
    switch (filterStatus) {
      case "active":
        return !mission.status;
      case "completed":
        return mission.status;
      case "pending":
        return !mission.status;
      case "failed":
        return false; // No failed missions in this implementation
      default:
        return true; // "all" - show all missions
    }
  });

  // Check if all missions are completed
  const allMissionsCompleted = missions.every((mission) => mission.status);

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  return (
    <div className="flex w-full justify-center overflow-x-hidden">
      {/* NEW: responsive "frame" wrapper ------------- */}
      <motion.div
        // origin-top lets it shrink/grow downward so the title-bar
        // stays where you expect
        className={cn(
          "origin-top",
          "transition-transform duration-300 ease-in-out",
          /*   < 1024 px    768–1023        ≥ 1024       ≥ 1536  */
          "scale-[0.85]  sm:scale-[0.9]  md:scale-100",
          "max-h-screen overflow-y-auto"
        )}
      >
        {/* ▼—------- copy/paste your current JSX here -------▼ */}
        <div
          className={cn(
            "flex flex-col items-center w-full",
            "px-2 sm:px-4 lg:px-0 py-0.5",
            "mx-0"
          )}
        >
          <div className={cn("w-full flex justify-center")}>
            <motion.div
              className={cn("w-full max-w-md sm:max-w-lg lg:max-w-xl")}
            >
              <Image
                src={"/images/home.svg"}
                alt="Llamao Web Testnet"
                width={200}
                height={150}
                className={cn(
                  "w-full h-full max-w-none mx-0",
                  "md:min-w-[240px] aspect-[4/3]"
                )}
                priority
              />
            </motion.div>
          </div>
          <div className={cn("w-full flex justify-center", "mt-1")}>
            <motion.div
              className={cn("w-full max-w-md sm:max-w-lg lg:max-w-2xl")}
            >
              {/* Wallet Address */}
              <motion.div
                className={cn(
                  "flex w-full flex-col text-center justify-center"
                )}
              >
                {isAuthenticated && accessToken && address && walletInfo ? (
                  <AddressButton
                    hovered={hovered}
                    setHoveredAction={setHovered}
                    address={address}
                    walletInfo={walletInfo}
                  />
                ) : (
                  <ConnectWalletButton className="py-3" />
                )}
              </motion.div>
              <motion.div
                className={cn(
                  "flex flex-col text-center justify-center",
                  "gap-2 mt-4"
                )}
              >
                <Tabs
                  value={tabValue}
                  onValueChange={(value) => {
                    if (!isConnected && value === "llamaoism") {
                      toast({
                        message:
                          "Please connect your wallet to view Llamaoism.",
                      });
                      return;
                    }
                    setTabValue(value);
                  }}
                >
                  <TabsList>
                    <TabsTrigger
                      value="eligibility"
                      icon={
                        <Image
                          alt="ball"
                          src="/icons/ball_1.svg"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      }
                      iconPosition="right"
                      className="hover:scale-105 hover:text-primary transform transition-all"
                    >
                      Eligibility
                    </TabsTrigger>
                    <TabsTrigger
                      value="llamaoism"
                      icon={
                        <Image
                          alt="ball"
                          src="/icons/ball_1.svg"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      }
                      iconPosition="right"
                      className="hover:scale-105 hover:text-primary transform transition-all"
                    >
                      Llamaoism
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="eligibility">
                    <>
                      <motion.div
                        className={cn(
                          "flex flex-row items-center justify-between gap-2 whitespace-nowrap"
                        )}
                      >
                        <h1 className={cn("text-sm md:text-base text-black")}>
                          Filter Status
                        </h1>
                        <Select
                          options={statusOptions}
                          value={filterStatus}
                          onChange={setFilterStatus}
                          placeholder=""
                          size="sm"
                          defaultValue="all"
                          width="fixed"
                        />
                      </motion.div>
                      <motion.div
                        className={cn(
                          "flex flex-col items-center justify-center",
                          "gap-2 min-h-[150px]"
                        )}
                      >
                        {filteredMissions.length === 0 ? (
                          <div className={cn("text-center text-gray-500 py-8")}>
                            <p>No missions found for the selected filter.</p>
                            <p className={cn("text-sm mt-2")}>
                              Try changing the filter status to see more
                              missions.
                            </p>
                          </div>
                        ) : (
                          <Mission
                            missions={filteredMissions}
                            onMissionClick={handleMissionClick}
                          />
                        )}
                      </motion.div>
                      <motion.div className={cn("mt-2")}>
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
                            !allMissionsCompleted &&
                              "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() => {
                            if (!isConnected) {
                              toast({
                                message:
                                  "Please connect your wallet to proceed.",
                              });
                              return;
                            }
                            if (!allMissionsCompleted) {
                              toast({
                                message:
                                  "Please complete all missions to proceed.",
                              });
                              return;
                            }
                            navigation.push("/mint");
                          }}
                          disabled={!allMissionsCompleted}
                        >
                          Let&apos;s Llamao
                        </Button>
                      </motion.div>
                    </>
                  </TabsContent>
                  <TabsContent value="llamaoism">
                    <LlamaoismContent />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
