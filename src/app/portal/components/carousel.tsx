import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";

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
  items = ITEMS,
  imageWidth = 96,
  imageHeight = 96,
}: CarouselProps) {
  const fixedSizeStyle = {
    width: imageWidth,
    height: imageHeight,
    aspectRatio: `${imageWidth} / ${imageHeight}`,
  };

  const renderItems = () =>
    [
      ...(items || []),
      ...(items || []),
      ...(items || []),
      ...(items || []),
    ].map((item, idx) => (
      <div
        key={item.name + idx}
        className="flex-shrink-0 w-16 h-16 flex items-center justify-center"
        style={fixedSizeStyle}
      >
        <Image
          width={64}
          height={64}
          src={item.img}
          alt={item.name}
          className="w-full h-auto flex-shrink-0"
        />
      </div>
    ));
  return (
    <MainLayout
      text="Our Partners"
      subHeader={false}
      headerIcon="/gifs/llamao_majestic_run.gif"
      className="max-w-xl mx-auto p-0.5 md:p-1 lg:p-1.5"
    >
      <div className="w-full h-full flex items-center justify-center carousel-outer">
        <div className="flex items-center whitespace-nowrap animate-scroll bg-white gap-2 ">
          {renderItems()}
        </div>
      </div>
    </MainLayout>
  );
}
