"use client";
import { Toaster } from "@/components/ui/toast/toaster";
import { type ReactNode } from "react";
import { AppKit } from "./appkit-provider";

type RootProvidersProps = {
  children: ReactNode;
};
export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <>
      <AppKit>{children}</AppKit>
      <Toaster />
    </>
  );
}
