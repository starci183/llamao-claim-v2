"use client";

import { Button } from "@/components/common/button";
import { useRouter } from "next/navigation";
import { memo } from "react";

const SubHeaderHome = memo(function SubHeaderHome() {
  const navigation = useRouter();
  return (
    <nav className="flex items-center justify-start gap-2 sm:gap-4 px-2 sm:px-3 py-2 bg-[#C3C3C3] overflow-x-auto">
      <Button
        intent={"ghost"}
        onClick={() => navigation.push("/")}
        className="text-sm sm:text-lg p-0 whitespace-nowrap"
      >
        Docs
      </Button>
      <Button
        intent={"ghost"}
        onClick={() => navigation.push("/showcase")}
        className="text-sm sm:text-lg p-0 whitespace-nowrap"
      >
        Showcase
      </Button>
    </nav>
  );
});

export default SubHeaderHome;
