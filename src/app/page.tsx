// "use client";

import { Button } from "@/components/common/button";
import ConnectButton from "@/components/common/text";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Connect Wallet</h1>
      <Button intent={"ghost"} className="text-lg">
        W95FA font should be loaded now!
      </Button>
      <ConnectButton />
    </div>
  );
}
