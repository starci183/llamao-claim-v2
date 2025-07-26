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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConnectWalletButton from "../components/button-connect-wallet";
import AddressButton from "./components/address-button";
import LlamaoismContent from "./components/llamaoism";

const missions = [
  {
    text: "Follow Llamao on X",
    link: "https://x.com/intent/follow?screen_name=cifarmonsol",
    status: false,
  },
  {
    text: "Join our Llamao’s Discord",
    link: "https://discord.gg/dYHEMU4b",
    status: false,
  },
  {
    text: "Like X Posts",
    link: "",
    status: false,
  },
  {
    text: "Comment on X",
    link: "/portal/rewards",
    status: false,
  },
];

export default function Portal() {
  const [hovered, setHovered] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [tabValue, setTabValue] = useState("eligibility");

  const { isConnected, address, walletInfo } = useWalletContext();
  const navigation = useRouter();
  const { toast } = useToast();

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col items-center w-full",
        "px-2 sm:px-4 lg:px-0 py-0.5",
        "mx-auto"
      )}
    >
      <div className={cn("w-full flex justify-center")}>
        <motion.div className={cn("w-full max-w-md sm:max-w-lg lg:max-w-xl")}>
          <Image
            src={"/images/home.svg"}
            alt="Llamao Web Testnet"
            width={200}
            height={150}
            className={cn(
              "w-full h-auto max-w-none mx-auto",
              "md:min-w-[240px] aspect-[4/3]"
            )}
            priority
          />
        </motion.div>
      </div>
      <div className={cn("w-full flex justify-center", "mt-1")}>
        <motion.div className={cn("w-full max-w-md sm:max-w-lg lg:max-w-2xl")}>
          {/* Wallet Address */}
          <motion.div
            className={cn("flex w-full flex-col text-center justify-center")}
          >
            {isConnected && address && walletInfo ? (
              <AddressButton
                hovered={hovered}
                setHoveredAction={setHovered}
                address={address}
                walletInfo={walletInfo}
              />
            ) : (
              <ConnectWalletButton
                className={cn(
                  "py-2 text-xl",
                  "hover:scale-105 transform transition-all"
                )}
              />
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
                    message: "Please connect your wallet to view Llamaoism.",
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
                      className="w-6 h-auto"
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
                      className="w-6 h-auto"
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
                      "gap-2"
                    )}
                  >
                    <Mission missions={missions} />
                  </motion.div>
                  <motion.div className={cn("mt-2")}>
                    <Button
                      icon={
                        <Image
                          src={"/gifs/llamao_zenmonad.gif"}
                          alt="llamao_zenmonad"
                          width={24}
                          height={24}
                          className={cn("w-6 h-auto")}
                          priority
                        />
                      }
                      doubleIcon
                      intent={"gradient"}
                      className={cn(
                        "w-full flex items-center justify-center text-base py-2",
                        "transform transition-all hover:scale-105"
                      )}
                      onClick={() => {
                        if (!isConnected) {
                          toast({
                            message: "Please connect your wallet to proceed.",
                          });
                          return;
                        }
                        navigation.push("/mint");
                      }}
                    >
                      Let’s Llamao
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
  );
}
