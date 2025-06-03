import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";

export default function Loading() {
  return (
    <MainLayout headerIcon="/gifs/llamao_majestic_run.gif">
      <Image
        src={"/gifs/llamao_promote_banner.gif"}
        alt="lamao_promote_banner"
        width={693}
        height={320}
        className="w-[693px] h-auto max-w-none mx-auto"
      />
    </MainLayout>
  );
}
