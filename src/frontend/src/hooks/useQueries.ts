import { debugBPWrite } from "@/lib/betaDebug";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AnalyticsStats,
  BearCredits,
  CompleteLessonArgs,
  CompleteQuestArgs,
  LessonProgress,
  QuizResult,
  SubmitQuizArgs,
  UserProfile,
} from "../backend";
import { useActor } from "./useActor";

// ─── localStorage helpers ────────────────────────────────────────────────────

const LS_KEY = "jb_lesson_progress";
const LS_BOSS_KEY = "jb_boss_attempted";
const LS_BEST_SCORES_KEY = "jb_best_scores";

// ─── World 0 legacy-to-canonical ID migration ────────────────────────────────
// Old World 0 IDs (0.1…0.9) are numeric-looking strings that collapse under
// float coercion (0.10 === 0.1). Canonical IDs use zero-padded two-digit format (0.00–0.90).
// IMPORTANT: "0.10" is canonical (lesson 2), NOT a legacy ID — do not include it here.
// The 10th legacy lesson would have been stored as "0.1" (float coercion), already mapped above.
const LEGACY_WORLD0_ID_MAP: Record<string, string> = {
  "0.1": "0.00",
  "0.2": "0.10",
  "0.3": "0.20",
  "0.4": "0.30",
  "0.5": "0.40",
  "0.6": "0.50",
  "0.7": "0.60",
  "0.8": "0.70",
  "0.9": "0.80",
  // NOTE: "0.10" is NOT a legacy ID — it is the canonical ID for World 0 lesson 2.
  // The 10th legacy lesson would have been stored as "0.1" (float coercion), which
  // is already covered by the "0.1" → "0.00" entry above.
};

/** Translate a legacy World 0 lesson ID to its canonical form. All other IDs pass through unchanged. */
function canonicalLessonId(lessonId: string): string {
  return LEGACY_WORLD0_ID_MAP[lessonId] ?? lessonId;
}

export type LocalLessonProgress = {
  lessonId: string;
  attempted: boolean;
  unlocked: boolean;
  completed: boolean;
  completionTime: number;
};

