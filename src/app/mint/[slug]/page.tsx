"use client";

import Loading from "@/components/common/loading";
import { StepNavigator } from "@/components/common/step-navigator";
import { useContract } from "@/hooks/use-contract";
import { useNftMetadata } from "@/hooks/use-nft-meta-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
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
        <Image
          src="/images/llamao_web_openbook.svg"
          alt="book background"
          fill
          priority
          className={cn("object-contain scale-115 sm:scale-none")}
        />
        {/* Book tag */}
        <Image
          src="/images/book_tag_llamao.svg"
          alt="book tag"
          width={100}
          height={50}
          className={cn(
            "absolute left-[16%] top-[19%] smm:top-[20%] sml:left-[16%] sml:top-[21%] sm:left-[16%] sm:top-[25.5%] md:left-[16%] md:top-[17%] lg:left-[20%] lg:top-[15%] xl:left-[20%] xl:top-[14%] 2xl:left-[20%] 2xl:top-[13%] w-20 sm:w-24 md:w-28 lg:w-36 xl:w-40 2xl:w-44"
          )}
        />
        {/* Nội dung mint nằm trong sách */}
        <div
          className={cn(
            "relative z-10 w-[80%] sm:w-[68%] md:w-[70%] lg:w-[72%] h-[50%] max-w-full max-h-full flex items-center justify-center overflow-hidden"
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
