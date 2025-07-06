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
      storyImage: "/gifs/llamao_pagoda.gif",
      description:
        "Trapped and outmatched, the Monanimals face their deadliest foe yet: Future Mongrod. With time running out and Chog captured, they must pull off a desperate ambush or watch their efforts and world crumble.",
    },
    {
      label: "2",
      storyTitle: "Llamao’s Majestic Run",
      storyImage: "/gifs/llamao_majestic_run.gif",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel volutpat libero. Suspendisse eget volutpat lectus. Duis et egestas enim. Donec tincidunt augue vel nisl blandit sagittis. Suspendisse vehicula, velit at fermentum malesuada, ipsum sem dapibus mi, eget efficitur nunc nibh nec sapien.",
      loading: false,
    },
    {
      label: "3",
      storyTitle: "Llamao’s New Pope",
      storyImage: "/gifs/llamao_newpope.gif",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel volutpat libero. Suspendisse eget volutpat lectus. Duis et egestas enim. Donec tincidunt augue vel nisl blandit sagittis. Suspendisse vehicula, velit at fermentum malesuada, ipsum sem dapibus mi, eget efficitur nunc nibh nec sapien.",
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
          className="w-full h-full flex items-center justify-center bg-no-repeat bg-center bg-contain relative"
          style={{
            backgroundImage: "url(/images/scroll_open_llamao.svg)",
          }}
        >
          <MintPlaybookContent {...steps[step]} />
        </div>
        <div className="absolute bottom-[28.5%] md:bottom-[20%] w-full">
          <StepNavigator
            currentLabel={steps[step].label}
            mainButton={<MintButton />}
            onBack={() => setStep((prev) => Math.max(prev - 1, 0))}
            onNext={() =>
              setStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
            isLastStep={step === steps.length - 1}
          />
        </div>
      </div>
    </div>
  );
}
