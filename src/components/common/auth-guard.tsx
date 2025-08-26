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
  requireMissionCompletion?: boolean;
}

/**
 * AuthGuard component that protects routes by checking authentication status.
 * Redirects unauthenticated users to the fallback route.
 * Can also check if missions are completed when requireMissionCompletion is true.
 */
export default function AuthGuard({
  children,
  fallbackRoute = "/",
  className,
  requireMissionCompletion = false,
}: AuthGuardProps) {
  const { isAuthenticated, isInitialized, areAllMissionsFulfilled, user } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    // If initialized and not authenticated, redirect to fallback route
    if (isInitialized && !isAuthenticated) {
      router.replace(fallbackRoute);
      return;
    }

    // If authenticated but mission completion is required and not fulfilled, redirect to portal
    // Important: Only redirect if user data is loaded (user is not null)
    if (
      isInitialized &&
      isAuthenticated &&
      requireMissionCompletion &&
      user !== null && // Wait for user data to load
      !areAllMissionsFulfilled
    ) {
      router.replace("/portal");
    }
  }, [
    isInitialized,
    isAuthenticated,
    fallbackRoute,
    router,
    requireMissionCompletion,
    areAllMissionsFulfilled,
    user,
  ]);

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

  // If authenticated, check mission completion requirement
  if (isAuthenticated) {
    // Show loading while user data is being fetched
    if (requireMissionCompletion && user === null) {
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

    // If mission completion is required but not fulfilled, redirect will happen in useEffect
    // Show loading while the redirect is happening
    if (requireMissionCompletion && user !== null && !areAllMissionsFulfilled) {
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

    return <>{children}</>;
  }

  // If not authenticated and initialized, the useEffect will handle the redirect
  // This should not be reached due to the redirect, but return null as fallback
  return null;
}
