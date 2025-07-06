"use client";

import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import TokenOperations from "@/components/common/token-operations-dashboard";

export default function TokenDashboard() {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 min-h-screen items-center justify-start">
      <Navbar navbarItems={items} />
      <MainLayout
        text="Token Operations"
        subHeader={false}
        className="p-1 sm:p-2 lg:p-4"
        wrapperClassName="max-w-full sm:max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[70%] mx-auto"
      >
        <TokenOperations />
      </MainLayout>
    </div>
  );
}
