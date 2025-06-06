import { Button } from "@/components/common/button";
import Navbar, { items } from "@/components/common/navbar";
import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
      <Navbar navbarItems={items} />

      <MainLayout
        subHeader={false}
        text="Homepage"
        className="!px-0 !py-0.5 max-w-full w-fit h-auto"
        boxShadowOuter="box-shadow-about"
        boxShadowInner=""
      >
        <div className="relative w-full h-full">
          <Image
            src="/gifs/llamao_about_background.gif"
            alt="llamao_about_background"
            width={720}
            height={650}
            className="w-auto mx-auto object-cover h-[800px]"
            priority
            quality={100}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8">
            <div className="relative flex items-center justify-center">
              <Image
                src="/gifs/llamao_zenmonad.gif"
                alt="llamao_zenmonad"
                width={313}
                height={289}
                className="w-full h-auto max-w-xs mx-auto"
                priority
              />
              <Image
                src="/images/llamao_logo_text.svg"
                alt="llamao_zenmonad_text"
                width={313}
                height={111}
                className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto max-w-xs"
                quality={100}
                priority
              />
            </div>
            <div className="flex items-center justify-center px-2 sm:px-4 lg:px-6">
              <MainLayout
                subHeader={false}
                className="!px-[1] !py-1 w-full h-full"
                headerIcon="/icons/folder.svg"
                text="Llamao-ism"
                boxShadowOuter="box-shadow-about"
                boxShadowInner=""
              >
                <div className="bg-white p-[1]">
                  <div className="box-shadow-about-whiteboard p-2 sm:p-4 gap-1">
                    <div className="space-y-1 text-black p-2">
                      <p className="text-sm sm:text-base text-balance">
                        Llamao-ism is the first and finest ideology born on
                        Monad — rooted in one simple principle:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-sm sm:text-base px-4">
                        <li>
                          Create real value, stay chill, no matter the market.
                        </li>
                        <li>
                          Whether it&apos;s bull or bear, llamao-ists don&apos;t
                          chase hype. They build. They meme. They make markets
                          better — quietly but consistently.
                        </li>
                      </ul>
                      <p className="text-sm sm:text-base leading-relaxed">
                        Llamao-ism is not a cult. It&apos;s a vibe, productive
                        collective.
                        <br />
                        Welcome to the future of sustainable clout, only on
                        Monad.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 px-2 pb-2">
                      <Button
                        intent="gradient"
                        textColor={false}
                        className="p-3 max-w-32 text-sm sm:text-xl w-full"
                      >
                        <Link href="" className="underline">
                          Llamao-ism
                        </Link>
                      </Button>
                      <Button
                        intent="gradient"
                        textColor={false}
                        className="p-3 text-sm sm:text-xl max-w-32 w-full"
                      >
                        <Link href="" className="underline">
                          Playbook
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="box-shadow-secondary-light px-2 py-0.5 text-black text-left text-sm sm:text-base font-light">
                  <span>Connecting wallet:....................</span>
                </div>
              </MainLayout>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
