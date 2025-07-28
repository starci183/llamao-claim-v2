import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react";

const MintPageLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center w-full overflow-hidden"
    )}
  >
    {children}
  </div>
);

export default MintPageLayout;
