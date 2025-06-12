"use client";

import { useState } from "react";
import MainLayout from "@/components/layouts/main-layout";
import CategoriesShowcase from "@/components/layouts/showcase/categories-showcase";
import ShowcaseTable from "@/components/layouts/showcase/showcase-table";

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);

    // Simulate loading delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <MainLayout
        headerIcon="/gifs/llamao_majestic_run.gif"
        text="Showcase"
        subHeader={false}
        className="w-full h-full p-2 sm:p-4 lg:p-6"
        wrapperClassName="w-full max-w-sm sm:max-w-md md:max-w-2xl"
      >
        <div className="space-y-6">
          <CategoriesShowcase
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <ShowcaseTable
            category={selectedCategory || undefined}
            loading={isLoading}
            className="animate-in fade-in duration-300"
          />
        </div>
      </MainLayout>
    </div>
  );
}
