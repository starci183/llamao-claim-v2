"use client";
import { Button } from "@/components/common/button";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import { useDisconnect } from "@reown/appkit/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import React from "react";

type AboutLayoutProps = {
  children: React.ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  const navigation = useRouter();
  const { disconnect } = useDisconnect();

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen items-center justify-start",
        "gap-4 md:gap-8 px-2 sm:px-4 lg:px-0"
      )}
    >
      <Navbar navbarItems={items} />
      <div className={cn("w-full flex justify-center")}>
        <MainLayout
          subHeader={false}
          text="Homepage"
          className={cn(
            "!px-0 !py-0.5 w-full max-w-md sm:max-w-xl lg:max-w-2xl h-full"
          )}
          boxShadowOuter="box-shadow-about"
          boxShadowInner=""
        >
          {children}
        </MainLayout>
      </div>
      <div className={cn("w-full flex justify-center mt-2 md:mt-4")}>
        <Button
          intent="gradient"
          className={cn(
            "flex items-center justify-center",
            "px-4 py-1 sm:px-6 sm:py-2.5 md:px-8 md:py-2",
            "min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px]",
            "text-sm sm:text-base md:text-lg"
          )}
          doubleIcon
          icon={
            <Image
              src="/gifs/llamao_zenmonad.gif"
              alt="llamao_zenmonad"
              width={24}
              height={24}
              quality={100}
              className={cn("w-4 h-4", "sm:w-5 sm:h-5", "md:w-6 md:h-6")}
            />
          }
          onClick={() => {
            try {
              disconnect();
            } catch {
              //TODO: handle error logging
            } finally {
              navigation.push("/");
            }
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
