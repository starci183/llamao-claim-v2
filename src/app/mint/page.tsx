"use client";

import EnterButton from "@/components/common/enter-button";
import { useContract } from "@/hooks/use-contract";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Mint() {
  const { contractAddress } = useContract(
    "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB"
  );
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden aspect-[4/3]",
        "max-h-[85vh] min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[580px]"
      )}
    >
      <Image
        src="/gifs/llamao_homepage.gif"
        alt="llamao_about_background"
        width={690}
        height={606}
        className={cn("w-full h-full object-cover")}
        priority
        quality={100}
      />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          "p-2 sm:p-4"
        )}
      >
        <div
          className={cn(
            "relative w-full aspect-[4/3]",
            "max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[450px]"
          )}
        >
          <Image
            alt="book_cover"
            src="/images/book_from_llamao.svg"
            width={550}
            height={450}
            quality={100}
            priority
            className={cn("w-full h-auto", "mt-3 sm:mt-4 md:mt-6 lg:mt-10")}
          />
          {/* llamao image text */}
          <div
            className={cn(
              "absolute top-0 left-0 w-full h-auto flex items-center justify-center text-center aspect-[4/3]",
              "translate-x-[2%] -translate-y-[48%] lg:-translate-y-[45%]"
            )}
          >
            <Image
              alt="llamao_text"
              src="/images/llamao_title.png"
              width={452}
              height={161}
              className={cn("w-[70%] xl:w-[75%] h-auto")}
            />
          </div>
          {/* name book */}
          <div
            className={cn(
              "absolute bottom-1/2 left-1/2 bg-[#663931] flex items-center justify-center",
              "-translate-x-[40%] -translate-y-[90%] px-2 py-1 sm:px-3 sm:py-2 md:px-2.5 md:py-2.5"
            )}
          >
            <span
              className={cn(
                "font-pp-mondwest text-[#B2A280] tracking-wider",
                "text-xl md:text-2xl lg:text-3xl"
              )}
            >
              LLAMAOISM
            </span>
          </div>
          {/* Button */}
          <EnterButton
            link={`/mint/${contractAddress}`}
            className={cn("left-1/2")}
          />
        </div>
      </div>
    </div>
  );
}
