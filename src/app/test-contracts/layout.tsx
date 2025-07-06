import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import React from "react";

type TestContractsLayoutProps = {
  children: React.ReactNode;
};

export default function TestContractsLayout({
  children,
}: TestContractsLayoutProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 min-h-screen items-center justify-start">
      <Navbar navbarItems={items} />
      <MainLayout
        text="Contract Testing"
        subHeader={false}
        className="p-1 sm:p-2 lg:p-4"
        wrapperClassName="max-w-full w-full mx-auto"
      >
        {children}
      </MainLayout>
    </div>
  );
}
