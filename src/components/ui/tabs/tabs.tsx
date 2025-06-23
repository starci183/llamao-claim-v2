"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Tabs Context
interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
}

const TabsContext = React.createContext<TabsContextValue>({});

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

// Tabs Root Component
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  children: React.ReactNode;
  className?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onValueChange,
      orientation = "horizontal",
      dir = "ltr",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [isControlled, onValueChange]
    );

    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange: handleValueChange,
        orientation,
        dir,
      }),
      [value, handleValueChange, orientation, dir]
    );

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "data-[orientation=vertical]:flex data-[orientation=vertical]:flex-col",
            className
          )}
          data-orientation={orientation}
          dir={dir}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

// Tabs List Component
const tabsListVariants = cva(
  "inline-flex items-center justify-center text-[#404040] w-full",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col w-fit",
      },
      background: {
        default: "bg-[#F5F5F5]",
        primary: "bg-[#BFBFBF]",
        secondary: "bg-[#C3C3C3]",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      background: "default",
    },
  }
);

interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, orientation, background, ...props }, ref) => {
    const { orientation: contextOrientation } = useTabsContext();
    const actualOrientation = orientation || contextOrientation;

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={actualOrientation}
        className={cn(
          tabsListVariants({
            orientation: actualOrientation,
            background: background,
          }),
          className
        )}
        {...props}
      />
    );
  }
);
TabsList.displayName = "TabsList";

// Tabs Trigger Component
const tabsTriggerVariants = cva(
  "inline-flex w-full items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-base text-black ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "w-full justify-start",
      },
      state: {
        active: "",
        inactive: "",
      },
      icon: {
        true: "flex items-center gap-2",
        false: "",
      },
      variant: {
        default: "",
        primary: "bg-[#C3C3C3]",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-6 py-3 text-lg",
      },
    },
    compoundVariants: [
      // Default variant state styling
      {
        variant: "default",
        state: "active",
        className: "box-shadow-active-tabs",
      },
      {
        variant: "default",
        state: "inactive",
        className: "bg-[#BFBFBF] box-shadow-inactive-tabs",
      },
      // Primary variant state styling
      {
        variant: "primary",
        state: "active",
        className: "border-b-2 border-[#AAAAAA]",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      state: "inactive",
      icon: false,
      variant: "default",
      size: "md",
    },
  }
);

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof tabsTriggerVariants>, "icon"> {
  value: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  hasIcon?: boolean;
  variant?: "default" | "primary";  
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  (
    {
      className,
      value,
      orientation,
      icon,
      iconPosition = "left",
      hasIcon,
      variant,
      size,
      children,
      ...props
    },
    ref
  ) => {
    const {
      value: contextValue,
      onValueChange,
      orientation: contextOrientation,
    } = useTabsContext();
    const actualOrientation = orientation || contextOrientation;
    const isActive = contextValue === value;
    const showIcon = Boolean(icon) || hasIcon;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        data-state={isActive ? "active" : "inactive"}
        id={`tab-${value}`}
        className={cn(
          tabsTriggerVariants({
            orientation: actualOrientation,
            state: isActive ? "active" : "inactive",
            icon: showIcon,
            variant,
            size,
          }),
          className
        )}
        onClick={() => onValueChange?.(value)}
        {...props}
      >
        {showIcon && iconPosition === "left" && icon && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {showIcon && iconPosition === "right" && icon && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

// Tabs Content Component
const tabsContentVariants = cva(
  "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#404040] focus-visible:ring-offset-2",
  {
    variants: {
      orientation: {
        horizontal: "",
        vertical: "ml-2 mt-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContentVariants> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, orientation, ...props }, ref) => {
    const { value: contextValue, orientation: contextOrientation } =
      useTabsContext();
    const actualOrientation = orientation || contextOrientation;
    const isActive = contextValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(
          tabsContentVariants({ orientation: actualOrientation }),
          className
        )}
        tabIndex={0}
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
