import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";

interface RewardTabsProps {
  tabs: Array<{
    label: string;
    value: string;
  }>;
  defaultValue: string;
  onValueChange: (value: string) => void;
}

export const RewardTabs = ({ tabs, defaultValue, onValueChange }: RewardTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange} className="w-[300px]">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
