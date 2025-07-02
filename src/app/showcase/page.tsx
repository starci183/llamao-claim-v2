"use client";

import CategoriesShowcase from "@/components/layouts/showcase/categories-showcase";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CategoriesShowcase
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Toggle for showing only user's items */}
        {/* {isConnected && (
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyMyItems}
                    onChange={handleToggleMyItems}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    My Items Only
                  </span>
                </label>
              </div>
            )} */}
      </div>

      <ShowcaseTable
        category={selectedCategory || undefined}
        userAddress={isConnected ? address : undefined}
        showOnlyMyItems={true}
        className="animate-in fade-in duration-300"
        itemsPerPage={9}
      />
    </div>
  );
}
