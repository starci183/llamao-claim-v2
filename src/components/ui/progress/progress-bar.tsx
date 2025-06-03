"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useCallback, useRef } from "react";

const progressBarVariants = cva(
  ["relative w-full cursor-pointer bg-[#2B2341]"],
  {
    variants: {
      size: {
        sm: "h-3",
        md: "h-5",
        lg: "h-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const progressFillVariants = cva(
  "h-full transition-all duration-300 ease-out",
  {
    variants: {
      striped: {
        true: "bg-[repeating-linear-gradient(45deg,_var(--progress-fill)_0px,_var(--progress-fill)_8px,_var(--progress-fill-secondary)_8px,_var(--progress-fill-secondary)_16px)]",
        false: "",
      },
      animated: {
        true: "",
        false: "",
      },
      gradientBoxes: {
        true: "relative overflow-hidden",
        false: "",
      },
    },
    compoundVariants: [
      {
        striped: true,
        animated: true,
        class: "animate-[progress-stripes_3s_linear_infinite]",
      },
    ],
    defaultVariants: {
      striped: false,
      animated: false,
      gradientBoxes: false,
    },
  }
);

// Generate gradient boxes with fixed spacing and progressive appearance
const generateGradientBoxes = (
  percentage: number,
  size: "sm" | "md" | "lg"
) => {
  const boxSizes = {
    sm: { width: 6, height: 10, gap: 1 },
    md: { width: 8, height: 16, gap: 2 },
    lg: { width: 12, height: 24, gap: 3 },
  };

  const { width, height, gap } = boxSizes[size];
  const boxWithGap = width + gap; // Total space each box takes including gap

  // Calculate how many boxes can fit in the progress bar width
  const maxBoxes = 100; // Maximum boxes that can fit
  const visibleBoxes = Math.floor((percentage / 100) * maxBoxes);
  const boxes = [];

  // Color gradient: from dark purple #2B2341 to bright purple/pink
  const startColor = { r: 43, g: 35, b: 65 }; // #2B2341
  const endColor = { r: 200, g: 150, b: 255 }; // Light purple

  for (let i = 0; i < visibleBoxes; i++) {
    // Calculate interpolation factor (0 to 1)
    const factor = visibleBoxes === 1 ? 0 : i / (visibleBoxes - 1);

    // Smooth interpolation between start and end colors
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);

    boxes.push(
      <div
        key={i}
        className="absolute shadow-sm"
        style={{
          left: `${i * boxWithGap}px`,
          top: "50%",
          transform: "translateY(-50%)",
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
        }}
      />
    );
  }

  return boxes;
};

type ProgressBarProps = {
  value?: number;
  max?: number;
  min?: number;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: number) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  showLabel?: boolean;
  gradientBoxes?: boolean;
} & VariantProps<typeof progressBarVariants> &
  VariantProps<typeof progressFillVariants>;

export default function ProgressBar({
  value = 0,
  max = 100,
  min = 0,
  className = "",
  style = {},
  onChange,
  onClick,
  showLabel = false,
  animated = false,
  striped = false,
  gradientBoxes = false,
  size = "md",
  ...props
}: ProgressBarProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onClick"> & {
    children?: React.ReactNode;
  }) {
  const progressRef = useRef<HTMLDivElement>(null);

  // Clamp value between min and max
  const clampedValue = Math.max(min, Math.min(max, value));
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  // Handle click to set progress value
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (onChange && progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const newPercentage = (clickX / rect.width) * 100;
        const newValue = min + (newPercentage / 100) * (max - min);
        const clampedNewValue = Math.max(min, Math.min(max, newValue));
        onChange(clampedNewValue);
      }
      onClick?.(event);
    },
    [onChange, onClick, min, max]
  );

  return (
    <div
      className={cn("w-full p-0.5 box-shadow-tertiary", className)}
      style={style}
      {...props}
    >
      <div
        ref={progressRef}
        className={progressBarVariants({ size })}
        onClick={handleClick}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampedValue}
        aria-valuetext={showLabel ? `${Math.round(percentage)}%` : undefined}
      >
        {/* Progress fill */}
        <div
          className={progressFillVariants({ striped, animated, gradientBoxes })}
          style={{
            width: `${Math.max(0, Math.min(100, percentage))}%`,
            backgroundColor:
              striped || gradientBoxes ? undefined : "var(--progress-fill)",
          }}
        >
          {/* Gradient boxes effect */}
          {gradientBoxes && generateGradientBoxes(percentage, size || "md")}
        </div>

        {/* Progress label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-xs font-w95fa select-none"
              style={{
                color: "var(--progress-text)",
                textShadow: "1px 1px 0px var(--progress-text-shadow)",
              }}
            >
              {Math.round(percentage)}%
            </span>
          </div>
        )}

        {/* Windows 95 highlight effect */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{ backgroundColor: "var(--progress-shadow-dark)" }}
          />
          <div
            className="absolute top-0 left-0 h-full w-px"
            style={{ backgroundColor: "var(--progress-shadow-dark)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-full h-px"
            style={{ backgroundColor: "var(--progress-shadow-light)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-full w-px"
            style={{ backgroundColor: "var(--progress-shadow-light)" }}
          />
        </div> */}
      </div>
    </div>
  );
}
