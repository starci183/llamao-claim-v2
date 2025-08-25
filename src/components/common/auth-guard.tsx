"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Loading from "./loading";
import { cn } from "@/lib/utils";

interface AuthGuardProps {
  children: ReactNode;
  fallbackRoute?: string;
  className?: string;
}

/**
 * AuthGuard component that protects routes by checking authentication status.
 * Redirects unauthenticated users to the fallback route.
 */
export default function AuthGuard({
  children,
  fallbackRoute = "/",
  className,
}: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If initialized and not authenticated, redirect to fallback route
    if (isInitialized && !isAuthenticated) {
      router.replace(fallbackRoute);
    }
  }, [isInitialized, isAuthenticated, fallbackRoute, router]);

  // Show loading while auth state is being determined (initial load)
  if (!isInitialized) {
    return (
      <div
        className={cn(
          "flex items-center justify-center min-h-screen",
          className
        )}
      >
        <Loading />
      </div>
    );
  }

  // If authenticated, show the protected content
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated and initialized, the useEffect will handle the redirect
  // This should not be reached due to the redirect, but return null as fallback
  return null;
}
