"use client";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";
import Carousel from "./components/carousel";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center w-full h-screen overflow-auto",
        "px-2 sm:px-4 lg:px-0"
      )}
    >
      <Navbar navbarItems={items} />
      {/* Main Content */}
      <div className={cn("flex-1 w-full flex justify-center")}>
        <MainLayout
          text="Portal"
          headerIcon="/gifs/llamao_majestic_run.gif"
          className={cn(
            "w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl overflow-hidden space-y-2",
            "p-1.5 sm:p-2 md:p-3 lg:p-4"
          )}
        >
          {children}
        </MainLayout>
      </div>
      {/* Carousel Section */}
      <div className={cn("w-full flex justify-center", "mt-4")}>
        <div className={cn("w-full max-w-md sm:max-w-lg lg:max-w-2xl")}>
          <div
            className={cn(
              "h-[120px] md:h-[140px] lg:h-[160px] overflow-hidden"
            )}
          >
            <Carousel />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
