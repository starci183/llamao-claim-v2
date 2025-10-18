
"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/common/button";
import { truncateAddress, cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { Block } from "@/svg";
import { type ConnectedWalletInfo } from "@reown/appkit/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AddressButtonProps = {
  hovered: boolean;
  setHoveredAction: (hovered: boolean) => void;
  address: string;
  walletInfo: ConnectedWalletInfo;
};

export default function AddressButton({
  hovered,
  setHoveredAction,
  address,
  walletInfo,
}: AddressButtonProps) {
  const { logout } = useAuth();
  const router = useRouter();
  if (!address && !walletInfo) {
    return <Loading />;
  }

  return (
    <Button
      intent={"gradient"}
      doubleIcon
      className={cn("text-2xl p-2 flex items-center justify-center gap-2")}
      style={
        hovered
          ? {
              background: "linear-gradient(90deg, #FF575A 0%, #FFACFF 100%)",
            }
          : {}
      }
      icon={
        hovered ? (
          <Block width={24} height={24} className={cn("w-6")} />
        ) : (
          walletInfo.icon && (
            <Image
              src={walletInfo.icon}
              alt="wallet"
              width={24}
              height={24}
              className={cn("w-6")}
            />
          )
        )
      }
      onMouseEnter={() => setHoveredAction(true)}
      onMouseLeave={() => setHoveredAction(false)}
    >
      {hovered ? (
        <span
          className={cn("text-base")}
          onClick={() => {
            try {
              logout();
            } catch {
              //TODO: handle error logging
            } finally {
              router.replace("/");
            }
          }}
        >
          Log Out
        </span>
      ) : (
        <span className={cn("text-base")}>{truncateAddress(address)}</span>
      )}
    </Button>
  );
}
