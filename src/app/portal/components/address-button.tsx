"use client";
import Loading from "@/app/loading";
import { Button } from "@/components/common/button";
import { truncateAddress } from "@/lib/utils";
import { Block } from "@/svg";
import { useDisconnect, type ConnectedWalletInfo } from "@reown/appkit/react";
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
  const { disconnect } = useDisconnect();
  const router = useRouter();
  if (!address && !walletInfo) {
    return <Loading />;
  }

  return (
    <Button
      intent={"gradient"}
      doubleIcon
      className={`text-2xl p-2 flex items-center justify-center gap-2`}
      style={
        hovered
          ? {
              background: "linear-gradient(90deg, #FF575A 0%, #FFACFF 100%)",
            }
          : {}
      }
      icon={
        hovered ? (
          <Block />
        ) : (
          <Image
            src={walletInfo.icon || "/images/wallet.svg"}
            alt="wallet"
            width={24}
            height={24}
            className="w-6"
          />
        )
      }
      onMouseEnter={() => setHoveredAction(true)}
      onMouseLeave={() => setHoveredAction(false)}
    >
      {hovered ? (
        <span
          className="text-2xl"
          onClick={() => {
            try {
              disconnect();
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
        <span className="text-2xl">{truncateAddress(address)}</span>
      )}
    </Button>
  );
}
