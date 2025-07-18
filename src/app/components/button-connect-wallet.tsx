"use client";
import { Button } from "@/components/common/button";
import { useSigner } from "@/hooks/use-signer";
import { cn } from "@/lib/utils";
import axiosClient from "@/service/axios-client";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ConnectWalletButtonProps = {
  className?: string;
};

export default function ConnectWalletButton({
  className,
}: ConnectWalletButtonProps) {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { signer } = useSigner();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const authenticateWallet = async () => {
      // Reset verification state when wallet disconnects
      if (!isConnected) {
        setIsVerified(false);
        setIsProcessing(false);
        return;
      }

      // Skip if already verified or processing
      if (!signer || isVerified || isProcessing) return;

      setIsProcessing(true);
      try {
        // Request message
        const { data } = await axiosClient.post("/request-message");
        if (!data?.message) return;

        // Sign message
        const signature = await signer.signMessage(data.message);

        // Verify signature
        await axiosClient.post("/verify-message", {
          message: data.message,
          signature,
        });

        setIsVerified(true);

        // Navigate to portal after successful verification
        if (address) {
          router.push("/portal");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setIsVerified(false);
      } finally {
        setIsProcessing(false);
      }
    };

    authenticateWallet();
  }, [isConnected, signer, address, isVerified, isProcessing, router]);

  return (
    <Button
      intent="gradient"
      className={cn(
        "text-3xl flex items-center justify-center gap-2",
        className
      )}
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
