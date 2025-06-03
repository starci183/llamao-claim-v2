import Image from "next/image";
import React from "react";
import { Header } from "../common/header";
import SubHeaderHome from "./home/sub-header-home";

type HomeLayoutProps = {
  headerIcon?: string;
  subHeader?: boolean;
  children?: React.ReactNode;
};

export default function MainLayout({
  children,
  headerIcon,
  subHeader = true,
}: HomeLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen bg-background px-4 py-8">
      <div className="box-shadow-primary p-1 bg-[#C3C3C3] w-full lg:w-fit">
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
        <div className="p-2 sm:p-4 lg:p-6 box-shadow-secondary">{children}</div>
      </div>
    </div>
  );
}
