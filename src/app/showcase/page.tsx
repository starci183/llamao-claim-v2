"use client";

import ShowcaseTable from "@/components/layouts/showcase/showcase-table";
import { useEffect, useState } from "react";

export default function Showcase() {
  const [selectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category);
  // };

  return (
    <div className="space-y-6">
      {/* <CategoriesShowcase
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      /> */}

      {/* Chỉ còn mỗi llamaoism ở trang about*/}
      {/* <Tabs defaultValue="llamaoism">
        <TabsList>
          <TabsTrigger
            value="llamaoism"
            icon={
              <Image
                alt="ball"
                src="/icons/ball_1.svg"
                width={24}
                height={24}
                className="w-6 h-auto"
              />
            }
            iconPosition="right"
          >
            Llamaoism
          </TabsTrigger>
        </TabsList>
        <TabsContent value="llamaoism">
          <ShowcaseTable
            category={selectedCategory || undefined}
            className="animate-in fade-in duration-300"
          />
        </TabsContent>
      </Tabs> */}
      <ShowcaseTable
        loading={loading}
        category={selectedCategory || undefined}
        className="animate-in fade-in duration-300"
      />
    </div>
  );
}
