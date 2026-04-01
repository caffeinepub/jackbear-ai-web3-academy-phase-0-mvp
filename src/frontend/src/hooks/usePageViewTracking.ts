import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export function usePageViewTracking() {
  const location = useLocation();
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    if (!actor) return;
    if (!isAuthenticated) {
      console.log("[BP-AUDIT] trackPageView: skipping — anonymous user");
      return;
    }

    const currentPath = location.pathname;
    if (currentPath === lastTrackedPath.current) return;
    lastTrackedPath.current = currentPath;

    actor.trackPageView().catch((error) => {
      console.warn("Failed to track page view:", error);
    });
  }, [location.pathname, actor, isAuthenticated]);
}
