"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function MintPage() {
  const { slug } = useParams();
  console.log("MintPage slug:", slug);

  return (
    <div className="relative w-full aspect-[690/606] max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] overflow-hidden">
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
        <div className="relative max-w-[350px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[796.53px] aspect-[796.53/474.72] w-full">
          <Image
            alt="open book"
            src="/gifs/llamao_open_book.gif"
            width={796.5254516601562}
            height={474.72003173828125}
            quality={100}
            priority
            className="w-full h-auto"
          />

          {/* left page */}
          <div className="absolute top-[42%] sm:top-[43%] md:top-[44%] lg:top-[45%] left-1/2 -translate-x-[45%] px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2.5 flex flex-col items-center">
            <div></div>
          </div>

          {/* right page */}
          <div className="">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
