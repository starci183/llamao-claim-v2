// components/StepNavigator.tsx
import { Button } from "@/components/common/button";
import React from "react";

interface StepNavigatorProps {
  currentLabel: string;
  onBack: () => void;
  onNext: () => void;
}

export const StepNavigator: React.FC<StepNavigatorProps> = ({
  currentLabel,
  onBack,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 w-full max-w-lg mx-auto">
      {/* Back button */}
      <Button
        onClick={onBack}
        intent="primary"
        className="max-w-[116.7796630859375px] w-full max-h-[46.27118682861328px] h-full flex items-center justify-center text-sm sm:text-base md:text-lg"
      >
        ← Back
      </Button>

      <Button
        intent="gradient"
        className="max-w-[116.7796630859375px] w-full max-h-[46.27118682861328px] h-full flex items-center justify-center text-sm sm:text-base md:text-lg"
      >
        {currentLabel}
      </Button>

      {/* Next button */}
      <Button
        onClick={onNext}
        intent="primary"
        className="max-w-[116.7796630859375px] w-full max-h-[46.27118682861328px] h-full flex items-center justify-center text-sm sm:text-base md:text-lg"
      >
        Next →
      </Button>
    </div>
  );
};
