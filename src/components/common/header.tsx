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
    <header className="w-full max-w-full">
      {/* header */}
      <div
        className={cn(
          "flex items-center justify-between p-2 bg-[#02007F]",
          className
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-lg font-bold">{text}</span>
        </div>
        <div className="flex items-center gap-1">
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
