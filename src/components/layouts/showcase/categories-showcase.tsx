import { Button } from "@/components/common/button";
import { cn } from "@/lib/utils";

const CATEGORIES_DATA = [
  { title: "All", state: "" },
  { title: "Meme", state: "meme" },
  { title: "Community", state: "community" },
  { title: "Arts", state: "arts" },
  { title: "PFPs", state: "pfps" },
];

interface CategoriesShowcaseProps {
  className?: string;
  wrapperClassName?: string;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function CategoriesShowcase({
  className,
  wrapperClassName = "w-full",
  selectedCategory = "",
  onCategoryChange,
}: CategoriesShowcaseProps) {
  const handleCategoryClick = (categoryState: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryState);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4 w-full mb-6",
        wrapperClassName
      )}
    >
      {CATEGORIES_DATA.map((category, index) => {
        const isSelected = selectedCategory === category.state;

        return (
          <Button
            key={index}
            onClick={() => handleCategoryClick(category.state)}
            className={cn(
              "!shadow-none transition-all duration-300 text-black w-full p-1 sm:p-2 max-w-16 sm:max-w-20 md:max-w-28 hover:scale-105",
              isSelected
                ? " border-b-[#AAAAAA] border-b-2 sm:border-b-3 md:border-b-4"
                : "",
              className
            )}
          >
            <span className={cn("text-sm md:text-base font-medium text-black")}>
              {category.title}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
