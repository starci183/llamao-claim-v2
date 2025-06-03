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
};

export default function MainLayout({
  children,
  headerIcon,
  subHeader = true,
  className = "",
}: HomeLayoutProps) {
  return (
    <div className="w-full flex bg-background items-center justify-center min-h-screen px-2 sm:px-4 lg:px-6">
      <div className="box-shadow-primary p-1 bg-[#C3C3C3] w-full md:w-fit container">
        <Header
          text="Portal"
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
          className={cn("p-2 sm:p-4 lg:p-6 box-shadow-secondary", className)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
