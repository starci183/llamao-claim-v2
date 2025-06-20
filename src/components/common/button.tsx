import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Loading from "./loading";

const button = cva(
  "cursor-pointer text-sm transition-colors duration-300 disabled:cursor-not-allowed box-shadow-primary px-2 py-4",
  {
    variants: {
      intent: {
        primary: ["bg-[#C5C5C5]", "btn-animation"],
        secondary: ["bg-[#C5C5C5] underline", "btn-animation"],
        gradient: [
          "bg-gradient-to-r from-[#BFA6FF] to-[#FFACFF] ",
          "btn-animation",
        ],
        disabled: ["bg-[#C5C5C5]", "cursor-not-allowed", "btn-animation"],
        ghost: [
          "bg-transparent !shadow-none underline",
          "disabled:opacity-50 disabled:shadow-none",
          "btn-animation",
        ],
      },
      icon: {
        true: "flex items-center justify-end gap-2",
      },
      reverseIcon: {
        true: "flex-row-reverse",
      },
      iconOnly: {
        true: "grid aspect-square grid-cols-1 place-items-center rounded-full p-0 ",
      },
      textColor: {
        true: "text-black",
        false: "text-white",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      intent: "primary",
      textColor: true,
    },
  }
);

type TDefaultButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type TButtonVariantsProps = Omit<VariantProps<typeof button>, "icon">;
type TCustomButtonProps = {
  icon?: React.ReactNode;
  iconOnly?: boolean;
  doubleIcon?: boolean;
  loading?: boolean;
};

export type TButtonProps = TDefaultButtonProps &
  TButtonVariantsProps &
  TCustomButtonProps;

export function Button({
  intent,
  icon,
  iconOnly,
  children,
  className,
  reverseIcon,
  doubleIcon = false,
  loading = false,
  textColor,
  ...props
}: TButtonProps) {
  const iconChildren = (
    <>
      {doubleIcon ? (
        <span className={iconOnly ? "" : "flex items-center gap-2"}>
          {icon}
          {children}
          {icon}
        </span>
      ) : (
        <>
          {!iconOnly && <span className="btn-l">{children}</span>}
          <span className={iconOnly ? "" : "btn-r"}>{icon}</span>
        </>
      )}
    </>
  );

  const commonProps = {
    className: cn(
      button({ intent, icon: Boolean(icon), iconOnly, reverseIcon, textColor }),
      className
    ),
    children: icon ? iconChildren : children,
  };

  return (
    <button {...commonProps} {...props}>
      {loading ? <Loading /> : icon ? iconChildren : children}
    </button>
  );
}
