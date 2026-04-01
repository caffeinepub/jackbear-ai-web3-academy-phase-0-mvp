import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface PublicMetrics {
  averageProgress: bigint;
  activeLearnersToday?: bigint;
  mostCompletedLessonWeekly?: string;
}

export function usePublicMetrics() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PublicMetrics>({
    queryKey: ["publicMetrics"],
    queryFn: async () => {
      if (!actor) {
        return {
          averageProgress: BigInt(0),
        };
      }
      return actor.getPublicMetrics();
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}
