"use client";

import { Button } from "@/components/common/button";
import MainLayout from "@/components/layouts/main-layout";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ConnectWalletButton from "../components/button-connect-wallet";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useRouter();
  useEffect(() => {
    //when user is authenticated, redirect to portal
    if (isAuthenticated) {
      navigate.push("/rewards");
    }
  }, [isAuthenticated]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <MainLayout headerIcon="/gifs/llamao_majestic_run.gif">
        <Image
          src={"/images/home.svg"}
          alt="Claim Llamao Testnet"
          width={430}
          height={320}
          className="w-full md:w-[430] h-auto max-w-none mx-auto"
          priority
        />
        <div className="flex flex-col mt-4 gap-2 text-center justify-center text-lg text-gray-700">
          <ConnectWalletButton className="py-3" />
        </div>
      </MainLayout>
    </div>
  );
}
