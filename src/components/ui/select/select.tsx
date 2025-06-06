"use client";

import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const selectContainer = cva(
  "relative select-none transition-all duration-200 w-full bg-white border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#808080] border-b-[#808080] max-w-[70]",
  {
    variants: {
      width: {
        fixed: "",
        full: "w-full",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },

    defaultVariants: {
      width: "fixed",
      disabled: false,
    },
  }
);

const selectTrigger = cva(
  "w-full h-full bg-[#c0c0c0] border-2 transition-all duration-200 max-w-4 max-h-[18] p-0",
  {
    variants: {
      size: {
        sm: "text-xs max-h-[18]",
        md: "text-sm max-h-[18]",
        lg: "text-base max-h-[18]",
      },
      pressed: {
        true: "border-t-[#404040] border-l-[#404040] border-r-[#dfdfdf] border-b-[#dfdfdf] box-shadow-tertiary",
        false:
          "border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] box-shadow-primary",
      },
      disabled: {
        true: "text-gray-500 bg-[#c0c0c0]",
        false: "text-black hover:bg-[#d4d0c8]",
      },
    },
    defaultVariants: {
      size: "md",
      pressed: false,
      disabled: false,
    },
  }
);

const selectDropdown = cva(
  "absolute top-full left-0 w-full mt-1 bg-[#c0c0c0] border-2 border-t-[#dfdfdf] border-l-[#dfdfdf] border-r-[#404040] border-b-[#404040] box-shadow-secondary max-h-48 overflow-y-auto",
  {
    variants: {
      open: {
        true: "block",
        false: "hidden",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

const selectOption = cva(
  "w-full px-2 py-1 text-left cursor-pointer transition-colors duration-100",
  {
    variants: {
      size: {
        sm: "text-xs min-h-[24px]",
        md: "text-sm min-h-[28px]",
        lg: "text-base min-h-[32px]",
      },
      selected: {
        true: "bg-[#0000ff] text-white",
        false: "bg-[#c0c0c0] text-black hover:bg-[#0000ff] hover:text-white",
      },
      disabled: {
        true: "text-gray-500 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
      disabled: false,
    },
  }
);

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  className?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  width?: "fixed" | "full";
};

export default function Select({
  className,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option...",
  disabled = false,
  size = "md",
  width = "fixed",
  ...props
}: SelectProps & VariantProps<typeof selectContainer>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle controlled vs uncontrolled state
  const currentValue = value ?? selectedValue;
  const selectedOption = options.find(
    (option) => option.value === currentValue
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    if (disabled) return;

    const option = options.find((opt) => opt.value === optionValue);
    if (option?.disabled) return;

    if (value === undefined) {
      setSelectedValue(optionValue);
    }

    onChange?.(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Navigate to next option
          const currentIndex = options.findIndex(
            (opt) => opt.value === currentValue
          );
          const nextIndex =
            currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          const nextOption = options[nextIndex];
          if (!nextOption.disabled) {
            handleSelect(nextOption.value);
          }
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // Navigate to previous option
          const currentIndex = options.findIndex(
            (opt) => opt.value === currentValue
          );
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          const prevOption = options[prevIndex];
          if (!prevOption.disabled) {
            handleSelect(prevOption.value);
          }
        }
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(selectContainer({  width, disabled }), className)}
    >
      {/* select optional label */}
      <div className="flex items-center justify-between w-full h-full">
        <span className="truncate text-black pl-1 text-xs">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Button
          type="button"
          className={cn(selectTrigger({ size, pressed: isOpen, disabled }))}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          {...props}
        >
          <ChevronDown
            className={cn(
              "transition-transform duration-200 flex-shrink-0 text-black",
              size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4",
              isOpen && "rotate-180"
            )}
          />
        </Button>
      </div>

      <div className={cn(selectDropdown({ open: isOpen }), "z-100")}>
        {options?.length > 0 ? (
          options.map((option) => (
            <div
              key={option.value}
              className={cn(
                selectOption({
                  size,
                  selected: option.value === currentValue,
                  disabled: option.disabled,
                })
              )}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === currentValue}
              style={{
                cursor: option.disabled ? "not-allowed" : "pointer",
              }}
            >
              {option.label}
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">No options available</div>
        )}
      </div>
    </div>
  );
}
