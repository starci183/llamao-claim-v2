"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Tick } from "@/svg";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type MissionCardProps = {
  className?: string;
  text?: string;
  link?: string;
  status?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};
export default function MissionCard({
  className = "",
  text = "",
  link = "",
  status = false,
  onClick,
  disabled = false,
}: MissionCardProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const isOverflowing =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsTruncated(isOverflowing);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);

    return () => window.removeEventListener("resize", checkTruncation);
  }, [text]);

  return (
    <div className="max-w-full h-full grid grid-cols-5 justify-center items-center gap-0.5 min-h-[30px]">
      {/* mission text */}
      <div
        ref={textRef}
        className={cn(
          "bg-white border-0.5 border-black/50 w-[14rem] h-full text-black flex items-center col-span-4 truncate overflow-auto px-2 scroll-hidden",
          isTruncated ? "justify-start" : "justify-center",
          className
        )}
      >
        {text}
      </div>
      {/* status */}
      <div className="w-full h-full">
        {status ? (
          <div
            className={cn(
              "bg-white border-0.5 border-black/50 w-full h-full text-black flex justify-center items-center hover:shadow-md hover:scale-3d active:scale-95 focus:outline-none"
            )}
          >
            <Tick className="w-6" />
          </div>
        ) : onClick ? (
          // thêm hover vào
          <button
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "w-full h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:box-shadow-primary hover:scale-95 active:scale-95 focus:outline-none",
              "bg-white border-0.5 border-black/50 text-black",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Go to mission"
          >
            <ChevronRight className="w-6 pl-1" />
          </button>
        ) : link ? (
          <Link
            href={link}
            className={cn(
              "w-full h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:box-shadow-primary hover:scale-95 active:scale-95 focus:outline-none",
              "bg-white border-0.5 border-black/50 text-black"
            )}
            aria-label="Go to mission"
          >
            <ChevronRight className="w-6 pl-1" />
          </Link>
        ) : (
          <div
            className={cn(
              "bg-white border-0.5 border-black/50 w-full h-full text-black flex justify-center items-center opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronRight className="w-6 pl-1" />
          </div>
        )}
      </div>
    </div>
  );
}
