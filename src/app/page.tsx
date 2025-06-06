// "use client";

import { Button } from "@/components/common/button";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <MainLayout headerIcon="/gifs/llamao_majestic_run.gif">
        <Image
          src={"/images/home.svg"}
          alt="Llamao Web Testnet"
          width={430}
          height={320}
          className="w-full md:w-[430] h-auto max-w-none mx-auto"
          priority
        />
        <div className="flex flex-col mt-4 gap-2 text-center justify-center text-lg text-gray-700">
          <Button
            intent="gradient"
            className="text-3xl flex items-center justify-center gap-2 py-2"
            doubleIcon
            icon={
              <Image
                src={"/icons/wallet.svg"}
                alt="Connect Wallet"
                width={24}
                height={24}
                className="w-6 h-auto"
              />
            }
          >
            Connect Wallet
          </Button>
          <Button intent="primary" className="text-3xl py-2">
            Connect Later
          </Button>
        </div>
      </MainLayout>
    </div>
  );
}
