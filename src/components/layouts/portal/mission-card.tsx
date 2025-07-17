import { cn } from "@/lib/utils";
import { ChevronRight, Tick } from "@/svg";
import Link from "next/link";

type MissionCardProps = {
  className?: string;
  text?: string;
  link?: string;
  status?: boolean;
  onClick?: () => void;
};
export default function MissionCard({
  className = "",
  text = "",
  link = "",
  status = false,
  onClick,
}: MissionCardProps) {
  return (
    <div className="w-full max-w-full h-full grid grid-cols-5 justify-center items-center gap-0.5 min-h-[30px]">
      {/* mission text */}
      <div
        className={cn(
          "bg-white border-0.5 border-black/50 w-full h-full text-black flex justify-center items-center col-span-4",
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
          <button
            onClick={onClick}
            className={cn(
              "w-full h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:box-shadow-primary hover:scale-95 active:scale-95 focus:outline-none",
              "bg-white border-0.5 border-black/50 text-black"
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
