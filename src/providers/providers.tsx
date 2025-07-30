import { Toaster } from "@/components/ui/toast/toaster";
import { WalletProvider } from "@/context/wallet-context";
import { type ReactNode } from "react";
import { AppKit } from "./appkit-provider";
import { AuthProvider } from "./auth-provider";

type RootProvidersProps = {
  children: ReactNode;
};
export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <>
      <AuthProvider>
        <AppKit>
          <WalletProvider>{children}</WalletProvider>
        </AppKit>
        <Toaster />
      </AuthProvider>
    </>
  );
}
