import type { FC, ReactNode } from "react";

const MintPageLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col items-center justify-start w-full h-full overflow-hidden">
    {children}
  </div>
);

export default MintPageLayout;
