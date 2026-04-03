import { incrementLoginCount } from "@/additions/eggHints";
import { emitStreak7DaySignal } from "@/additions/quizSignals";
import { AnimatedXPBar } from "@/components/AnimatedXPBar";
import NextActionCard from "@/components/NextActionCard";
import { UsernameEditor } from "@/components/UsernameEditor";
import BPLedgerWidget from "@/components/dashboard/BPLedgerWidget";
import { CompletedLearningItemCard } from "@/components/dashboard/CompletedLearningItemCard";
import { DashboardMetricCard } from "@/components/dashboard/DashboardMetricCard";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { EasterEggGridSection } from "@/components/dashboard/EasterEggGridSection";
import HowToEarnBPWidget from "@/components/dashboard/HowToEarnBPWidget";
import LeaderboardDashboardWidget from "@/components/dashboard/LeaderboardDashboardWidget";
import MyCertificatesSection from "@/components/dashboard/MyCertificatesSection";
import NewsDashboardWidget from "@/components/dashboard/NewsDashboardWidget";
import ProgressCertificateSection from "@/components/dashboard/ProgressCertificateSection";
import PushNotificationsBanner from "@/components/dashboard/PushNotificationsBanner";
import TermOfTheDayWidget from "@/components/dashboard/TermOfTheDayWidget";
import TodayOnICPWidget from "@/components/dashboard/TodayOnICPWidget";
import WhatsNewDashboardWidget from "@/components/dashboard/WhatsNewDashboardWidget";
import WorldStreaksDashboardWidget from "@/components/dashboard/WorldStreaksDashboardWidget";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useActor } from "@/hooks/useActor";
import { usePublicMetrics } from "@/hooks/usePublicMetrics";
import { useMyDailyStats } from "@/hooks/useQueries";
import { useSovereignMode } from "@/hooks/useSovereignMode";
import { readCoherenceKeys } from "@/lib/coherenceKeys";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BookOpen,
  ChevronRight,
  Copy,
  Gamepad2,
  Grid3X3,
  LogIn,
  type LucideIcon,
  Star,
  Terminal,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SafeWidget } from "../components/SafeWidget";
import TipTheDev from "../components/TipTheDev";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetBearCredits,
  useGetCallerUserProfile,
  useGetLessonProgress,
} from "../hooks/useQueries";

