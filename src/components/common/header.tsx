import { cn } from "@/lib/utils";
import { WindowButton, WindowButton1, WindowButton2 } from "@/svg";
import type { FC } from "react";

type HeaderProps = {
  icon: React.ReactNode;
  text: string;
  subHeader?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export const Header: FC<HeaderProps> = ({
  icon,
  text,
  subHeader,
  className = "",
  children,
}) => {
  return (
    <header className={cn("w-full max-w-full", className)}>
      {/* header */}
      <div className="flex items-center justify-between p-1 sm:p-2 bg-[#02007F]">
        <div className="flex items-center gap-1 sm:gap-2">
          {icon}
          <span className="text-sm sm:text-base md:text-lg font-bold truncate">
            {text}
          </span>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <WindowButton />
          <WindowButton1 />
          <WindowButton2 />
        </div>
      </div>
      {/* sub header */}
      {subHeader}
      {children}
    </header>
  );
};
