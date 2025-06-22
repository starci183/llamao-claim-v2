import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Header } from "../common/header";
import SubHeaderHome from "./home/sub-header-home";

type HomeLayoutProps = {
  headerIcon?: string;
  subHeader?: boolean;
  children?: React.ReactNode;
  className?: string;
  text?: string;
  boxShadowOuter?: string;
  boxShadowInner?: string;
};

export default function MainLayout({
  children,
  text,
  headerIcon,
  subHeader = true,
  className = "",
  boxShadowOuter = "box-shadow-primary",
  boxShadowInner = "box-shadow-secondary",
  ...props
}: HomeLayoutProps) {
  return (
    <div className="w-full flex bg-background items-center justify-center px-2 sm:px-4 lg:px-6">
      <div
        className={cn(
          "p-1 bg-[#C3C3C3] w-full md:w-fit container mx-auto",
          boxShadowOuter
        )}
      >
        <Header
          text={text || "Llamao Web Testnet"}
          icon={
            headerIcon ? (
              <Image
                src={headerIcon}
                alt="Llamao Web Testnet"
                width={64}
                height={64}
                className="size-4 sm:size-6 max-w-none"
              />
            ) : null
          }
          className="w-full"
          subHeader={subHeader && <SubHeaderHome />}
        />
        <div
          className={cn("p-2 sm:p-4 lg:p-6", className, boxShadowInner)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
