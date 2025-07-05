"use client";

import { useContract, type NftMetadata } from "@/hooks/use-contract";
import MintButton from "./components/mint-button";
import MintContent from "./components/mint-content";
import { StepNavigator } from "./components/step-navigator";
import { useEffect, useState } from "react";

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
      className="w-full max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[380px] sm:min-h-[480px] md:min-h-[530px] lg:min-h-[580px] overflow-hidden bg-no-repeat bg-center bg-cover flex flex-col aspect-[4/3]"
      style={{
        backgroundImage: "url(/gifs/llamao_homepage.gif)",
      }}
    >
      <div className="flex items-center justify-center overflow-hidden w-full h-full">
        <div
          className="w-full h-full flex items-center justify-center bg-no-repeat bg-center bg-cover pointer-events-none aspect-[4/3] md:aspect-[3/2]"
          style={{
            backgroundImage: "url(/gifs/llamao_open_book.gif)",
          }}
        >
          <div className="flex w-[80%] md:w-[70%] h-full items-center justify-center pointer-events-auto">
            {nftMetadata && <MintContent nftMetadata={nftMetadata} />}
          </div>
        </div>
      </div>

      <StepNavigator
        currentLabel="Llamao"
        mainButton={<MintButton />}
        onBack={() => {}}
        onNext={() => {}}
      />
    </div>
  );
}
