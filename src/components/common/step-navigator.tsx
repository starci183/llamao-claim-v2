import { Button } from "@/components/common/button";
import React from "react";

interface StepNavigatorProps {
  currentLabel: string;
  onBack: () => void;
  onNext: () => void;
  onMain?: () => void;
  mainButton?: React.ReactNode;
  isLastStep?: boolean;
}

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentLabel,
  onBack,
  onNext,
  onMain,
  mainButton,
  isLastStep = false,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
      {/* Back button */}
      <Button
        onClick={onBack}
        intent="primary"
        className={
          `max-w-[116.7796630859375px] w-full max-h-[46.27118682861328px] h-full flex items-center justify-center text-sm sm:text-base md:text-lg` +
          (currentLabel === "1" ? " opacity-50 cursor-not-allowed" : "")
        }
        disabled={currentLabel === "1"}
      >
        ← Back
      </Button>

      {onMain ? (
        <Button
          intent="gradient"
          onClick={onMain}
          className="max-w-[116.7796630859375px] w-full max-h-[46.27118682861328px] h-full flex items-center justify-center text-sm sm:text-base md:text-lg"
        >
          {currentLabel}
        </Button>
      ) : (
        mainButton
      )}

      {/* Next button */}
      <Button
        onClick={onNext}
        intent="primary"
        className={
          "max-w-[116.7796630859375px] w-full max-h-[46.27118682861328px] h-full flex items-center justify-center text-sm sm:text-base md:text-lg" +
          (isLastStep ? " opacity-50 cursor-not-allowed" : "")
        }
        disabled={isLastStep}
      >
        Next →
      </Button>
    </div>
  );
};
