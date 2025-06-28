"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import MintContent from "./components/mint-content";

export default function MintPage() {
  const { slug } = useParams();
  console.log("MintPage slug:", slug);

  return (
    <div className="relative w-full aspect-[796/612] max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[350px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] overflow-hidden">
      <Image
        src="/gifs/llamao_homepage.gif"
        alt="llamao_about_background"
        width={690}
        height={606}
        className="w-full h-full object-cover"
        priority
        quality={100}
      />
      <div className="absolute inset-0 flex items-center w-full justify-center overflow-hidden">
        <div className="relative max-w-[1400px] w-full h-full">
          <Image
            alt="open book"
            src="/gifs/llamao_open_book.gif"
            width={1400}
            height={832}
            quality={100}
            priority
            className="w-full h-auto max-w-[1400px] object-contain scale-110"
          />
          <div className="absolute top-0 left-0 -translate-y-1/3 translate-x-1/8 w-full h-full flex items-center justify-center p-2 sm:p-4">
            <MintContent />
          </div>
        </div>
      </div>
    </div>
  );
}
