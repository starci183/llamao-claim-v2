"use client";

import { Button } from "@/components/common/button";
import MainLayout from "@/components/layouts/main-layout";
import Mission from "@/components/layouts/portal/mission";
import Select from "@/components/ui/select/select";
import Switch from "@/components/ui/switch/switch";
import Image from "next/image";
import { useState } from "react";
import AddressButton from "./components/address-button";
import { useAppKitAccount, useWalletInfo } from "@reown/appkit/react";
import Loading from "../loading";

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
    <MainLayout
      headerIcon="/gifs/llamao_majestic_run.gif"
      className="space-y-4"
    >
      <div className="px-2 md:px-4 space-y-2">
        <div className="">
          <Image
            src={"/images/home.svg"}
            alt="Llamao Web Testnet"
            width={295}
            height={219}
            className="w-full md:w-[295px] h-auto max-w-none mx-auto"
            priority
          />
        </div>
        {/* Wallet Address */}
        <div className="flex w-full flex-col text-center justify-center">
          <AddressButton
            hovered={hovered}
            setHoveredAction={setHovered}
            address={address}
            walletInfo={walletInfo}
          />
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-2">
          <Switch
            size={"lg"}
            width={"full"}
            onText="Llamao-ism"
            offText="Eligibility"
            onIcon={
              <Image
                src={"/icons/ball_1.svg"}
                alt="Llamao Icon"
                width={24}
                height={24}
                className="w-6 h-auto"
              />
            }
            offIcon={
              <Image
                src={"/icons/ball_1.svg"}
                alt="Eligibility Icon"
                width={24}
                height={24}
                className="w-6 h-auto"
              />
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between gap-2">
          <h1 className="text-sm md:text-base text-black">Filter Status</h1>
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder=""
            size="sm"
            defaultValue="all"
            width="fixed"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Mission missions={missions} />
        </div>
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
      </div>
    </MainLayout>
  );
}
