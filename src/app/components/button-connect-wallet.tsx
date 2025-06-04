"use client";
import { Button } from "@/components/common/button";
import {
  useAppKit,
  useAppKitAccount,
  useWalletInfo,
} from "@reown/appkit/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();
  const { walletInfo } = useWalletInfo();
  const router = useRouter();

  useEffect(() => {
    if (address && walletInfo) {
      router.push("/portal");
    }
  }, [address, walletInfo, router]);

  return (
    <Button
      intent="gradient"
      className="text-3xl flex items-center justify-center gap-2"
      doubleIcon
      onClick={() => {
        open();
      }}
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
  );
}
