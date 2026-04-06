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
      console.log("[PUBLIC-READ] usePublicMetrics: fetching getPublicMetrics");
      // Always try with a fresh anonymous actor first — no auth dependency
      let actorToUse = authActor;
      if (!actorToUse) {
        try {
          actorToUse = await createActorWithConfig();
          console.log(
            "[PUBLIC-READ] usePublicMetrics: using fresh anonymous actor",
          );
        } catch (e) {
          console.error(
            "[PUBLIC-READ] usePublicMetrics: createActorWithConfig failed:",
            e,
          );
          return { averageProgress: BigInt(0) };
        }
      }
      try {
        const result = await actorToUse.getPublicMetrics();
        console.log("[PUBLIC-READ] usePublicMetrics: result:", result);
        return result;
      } catch (e) {
        console.error(
          "[PUBLIC-READ] usePublicMetrics: getPublicMetrics failed:",
          e,
        );
        return { averageProgress: BigInt(0) };
      }
    },
    // Enable immediately — does not depend on auth actor being ready
    enabled: true,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
}
