"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { userService } from "@/service/user/user-service";
import { useSigner } from "@/hooks/use-signer";
import { attachAuthHeader } from "@/service/axios-client";

interface User {
  followX: boolean;
  joinDiscord: boolean;
  likeXPost: boolean;
  commentXPost: boolean;
  userAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  accessToken: string | null;
  walletAddress: string | null;
  login: (accessToken: string, walletAddress: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { isConnected } = useAppKitAccount(); // ← detect wallet state
  const { getRawAddress } = useSigner(); // Restore persisted session on page refresh
  // Restore persisted session on page refresh
  useEffect(() => {
    const restoreSession = async () => {
      if (!getRawAddress) return;
      const address = await getRawAddress();
      if (!address) return;

      setAccessToken(localStorage.getItem("accessToken"));
      setWalletAddress(address);
      const fetchUser = async () => {
        const user = await userService.getUser(address);
        setUser(user as User);
      };
      fetchUser();
      console.log("user", user);
    };

    restoreSession();
  }, [getRawAddress]);
  console.log("address", walletAddress);

  // Auto‑logout if the wallet disconnects
  useEffect(() => {
    if (!isConnected && accessToken) logout();
  }, [isConnected]);

  const login = (token: string, address: string) => {
    setAccessToken(token);
    setWalletAddress(address);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("walletAddress", address);
    attachAuthHeader(token);
  };

  const logout = () => {
    setAccessToken(null);
    setWalletAddress(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("walletAddress");
    attachAuthHeader(null);
  };

  const refreshUser = async () => {
    if (walletAddress) {
      try {
        const user = await userService.getUser(walletAddress);
        setUser(user as User);
      } catch (error) {
        console.error("Failed to refresh user:", error);
      }
    }
  };

  // Attach auth header when token changes
  useEffect(() => {
    attachAuthHeader(accessToken);
  }, [accessToken]);

  const isAuthenticated = !!accessToken;
  console.log("user", user);
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        walletAddress,
        login,
        logout,
        isAuthenticated,
        user,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