// Helper to pass LucideIcon component (not JSX element) to DashboardMetricCard
function MetricCard({
  Icon,
  title,
  value,
  subtitle,
}: {
  Icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <DashboardMetricCard
      icon={Icon}
      title={title}
      value={value}
      subtitle={subtitle}
    />
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { identity, login, loginStatus } = useInternetIdentity();
  const { actor } = useActor();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isError: profileError,
    isFetched,
    isFetching: profileFetching,
  } = useGetCallerUserProfile();
  const { data: bearCredits, refetch: refetchBearCredits } =
    useGetBearCredits();
  const { data: allProgress } = useGetLessonProgress("all");
  const { data: publicMetrics } = usePublicMetrics();
  const { data: dailyStats } = useMyDailyStats();
  const isSovereign = useSovereignMode();

  const [forceShowContent, setForceShowContent] = useState(false);
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  // Suppress unused variable warnings
  void profileFetching;

  // Increment login count for easter egg hints (once per session)
  useEffect(() => {
    if (isAuthenticated) {
      const sessionKey = "jb_session_counted";
      if (!sessionStorage.getItem(sessionKey)) {
        incrementLoginCount();
        sessionStorage.setItem(sessionKey, "1");
      }
    }
  }, [isAuthenticated]);

  // Force show content after 3 seconds — fires on isAuthenticated alone,
  // so a slow/missing actor never keeps the dashboard stuck forever.
  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        setForceShowContent(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated]);

  // Refetch dashboard BP/stats and lesson progress after a confirmed backend BP write.
  useEffect(() => {
    const handler = () => {
      refetchBearCredits();
      queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    };
    window.addEventListener("jb:bp-write-success", handler);
    return () => window.removeEventListener("jb:bp-write-success", handler);
  }, [refetchBearCredits, queryClient]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      console.error("Login error:", error);
    }
  };

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    queryClient.invalidateQueries({ queryKey: ["actor"] });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <LogIn className="h-12 w-12 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold mb-2">
                  Welcome to Your Dashboard
                </h2>
                <p className="text-muted-foreground">
                  Sign in with Internet Identity to track your progress and
                  access personalized learning insights
                </p>
              </div>
              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                size="lg"
                className="w-full shadow-glow-sm hover:shadow-glow-md transition-all"
              >
                {isLoggingIn ? "Logging in..." : "Login with Internet Identity"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Non-fatal: profile error shows inline banner, dashboard still renders
  const showProfileError = profileError && isFetched;

  // Block on initial load only — forceShowContent overrides actor gate after 3s
  const isInitialLoading =
    (profileLoading && !isFetched && !forceShowContent) ||
    (!actor && !forceShowContent);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentStreak = Number(dailyStats?.streak ?? userProfile?.streak ?? 0);
  console.log(
    "[BP-AUDIT] BACKEND SOURCE OF TRUTH ACTIVE — dashboard BP from backend only",
  );
  const credits = (() => {
    try {
      const c = Array.isArray(bearCredits) ? bearCredits[0] : bearCredits;
      return c ? Number((c as any).totalEarned ?? (c as any).balance ?? 0) : 0;
    } catch {
      return 0;
    }
  })();

  const completedLessons = allProgress?.filter((p) => p.completed).length || 0;
  const totalXP = Number(userProfile?.xp ?? 0);

  // --- BP-Tier Progress Bar ---
  function getNextBPTier(bp: number): number {
    const tiers = [
      100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000,
    ];
    return tiers.find((t) => t > bp) ?? bp + 1000;
  }
  const nextTierThreshold = getNextBPTier(credits);
  const bpForBar = credits > 0 ? credits : 0;

  const recentCompletedLessons =
    allProgress
      ?.filter((p) => p.completed)
      .sort((a, b) => Number(b.completionTime) - Number(a.completionTime))
      .slice(0, 5) || [];

  const averageProgress = publicMetrics?.averageProgress
    ? Number(publicMetrics.averageProgress)
    : 0;

  // Fire 7-day streak easter egg once per session when streak >= 7
  if (currentStreak >= 7) {
    const streakKey = "jb_streak7_fired";
    if (!sessionStorage.getItem(streakKey)) {
      emitStreak7DaySignal();
      sessionStorage.setItem(streakKey, "1");
    }
  }

  // Coherence key state — read once at render
  const coherenceState = readCoherenceKeys();
  const recoveredKeyCount = coherenceState.recovered.length;

  const displayName = userProfile?.displayName || "Learner";
  const principalText = identity?.getPrincipal().toString() ?? "";

  return (
    <div className="min-h-screen bg-background">
      {showProfileError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Profile unavailable</AlertTitle>
          <AlertDescription className="flex items-center gap-3">
            <span>
              Could not load your profile — some stats may be missing.
            </span>
            <Button onClick={handleRetry} variant="outline" size="sm">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}
      {/* ═══════════════════════════════════════════════════
          PART 1 — TOP HUD BAR
      ═══════════════════════════════════════════════════ */}
      <div
        className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm"
        data-ocid="hud.panel"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-3 overflow-x-auto">
            {/* Player name */}
            <span className="font-display text-sm font-bold text-foreground whitespace-nowrap flex-shrink-0">
              {displayName}
            </span>

            {/* Stat chips */}
            <div className="flex items-center gap-2 flex-1 justify-end flex-wrap">
              {/* BP chip */}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full whitespace-nowrap">
                <Zap className="h-3 w-3" />
                {credits.toLocaleString()} BP
              </span>

              {/* Streak chip */}
              {currentStreak > 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                  🔥 {currentStreak}d
                </span>
              )}

              {/* Coherence key chip */}
              {recoveredKeyCount > 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                  🔑 {recoveredKeyCount}/3
                </span>
              )}

              {/* Sovereign chip */}
              {isSovereign && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full whitespace-nowrap font-mono uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                  Sovereign
                </span>
              )}

              {/* Rank link */}
              <button
                type="button"
                onClick={() => navigate({ to: "/leaderboard" })}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-muted text-muted-foreground border border-border px-3 py-1 rounded-full whitespace-nowrap hover:border-primary/40 hover:text-primary transition-colors"
                data-ocid="hud.leaderboard.link"
              >
                <Trophy className="h-3 w-3" />
                Rank
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-10 space-y-12">
        {/* ── DEV DEBUG — TEMP PRINCIPAL DISPLAY ─────────────────── */}
        {principalText && (
          <div className="rounded-xl border-2 border-amber-500/60 bg-amber-500/10 p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Terminal className="h-4 w-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Dev Principal
              </span>
              <span className="ml-auto text-[10px] font-medium opacity-60">
                Testing Unlock Active — remove after use
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <code className="flex-1 text-xs font-mono break-all bg-black/10 dark:bg-white/5 rounded px-3 py-2 text-foreground select-all">
                {principalText}
              </code>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(principalText);
                  setCopiedPrincipal(true);
                  setTimeout(() => setCopiedPrincipal(false), 2000);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 border border-amber-500/40 transition-colors whitespace-nowrap"
              >
                <Copy className="h-3.5 w-3.5" />
                {copiedPrincipal ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
        {/* ── END DEV DEBUG ────────────────────────────────────────── */}

        {/* Username editor — small, unobtrusive, just below HUD */}
        {actor && userProfile && (
          <div className="-mt-4">
            <UsernameEditor
              actor={actor}
              currentName={userProfile.displayName ?? ""}
              onNameChanged={() =>
                queryClient.invalidateQueries({
                  queryKey: ["currentUserProfile"],
                })
              }
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            PART 2 — PRIMARY ACTION ZONE
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Primary Actions">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-6">
            Actions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Continue Learning */}
            <button
              type="button"
              onClick={() => navigate({ to: "/courses" })}
              className="group relative flex flex-col items-center justify-center gap-2 h-28 sm:h-32 sm:min-w-[220px] flex-1 sm:flex-none rounded-2xl border-2 border-primary/50 bg-primary/10 hover:bg-primary/20 hover:border-primary shadow-glow-sm hover:shadow-glow-md transition-all duration-200 cursor-pointer px-8"
              data-ocid="hud.continue_learning.button"
            >
              <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <span className="font-display text-sm font-bold text-foreground tracking-wide">
                Continue Learning
              </span>
              <span className="text-xs text-muted-foreground">Earn BP</span>
            </button>

            {/* Play Decode */}
            <button
              type="button"
              onClick={() => navigate({ to: "/hangman" })}
              className="group relative flex flex-col items-center justify-center gap-2 h-28 sm:h-32 sm:min-w-[220px] flex-1 sm:flex-none rounded-2xl border-2 border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent shadow-[0_0_20px_-4px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_32px_-4px_hsl(var(--accent)/0.6)] transition-all duration-200 cursor-pointer px-8"
              data-ocid="hud.play_decode.button"
            >
              <div className="p-3 rounded-xl bg-accent/20 group-hover:bg-accent/30 transition-colors">
                <Gamepad2 className="h-7 w-7 text-accent" />
              </div>
              <span className="font-display text-sm font-bold text-foreground tracking-wide">
                Play Decode
              </span>
              <span className="text-xs text-muted-foreground">
                Recover Keys
              </span>
            </button>

            {/* Play Crossword */}
            <button
              type="button"
              onClick={() => navigate({ to: "/crossword" })}
              className="group relative flex flex-col items-center justify-center gap-2 h-28 sm:h-32 sm:min-w-[220px] flex-1 sm:flex-none rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500 shadow-[0_0_20px_-4px_rgba(16,185,129,0.3)] hover:shadow-[0_0_32px_-4px_rgba(16,185,129,0.5)] transition-all duration-200 cursor-pointer px-8"
              data-ocid="hud.play_crossword.button"
            >
              <div className="p-3 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                <Grid3X3 className="h-7 w-7 text-emerald-500" />
              </div>
              <span className="font-display text-sm font-bold text-foreground tracking-wide">
                Play Crossword
              </span>
              <span className="text-xs text-muted-foreground">
                Daily glossary puzzle
              </span>
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            PART 3 — PROGRESSION STRIP
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Progression" data-ocid="hud.progression.panel">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
            Progression
          </p>
          <div className="space-y-3">
            <AnimatedXPBar currentXP={bpForBar} maxXP={nextTierThreshold} />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Next milestone:{" "}
                <span className="font-semibold text-foreground">
                  {nextTierThreshold.toLocaleString()} BP
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {credits.toLocaleString()} /{" "}
                {nextTierThreshold.toLocaleString()}
              </span>
            </div>

            {/* Daily boost badges — inline in progression strip */}
            {dailyStats &&
              (dailyStats.firstLessonBonusAvailable ||
                Number(dailyStats.streak) >= 4) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {dailyStats.firstLessonBonusAvailable && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      ⚡ First lesson bonus ready
                    </span>
                  )}
                  {Number(dailyStats.streak) >= 4 && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-full border border-yellow-500/20">
                      🔥 Streak boost active · {Number(dailyStats.streak)} day
                      streak
                    </span>
                  )}
                </div>
              )}
          </div>
        </section>

        {/* Metrics row — compact, below progression */}
        <section aria-label="Stats">
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
            <MetricCard
              Icon={Zap}
              title="Bear Points"
              value={credits.toLocaleString()}
              subtitle="Total earned"
            />
            <MetricCard
              Icon={Trophy}
              title="Current Streak"
              value={`${currentStreak} days`}
              subtitle={
                Number(dailyStats?.streak ?? 0) >= 4
                  ? "Streak boost active!"
                  : "Keep it up!"
              }
            />
            <MetricCard
              Icon={BookOpen}
              title="Lessons Done"
              value={completedLessons.toString()}
              subtitle="Completed"
            />
            <MetricCard
              Icon={TrendingUp}
              title="Avg Progress"
              value={`${averageProgress}%`}
              subtitle="Platform average"
            />
            <MetricCard
              Icon={Star}
              title="XP Earned"
              value={totalXP.toLocaleString()}
              subtitle="Learning XP"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            PART 4 — COMPETITION (leaderboard)
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Competition" data-ocid="hud.competition.panel">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
            Competition
          </p>
          <button
            type="button"
            data-ocid="leaderboard.all_time.button"
            onClick={() => navigate({ to: "/leaderboard" })}
            className="w-full flex items-center gap-4 px-5 py-4 mb-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-yellow-500/15 shrink-0">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground">
                All-Time Leaderboard
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                See who leads the global rankings
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0" />
          </button>
          <div className="rounded-2xl border border-primary/20 bg-card/50 overflow-hidden">
            <SafeWidget>
              <LeaderboardDashboardWidget />
            </SafeWidget>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            PROGRESS ZONE — streaks, completions, certificate
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Progress">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
            Progress
          </p>
          <div className="space-y-6">
            <WorldStreaksDashboardWidget allProgress={allProgress} />

            {recentCompletedLessons.length > 0 && (
              <DashboardSection
                title="Recent Completions"
                description="Your latest completed lessons"
              >
                <div className="space-y-3">
                  {recentCompletedLessons.map((lesson) => (
                    <CompletedLearningItemCard
                      key={lesson.lessonId}
                      lessonId={lesson.lessonId}
                      completionTime={lesson.completionTime}
                    />
                  ))}
                </div>
              </DashboardSection>
            )}

            <ProgressCertificateSection
              completedLessons={completedLessons}
              userDisplayName={userProfile?.displayName}
            />
            <MyCertificatesSection
              allProgress={allProgress ?? []}
              principal={identity?.getPrincipal().toText()}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            PART 5 — EARN + REFERRAL (grouped, lower priority)
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Earn and Refer" data-ocid="hud.earn_refer.panel">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
            Earn &amp; Refer
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HowToEarnBPWidget />

            {/* Referral card */}
            <Card
              className="border-primary/20 bg-primary/5"
              data-ocid="referral.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/15">
                      <i className="fa-solid fa-user-plus text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Invite friends to JackBear.ai
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Referral rewards coming soon
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 flex-shrink-0"
                    onClick={() => navigate({ to: "/referral" })}
                    data-ocid="referral.primary_button"
                  >
                    Get Your Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            DISCOVERIES
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Discoveries" data-ocid="hud.discoveries.panel">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
            Discoveries
          </p>
          <EasterEggGridSection />
        </section>

        {/* ═══════════════════════════════════════════════════
            PART 6 — DE-EMPHASIZED SECONDARY CONTENT
            (news, today on ICP, ledger — pushed to bottom)
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Today &amp; News">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
            Today
          </p>
          <div className="space-y-6">
            <TermOfTheDayWidget />
            <NextActionCard />
            <SafeWidget>
              <TodayOnICPWidget />
            </SafeWidget>
            <NewsDashboardWidget />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            UTILITY & SUPPORT
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Utility">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-4">
            Utility &amp; Support
          </p>
          <div className="space-y-4">
            <PushNotificationsBanner />

            {/* Monthly Prize */}
            <Card
              className="border-yellow-500/20 bg-yellow-500/5"
              data-ocid="monthly-prize.card"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <i className="fa-solid fa-trophy text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Monthly Prize
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Monthly Prize is not currently running.
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0 opacity-60"
                    onClick={() => navigate({ to: "/monthly-prize" })}
                    data-ocid="monthly-prize.primary_button"
                  >
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <BPLedgerWidget />
            <WhatsNewDashboardWidget />
          </div>
        </section>

        <div className="mt-4">
          <TipTheDev />
        </div>
      </div>
    </div>
  );
}
