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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@/hooks/useActor";
import { usePublicMetrics } from "@/hooks/usePublicMetrics";
import { useMyDailyStats } from "@/hooks/useQueries";
import { useSovereignMode } from "@/hooks/useSovereignMode";
import { readCoherenceKeys } from "@/lib/coherenceKeys";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Award,
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

// ─── Reusable section card wrapper ────────────────────────────────────────────
function AppCard({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <Card
      id={id}
      className={`border-border/60 bg-card/70 overflow-hidden ${className}`}
    >
      {children}
    </Card>
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
  const {
    data: allProgress,
    isLoading: progressLoading,
    isFetched: progressFetched,
  } = useGetLessonProgress("all");
  const { data: publicMetrics } = usePublicMetrics();
  const { data: dailyStats } = useMyDailyStats();
  const isSovereign = useSovereignMode();

  const [forceShowContent, setForceShowContent] = useState(false);
  const [copiedPrincipal, setCopiedPrincipal] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  // Suppress unused variable warnings
  void profileFetching;

  useEffect(() => {
    if (isAuthenticated) {
      const sessionKey = "jb_session_counted";
      if (!sessionStorage.getItem(sessionKey)) {
        incrementLoginCount();
        sessionStorage.setItem(sessionKey, "1");
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        setForceShowContent(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated]);

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

  const showProfileError = profileError && isFetched;

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

  if (currentStreak >= 7) {
    const streakKey = "jb_streak7_fired";
    if (!sessionStorage.getItem(streakKey)) {
      emitStreak7DaySignal();
      sessionStorage.setItem(streakKey, "1");
    }
  }

  const coherenceState = readCoherenceKeys();
  const recoveredKeyCount = coherenceState.recovered.length;

  const displayName = userProfile?.displayName || "Learner";
  const principalText = identity?.getPrincipal().toString() ?? "";

  // Certificate loading resilience: progress is "loading" until the query
  // has both started AND finished at least once with actor available.
  // progressLoading=true means in-flight; !progressFetched means never resolved yet.
  const isCertProgressLoading =
    progressLoading || (!progressFetched && !!actor);

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
          TOP HUD BAR
      ═══════════════════════════════════════════════════ */}
      <div
        className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm"
        data-ocid="hud.panel"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 gap-3 overflow-x-auto">
            <span className="font-display text-sm font-bold text-foreground whitespace-nowrap flex-shrink-0">
              {displayName}
            </span>
            <div className="flex items-center gap-2 flex-1 justify-end flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full whitespace-nowrap">
                <Zap className="h-3 w-3" />
                {credits.toLocaleString()} BP
              </span>
              {currentStreak > 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                  🔥 {currentStreak}d
                </span>
              )}
              {recoveredKeyCount > 0 && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                  🔑 {recoveredKeyCount}/3
                </span>
              )}
              {isSovereign && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 border border-yellow-400/30 px-3 py-1 rounded-full whitespace-nowrap font-mono uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                  Sovereign
                </span>
              )}
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
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* ── DEV DEBUG — TEMP PRINCIPAL DISPLAY ─────────────────── */}
        {principalText && (
          <AppCard>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
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
            </CardContent>
          </AppCard>
        )}
        {/* ── END DEV DEBUG ────────────────────────────────────────── */}

        {/* Username editor */}
        {actor && userProfile && (
          <UsernameEditor
            actor={actor}
            currentName={userProfile.displayName ?? ""}
            onNameChanged={() =>
              queryClient.invalidateQueries({
                queryKey: ["currentUserProfile"],
              })
            }
          />
        )}

        {/* ═══════════════════════════════════════════════════
            TOP ACTIONS — primary interaction zone
        ═══════════════════════════════════════════════════ */}
        <AppCard className="border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
          <CardHeader className="pb-2 pt-5 px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Actions
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            {/* Tier 1 — big 3 game/learn buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate({ to: "/courses" })}
                className="group relative flex flex-col items-center justify-center gap-2 h-28 sm:h-32 sm:min-w-[200px] flex-1 sm:flex-none rounded-2xl border-2 border-primary/50 bg-primary/10 hover:bg-primary/20 hover:border-primary shadow-glow-sm hover:shadow-glow-md transition-all duration-200 cursor-pointer px-6"
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

              <button
                type="button"
                onClick={() => navigate({ to: "/hangman" })}
                className="group relative flex flex-col items-center justify-center gap-2 h-28 sm:h-32 sm:min-w-[200px] flex-1 sm:flex-none rounded-2xl border-2 border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent shadow-[0_0_20px_-4px_hsl(var(--accent)/0.4)] hover:shadow-[0_0_32px_-4px_hsl(var(--accent)/0.6)] transition-all duration-200 cursor-pointer px-6"
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

              <button
                type="button"
                onClick={() => navigate({ to: "/crossword" })}
                className="group relative flex flex-col items-center justify-center gap-2 h-28 sm:h-32 sm:min-w-[200px] flex-1 sm:flex-none rounded-2xl border-2 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500 shadow-[0_0_20px_-4px_rgba(16,185,129,0.3)] hover:shadow-[0_0_32px_-4px_rgba(16,185,129,0.5)] transition-all duration-200 cursor-pointer px-6"
                data-ocid="hud.play_crossword.button"
              >
                <div className="p-3 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                  <Grid3X3 className="h-7 w-7 text-emerald-500" />
                </div>
                <span className="font-display text-sm font-bold text-foreground tracking-wide">
                  Play Crossword
                </span>
                <span className="text-xs text-muted-foreground">
                  Daily puzzle
                </span>
              </button>
            </div>

            {/* Tier 2 — secondary quick-jump CTAs */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => navigate({ to: "/intelligence" })}
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl border border-violet-500/40 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-500/70 text-violet-600 dark:text-violet-400 font-semibold text-sm transition-all duration-200 cursor-pointer flex-1"
                data-ocid="hud.enter_intelligence.button"
              >
                <Terminal className="h-4 w-4 shrink-0" />
                Enter Intelligence
              </button>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("my-credentials")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/70 text-amber-600 dark:text-amber-400 font-semibold text-sm transition-all duration-200 cursor-pointer flex-1"
                data-ocid="hud.my_credentials.button"
              >
                <Award className="h-4 w-4 shrink-0" />
                My Credentials
              </button>
            </div>

            {/* Tier 3 — NextActionCard for immediate lesson context */}
            <NextActionCard />
          </CardContent>
        </AppCard>

        {/* ═══════════════════════════════════════════════════
            PROGRESSION
        ═══════════════════════════════════════════════════ */}
        <AppCard data-ocid="hud.progression.panel">
          <CardHeader className="pb-2 pt-5 px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Progression
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
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
          </CardContent>
        </AppCard>

        {/* ═══════════════════════════════════════════════════
            STATS
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Stats">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3 border-l-2 border-primary/30 pl-3">
            Stats
          </p>
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
            COMPETITION
        ═══════════════════════════════════════════════════ */}
        <AppCard data-ocid="hud.competition.panel">
          <CardHeader className="pb-2 pt-5 px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Competition
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
            <button
              type="button"
              data-ocid="leaderboard.all_time.button"
              onClick={() => navigate({ to: "/leaderboard" })}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors text-left group"
            >
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-yellow-500/15 shrink-0">
                <Trophy className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">
                  All-Time Leaderboard
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  See who leads the global rankings
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0" />
            </button>
            <div className="rounded-xl border border-primary/20 bg-card/50 overflow-hidden">
              <SafeWidget>
                <LeaderboardDashboardWidget />
              </SafeWidget>
            </div>
          </CardContent>
        </AppCard>

        {/* ═══════════════════════════════════════════════════
            PROGRESS — streaks, completions, credentials
        ═══════════════════════════════════════════════════ */}
        <section aria-label="Progress">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-3 border-l-2 border-primary/30 pl-3">
            Progress
          </p>
          <div className="space-y-4">
            <WorldStreaksDashboardWidget allProgress={allProgress} />

            {recentCompletedLessons.length > 0 && (
              <AppCard>
                <CardHeader className="pb-2 pt-5 px-5">
                  <CardTitle className="text-sm font-semibold">
                    Recent Completions
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Your latest completed lessons
                  </p>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-3">
                  {recentCompletedLessons.map((lesson) => (
                    <CompletedLearningItemCard
                      key={lesson.lessonId}
                      lessonId={lesson.lessonId}
                      completionTime={lesson.completionTime}
                    />
                  ))}
                </CardContent>
              </AppCard>
            )}

            <ProgressCertificateSection
              completedLessons={completedLessons}
              userDisplayName={userProfile?.displayName}
            />

            {/* My Credentials — with loading resilience */}
            <div id="my-credentials">
              <MyCertificatesSection
                allProgress={allProgress ?? []}
                principal={identity?.getPrincipal().toText()}
                isProgressLoading={isCertProgressLoading}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            EARN & REFER
        ═══════════════════════════════════════════════════ */}
        <AppCard data-ocid="hud.earn_refer.panel">
          <CardHeader className="pb-2 pt-5 px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Earn &amp; Refer
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
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
          </CardContent>
        </AppCard>

        {/* ═══════════════════════════════════════════════════
            DISCOVERIES
        ═══════════════════════════════════════════════════ */}
        <AppCard data-ocid="hud.discoveries.panel">
          <CardHeader className="pb-2 pt-5 px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Discoveries
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <EasterEggGridSection />
          </CardContent>
        </AppCard>

        {/* ═══════════════════════════════════════════════════
            TODAY & NEWS
        ═══════════════════════════════════════════════════ */}
        <AppCard>
          <CardHeader className="pb-2 pt-5 px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Today
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <TermOfTheDayWidget />
            <SafeWidget>
              <TodayOnICPWidget />
            </SafeWidget>
            <NewsDashboardWidget />
          </CardContent>
        </AppCard>

        {/* ═══════════════════════════════════════════════════
            UTILITY & SUPPORT
        ═══════════════════════════════════════════════════ */}
        <AppCard>
          <CardHeader className="pb-2 pt-5 px-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              Utility &amp; Support
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
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
          </CardContent>
        </AppCard>

        {/* ═══════════════════════════════════════════════════
            TIP THE DEV
        ═══════════════════════════════════════════════════ */}
        <AppCard>
          <CardContent className="pt-5 pb-5 px-5">
            <TipTheDev />
          </CardContent>
        </AppCard>
      </div>
    </div>
  );
}
