import { useQuery } from "@tanstack/react-query";
import { createActorWithConfig } from "../config";
import { useActor } from "./useActor";

export interface PublicMetrics {
  averageProgress: bigint;
  activeLearnersToday?: bigint;
  mostCompletedLessonWeekly?: string;
}

export function usePublicMetrics() {
  // useActor as secondary fallback; primary path uses anonymous actor directly
  const { actor: authActor } = useActor();

  return useQuery<PublicMetrics>({
    queryKey: ["publicMetrics"],
    queryFn: async () => {
      // Always try with a fresh anonymous actor first — no auth dependency
      let actorToUse = authActor;
      if (!actorToUse) {
        try {
          actorToUse = await createActorWithConfig();
        } catch {
          return { averageProgress: BigInt(0) };
        }
      }
      try {
        return await actorToUse.getPublicMetrics();
      } catch {
        return { averageProgress: BigInt(0) };
      }
    },
    // Enable immediately — does not depend on auth actor being ready
    enabled: true,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}
