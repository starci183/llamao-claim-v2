import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const BookContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    // Fill mobile width but never exceed the art's natural width
    <div
      className="relative mx-auto w-full"
      style={{ maxWidth: "min(1400px, calc(100vw - 24px))" }} // 12px gutter each side
    >
      {/* Book art controls the size */}
      <Image
        src="/images/llamao_web_openbook.png"
        alt="book"
        width={1400}
        height={650}
        priority
        sizes="(max-width: 640px) calc(100vw - 24px),
               (max-width: 1024px) 90vw,
               1400px"
        className="block w-full h-auto select-none pointer-events-none"
      />

      {/* Tag pinned top-center */}
      <Image
        src="/images/book_tag_llamao.svg"
        alt="book tag"
        width={160}
        height={80}
        className={cn(
          "absolute z-20 left-[20%] -translate-x-1/2",
          "-top-1",
          "w-16 xs:w-20 sm:w-24 md:w-28 lg:w-36",
          "pointer-events-none select-none"
        )}
      />

      {/* Page window — clip children so they don't go over the book edges */}
      <div
        className={cn(
          "absolute z-10 overflow-hidden",
          // Tighter trims on small screens; relax as screens get larger
          "inset-x-[14%] top-[12%] bottom-[17%]",
          "xs:inset-x-[13%] xs:top-[11%] xs:bottom-[16%]",
          "sm:inset-x-[11%] sm:top-[10%] sm:bottom-[14%]",
          "md:inset-x-[11%] md:top-[9%]  md:bottom-[13%]",
          "[clip-path:inset(0_0_0_0_round_14px)] sm:[clip-path:inset(0_0_0_0_round_18px)]"
        )}
      >
        <div className="relative h-full w-full">{children}</div>
      </div>
    </div>
  );
};
