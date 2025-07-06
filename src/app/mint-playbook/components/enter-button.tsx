import { cn } from "@/lib/utils";
import Link from "next/link";

type EnterButtonProps = {
  className?: string;
  link: string;
};
export default function EnterButton({ className, link }: EnterButtonProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 mb-1 sm:mb-2 md:mb-3 lg:mb-4 w-full flex items-center justify-center",
        className
      )}
    >
      <Link href={link}>
        <div className="w-[140px] md:w-[200px] h-[31px] md:h-[63px] cursor-pointer bg-[#663931] flex items-center justify-center">
          <p className="font-pp-mondwest font-bold text-[#FFC59B] text-md sm:text-xl md:text-2xl lg:text-3xl tracking-wider">
            Playbook
          </p>
        </div>
      </Link> 
    </div>
  );
}
