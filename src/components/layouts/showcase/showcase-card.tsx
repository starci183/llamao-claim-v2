import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo } from "react";

interface ShowcaseCardProps {
  className?: string;
  wrapperClassName?: string;
  state?: string;
  imgSrc?: string;
  text?: string;
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
  onClick?: () => void;
  description?: string;
}

const ShowcaseCard = memo(function ShowcaseCard({
  className,
  wrapperClassName,
  state,
  imgSrc,
  text = "Showcase Item",
  imageWidth = 220,
  imageHeight = 120,
  priority = false,
  onClick,
  description,
}: ShowcaseCardProps) {
  // Generate meaningful alt text
  const altText = state
    ? `Showcase image for ${state}: ${text}`
    : text !== "Showcase Item"
    ? `Showcase image: ${text}`
    : "Showcase image";

  const cardContent = (
    <div
      className={cn(
        "flex flex-col items-center justify-between box-shadow-showcase-card bg-[#C3C3C3] overflow-hidden transition-all duration-300 hover:scale-105 p-2 space-y-2",
        onClick && "cursor-pointer",
        wrapperClassName
      )}
      role="article"
      aria-label={`Showcase card: ${text}${
        description ? ` - ${description}` : ""
      }`}
      onClick={onClick}
    >
      {imgSrc && (
        <div className="w-full h-auto relative overflow-hidden bg-gray-200">
          <Image
            src={imgSrc}
            alt={altText}
            width={imageWidth}
            height={imageHeight}
            className={cn(
              "box-shadow-showcase-item w-full h-full object-cover transition-transform duration-300 hover:scale-110",
              className
            )}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="py-1 w-full box-shadow-showcase-item">
        <h3
          className="text-center text-lg font-semibold text-gray-800 line-clamp-2"
          role="heading"
          aria-level={3}
        >
          {text}
        </h3>
      </div>
    </div>
  );

  return cardContent;
});

export default ShowcaseCard;
