import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
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
    <div className="flex items-center justify-center gap-4 w-full md:max-w-lg mx-auto">
      {/* Back button */}
      <Button
        onClick={onBack}
        intent="primary"
        className={cn(
          "max-w-[80px] md:max-w-[120px] w-full max-h-[18px] md:max-h-[38px] h-full flex items-center justify-center text-xs sm:text-sm md:text-base text-nowrap transition-all duration-150",
          "hover:bg-primary/80 hover:scale-105",
          currentLabel === "1" &&
            "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-primary"
        )}
        disabled={currentLabel === "1"}
      >
        ← Back
      </Button>

      {onMain ? (
        <Button
          intent="gradient"
          onClick={onMain}
          className={cn(
            "max-w-[80px] md:max-w-[120px] w-full max-h-[18px] md:max-h-[38px] h-full flex items-center justify-center text-xs sm:text-sm md:text-base text-nowrap transition-all duration-150",
            "hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:scale-105"
          )}
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
        className={cn(
          "max-w-[80px] md:max-w-[120px] w-full max-h-[18px] md:max-h-[38px] h-full flex items-center justify-center text-xs sm:text-sm md:text-base text-nowrap transition-all duration-150",
          "hover:bg-primary/80 hover:scale-105",
          isLastStep &&
            "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-primary"
        )}
        disabled={isLastStep}
      >
        Next →
      </Button>
    </div>
  );
};
