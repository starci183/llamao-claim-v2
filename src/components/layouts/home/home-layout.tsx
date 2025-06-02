import Image from "next/image";
import React from "react";
import { Header } from "../../common/header";
import SubHeaderHome from "./sub-header-home";

type HomeLayoutProps = {
  children?: React.ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-screen bg-background">
      <div className="box-shadow-primary p-1 bg-[#C3C3C3] w-fit">
        <Header
          text="Portal"
          icon={
            <Image
              src={"/gifs/Llamao-Web-Testnet.gif"}
              alt="Llamao Web Testnet"
              width={64}
              height={64}
              className="size-6 max-w-none"
            />
          }
          subHeader={<SubHeaderHome />}
          // className="w-full"
        />
        <div className="p-2 box-shadow-secondary">{children}</div>
      </div>
    </div>
  );
}
