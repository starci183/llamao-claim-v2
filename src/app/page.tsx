import { Button } from "@/components/common/button";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";
import ConnectWalletButton from "./components/button-connect-wallet";

export default function Home() {
  return (
    <MainLayout headerIcon="/gifs/llamao_majestic_run.gif">
      <div className="p-2 md:p-4">
        <Image
          src={"/images/home.svg"}
          alt="Llamao Web Testnet"
          width={430}
          height={320}
          className="w-full md:w-[430] h-auto max-w-none mx-auto"
          priority
        />
      </div>
      <div className="flex flex-col p-4 gap-2 text-center justify-center text-lg text-gray-700">
        <ConnectWalletButton />
        <Button intent="primary" className="text-3xl">
          Connect Later
        </Button>
      </div>
    </MainLayout>
  );
}
