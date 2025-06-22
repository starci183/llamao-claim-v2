import { Button } from "@/components/common/button";
import React from "react";

export default function SubHeaderHome() {
  return (
    <nav className="flex items-center justify-start gap-2 sm:gap-4 px-2 sm:px-3 py-2 bg-[#C3C3C3] overflow-x-auto">
      <Button
        intent={"ghost"}
        className="text-sm sm:text-lg p-0 whitespace-nowrap"
      >
        Docs
      </Button>
      <Button
        intent={"ghost"}
        className="text-sm sm:text-lg p-0 whitespace-nowrap"
      >
        Showcase
      </Button>
    </nav>
  );
}