function readLocalProgress(): Record<string, LocalLessonProgress> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocalProgress(data: Record<string, LocalLessonProgress>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function readLocalBestScores(): Record<string, number> {
  try {
    const raw = localStorage.getItem(LS_BEST_SCORES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocalBestScores(data: Record<string, number>) {
  try {
    localStorage.setItem(LS_BEST_SCORES_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

/** Mark a lesson as attempted+unlocked in localStorage immediately. */
export function markLocalAttempted(lessonId: string) {
  const data = readLocalProgress();
  const existing = data[lessonId];
  // Once unlocked/attempted, never revert
  data[lessonId] = {
    lessonId,
    attempted: true,
    unlocked: true,
    completed: existing?.completed ?? false,
    completionTime: existing?.completionTime ?? 0,
  };
  writeLocalProgress(data);
}

/** Mark a lesson as completed in localStorage. Preserves attempted/unlocked=true. */
export function markLocalCompleted(lessonId: string) {
  const data = readLocalProgress();
  const existing = data[lessonId];
  data[lessonId] = {
    lessonId,
    attempted: true,
    unlocked: true,
    completed: true,
    completionTime: existing?.completionTime || Date.now(),
  };
  writeLocalProgress(data);
}

/** Read a synchronous snapshot of localStorage progress (used for immediate UI). */
export function getLocalProgressSnapshot(): Record<
  string,
  LocalLessonProgress
> {
  return readLocalProgress();
}

// ─── Boss-attempted helpers ──────────────────────────────────────────────────

function readLocalBossAttempted(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LS_BOSS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocalBossAttempted(data: Record<string, boolean>) {
  try {
    localStorage.setItem(LS_BOSS_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function markLocalBossAttempted(worldId: string) {
  const data = readLocalBossAttempted();
  data[worldId] = true;
  writeLocalBossAttempted(data);
}

export function isBossAttemptedLocally(worldId: string): boolean {
  const data = readLocalBossAttempted();
  return !!data[worldId];
}

// ─── Best score helpers ──────────────────────────────────────────────────────

export function getLocalBestScore(lessonId: string): number | null {
  const scores = readLocalBestScores();
  return scores[lessonId] ?? null;
}

export function updateLocalBestScore(
  lessonId: string,
  newScore: number,
): number {
  const scores = readLocalBestScores();
  const current = scores[lessonId] ?? -1;
  if (newScore > current) {
    scores[lessonId] = newScore;
    writeLocalBestScores(scores);
    return newScore;
  }
  return current === -1 ? newScore : current;
}

// ─── Merge backend + localStorage ───────────────────────────────────────────

/**
 * Merge backend LessonProgress array with localStorage snapshot.
 * attempted/unlocked/completed are sticky: once true, stays true forever.
 */
export function mergeProgressData(
  backendData: LessonProgress[],
  localData: Record<string, LocalLessonProgress>,
): LessonProgress[] {
  const merged: Record<string, LessonProgress> = {};

  // Start with backend data — canonicalize IDs so legacy World 0 entries merge correctly
  for (const item of backendData) {
    const id = canonicalLessonId(item.lessonId);
    const existing = merged[id];
    if (existing) {
      // Merge sticky flags if the same canonical ID appears under both old and new key
      merged[id] = {
        ...existing,
        attempted: existing.attempted || item.attempted,
        unlocked: existing.unlocked || item.unlocked,
        completed: existing.completed || item.completed,
      };
    } else {
      merged[id] = { ...item, lessonId: id };
    }
  }

  // Merge localStorage — canonicalize keys; localStorage may only contribute attempted/unlocked.
  // completed must ONLY come from backend — never OR-merge from localStorage.
  for (const [rawLessonId, local] of Object.entries(localData)) {
    const lessonId = canonicalLessonId(rawLessonId);
    const existing = merged[lessonId];
    if (existing) {
      merged[lessonId] = {
        ...existing,
        attempted: existing.attempted || local.attempted,
        unlocked: existing.unlocked || local.unlocked,
        // backend wins for completed — ignore local.completed
        completed: existing.completed,
      };
    } else {
      // Entry not in backend — optimistic cache only; never mark as completed
      merged[lessonId] = {
        lessonId,
        attempted: local.attempted,
        unlocked: local.unlocked,
        completed: false,
        completionTime: BigInt(local.completionTime),
      };
    }
  }

  return Object.values(merged);
}

// ─── Bear Points persistence ─────────────────────────────────────────────────

/**
 * Write Bear Points to localStorage exactly once per unique id (dedup guard).
 * Also fires the toast event and appends to the ledger.
 *
 * This is the single authoritative writer for all BP sources except easter eggs
 * (which go through awardReward() in the additions layer).
 *
 * @param id   - Unique dedup key, e.g. "lesson-5", "boss-world-1"
 * @param amount - BP to award
 */
export function writeBPOnce(_id: string, amount: number): void {
  try {
    if (amount <= 0) return;
    window.dispatchEvent(
      new CustomEvent("bear-points-awarded", { detail: { amount } }),
    );
  } catch {
    // non-critical — silent
  }
}

// ─── React Query hooks ───────────────────────────────────────────────────────

export function useGetLessonProgress(worldId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LessonProgress[]>({
    queryKey: ["lessonProgress", worldId],
    queryFn: async () => {
      if (!actor) return [];
      const backendData = await actor.getCurrentWorldLessonProgress(worldId);
      const localData = readLocalProgress();
      return mergeProgressData(backendData, localData);
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

// Keep old name as alias for backward compatibility
export function useGetCurrentWorldLessonProgress(worldId: string) {
  return useGetLessonProgress(worldId);
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: 2,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: { displayName: string; avatar: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProfile(args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetBearCredits() {
  const { actor, isFetching } = useActor();

  return useQuery<BearCredits | null>({
    queryKey: ["bearCredits"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBearCredits();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCompleteLesson() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      args,
      creditsReward,
      showToast = true,
    }: {
      args: CompleteLessonArgs;
      creditsReward?: number;
      showToast?: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      markLocalCompleted(args.lessonId);
      const result = await actor.completeLesson(args);
      return {
        creditsReward,
        showToast,
        isFirstCompletion: result.isFirstCompletion,
        bpAwarded: Number(result.bpAwarded ?? 0),
        dailyBonusApplied: result.dailyBonusApplied ?? false,
        streakBonusApplied: result.streakBonusApplied ?? false,
      };
    },
    onSuccess: () => {
      // BP persistence is handled by writeBPOnce() in the calling component
      // (LessonModal.writeLessonBPLocal). Do NOT write here to avoid double-crediting.
      queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["bearCredits"] });
      queryClient.invalidateQueries({ queryKey: ["myDailyStats"] });
    },
  });
}

export function useMyDailyStats() {
  const { actor } = useActor();
  return useQuery({
    queryKey: ["myDailyStats"],
    queryFn: async () => {
      if (!actor) return null;
      return await actor.getMyDailyStats();
    },
    enabled: !!actor,
    staleTime: 30_000,
  });
}

export function useMarkLessonAttempted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lessonId: string) => {
      // Mark locally immediately for instant UI feedback
      markLocalAttempted(lessonId);
      if (!actor) return;
      try {
        await actor.markLessonAttempted(lessonId);
      } catch {
        // Local cache already updated; backend failure is non-fatal
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
    },
  });
}

export function useSubmitQuiz() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      args,
      creditsReward,
      totalQuestions,
    }: {
      args: SubmitQuizArgs;
      creditsReward?: number;
      totalQuestions?: number;
    }): Promise<QuizResult & { bestScore: number; creditsReward?: number }> => {
      if (!actor) throw new Error("Actor not available");

      // Mark attempted locally immediately
      markLocalAttempted(args.lessonId);

      const timeoutMs = 30000; // 30s guard — prevents infinite isPending on IC hang
      const result = await Promise.race([
        actor.submitQuiz(args),
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("[SUBMIT-QUIZ] timeout after 30s")),
            timeoutMs,
          ),
        ),
      ]);
      const newScore = Number(result.score);

      // Best score: only update if strictly higher
      const bestScore = updateLocalBestScore(args.lessonId, newScore);

      void totalQuestions; // used by caller for display

      return {
        score: result.score,
        totalQuestions: result.totalQuestions,
        passed: result.passed,
        feedback: result.feedback,
        isFirstPass: result.isFirstPass,
        bestScore,
        creditsReward,
      };
    },
    onSuccess: () => {
      // BP persistence is handled by writeBPOnce() / writeLessonBPLocal() in
      // the calling component. Do NOT write here to avoid double-crediting.
      queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["bearCredits"] });
    },
    onError: (err) => {
      console.error("[SUBMIT-QUIZ] mutation error:", err);
    },
    onSettled: () => {
      console.log("[SUBMIT-QUIZ] mutation settled (success or error)");
    },
  });
}

export function useAttemptQuiz() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lessonId: string) => {
      markLocalAttempted(lessonId);
      if (!actor) return;
      try {
        await actor.attemptQuiz(lessonId);
      } catch {
        // Local cache already updated; backend failure is non-fatal
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
    },
  });
}

