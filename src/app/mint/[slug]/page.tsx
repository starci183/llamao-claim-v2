"use client";

import { StepNavigator } from "@/components/common/step-navigator";
import { useContract, type NftMetadata } from "@/hooks/use-contract";
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
      className="w-full max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[380px] sm:min-h-[480px] md:min-h-[530px] lg:min-h-[580px] overflow-hidden bg-no-repeat bg-center bg-cover flex flex-col aspect-[4/3]"
      style={{
        backgroundImage: "url(/gifs/llamao_homepage.gif)",
      }}
    >
      <div className="flex items-center justify-center overflow-hidden w-full h-full">
        <div
          className="w-full h-full flex items-center justify-center bg-no-repeat bg-center bg-cover pointer-events-none aspect-[4/3]"
          style={{
            backgroundImage: "url(/images/llamao_web_openbook.svg)",
          }}
        >
          <div className="flex w-[95%] md:w-[80%] h-full items-center justify-center pointer-events-auto">
            {nftMetadata && <MintContent nftMetadata={nftMetadata} />}
          </div>
        </div>
      </div>

      <div className="mb-4">
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
