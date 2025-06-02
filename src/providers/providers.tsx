import { Toaster } from "@/components/ui/toast/toaster";
import React from "react";

type RootProvidersProps = {
  children: React.ReactNode;
};
export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
