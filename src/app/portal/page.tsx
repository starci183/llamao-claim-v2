"use client";

import Mission from "@/components/layouts/portal/mission";
import Select from "@/components/ui/select/select";
import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { HOME_FILTERS } from "@/contance";
import { useWalletContext } from "@/context/wallet-context";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { userService } from "@/service/user/user-service";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConnectWalletButton from "../../components/button-connect-wallet";
import AddressButton from "./components/address-button";
import LetLlamaoButton from "./components/let-llmao-button";
import LlamaoismContent from "./components/llamaoism";

export default function Portal() {
  // separate hover states so they don't interfere
  const [addrHovered, setAddrHovered] = useState(false);

  const [filterStatus, setFilterStatus] = useState("all");
  const [tabValue, setTabValue] = useState("eligibility");

  const { isConnected, address, walletInfo } = useWalletContext();
  const { user, walletAddress, refreshUser, isAuthenticated, accessToken } =
    useAuth();
  const navigation = useRouter();
  const { toast } = useToast();

  const handleMissionClick = async (missionType: string) => {
    if (!walletAddress) {
      toast({
        message: "Wallet not connected",
        variant: "error",
        duration: 5000,
      });
      return;
    }

    try {
      switch (missionType) {
        case "followX":
          await userService.updateFollowX();
          break;
        case "followNadDomains":
          await userService.updateSeason2({
            followNadDomains: true,
          });
          break;
        case "likeXPost":
          await userService.updateSeason2({
            likeXPost: true,
          });
          break;
        case "commentXPost":
          await userService.updateSeason2({
            commentXPost: true,
          });
          break;
        case "likeSeason2Post":
          await userService.updateSeason2({
            likeSeason2Post: true,
          });
          break;
        case "commentSeason2Post":
          await userService.updateSeason2({
            commentSeason2Post: true,
          });
          break;
      }
      await refreshUser();
      toast({
        message: "Mission status updated",
        variant: "success",
        duration: 5000,
      });
    } catch {
      toast({
        message: "Failed to update mission status",
        variant: "error",
        duration: 5000,
      });
    }
  };

  const missions = [
    {
      text: "Follow Llamao on X",
      link: "https://x.com/llamao_",
      status: user?.followX || false,
      type: "followX" as const,
    },
    {
      text: "Follow NadDomains on X",
      link: "https://x.com/NadDomains",
      status: user?.season2?.followNadDomains || false,
      type: "followNadDomains" as const,
    },
    {
      text: "Like X Posts",
      link: "https://x.com/llamao_/status/1950134789652295987",
      status: user?.season2?.likeXPost || false,
      type: "likeXPost" as const,
    },
    {
      text: "Retweet X Post",
      link: "https://x.com/llamao_/status/1950134789652295987",
      status: user?.season2?.commentXPost || false,
      type: "commentXPost" as const,
    },
    {
      text: "Like page 2 Post",
      link: "https://x.com/llamao_/status/1959179283563425929",
      status: user?.season2?.likeSeason2Post || false,
      type: "likeSeason2Post" as const,
    },
    {
      text: "Retweet page 2 Post",
      link: "https://x.com/llamao_/status/1959179283563425929",
      status: user?.season2?.commentSeason2Post || false,
      type: "commentSeason2Post" as const,
    },
  ];

  const filteredMissions = missions.filter((mission) => {
    switch (filterStatus) {
      case "active":
        return !mission.status;
      case "completed":
        return mission.status;
      case "pending":
        return !mission.status;
      case "failed":
        return false;
      default:
        return true;
    }
  });

  const allMissionsCompleted = missions.every((m) => m.status);

  return (
    <div className="overflow-visible">
      <motion.div
        className={cn(
          "origin-top",
          "transition-transform duration-300 ease-in-out",
          "scale-[0.85]  sm:scale-[0.9]  md:scale-100"
        )}
      >
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
                    hovered={addrHovered}
                    setHoveredAction={setAddrHovered}
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
                    if (
                      value === "llamaoism" &&
                      (!isConnected || !isAuthenticated)
                    ) {
                      toast({
                        message: !isConnected
                          ? "Please connect your wallet to view Llamaoism."
                          : "Please sign in to view Llamaoism.",
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
                          options={HOME_FILTERS}
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
                          "flex flex-col items-center",
                          "gap-2 h-[150px] mt-4 overflow-auto"
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

                      {/* <motion.div className={cn("mt-2 relative")}>
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

                          <Popover
                            open={mintHovered && !allMissionsCompleted}
                            anchorRef={
                              mintAnchorRef as React.RefObject<HTMLElement>
                            }
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
                      </motion.div> */}
                      <LetLlamaoButton
                        allMissionsCompleted={allMissionsCompleted}
                        onMintClick={() => {
                          if (!isConnected) {
                            toast({
                              message: "Please connect your wallet to proceed.",
                            });
                            return;
                          }
                          navigation.push("/mint");
                        }}
                      />
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
