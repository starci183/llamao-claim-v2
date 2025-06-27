"use client";

import { useParams } from "next/navigation";
import MintContent from "./components/mint-content";
import { StepNavigator } from "./components/step-navigator";

export default function MintPage() {
  const { slug } = useParams();
  console.log("MintPage slug:", slug);

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
            <MintContent />
          </div>
        </div>
      </div>
      <StepNavigator
        currentLabel="Llamao"
        onBack={() => {}}
        onNext={() => {}}
      />
    </div>
  );
}
