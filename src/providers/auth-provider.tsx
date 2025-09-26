"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { userService } from "@/service/user/user-service";
import { useSigner } from "@/hooks/use-signer";
import {
  attachAuthHeader,
  setUnauthorizedHandler,
} from "@/service/axios-client";
import { jwtDecode } from "jwt-decode";

// Helper function to check if all missions are fulfilled
const checkAllMissionsFulfilled = (user: User | null): boolean => {
  if (!user) return false;

  // Define the missions as they are in the portal page
  const missions = [
    user.season2?.followHahaWalletS10 || false,
    user.season2?.visitLlamaoGIPHYS10 || false,
    user.season2?.followLlamaoInstagramS10 || false,
    user.season2?.followLlamaoTiktokS10 || false,
    user.season2?.likePageXS10 || false,
    user.season2?.tweetPageXS10 || false,
  ];

  return missions.every((mission) => mission === true);
};

interface JwtPayload {
  sub: string; // userId
  exp: number; // expiry time (UNIX timestamp in seconds)
  iat?: number; // issued at
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface User {
  followX: boolean;
  joinDiscord: boolean;
  likeXPost: boolean;
  commentXPost: boolean;
  userAddress: string;
  createdAt: string;
  updatedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  season2: any;
}
interface AuthContextType {
  accessToken: string | null;
  walletAddress: string | null;
  login: (accessToken: string, walletAddress: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
  refreshUser: () => Promise<void>;
  isInitialized: boolean;
  areAllMissionsFulfilled: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAppKitAccount();
  const { getRawAddress } = useSigner();

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Stale-response guards
  const latestAddressRef = useRef<string | null>(null);
  const reqIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const handlingUnauthorizedRef = useRef(false);

  // Helper: fetch user guarded against stale responses
  const fetchUserFor = useCallback(async (address: string) => {
    try {
      // cancel previous
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const myReqId = ++reqIdRef.current;
      latestAddressRef.current = address;

      const res = await userService.getUser(address, {
        signal: abortRef.current.signal,
        // optional: force no-cache for BE/proxies
        headers: { "Cache-Control": "no-cache" },
      });

      // ignore if a newer request/address is active
      if (
        myReqId === reqIdRef.current &&
        latestAddressRef.current === address
      ) {
        setUser(res as User);
      }
    } catch (error: unknown) {
      // Silently ignore cancellation errors - they are expected
      const err = error as { name?: string; code?: string };
      if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
        return;
      }
      // Re-throw other errors for proper handling
      throw error;
    }
  }, []);

  // Restore session on load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = localStorage.getItem("accessToken");
      const stored = localStorage.getItem("walletAddress");
      const signerAddr = (await getRawAddress?.()) ?? stored ?? null;

      if (!cancelled) {
        if (token && signerAddr) {
          setAccessToken(token);
          setWalletAddress(signerAddr);
          attachAuthHeader(token);
          setUser(null); // clear to avoid flicker with old data
          fetchUserFor(signerAddr).catch((error: unknown) => {
            // Only log non-cancellation errors
            const err = error as { name?: string; code?: string };
            if (err?.name !== "CanceledError" && err?.code !== "ERR_CANCELED") {
              console.error("Failed to fetch user on session restore:", error);
            }
          });
        } else {
          attachAuthHeader(null);
          setUser(null);
        }
        setIsInitialized(true);
      }
    })();
    return () => {
      cancelled = true;
      abortRef.current?.abort();
    };
  }, [getRawAddress, fetchUserFor]);

  const login = useCallback(
    async (token: string, address: string) => {
      // Update local state + storage
      setAccessToken(token);
      setWalletAddress(address);
      localStorage.setItem("accessToken", token);
      localStorage.setItem("walletAddress", address);
      attachAuthHeader(token);

      // Clear stale user immediately, then refetch for the new wallet
      setUser(null);
      await fetchUserFor(address).catch((error: unknown) => {
        // Only log non-cancellation errors
        const err = error as { name?: string; code?: string };
        if (err?.name !== "CanceledError" && err?.code !== "ERR_CANCELED") {
          console.error("Failed to fetch user on login:", error);
        }
      });
    },
    [fetchUserFor]
  );

  const logout = useCallback(async () => {
    try {
      await disconnect?.();
    } catch {}
    // cancel any pending fetch
    abortRef.current?.abort();
    reqIdRef.current += 1; // invalidate in-flight
    latestAddressRef.current = null;

    setAccessToken(null);
    setWalletAddress(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("walletAddress");
    attachAuthHeader(null);
  }, [disconnect]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);

        // check expired
        const now = Date.now() / 1000; // tính bằng giây
        if (decoded.exp && decoded.exp < now) {
          console.warn("Token expired");
          logout();
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [logout]);

  // Auto-logout ONLY if the user was previously connected and then disconnects.
  // This prevents logging out during initial page load/hydration when wallet state
  // hasn't been restored yet (avoids losing session on F5).
  const prevIsConnectedRef = useRef<boolean | null>(null);
  useEffect(() => {
    const previouslyConnected = prevIsConnectedRef.current === true;
    if (previouslyConnected && !isConnected && accessToken) {
      void logout();
    }
    prevIsConnectedRef.current = isConnected;
  }, [isConnected, accessToken, logout]);

  // 401 handler from axios
  const handleUnauthorized = useCallback(async () => {
    if (handlingUnauthorizedRef.current) return;
    handlingUnauthorizedRef.current = true;
    try {
      await logout();
      router.replace("/");
    } finally {
      handlingUnauthorizedRef.current = false;
    }
  }, [logout, router]);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
  }, [handleUnauthorized]);

  const refreshUser = useCallback(async () => {
    if (!walletAddress) return;
    setUser(null); // optional: show skeleton/clear stale
    await fetchUserFor(walletAddress).catch((error: unknown) => {
      // Only log non-cancellation errors
      const err = error as { name?: string; code?: string };
      if (err?.name !== "CanceledError" && err?.code !== "ERR_CANCELED") {
        console.error("refreshUser failed:", error);
      }
    });
  }, [walletAddress, fetchUserFor]);

  // When walletAddress changes (e.g., user connects a *different* wallet),
  // clear the old user immediately and refetch if we’re authenticated.
  useEffect(() => {
    if (!walletAddress) {
      setUser(null);
      return;
    }
    // Clear to prevent showing previous wallet’s data
    setUser(null);
    if (accessToken) {
      fetchUserFor(walletAddress).catch((error: unknown) => {
        // Only log non-cancellation errors
        const err = error as { name?: string; code?: string };
        if (err?.name !== "CanceledError" && err?.code !== "ERR_CANCELED") {
          console.error("Failed to fetch user on wallet change:", error);
        }
      });
    }
  }, [walletAddress, accessToken, fetchUserFor]);

  // Keep axios header synced (safety)
  useEffect(() => {
    attachAuthHeader(accessToken);
  }, [accessToken]);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
  const areAllMissionsFulfilled = useMemo(
    () => checkAllMissionsFulfilled(user),
    [user]
  );

  const value = useMemo<AuthContextType>(
    () => ({
      accessToken,
      walletAddress,
      login,
      logout,
      isAuthenticated,
      user,
      refreshUser,
      isInitialized,
      areAllMissionsFulfilled,
    }),
    [
      accessToken,
      walletAddress,
      login,
      logout,
      isAuthenticated,
      user,
      refreshUser,
      isInitialized,
      areAllMissionsFulfilled,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
