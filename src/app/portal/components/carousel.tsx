import MainLayout from "@/components/layouts/main-layout";
import Image from "next/image";

interface CarouselProps {
  className?: string;
  items?: {
    name: string;
    img: string;
  }[];
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
  className = "",
  items = ITEMS,
}: CarouselProps) {
  return (
    <div>
      <MainLayout
        subHeader={false}
        headerIcon="/gifs/llamao_majestic_run.gif"
        className="max-w-[410px] mx-auto p-0.5 md:p-1 lg:p-1.5"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="flex items-center justify-center whitespace-nowrap animate-scroll bg-white gap-2">
            {items?.map((item) => (
              <div
                key={item.name}
                className={`flex-shrink-0 w-16 h-16 flex items-center justify-center ${className}`}
              >
                <Image
                  width={64}
                  height={64}
                  src={item.img}
                  alt={item.name}
                  className="w-full h-auto min-w-16 min-h-16 flex-shrink-0"
                />
              </div>
            ))}
            {items?.map((item) => (
              <div
                key={item.name}
                className={`flex-shrink-0 w-16 h-16 flex items-center justify-center ${className}`}
              >
                <Image
                  width={64}
                  height={64}
                  src={item.img}
                  alt={item.name}
                  className="w-full h-auto min-w-16 min-h-16 flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
