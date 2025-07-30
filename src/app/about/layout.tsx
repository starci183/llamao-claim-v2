"use client";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";

import { cn } from "@/lib/utils";
import React from "react";

type AboutLayoutProps = {
  children: React.ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div
      className={cn(
        "flex flex-col min-h-screen items-center justify-start",
        "gap-2 md:gap-4 px-2 sm:px-4 lg:px-0"
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
    </div>
  );
}
