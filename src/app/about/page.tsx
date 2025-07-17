"use client";

import { Button } from "@/components/common/button";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function About() {
  const navigation = useRouter();
  return (
    <div className="flex flex-col gap-4 md:gap-12 min-h-screen items-center justify-evenly-start">
      <Navbar navbarItems={items} />

      <MainLayout
        subHeader={false}
        text="Homepage"
        className="!px-0 !py-0.5 w-full h-full"
        boxShadowOuter="box-shadow-about"
        boxShadowInner=""
      >
        <div className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] overflow-hidden">
          <Image
            src="/gifs/llamao_about_background.gif"
            alt="llamao_about_background"
            width={720}
            height={650}
            className="w-full h-full object-cover min-h-[500px] sm:min-h-[600px] lg:min-h-[650px]"
            priority
            quality={100}
            unoptimized
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 sml:gap-2 sm:gap-4 py-4 px-2 overflow-hidden">
            <div className="relative flex items-center justify-center w-full max-w-xs sm:max-w-sm lg:max-w-md shrink-0  ">
              <Image
                src="/gifs/llamao_zenmonad.gif"
                alt="llamao_zenmonad"
                width={313}
                height={289}
                className="w-full h-auto max-w-62 sm:max-w-64 lg:max-w-72"
                quality={100}
                priority
                unoptimized
              />
              <Image
                src="/images/llamao_logo_text.svg"
                alt="llamao_zenmonad_text"
                width={313}
                height={111}
                className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto max-w-60 sm:max-w-64 lg:max-w-72"
                quality={100}
                priority
              />
            </div>
            <div className="flex items-center justify-center w-full px-0 sm:px-2 pb-4">
              <div className="w-full max-w-xs sm:max-w-sm lg:max-w-lg">
                <MainLayout
                  subHeader={false}
                  className="!px-0 !py-1 w-full"
                  headerIcon="/icons/folder.svg"
                  text="Llamaoism"
                  boxShadowOuter="box-shadow-about"
                  boxShadowInner=""
                >
                  <div className="bg-white p-0.5 w-full">
                    <div className="box-shadow-about-whiteboard p-1 sm:p-2 lg:p-3 gap-1 w-full overflow-auto">
                      <div className="space-y-1 sm:space-y-2 text-black p-1 w-full overflow-hidden">
                        <p className="text-[10px] sm:text-xs lg:text-sm text-balance leading-tight break-words">
                          Llamaoism is the first and finest ideology born on
                          Monad — rooted in one simple principle:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-[10px] sm:text-xs lg:text-sm px-1 sm:px-2 break-words">
                          <li className="leading-tight">
                            Create real value, stay chill, no matter the market.
                          </li>
                          <li className="leading-tight">
                            Whether it&apos;s bull or bear, llamao-ists
                            don&apos;t chase hype. They build. They meme. They
                            make markets better — quietly but consistently.
                          </li>
                        </ul>
                        <p className="text-[10px] sm:text-xs lg:text-sm leading-tight break-words">
                          Llamao-ism is not a cult. It&apos;s a vibe, productive
                          collective.
                          <br />
                          Welcome to the future of sustainable clout, only on
                          Monad.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-1 pb-1 w-full">
                        <Button
                          intent="gradient"
                          textColor={false}
                          className="p-1 sm:p-1.5 w-full sm:max-w-24 lg:max-w-28 text-[10px] sm:text-xs lg:text-sm min-w-0 h-6 sm:h-8"
                        >
                          <Link href="" className="underline truncate">
                            Llamaoism
                          </Link>
                        </Button>
                        <Button
                          intent="gradient"
                          textColor={false}
                          className="p-1 sm:p-1.5 w-full sm:max-w-24 lg:max-w-28 text-[10px] sm:text-xs lg:text-sm min-w-0 h-6 sm:h-8"
                        >
                          <Link href="" className="underline truncate">
                            Playbook
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="box-shadow-secondary-light px-1 py-0.5 text-black text-left text-[10px] sm:text-xs lg:text-sm font-light overflow-hidden">
                    <span className="block truncate">
                      Connecting wallet:....................
                    </span>
                  </div>
                </MainLayout>
              </div>
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
        onClick={() => navigation.push("/")}
      >
        Back
      </Button>
    </div>
  );
}
