"use client";

import { Button } from "@/components/common/button";
import EnterButton from "@/components/common/enter-button";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import { useContract } from "@/hooks/use-contract";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Mint() {
  const navigation = useRouter();
  const { ipfsID } = useContract();
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-6 min-h-screen items-center justify-start">
      <Navbar navbarItems={items} />
      <MainLayout
        text="Mint"
        subHeader={false}
        className="p-1 sm:p-2 lg:p-4"
        wrapperClassName="max-w-full sm:max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%] 2xl:max-w-[70%] mx-auto"
      >
        <div className="relative w-full aspect-[690/606] max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[580px] overflow-hidden">
          <Image
            src="/gifs/llamao_homepage.gif"
            alt="llamao_about_background"
            width={690}
            height={606}
            className="w-full h-full object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <div className="relative max-w-[350px] sm:max-w-[450px] md:max-w-[450px] aspect-[4/3] w-full">
              <Image
                alt="book_cover"
                src="/images/book_from_llamao.svg"
                width={550}
                height={450}
                quality={100}
                priority
                className="w-full h-auto mt-3 sm:mt-4 md:mt-6 lg:mt-10"
              />

              {/* llamao image text */}
              <div className="absolute top-0 left-0 translate-x-[2%] -translate-y-[45%] text-center aspect-[4/3] w-full h-auto flex items-center justify-center">
                <Image
                  alt="llamao_text"
                  src="/images/llamao_logo_text.svg"
                  width={452}
                  height={161}
                  className="w-[70%] xl:w-[75%] h-auto"
                />
              </div>

              {/* current year label
              <div className="absolute top-[27%] sm:top-[28%] md:top-[29%] lg:top-[31%] left-1/2 -translate-x-1/2 ml-1.5 sm:ml-2 md:ml-2.5 px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2.5">
                <span className="font-pp-neuebit font-bold text-[#663931] text-2xl sm:text-3xl tracking-wider">
                  2025
                </span>
              </div> */}

              {/* name book */}
              <div className="absolute bottom-1/2 left-1/2 -translate-x-[40%] -translate-y-[90%] px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2.5 bg-[#663931] flex items-center justify-center">
                <span className="font-pp-mondwest text-[#B2A280] text-lg sm:text-2xl md:text-4xl tracking-wider">
                  LLAMAOISM
                </span>
              </div>

              {/* Button */}
              <EnterButton link={`/mint/${ipfsID}`} className="left-1/2" />
            </div>
          </div>
        </div>
      </MainLayout>
      <Button
        intent="gradient"
        className="px-4 py-1 sm:px-6 sm:py-2.5 md:px-8 md:py-2 min-w-[150px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex items-center justify-center text-sm sm:text-base md:text-lg"
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
        onClick={() => navigation.push("/portal")}
      >
        Back to Portal
      </Button>
    </div>
  );
}
