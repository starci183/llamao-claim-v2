import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { memo, useMemo } from "react";
import { Header } from "../common/header";
import SubHeaderHome from "./home/sub-header-home";

type MainLayoutProps = {
  headerIcon?: string;
  subHeader?: boolean;
  subHeaderComponent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  text?: string;
  boxShadowOuter?: string;
  boxShadowInner?: string;
};

const DEFAULT_SUB_HEADER = <SubHeaderHome />;

const MainLayout = memo<MainLayoutProps>(function MainLayout({
  children,
  text = "Llamao Web Testnet",
  headerIcon,
  subHeader = true,
  subHeaderComponent = DEFAULT_SUB_HEADER,
  className = "",
  boxShadowOuter = "box-shadow-primary",
  boxShadowInner = "box-shadow-secondary",
  ...props
}) {
  const headerIconElement = useMemo(() => {
    if (!headerIcon) return null;

    return (
      <Image
        src={headerIcon}
        alt="Llamao Web Testnet"
        width={64}
        height={64}
        className="size-4 sm:size-6 max-w-none"
        priority={false}
      />
    );
  }, [headerIcon]);

  const computedSubHeader = useMemo(() => {
    return subHeader ? subHeaderComponent : null;
  }, [subHeader, subHeaderComponent]);

  return (
    <div className="w-full flex bg-background items-center justify-center px-2 sm:px-4 lg:px-6">
      <div
        className={cn(
          "p-1 bg-[#C3C3C3] w-full md:w-fit container mx-auto",
          boxShadowOuter
        )}
      >
        <Header
          text={text}
          icon={headerIconElement}
          className="w-full"
          subHeader={computedSubHeader}
        />
        <div
          className={cn("p-2 sm:p-4 lg:p-6", className, boxShadowInner)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

export default MainLayout;
