"use client";

import MainLayout from "@/components/layouts/main-layout";
import ProgressBar from "@/components/ui/progress/progress-bar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TestLoading() {
  const [progress, setProgress] = useState(0);

  // Animate the first progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <MainLayout
      headerIcon="/gifs/llamao_majestic_run.gif"
      className="space-y-4"
    >
      <Image
        src={"/gifs/llamao_promote_banner.gif"}
        alt="lamao_promote_banner"
        width={693}
        height={320}
        className="w-full md:w-[693] h-auto max-w-none mx-auto p-1 box-shadow-tertiary"
      />
      <ProgressBar value={progress} gradientBoxes />
    </MainLayout>
  );
}
