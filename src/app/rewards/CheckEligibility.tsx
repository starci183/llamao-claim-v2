"use client";

import { useWalletContext } from "@/context/wallet-context";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import ConnectWalletButton from "../../components/button-connect-wallet";
import AddressButton from "./AddressButton";
import { useState } from "react";

export default function CheckEligibility() {
  const { isConnected, address, walletInfo } = useWalletContext();
  const [addrHovered, setAddrHovered] = useState(false);
  return (
    <div className="overflow-visible">
      <motion.div
        className={cn(
          "origin-top",
          "transition-transform duration-300 ease-in-out",
          "scale-[0.85] sm:scale-[0.9] md:scale-100"
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center w-full",
            "px-2 sm:px-4 lg:px-0 py-0.5",
            "mx-0"
          )}
        >
          {/* --- IMAGE SECTION --- */}
          <div className="w-full flex justify-center">
            <motion.div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <Image
                src="/images/home.svg"
                alt="Llamao Web Testnet"
                width={200}
                height={150}
                className={cn(
                  "w-full h-full max-w-none mx-0",
                  "md:min-w-[240px] aspect-[4/3]"
                )}
                priority
              />
            </motion.div>
          </div>

          {/* --- CONNECT OR ELIGIBILITY SECTION --- */}
          <div className="w-full flex justify-center mt-2">
            <motion.div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
              <div className="flex flex-col w-full text-center justify-center">
                {isConnected && address && walletInfo ? (
                  <AddressButton 
                    hovered={addrHovered}
                    setHoveredAction={setAddrHovered}
                    address={address}
                    walletInfo={walletInfo}
                  />
                ) : (
                  <ConnectWalletButton className="py-3" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}