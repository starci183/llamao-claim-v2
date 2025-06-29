"use client";
import MintButton from "@/components/common/mint-button";
import { StepNavigator } from "@/components/common/step-navigator";
import { useState } from "react";
import MintPlaybookContent from "./components/mint-playbook-content";

export default function MintPlaybookPage() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      label: "1",
      storyTitle: "Llamao’s Last Supper",
      storyImage: "/gifs/llamao_last_supper.gif",
      description: "Playbook bước 1: Hành trình bắt đầu cùng Llamao!",
      loading: false,
    },
    {
      label: "2",
      storyTitle: "Llamao’s Majestic Run",
      storyImage: "/gifs/llamao_majestic_run.gif",
      description: "Playbook bước 2: Llamao chạy băng qua thảo nguyên.",
      loading: false,
    },
    {
      label: "3",
      storyTitle: "Llamao’s New Pope",
      storyImage: "/gifs/llamao_newpope.gif",
      description: "Playbook bước 3: Llamao trở thành giáo hoàng mới!",
      loading: false,
    },
  ];

  return (
    <div
      className="w-full aspect-[4/3] max-h-[70vh] xs:max-h-[75vh] sm:max-h-[85vh] md:max-h-screen min-h-[380px] sm:min-h-[480px] md:min-h-[530px] lg:min-h-[580px] overflow-hidden bg-no-repeat bg-center bg-cover flex flex-col space-y-1 pb-2"
      style={{
        backgroundImage: "url(/gifs/llamao_mintplaybook_background.gif)",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center justify-center overflow-hidden h-full w-full">
        <div
          className="w-full h-full flex items-center justify-center bg-no-repeat bg-center bg-contain"
          style={{
            backgroundImage: "url(/images/llamao_scrollbook_vertical.svg)",
          }}
        >
          <MintPlaybookContent {...steps[step]} />
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
