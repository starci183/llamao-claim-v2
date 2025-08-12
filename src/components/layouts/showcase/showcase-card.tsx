/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton/skeleton";
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
  loading?: boolean;
  isGradient?: boolean;
  balance?: string;
}

export const ShowcaseCard = memo(function ShowcaseCard({
  className,
  wrapperClassName,
  state,
  imgSrc,
  text,
  imageWidth = 140,
  imageHeight = 140,
  priority = false,
  onClick,
  description,
  loading = false,
  isGradient = true,
  balance,
}: ShowcaseCardProps) {
  const normalizedText =
    text &&
    typeof text === "string" &&
    text.trim() &&
    text.trim() !== "undefined" &&
    text.trim() !== "null"
      ? text.trim()
      : null;

  const fixedSizeStyle = {
    width: imageWidth,
    height: imageHeight,
    aspectRatio: `${imageWidth} / ${imageHeight}`,
  };

  if (loading || !imgSrc || !normalizedText) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-between box-shadow-showcase-card bg-[#C3C3C3] overflow-hidden p-2 space-y-2",
          wrapperClassName
        )}
      >
        <div className="relative bg-gray-200" style={fixedSizeStyle}>
          <Skeleton className="w-full h-full box-shadow-showcase-item" />
        </div>
        <div className="p-1.5 w-full box-shadow-showcase-item">
          <Skeleton className="h-6 w-full mx-auto" />
        </div>
      </div>
    );
  }

  const displayText = normalizedText || "Showcase Item";
  const safeDescription = description || "";
  const altText = state
    ? `Showcase image for ${state}: ${displayText}`
    : `Showcase image: ${displayText}`;

  const gradientBackground = isGradient
    ? "bg-gradient-to-r from-[#FFACFF] to-[#805FD4]"
    : "";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between box-shadow-showcase-card bg-[#C3C3C3] overflow-hidden transition-all duration-300 hover:scale-105 p-2",
        onClick && "cursor-pointer",
        wrapperClassName
      )}
      role="article"
      aria-label={`Showcase card: ${displayText}${
        safeDescription ? ` - ${safeDescription}` : ""
      }`}
      onClick={onClick}
    >
      <div className="relative bg-gray-200" style={fixedSizeStyle}>
        <Image
          src={imgSrc}
          alt={altText}
          width={imageWidth}
          height={imageHeight}
          className={cn(
            "box-shadow-showcase-item p-0.5 w-full h-full object-cover transition-transform duration-300",
            className
          )}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="100vw"
        />
      </div>
      {/* displayText */}
      <div className="w-full">
        <h3 className="text-sm text-black text-center">{displayText}</h3>
      </div>
      {/*  */}
      <div
        className={cn(
          "py-1 w-full box-shadow-showcase-item",
          gradientBackground
        )}
      >
        <p
          className="text-center text-base text-white line-clamp-2"
          role="heading"
          aria-level={3}
        >
          Minted
        </p>
      </div>
    </div>
  );
});
