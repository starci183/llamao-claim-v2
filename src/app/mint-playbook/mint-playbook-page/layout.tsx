"use client";

import { Button } from "@/components/common/button";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";
import { useRouter } from "next/navigation";

type MintPlaybookPageLayoutProps = {
  children: React.ReactNode;
};

export default function MintPlaybookPageLayout({
  children,
}: MintPlaybookPageLayoutProps) {
  const navigation = useRouter();
  return (
    <div className="flex flex-col gap-0 sm:gap-2 md:gap-4 min-h-screen items-center justify-center">
      <MainLayout
        text="Mint"
        subHeader={false}
        className="p-1 sm:p-2 lg:p-4"
        wrapperClassName="w-full h-full mx-auto"
      >
        {children}
      </MainLayout>
      <Button
        intent="gradient"
        className="px-4 py-1 sm:px-6 sm:py-2.5 md:px-8 md:py-2 min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex items-center justify-center text-sm sm:text-base md:text-lg mt-4"
        doubleIcon
        icon={
          <Image
            src="/gifs/llamao_zenmonad.gif"
            alt="llamao_zenmonad"
            width={24}
            height={24}
            quality={100}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
          />
        }
        onClick={() => navigation.push("/rewards")}
      >
        Back to Portal
      </Button>
    </div>
  );
}
