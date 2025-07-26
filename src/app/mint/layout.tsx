"use client";

import { Button } from "@/components/common/button";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function MintLayout({ children }: PropsWithChildren) {
  const navigation = useRouter();
  return (
    <div
      className={cn(
        "flex flex-col items-center min-h-screen w-full",
        "gap-2 md:gap-4 px-2 sm:px-4 lg:px-0"
      )}
    >
      <Navbar navbarItems={items} />
      <div className={cn("w-full flex justify-center")}>
        <MainLayout
          text="Mint"
          subHeader={false}
          className={cn("p-1 sm:p-2 lg:p-4")}
          wrapperClassName={cn(
            "w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto"
          )}
        >
          {children}
        </MainLayout>
      </div>
      <div className={cn("w-full flex justify-center")}>
        <Button
          intent="gradient"
          className={cn(
            "px-4 py-1 sm:px-6 sm:py-2.5 md:px-8 md:py-2",
            "min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px]",
            "flex items-center justify-center text-sm sm:text-base md:text-lg"
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
          onClick={() => navigation.push("/portal")}
        >
          Back to Portal
        </Button>
      </div>
    </div>
  );
}
