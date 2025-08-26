"use client";

import AuthGuard from "@/components/common/auth-guard";
import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

const MintPageLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <AuthGuard fallbackRoute="/portal" requireMissionCompletion={true}>
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full overflow-hidden"
      )}
    >
      {children}
    </div>
  </AuthGuard>
);

export default MintPageLayout;
