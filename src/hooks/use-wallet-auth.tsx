// hooks/use-wallet-auth.ts
"use client";

import { useCallback, useRef, useState } from "react";
import { useSigner } from "@/hooks/use-signer";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { walletService } from "@/service/wallet/wallet-service";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

type WalletAuthReturn = {
  /** fire‑and‑forget connect + sign‑in */
  connectAndSign: () => Promise<void>;
  /** true while any async step is running */
  loading: boolean;
};

export function useWalletAuth(): WalletAuthReturn {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { signer } = useSigner();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  /* live refs so async closures always see freshest values */
  const signerRef = useRef<typeof signer>(null);
  signerRef.current = signer;
  const addressRef = useRef<string | null>(null);
  addressRef.current = address ?? null;

  /** wait until signer & address appear */
  const waitWalletReady = () =>
    new Promise<void>((resolve, reject) => {
      const start = Date.now();
      const id = setInterval(() => {
        if (signerRef.current && addressRef.current) {
          clearInterval(id);
          resolve();
        } else if (Date.now() - start > 10_000) {
          clearInterval(id);
          reject(new Error("Timeout waiting for wallet connection"));
        }
      }, 150);
    });

  const connectAndSign = useCallback(async () => {
    if (isAuthenticated || loading) return;

    try {
      setLoading(true);

      // 1. connect wallet UI
      if (!isConnected) await open();

      // 2. wait for hooks
      await waitWalletReady();

      // 3. backend message
      const { message } = await walletService.requestMessage();
      if (!message) throw new Error("Missing message from server");

      // 4. sign & verify
      const signature = await signerRef.current!.signMessage(message);
      const { token } = await walletService.verifyMessage(message, signature);
      if (!token) throw new Error("Missing token from server");

      // 5. store & navigate
      login(token, addressRef.current!);
      router.push("/portal");
    } catch (err: unknown) {
      const msg = ((err as Error)?.message || "").toLowerCase();
      const isUserReject =
        (err as { code?: number })?.code === 4001 ||
        msg.includes("user rejected") ||
        msg.includes("cancelled");
      if (isUserReject) {
        console.info("[wallet‑auth] signature rejected");
      } else {
        console.error("[wallet‑auth] failed:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, loading, isConnected, open, login, router]);

  return { connectAndSign, loading };
}
