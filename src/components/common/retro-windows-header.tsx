import { WindowButton, WindowButton1, WindowButton2 } from "@/svg";
import type { FC } from "react";

type CardRetroLayoutProps = {
  icon: React.ReactNode;
  text: string;
  children?: React.ReactNode;
};

export const CardRetroLayout: FC<CardRetroLayoutProps> = ({
  icon,
  text,
  children,
}) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-[#000080] border-2 border-gray-400 border-b-gray-600 border-r-gray-600 shadow-md">
        <div className="flex items-center justify-between px-2 py-1">
          {/* Left side with icon and title */}
          <div className="flex items-center space-x-2">
            <div className="w-4 flex items-center justify-center">{icon}</div>
            <span
              className="text-white text-sm font-bold tracking-wide"
              style={{ fontFamily: "monospace" }}
            >
              {text}
            </span>
          </div>

          {/* Right side with window controls */}
          <div className="flex space-x-1">
            <button>
              <WindowButton />
            </button>
            <button>
              <WindowButton1 />
            </button>
            <button>
              <WindowButton2 />
            </button>
          </div>
        </div>
      </div>

      {/* Example content area to show the header in context */}
      <div className="bg-gray-100 border-2 border-gray-400 border-t-0 p-4">
        <div className="text-gray-700 font-mono text-sm">{children}</div>
      </div>
    </div>
  );
};
