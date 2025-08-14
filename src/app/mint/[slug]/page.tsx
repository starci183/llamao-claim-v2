"use client";

import Loading from "@/components/common/loading";
import { StepNavigator } from "@/components/common/step-navigator";
import { useContract } from "@/hooks/use-contract";
import { useNftMetadata } from "@/hooks/use-nft-meta-data";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { BookContainer } from "./components/book/book-container";
import MintButton from "./components/mint-button";
import MintContent from "./components/mint-content";

export default function MintPage() {
  const { slug } = useParams();
  const { contractURI, totalMinted } = useContract(slug as string);
  const { data: nftMetadata, loading } = useNftMetadata(contractURI);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between w-full min-w-[290px] sm:min-w-[600px] md:min-w-[700px] min-h-[350px] sm:min-h-[550px] max-h-screen bg-no-repeat bg-cover bg-center overflow-hidden"
      )}
      style={{ backgroundImage: "url(/gifs/llamao_homepage.gif)" }}
    >
      <div
        className={cn(
          "relative mx-auto max-w-[550px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[850px] xl:max-w-[900px] aspect-square md:aspect-[4/3] w-full h-full flex items-center justify-center"
        )}
      >
        <BookContainer>
          {/* Nội dung mint nằm trong sách */}
          <div
            className={cn(
              "relative max-w-full h-full flex items-center justify-center overflow-hidden"
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loading />
              </div>
            ) : (
              nftMetadata && (
                <MintContent
                  nftMetadata={nftMetadata}
                  totalMinted={Number(totalMinted) || 0}
                />
              )
            )}
          </div>
        </BookContainer>
        <div className="absolute bottom-0 px-2 py-2 mx-auto">
          <StepNavigator
            currentLabel="Llamao"
            mainButton={<MintButton />}
            onBack={() => {}}
            onNext={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
