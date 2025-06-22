"use client";

import { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchContainer = cva(
  "relative cursor-pointer select-none transition-all duration-200",
  {
    variants: {
      size: {
        sm: "h-5",
        md: "h-6",
        lg: "h-8",
      },
      width: {
        fixed: "",
        full: "w-full",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        width: "fixed",
        className: "w-20",
      },
      {
        size: "md",
        width: "fixed",
        className: "w-28",
      },
      {
        size: "lg",
        width: "fixed",
        className: "w-36",
      },
    ],
    defaultVariants: {
      size: "md",
      width: "fixed",
      disabled: false,
    },
  }
);

const switchThumb = cva(
  "absolute top-0 left-0 bg-[#C5C5C5] h-full box-shadow-switch-thumb transition-transform duration-200 ease-in-out flex items-center justify-center text-black font-bold",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      width: {
        fixed: "",
        full: "w-1/2",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Fixed width variants
      {
        size: "sm",
        width: "fixed",
        className: "w-8",
      },
      {
        size: "md",
        width: "fixed",
        className: "w-10",
      },
      {
        size: "lg",
        width: "fixed",
        className: "w-12",
      },
      // Fixed width translations
      {
        size: "sm",
        width: "fixed",
        checked: true,
        className: "translate-x-8",
      },
      {
        size: "md",
        width: "fixed",
        checked: true,
        className: "translate-x-10",
      },
      {
        size: "lg",
        width: "fixed",
        checked: true,
        className: "translate-x-12",
      },
      // Full width translation
      {
        width: "full",
        checked: true,
        className: "translate-x-full",
      },
    ],
  }
);

const switchLabel = cva(
  "absolute inset-0 flex items-center justify-between px-2 text-black font-bold pointer-events-none select-none p-1 bg-white box-shadow-tertiary-light",
  {
    variants: {
      size: {
        sm: "text-xs px-1",
        md: "text-sm px-2",
        lg: "text-base px-3",
      },
    },
  }
);

interface SwitchProps extends VariantProps<typeof switchContainer> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  onText?: string;
  offText?: string;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  iconOnly?: boolean;
  width?: "fixed" | "full";
}

export default function Switch({
  checked: controlledChecked,
  onCheckedChange,
  disabled = false,
  size = "md",
  width = "fixed",
  name,
  id,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onText = "ON",
  offText = "OFF",
  onIcon,
  offIcon,
  iconOnly = false,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !checked;

    if (!isControlled) {
      setInternalChecked(newChecked);
    }

    onCheckedChange?.(newChecked);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      tabIndex={disabled ? -1 : 0}
      className={cn(switchContainer({ size, width, disabled }), className)}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      id={id}
    >
      <div
        className={cn(
          "w-full h-full bg-[#C5C5C5] border border-[#404040] relative overflow-hidden transition-all duration-200"
        )}
      >
        {/* Background text labels */}
        <div className={cn(switchLabel({ size }))}>
          <span className="text-[#606060] flex items-center gap-1">
            {offText}
            {offIcon && <span className="text-xs">{offIcon}</span>}
          </span>
          <span className="text-[#606060] flex items-center gap-1">
            {onText}
            {onIcon && <span className="text-xs">{onIcon}</span>}
          </span>
        </div>

        {/* Sliding thumb */}
        <div className={cn(switchThumb({ size, width, checked }))}>
          <div className="flex w-full items-center justify-center gap-1 px-1">
            <span className="font-bold truncate">
              {checked ? onText : offText}
            </span>
            {!iconOnly && checked && onIcon && (
              <span className="text-xs">{onIcon}</span>
            )}
            {!iconOnly && !checked && offIcon && (
              <span className="text-xs">{offIcon}</span>
            )}
            {iconOnly && (
              <span className="text-xs">
                {checked ? onIcon || offIcon : offIcon || onIcon}
              </span>
            )}
          </div>
        </div>
      </div>

      {name && (
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
