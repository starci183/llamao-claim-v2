"use client";

import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useWalletAuth } from "@/hooks/use-wallet-auth"; // ← NEW
import { useAuth } from "@/providers/auth-provider";

type Props = { className?: string };

export default function ConnectWalletButton({ className }: Props) {
  const { connectAndSign, loading } = useWalletAuth();
  const { isAuthenticated } = useAuth();

  return (
    <Button
      intent="gradient"
      className={cn(
        "text-3xl flex items-center justify-center gap-2",
        className
      )}
      doubleIcon
      disabled={loading}
      onClick={connectAndSign}
      icon={
        <Image
          src="/icons/wallet.svg"
          alt="Connect Wallet"
          width={24}
          height={24}
          className="w-6 h-auto"
        />
      }
    >
      {isAuthenticated
        ? "Connected"
        : loading
        ? "Authorizing…"
        : "Connect Wallet"}
    </Button>
  );
}
