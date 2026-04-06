import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";
import { getSecretParameter } from "../utils/urlParams";
import { useInternetIdentity } from "./useInternetIdentity";

const ACTOR_QUERY_KEY = "actor";
export function useActor() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery<backendInterface>({
    queryKey: [ACTOR_QUERY_KEY, identity?.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;

      console.log(
        "[ACTOR-INIT] useActor queryFn — isAuthenticated:",
        isAuthenticated,
      );

      if (!isAuthenticated) {
        // Return anonymous actor if not authenticated — always safe for public reads
        const anonActor = await createActorWithConfig();
        console.log("[ACTOR-INIT] anonymous actor created");
        return anonActor;
      }

      const actorOptions = {
        agentOptions: {
          identity,
        },
      };

      const actor = await createActorWithConfig(actorOptions);

      // _initializeAccessControlWithSecret is a role-registration call only.
      // It can throw if:
      //  - CAFFEINE_ADMIN_TOKEN env var is not set on the backend (Runtime.trap)
      //  - The caller is already registered (returns silently — no-op)
      //  - The processError wrapper re-throws the backend trap as a JS Error
      //
      // CRITICAL: A failure here must NOT prevent the actor from being returned.
      // The actor itself is valid regardless of whether role-init succeeds.
      // All authenticated methods still work — the role is assigned on first
      // completeLesson/completeOnboarding call if needed.
      const adminToken = getSecretParameter("caffeineAdminToken") || "";
      try {
        await actor._initializeAccessControlWithSecret(adminToken);
        console.log(
          "[ACTOR-INIT] _initializeAccessControlWithSecret succeeded",
        );
      } catch (initErr) {
        // Log but do NOT rethrow — actor is still valid for all read and write methods
        console.warn(
          "[ACTOR-INIT] _initializeAccessControlWithSecret failed (non-fatal — actor still returned):",
          initErr,
        );
      }

      console.log("[ACTOR-INIT] authenticated actor ready");
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true,
    // Do not retry actor init — a failed init should resolve to an actor immediately,
    // not spin in retries that block all dependent queries.
    retry: false,
  });

  // When the actor changes, invalidate dependent queries
  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        },
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        },
      });
    }
  }, [actorQuery.data, queryClient]);

  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching,
  };
}
