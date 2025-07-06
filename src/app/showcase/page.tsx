"use client";

import ShowcaseTable from "@/components/layouts/showcase/showcase-table";
import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import Image from "next/image";
import { useState } from "react";

export default function Showcase() {
  const [selectedCategory] = useState<string>("");

  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategory(category);
  // };

  return (
    <div className="space-y-6">
      {/* <CategoriesShowcase
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      /> */}

      <Tabs defaultValue="llamaoism">
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
            Llamao-ism
          </TabsTrigger>
          <TabsTrigger
            value="community"
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
            Community
          </TabsTrigger>
        </TabsList>
        <TabsContent value="llamaoism">
          <Tabs defaultValue="ideology">
            <TabsList className="bg-transparent">
              <TabsTrigger value="ideology" variant="primary">
                Ideology
              </TabsTrigger>
              <TabsTrigger value="playbook" variant="primary">
                Playbook
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ideology">
              <ShowcaseTable
                category={selectedCategory || undefined}
                className="animate-in fade-in duration-300"
              />
            </TabsContent>

            <TabsContent value="playbook">
              <ShowcaseTable
                category={selectedCategory || undefined}
                className="animate-in fade-in duration-300"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="community">
          <ShowcaseTable
            category={selectedCategory || undefined}
            className="animate-in fade-in duration-300"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