export function useGetBestQuizScore(lessonId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<bigint | null>({
    queryKey: ["bestQuizScore", lessonId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const backendBest = await actor.getBestQuizScore(lessonId);
        const backendNum = backendBest !== null ? Number(backendBest) : 0;
        const localBest = getLocalBestScore(lessonId) ?? 0;
        const best = Math.max(localBest, backendNum);
        return best > 0 ? BigInt(best) : null;
      } catch {
        const localBest = getLocalBestScore(lessonId) ?? 0;
        return localBest > 0 ? BigInt(localBest) : null;
      }
    },
    enabled: !!actor && !isFetching && !!lessonId,
    staleTime: 30_000,
  });
}

export function useIsAdminUser() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["isAdminUser"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isAdminUser();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useCompleteQuest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (args: CompleteQuestArgs) => {
      if (!actor) throw new Error("Actor not available");
      return actor.completeQuest(args);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["bearCredits"] });
      queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
      const amount =
        variables?.creditsReward != null ? Number(variables.creditsReward) : 0;
      if (amount > 0) {
        window.dispatchEvent(
          new CustomEvent("jb:bp-write-success", {
            detail: { source: "quest", amount },
          }),
        );
      }
    },
  });
}

export function useGetAnalyticsStats() {
  const { actor, isFetching } = useActor();

  return useQuery<AnalyticsStats | null>({
    queryKey: ["analyticsStats"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getAnalyticsStats();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetPublicMetrics() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ["publicMetrics"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getPublicMetrics();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useIsBossAttempted(worldId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isBossAttempted", worldId],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isBossAttempted(worldId);
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && !!worldId,
    staleTime: 30_000,
  });
}

export function useMarkSpecialWorldUnlocked() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (worldId: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.markSpecialWorldUnlocked(worldId);
    },
    onSuccess: (_data, worldId) => {
      queryClient.invalidateQueries({
        queryKey: ["isSpecialWorldUnlocked", worldId],
      });
    },
  });
}

export function useIsSpecialWorldUnlocked(worldId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isSpecialWorldUnlocked", worldId],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isSpecialWorldUnlocked(worldId);
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && !!worldId,
    staleTime: 30_000,
  });
}
