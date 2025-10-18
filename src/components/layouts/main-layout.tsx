"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { memo, useMemo } from "react";
import { Header } from "../common/header";

type MainLayoutProps = {
  headerIcon?: string;
  subHeader?: boolean;
  subHeaderComponent?: React.ReactNode;
  children?: React.ReactNode;
  wrapperClassName?: string;
  className?: string;
  text?: string;
  boxShadowOuter?: string;
  boxShadowInner?: string;
};

const MainLayout = memo<MainLayoutProps>(function MainLayout({
  children,
  text = "Claim Llamao Testnet",
  headerIcon, 
  wrapperClassName = "",
  className = "",
  boxShadowOuter = "box-shadow-primary",
  boxShadowInner = "box-shadow-secondary",
  ...props
}) {
  const headerIconElement = useMemo(() => {
    if (!headerIcon) return null;

    return (
      <Image
        src={headerIcon}
        alt="Llamao Web Testnet"
        width={64}
        height={64}
        className="size-4 sm:size-6 max-w-none"
        priority={false}
      />
    );
  }, [headerIcon]);

  return (
    <div
      className={cn(
        "w-full flex bg-background items-center justify-center overflow-hidden",
        "px-2 sm:px-4 lg:px-6"
      )}
    >
      <div
        className={cn(
          "p-1 bg-[#C3C3C3] w-[80%] md:w-fit min-w-[320px] container mx-auto",
          wrapperClassName,
          boxShadowOuter
        )}
      >
        <Header
          text={text}
          icon={headerIconElement}
          className={cn("w-full")}
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
});

export default MainLayout;
