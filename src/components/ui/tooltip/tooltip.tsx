"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type PopoverProps = {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  /** distance in px between anchor and popover */
  offset?: number;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  onClose?: () => void;
  className?: string;
};

type Position = { top: number; left: number };

export default function Popover({
  open,
  anchorRef,
  children,
  offset = 8,
  side = "bottom",
  align = "start",
  onClose,
  className,
}: PopoverProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();

    let top = rect.bottom + offset;
    let left = rect.left;

    if (side === "top") top = rect.top - offset;
    if (side === "left") {
      top = rect.top;
      left = rect.left - offset;
    }
    if (side === "right") {
      top = rect.top;
      left = rect.right + offset;
    }

    if (align === "center") {
      left = rect.left + rect.width / 2;
    } else if (align === "end") {
      left = rect.right;
    }

    setPosition({ top, left });
  }, [anchorRef, offset, side, align]);

  // Mount portal only on client
  useEffect(() => setMounted(true), []);

  // Recompute position when open or on layout changes
  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePosition]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    const onClick = (e: MouseEvent) => {
      const anchor = anchorRef.current;
      const content = contentRef.current;
      if (!anchor || !content) return;
      if (
        !anchor.contains(e.target as Node) &&
        !content.contains(e.target as Node)
      ) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose, anchorRef]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        "fixed z-[1000]", // above app content
        className
      )}
      style={{
        top:
          side === "top"
            ? position.top
            : side === "left" || side === "right"
            ? position.top
            : position.top,
        left: position.left,
        transform:
          align === "center"
            ? side === "top" || side === "bottom"
              ? "translate(-50%, 0)"
              : "translate(0, 0)"
            : align === "end"
            ? side === "top" || side === "bottom"
              ? "translate(-100%, 0)"
              : "translate(0, 0)"
            : "translate(0, 0)",
      }}
      role="dialog"
      aria-modal={false}
    >
      {children}
    </div>,
    document.body
  );
}
