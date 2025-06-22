import { Button } from "@/components/common/button";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";
import ConnectWalletButton from "./components/button-connect-wallet";

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
          <ConnectWalletButton />
          <Button intent="primary" className="text-3xl py-2">
            Connect Later
          </Button>
        </div>
      </MainLayout>
    </div>
  );
}
