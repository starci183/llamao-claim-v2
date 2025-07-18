import { Toaster } from "@/components/ui/toast/toaster";
import { WalletProvider } from "@/context/wallet-context";
import { type ReactNode } from "react";
import { AppKit } from "./appkit-provider";

type RootProvidersProps = {
  children: ReactNode;
};
export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <>
      <AppKit>
        <WalletProvider>{children}</WalletProvider>
      </AppKit>
      <Toaster />
    </>
  );
}
