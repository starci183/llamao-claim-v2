import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type EnterButtonProps = {
  className?: string;
  link: string;
};

const IMAGE_WIDTH = 134;
const IMAGE_HEIGHT = 67;

const EnterButton = memo(function EnterButton({
  className,
  link,
}: EnterButtonProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-1 sm:mb-2 md:mb-3 lg:mb-4 w-full flex items-center justify-center",
        className
      )}
    >
      <Link href={link} tabIndex={0} aria-label="Enter">
        <Image
          alt="llamao_enter_button"
          src="/images/llamao_enter_button.svg"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          className={cn(
            "w-[80%] sm:w-[100%] md:w-[120%] lg:w-[140%] h-auto cursor-pointer max-w-none"
          )}
          priority
        />
      </Link>
    </div>
  );
});

export default EnterButton;
