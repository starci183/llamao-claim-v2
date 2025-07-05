"use client";

import { Button } from "@/components/common/button";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import Mission from "@/components/layouts/portal/mission";
import Select from "@/components/ui/select/select";
import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { useAppKitAccount, useWalletInfo } from "@reown/appkit/react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import Loading from "../loading";
import AddressButton from "./components/address-button";
import LlamaoismContent from "./components/llamaoism";

const missions = [
  {
    text: "Complete your profile",
    link: "/portal/profile",
    status: true,
  },
  {
    text: "Join the community",
    link: "/portal/community",
    status: false,
  },
  {
    text: "Participate in events",
    link: "/portal/events",
    status: false,
  },
  {
    text: "Earn rewards",
    link: "/portal/rewards",
    status: false,
  },
];

export default function Portal() {
  const [hovered, setHovered] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const { address } = useAppKitAccount();
  const { walletInfo } = useWalletInfo();

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  if (!address || !walletInfo) {
    return <Loading />;
  }

  return (
    <motion.div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
      <Navbar navbarItems={items} />
      <MainLayout
        text="Portal"
        headerIcon="/gifs/llamao_majestic_run.gif"
        className="space-y-4"
      >
        <div className="px-2 md:px-4 space-y-2">
          <motion.div>
            <Image
              src={"/images/home.svg"}
              alt="Llamao Web Testnet"
              width={295}
              height={219}
              className="w-full md:min-w-[330px] h-auto max-w-none mx-auto"
              priority
            />
          </motion.div>
          {/* Wallet Address */}
          <motion.div className="flex w-full flex-col text-center justify-center">
            <AddressButton
              hovered={hovered}
              setHoveredAction={setHovered}
              address={address}
              walletInfo={walletInfo}
            />
          </motion.div>
          <motion.div className="flex flex-col text-center justify-center gap-2">
            <Tabs defaultValue="eligibility">
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
                >
                  Llamao-ism
                </TabsTrigger>
              </TabsList>
              <TabsContent value="eligibility">
                {address ? (
                  <Tabs defaultValue="social">
                    <TabsList background="secondary">
                      <TabsTrigger value="social" variant="primary">
                        Social
                      </TabsTrigger>
                      <TabsTrigger value="partner" variant="primary">
                        Partner
                      </TabsTrigger>
                      <TabsTrigger value="referrals" variant="primary">
                        Referrals
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="social">
                      <motion.div className="flex flex-row items-center justify-between gap-2 whitespace-nowrap">
                        <h1 className="text-sm md:text-base text-black">
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
                      <motion.div className="flex flex-col items-center justify-center gap-2">
                        <Mission missions={missions} />
                      </motion.div>
                      <motion.div className="mt-2">
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
                          className="w-full flex items-center justify-center text-base py-2"
                        >
                          Let’s Llamao
                        </Button>
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                ) : null}
              </TabsContent>
              <TabsContent value="llamaoism">
                {address ? <LlamaoismContent /> : null}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </MainLayout>
    </motion.div>
  );
}
