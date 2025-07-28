"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function getBreakpoint(width: number): Breakpoint {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints["xl"]) return "xl";
  if (width >= breakpoints["lg"]) return "lg";
  if (width >= breakpoints["md"]) return "md";
  if (width >= breakpoints["sm"]) return "sm";
  return "xs";
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "xs"
  );

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

/**
 * ResponsiveFlags: Trạng thái responsive hiện tại và các hàm tiện ích
 */
export type ResponsiveFlags = {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  /**
   * Kiểm tra nếu breakpoint hiện tại lớn hơn hoặc bằng bp
   */
  up: (bp: Breakpoint) => boolean;
  /**
   * Kiểm tra nếu breakpoint hiện tại nhỏ hơn hoặc bằng bp
   */
  down: (bp: Breakpoint) => boolean;
  /**
   * Breakpoint hiện tại
   */
  current: Breakpoint;
};

const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

/**
 * useResponsive: Hook kiểm tra trạng thái responsive hiện tại
 */
export function useResponsive(): ResponsiveFlags {
  const current = useBreakpoint();
  const currentIdx = breakpointOrder.indexOf(current);

  // Kiểm tra nếu breakpoint hiện tại lớn hơn hoặc bằng bp
  const up = (bp: Breakpoint) => currentIdx >= breakpointOrder.indexOf(bp);
  // Kiểm tra nếu breakpoint hiện tại nhỏ hơn hoặc bằng bp
  const down = (bp: Breakpoint) => currentIdx <= breakpointOrder.indexOf(bp);

  return {
    isXs: current === "xs",
    isSm: current === "sm",
    isMd: current === "md",
    isLg: current === "lg",
    isXl: current === "xl",
    is2xl: current === "2xl",
    up,
    down,
    current,
  };
}
