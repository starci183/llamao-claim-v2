"use client";

import EnterButton from "@/components/common/enter-button";
import { PRIMARY_MONAD_CONTRACT } from "@/contance";
import { useContract } from "@/hooks/use-contract";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Mint() {
  const { contractAddress } = useContract(PRIMARY_MONAD_CONTRACT);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Stage with fixed aspect */}
      <div
        className={cn(
          "relative mx-auto aspect-[4/3] w-full",
          "min-h-[350px] sm:min-h-[450px] md:min-h-[560px]",
          "max-h-[85svh]"
        )}
      >
        {/* Background — truly centered */}
        <Image
          src="/gifs/llamao_homepage.gif"
          alt="llamao altar background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Safe margin inside the frame */}
        <div className="absolute inset-[9%] sm:inset-[8%]">
          {/* Book wrapper pinned to the exact center */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
            style={{ width: "clamp(220px, 36vw, 440px)" }} // tighter clamp
          >
            <Image
              alt="book cover"
              src="/images/llamao_book_cover.png"
              width={700}
              height={525}
              priority
              className="w-full h-auto"
              style={{ imageRendering: "pixelated" }}
            />

            {/* ENTER button (centered at the bottom of the book) */}
            <EnterButton
              link={`/mint/${contractAddress}`}
              className="absolute left-1/2 md:left-[45%] -translate-x-1/2 bottom-[14%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
