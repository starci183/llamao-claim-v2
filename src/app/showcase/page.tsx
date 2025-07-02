"use client";

import CategoriesShowcase from "@/components/layouts/showcase/categories-showcase";
import ShowcasePagination from "@/components/layouts/showcase/showcase-pagination";
import ShowcaseTable from "@/components/layouts/showcase/showcase-table";
import { useWalletAddress } from "@/hooks/use-wallet-address";
import { useState } from "react";

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { address, isConnected } = useWalletAddress();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="space-y-6">
      <CategoriesShowcase
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ShowcaseTable
        category={selectedCategory || undefined}
        className="animate-in fade-in duration-300"
      />
    </div>
  );
}
