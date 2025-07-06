"use client";

import { StepNavigator } from "@/components/common/step-navigator";
import { useContract, type NftMetadata } from "@/hooks/use-contract";
import Image from "next/image";
import { useEffect, useState } from "react";
import MintButton from "./components/mint-button";
import MintContent from "./components/mint-content";

export default function MintPage() {
  const { contractURI } = useContract();
  const [nftMetadata, setNftMetadata] = useState<NftMetadata | null>(null);

  useEffect(() => {
    if (!contractURI) return;
    const fetchMetadata = async () => {
      try {
        const res = await fetch(contractURI);
        const data: NftMetadata = await res.json();
        setNftMetadata(data);
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
      }
    };
    fetchMetadata();
  }, [contractURI]);

  return (
    <div
      className="
         w-full 
        aspect-video sm:aspect-[4/3] 
        max-h-[60vh] sm:max-h-[75vh] md:max-h-[85vh] 
        min-h-[300px] sm:min-h-[480px] md:min-h-[580px] 
        overflow-hidden 
        bg-center bg-cover flex flex-col
      "
      style={{ backgroundImage: "url(/gifs/llamao_homepage.gif)" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Lớp nền sách */}
        <div
          className="absolute inset-0 bg-center bg-cover pointer-events-none"
          style={{
            backgroundImage: "url(/images/llamao_web_openbook.svg)",
          }}
        />

        {/* Tag sách */}
        <div className="absolute top-3 left-14 sm:top-6 sm:left-24 md:left-28 pointer-events-none">
          <Image
            alt="book tag"
            src="/images/book_tag_llamao.svg"
            width={240}
            height={240}
            className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
          />
        </div>

        {/* Nội dung mint */}
        <div className="relative flex items-center justify-center pointer-events-auto transform sm:transform-none sm:scale-100 scale-75 origin-center w-[95%] sm:w-[80%] md:w-[80%] h-full">
          {nftMetadata && <MintContent nftMetadata={nftMetadata} />}
        </div>
      </div>

      {/* Điều hướng bước */}
      <div className="mt-auto px-4 py-2">
        <StepNavigator
          currentLabel="Llamao"
          mainButton={<MintButton />}
          onBack={() => {}}
          onNext={() => {}}
        />
      </div>
    </div>
  );
}
