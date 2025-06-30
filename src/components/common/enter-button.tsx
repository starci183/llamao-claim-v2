import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type EnterButtonProps = {
  className?: string;
  link: string;
};
export default function EnterButton({ className, link }: EnterButtonProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-[48%] -translate-x-1/2 -translate-y-full mb-1 sm:mb-2 md:mb-3 lg:mb-4 w-full flex items-center justify-center",
        className
      )}
    >
      <Link href={link}>
        <Image
          alt="llamao_enter_button"
          src="/images/llamao_enter_button.svg"
          width={134.4067840576172}
          height={67.2033920288086}
          className="w-[120%] sm:w-[140%] md:w-[160%] lg:w-[180%] h-auto cursor-pointer max-w-none"
        />
      </Link>
    </div>
  );
}
