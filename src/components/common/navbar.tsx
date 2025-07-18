"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { memo, useCallback, useMemo } from "react";
import { Button } from "./button";
import { useWalletContext } from "@/context/wallet-context";

// Constants
const NAV_BUTTON_BASE_CLASSES =
  "w-full min-w-20 md:min-w-32 flex items-center justify-center text-base transform transition-all hover:scale-105";
const ICON_SIZE = 24;

// Types
interface NavbarProps {
  className?: string;
  navbarItems?: NavbarItem[];
  onNavigationStart?: () => void;
  onNavigationEnd?: () => void;
}

interface NavbarItem {
  label: string;
  href: string;
  icon?: string;
  disabled?: boolean;
}

interface ProcessedNavItem extends NavbarItem {
  isActive: boolean;
  iconElement: ReactElement | null;
}

export const items: NavbarItem[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Portal",
    href: "/portal",
    icon: "/icons/ball_1.svg",
  },
  {
    label: "Showcase",
    href: "/showcase",
  },
] as const;

const createIconElement = (iconSrc: string, label: string): ReactElement => (
  <Image
    src={iconSrc}
    alt={`${label} icon`}
    width={ICON_SIZE}
    height={ICON_SIZE}
    className="w-6 h-6"
    priority={false}
  />
);

const processNavItems = (
  items: NavbarItem[],
  currentPath: string
): ProcessedNavItem[] => {
  return items.map((item) => {
    let isActive = currentPath === item.href;

    if (item.href === "/portal") {
      isActive = currentPath === item.href || currentPath.startsWith("/mint");
    }

    return {
      ...item,
      isActive,
      iconElement: item.icon ? createIconElement(item.icon, item.label) : null,
    };
  });
};

const NavItem = memo(
  ({
    item,
    onNavigate,
  }: {
    item: ProcessedNavItem;
    onNavigate: (href: string) => void;
  }) => {
    const handleClick = useCallback(() => {
      if (item.disabled) return;
      onNavigate(item.href);
    }, [item.href, item.disabled, onNavigate]);

    const buttonElement = item.isActive ? (
      <Button
        intent="gradient"
        className={NAV_BUTTON_BASE_CLASSES}
        icon={item.iconElement}
        disabled={item.disabled}
      >
        {item.label}
      </Button>
    ) : (
      <Button
        intent="secondary"
        className={NAV_BUTTON_BASE_CLASSES}
        disabled={item.disabled}
      >
        {item.label}
      </Button>
    );

    return (
      <li>
        <Link
          href={item.href}
          onClick={handleClick}
          className="w-full"
          aria-current={item.isActive ? "page" : undefined}
        >
          {buttonElement}
        </Link>
      </li>
    );
  }
);

NavItem.displayName = "NavItem";

const Navbar = memo(function Navbar({ className, navbarItems }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isConnected } = useWalletContext();

  const processedNavItems = useMemo(() => {
    if (!navbarItems?.length) return [];
    const updatedItems = navbarItems.map((item) =>
      item.href === "/showcase" && !isConnected
        ? { ...item, disabled: true }
        : item
    );
    return processNavItems(updatedItems, pathname);
  }, [navbarItems, pathname, isConnected]);

  const handleNavigation = useCallback(
    (href: string) => {
      if (href === pathname) return;
      router.push(href);
    },
    [router, pathname]
  );

  if (!processedNavItems.length) {
    return null;
  }

  return (
    <nav className={cn("p-4", className)} role="navigation">
      <ul className="flex items-center justify-center space-x-4">
        {processedNavItems.map((item) => (
          <NavItem key={item.href} item={item} onNavigate={handleNavigation} />
        ))}
      </ul>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
