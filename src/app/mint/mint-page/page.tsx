"use client";

import MintButton from "@/components/common/mint-button";
import { useParams } from "next/navigation";
import MintContent from "./components/mint-content";
import { StepNavigator } from "@/components/common/step-navigator";
import { useState } from "react";

export default function MintPage() {
  const { slug } = useParams();
  console.log("MintPage slug:", slug);

  const [step, setStep] = useState(0);
  const steps = [
    {
      label: "1",
      storyNumber: 1,
      storyTitle: "Llamao’s Last Supper",
      storyImage: "/gifs/llamao_last_supper.gif",
      totalMinted: 10,
      currentPage: 1,
      totalPages: 10,
      minting: false,
      loading: false,
      endDate: "2025-07-01",
      maximumLlamaoPerWallet: 2,
      description:
        "Đây là câu chuyện về bữa tối cuối cùng của Llamao. Mint để trở thành một phần của lịch sử!",
    },
    {
      label: "2",
      storyNumber: 2,
      storyTitle: "Llamao’s Majestic Run",
      storyImage: "/gifs/llamao_majestic_run.gif",
      totalMinted: 20,
      currentPage: 2,
      totalPages: 10,
      minting: true,
      loading: false,
      endDate: "2025-07-02",
      maximumLlamaoPerWallet: 3,
      description:
        "Llamao chạy băng qua thảo nguyên, mang lại may mắn cho người sở hữu NFT này.",
    },
    {
      label: "3",
      storyNumber: 3,
      storyTitle: "Llamao’s New Pope",
      storyImage: "/gifs/llamao_newpope.gif",
      totalMinted: 30,
      currentPage: 3,
      totalPages: 10,
      minting: false,
      loading: false,
      endDate: "2025-07-03",
      maximumLlamaoPerWallet: 4,
      description:
        "Llamao trở thành giáo hoàng mới, mang lại sự bình yên cho thế giới. Mint để sở hữu một phần của lịch sử này!",
    },
  ];

  return (
    <div
      className="w-full aspect-[4/3] max-h-[70vh] xs:max-h-[75vh] sm:max-h-[80vh] md:max-h-[85vh] min-h-[380px] sm:min-h-[480px] md:min-h-[530px] lg:min-h-[580px] overflow-hidden bg-no-repeat bg-center bg-cover flex flex-col"
      style={{
        backgroundImage: "url(/gifs/llamao_homepage.gif)",
        backgroundSize: "cover",
        aspectRatio: "4/3",
      }}
    >
      <div className="flex items-center justify-center overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center bg-no-repeat bg-center bg-cover pointer-events-none aspect-[4/3] md:aspect-[3/2]"
          style={{
            backgroundImage: "url(/gifs/llamao_open_book.gif)",
          }}
        >
          <div className="flex w-[80%] md:w-[70%] h-full items-center justify-center pointer-events-auto">
            <MintContent key={step} {...steps[step]} />
          </div>
        </div>
      </div>
      <StepNavigator
        currentLabel={steps[step].label}
        mainButton={<MintButton />}
        onBack={() => setStep((prev) => Math.max(prev - 1, 0))}
        onNext={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))}
        isLastStep={step === steps.length - 1}
      />
    </div>
  );
}
