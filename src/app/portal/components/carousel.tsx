"use client";

import MainLayout from "@/components/layouts/main-layout";
import { cn } from "@/lib/utils";
import Image from "next/image";
import axios from "axios";
import { useSWRWithAxios } from "@/hooks/use-swr";

interface CarouselProps {
  items?: {
    name: string;
    img: string;
  }[];
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  wrapperClassName?: string;
  loading?: boolean;
}

const ITEMS = [
  { img: "/images/home.svg", name: "Llamao Home" },
  { img: "/images/home.svg", name: "Llamao Home" },
  { img: "/images/home.svg", name: "Llamao Home" },
  { img: "/images/home.svg", name: "Llamao Home" },
  { img: "/images/home.svg", name: "Llamao Home" },
  { img: "/images/home.svg", name: "Llamao Home" },
] as CarouselProps["items"];

export default function Carousel({
  items,
  imageWidth = 56,
  imageHeight = 56,
}: CarouselProps) {
  const { data } = useSWRWithAxios<{ items: CarouselProps["items"] }>(
    "partners-list",
    async () => {
      const res = await axios.get("/api/partners");
      return res.data;
    }
  );

  const resolvedItems = items || data?.items || ITEMS;
  const fixedSizeStyle = {
    width: imageWidth,
    height: imageHeight,
    aspectRatio: `${imageWidth} / ${imageHeight}`,
  };

  const renderItems = () =>
    [
      ...(resolvedItems || []),
      ...(resolvedItems || []),
      ...(resolvedItems || []),
      ...(resolvedItems || []),
    ].map((item, idx) => (
      <div
        key={item.name + idx}
        className={cn(
          "flex-shrink-0 w-10 h-10 flex items-center justify-center"
        )}
        style={fixedSizeStyle}
      >
        <Image
          width={48}
          height={48}
          src={item.img}
          alt={item.name}
          className={cn("w-full h-auto flex-shrink-0")}
        />
      </div>
    ));
  return (
    <MainLayout
      text="Our Partners"
      subHeader={false}
      headerIcon="/gifs/llamao_majestic_run.gif"
      className={cn("max-w-md mx-auto p-0.5 md:p-1 lg:p-1.5")}
    >
      <div
        className={cn(
          "w-full h-full flex items-center justify-center carousel-outer"
        )}
      >
        <div
          className={cn(
            "flex items-center whitespace-nowrap animate-scroll bg-white gap-2"
          )}
        >
          {renderItems()}
        </div>
      </div>
    </MainLayout>
  );
}
