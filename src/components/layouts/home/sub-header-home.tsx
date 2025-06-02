import { Button } from "@/components/common/button";
import React from "react";

export default function SubHeaderHome() {
  return (
    <div className="flex items-center justify-start gap-4 px-3 py-2 bg-[#C3C3C3]">
      <Button intent={"ghost"} className="text-lg p-0">
        Docs
      </Button>
      <Button intent={"ghost"} className="text-lg p-0">
        Showcase
      </Button>
    </div>
  );
}
