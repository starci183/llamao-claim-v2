"use client";

import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";
import { memo } from "react";

const SubHeaderHome = memo(function SubHeaderHome() {
  return (
    <nav
      className={cn(
        "flex items-center justify-start gap-2 sm:gap-4 px-2 sm:px-3 py-1 bg-[#C3C3C3] overflow-x-auto"
      )}
    >
      <Button
        intent={"ghost"}
        onClick={() => window.open("https://x.com/llamao_", "_blank")}
        className={cn("text-sm sm:text-lg p-0 whitespace-nowrap")}
      >
        Twitter
      </Button>
      <Button
        intent={"ghost"}
        onClick={() =>
          window.open("https://discord.com/invite/llamao", "_blank")
        }
        className={cn("text-sm sm:text-lg p-0 whitespace-nowrap")}
      >
        Discord
      </Button>
    </nav>
  );
});

export default SubHeaderHome;
