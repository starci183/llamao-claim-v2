import { Button } from "@/components/common/button";
import HomeLayout from "@/components/layouts/home/home-layout";
import Image from "next/image";

export default function Home() {
  return (
    <HomeLayout>
      <div className="p-4">
        <Image
          src={"/images/home.svg"}
          alt="Llamao Web Testnet"
          width={430}
          height={320}
          className="w-[430px] h-auto max-w-none mx-auto"
          priority
        />
      </div>
      <div className="flex flex-col p-4 gap-2 text-center justify-center text-lg text-gray-700">
        <Button
          intent="gradient"
          className="text-3xl flex items-center justify-center gap-2"
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
        <Button intent="primary" className="text-3xl">
          Connect Later
        </Button>
      </div>
    </HomeLayout>
  );
}
