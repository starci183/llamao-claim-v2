"use client";

import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { monadTestnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import type { ReactNode } from "react";

// 1. Get projectId at https://cloud.reown.com
const projectId =
  process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694";

// 2. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "http://localhost:3000",
  icons: ["./favicon.ico"],
};

// 3. Create the AppKit instance
export const appKitInstance = createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [monadTestnet],
  projectId,
  disableAppend: true,
});

type AppKitProps = {
  children: ReactNode;
};

export function AppKit({ children }: AppKitProps) {
  return <>{children}</>;
}
