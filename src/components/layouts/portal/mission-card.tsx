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
      <div className="bg-white border-0.5 border-black/50 w-full h-full text-black flex justify-center items-center">
        {status ? (
          <Tick className="w-6" />
        ) : onClick ? (
          <button
            onClick={onClick}
            className="p-0 m-0 bg-transparent border-none cursor-pointer"
          >
            <ChevronRight className="w-6 pl-1" />
          </button>
        ) : (
          <Link href={link}>
            <ChevronRight className="w-6 pl-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
