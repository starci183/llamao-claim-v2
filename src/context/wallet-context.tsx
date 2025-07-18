"use client";

import {
  useAppKitAccount,
  useWalletInfo,
  type ConnectedWalletInfo,
} from "@reown/appkit/react";
import React, { createContext, useContext } from "react";

type WalletContextType = {
  isConnected: boolean;
  address?: string;
  walletInfo?: ConnectedWalletInfo;
};

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address } = useAppKitAccount();
  const { walletInfo } = useWalletInfo();

  const isConnected = !!address && !!walletInfo;

  return (
    <WalletContext.Provider value={{ isConnected, address, walletInfo }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);
