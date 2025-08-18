/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/common/button";
import MainLayout from "@/components/layouts/main-layout";
import { useWalletAddress } from "@/hooks/use-wallet-address";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function About() {
  const { address } = useWalletAddress();
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "min-h-[31.25rem] sm:min-h-[34.375rem] lg:min-h-[37.5rem]"
      )}
    >
      <img
        src="/gifs/llamao_about_background.gif"
        alt="llamao_about_background"
        className={cn(
          "w-full h-full object-cover",
          "min-h-[31.25rem] sm:min-h-[34.375rem] lg:min-h-[37.5rem]",
          "mx-auto"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center overflow-hidden",
          "gap-0 sml:gap-2 sm:gap-4 py-4 px-2"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-center w-full shrink-0",
            "max-w-xs sm:max-w-sm lg:max-w-md"
          )}
        >
          <img
            src="/gifs/llamao_zenmonad.gif"
            alt="llamao_zenmonad"
            className={cn("w-full h-auto ", "max-w-62 sm:max-w-64 lg:max-w-72")}
          />
          <img
            src="/images/llamao_title.png"
            alt="llamao_zenmonad_text"
            className={cn(
              "absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto",
              "scale-75"
            )}
          />
        </div>
        <div className={cn("flex items-center justify-center w-full pb-4")}>
          <div className={cn("w-full", "max-w-xs sm:max-w-sm lg:max-w-lg")}>
            <MainLayout
              subHeader={false}
              className={cn("!px-0 !py-1 w-full")}
              headerIcon="/icons/folder.svg"
              text="Llamaoism"
              boxShadowOuter="box-shadow-about"
              boxShadowInner=""
            >
              <div className={cn("bg-white p-0.5 w-full")}>
                <div
                  className={cn(
                    "box-shadow-about-whiteboard gap-1 w-full overflow-auto",
                    "p-1 sm:p-2 lg:p-3"
                  )}
                >
                  <div
                    className={cn(
                      "text-black p-1 sm:p-2 w-full overflow-auto max-h-fit",
                      "space-y-1 sm:space-y-2"
                    )}
                  >
                    <p
                      className={cn(
                        "text-balance leading-tight break-words",
                        "text-[0.625rem] sm:text-xs lg:text-sm"
                      )}
                    >
                      Llamaoism is the first and finest ideology born on Monad —
                      rooted in one simple principle:
                    </p>
                    <ul
                      className={cn(
                        "list-disc list-inside space-y-1 break-words",
                        "text-[0.625rem] sm:text-xs lg:text-sm px-1 sm:px-2"
                      )}
                    >
                      <li className={cn("leading-tight")}>
                        Create real value, stay chill, no matter the market.
                      </li>
                      <li className={cn("leading-tight")}>
                        Whether it&apos;s bull or bear, llamao-ists don&apos;t
                        chase hype. They build. They meme. They make markets
                        better — quietly but consistently.
                      </li>
                    </ul>
                    <p
                      className={cn(
                        "leading-tight break-words",
                        "text-[0.625rem] sm:text-xs lg:text-sm"
                      )}
                    >
                      Llamao-ism is not a cult. It&apos;s a vibe, productive
                      collective.
                      <br />
                      Welcome to the future of sustainable clout, only on Monad.
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex justify-center items-center px-1 pb-1",
                      "gap-2 sm:gap-4"
                    )}
                  >
                    <Button
                      intent="gradient"
                      textColor={false}
                      className={cn(
                        "w-full min-w-0 h-8 text-[10px] sm:text-xs lg:text-sm",
                        "p-1 sm:p-1.5 sm:max-w-24 lg:max-w-28"
                      )}
                    >
                      <Link
                        href="https://x.com/llamao_"
                        target="_blank"
                        className={cn("underline truncate")}
                      >
                        Twitter
                      </Link>
                    </Button>
                    <Button
                      intent="gradient"
                      textColor={false}
                      className={cn(
                        "w-full min-w-0 h-8 text-[10px] sm:text-xs lg:text-sm",
                        "p-1 sm:p-1.5 sm:max-w-24 lg:max-w-28"
                      )}
                    >
                      <Link
                        href="https://discord.com/invite/llamao"
                        target="_blank"
                        className={cn("underline truncate")}
                      >
                        Discord
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "box-shadow-secondary-light px-1 py-0.5 text-black text-left font-light overflow-hidden",
                  "text-[10px] sm:text-xs lg:text-sm"
                )}
              >
                <span className={cn("block truncate")}>
                  Connecting wallet: {address || "..."}
                </span>
              </div>
            </MainLayout>
          </div>
        </div>
      </div>
    </div>
  );
}
