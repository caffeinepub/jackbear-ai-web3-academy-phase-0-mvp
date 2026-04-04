import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";

const STATS_ADMIN_PRINCIPALS = [
  "3ye7w-6s7gq-k4dpo-icdhj-r7ye2-afylq-eofxv-7p6zw-e7nsd-23fi5-pqe", // dev
  "mqrud-rxoxo-nbepq-sktaj-q76k5-r67zx-4wcgo-rhqmv-5mwys-3dl7s-zae", // live
];

interface AdminAnalytics {
  totalRegisteredUsers: bigint;
  dailyActiveUsers: bigint;
  monthlyActiveUsers: bigint;
  totalLessonCompletions: bigint;
  totalQuizPasses: bigint;
  totalBPAwarded: bigint;
  usersWithBP: bigint;
}

interface LeaderboardEntry {
  displayName: string;
  userId: string;
  rank: bigint;
  allTimeBP: bigint;
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-1 shadow-sm">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
      <span className="text-3xl font-bold text-foreground tabular-nums">
        {value}
      </span>
      {sub && (
        <span className="text-xs text-muted-foreground mt-0.5">{sub}</span>
      )}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mt-8 mb-3">
      {title}
    </h2>
  );
}

export default function AdminStatsPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor } = useActor();

  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [monthlyBoard, setMonthlyBoard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const principalStr = identity?.getPrincipal().toText() ?? "";
  const isAdmin = STATS_ADMIN_PRINCIPALS.includes(principalStr);

  useEffect(() => {
    if (!identity) return; // still loading auth
    if (!isAdmin) {
      setDenied(true);
      setLoading(false);
      return;
    }
    if (!actor) return;

    async function fetchAll() {
      try {
        setLoading(true);
        const now = new Date();
        const month = BigInt(now.getMonth() + 1);
        const year = BigInt(now.getFullYear());

        const [analyticsResult, lb, mlb] = await Promise.all([
          (actor as any).getAdminAnalytics(),
          (actor as any).getGlobalLeaderboard(),
          (actor as any).getMonthlyLeaderboard(month, year),
        ]);

        setAnalytics(analyticsResult as AdminAnalytics);
        setLeaderboard((lb as LeaderboardEntry[]).slice(0, 10));
        setMonthlyBoard((mlb as LeaderboardEntry[]).slice(0, 10));
      } catch (e: any) {
        setError(String(e?.message ?? e));
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [identity, actor, isAdmin]);

  // Not yet authenticated
  if (!identity && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Checking authentication…</p>
      </div>
    );
  }

  // Not admin
  if (denied || (!loading && !isAdmin)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-sm">Access denied.</p>
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="text-xs underline text-muted-foreground hover:text-foreground"
        >
          Return home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Admin Analytics
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Authenticated activity only · Internal use only
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Admin Access
          </span>
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Back to Admin
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading analytics…</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive mb-6">
          Error: {error}
        </div>
      )}

      {!loading && analytics && (
        <>
          {/* ── USERS ── */}
          <SectionHeader title="Users" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <StatCard
              label="Registered Users"
              value={Number(analytics.totalRegisteredUsers).toLocaleString()}
              sub="Principals with a profile"
            />
            <StatCard
              label="Daily Active"
              value={Number(analytics.dailyActiveUsers).toLocaleString()}
              sub="Last 24 h (authenticated)"
            />
            <StatCard
              label="Monthly Active"
              value={Number(analytics.monthlyActiveUsers).toLocaleString()}
              sub="This calendar month"
            />
            <StatCard
              label="Users with BP"
              value={Number(analytics.usersWithBP).toLocaleString()}
              sub="Any Bear Points earned"
            />
          </div>

          {/* ── ACTIVITY ── */}
          <SectionHeader title="Activity" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard
              label="Lesson Completions"
              value={Number(analytics.totalLessonCompletions).toLocaleString()}
              sub="First completions across all users"
            />
            <StatCard
              label="Quiz Passes"
              value={Number(analytics.totalQuizPasses).toLocaleString()}
              sub="First passes across all users"
            />
            <StatCard
              label="Total BP Awarded"
              value={Number(analytics.totalBPAwarded).toLocaleString()}
              sub="All-time Bear Points awarded"
            />
          </div>

          {/* ── ALL-TIME TOP USERS ── */}
          {leaderboard.length > 0 && (
            <>
              <SectionHeader title="Top Users — All Time (by BP)" />
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-10">
                        #
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                        User
                      </th>
                      <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">
                        All-time BP
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, i) => (
                      <tr
                        key={entry.userId}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-2.5 text-muted-foreground tabular-nums">
                          {i + 1}
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="font-medium text-foreground">
                            {entry.displayName || "Bear"}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono truncate max-w-[180px]">
                            {entry.userId}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-right font-semibold tabular-nums">
                          {Number(entry.allTimeBP).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── MONTHLY TOP USERS ── */}
          {monthlyBoard.length > 0 && (
            <>
              <SectionHeader
                title={`Top Users — This Month (${new Date().toLocaleString(
                  "default",
                  { month: "long" },
                )} ${new Date().getFullYear()})`}
              />
              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground w-10">
                        #
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">
                        User
                      </th>
                      <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">
                        Monthly BP
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyBoard.map((entry, i) => (
                      <tr
                        key={entry.userId}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-2.5 text-muted-foreground tabular-nums">
                          {i + 1}
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="font-medium text-foreground">
                            {entry.displayName || "Bear"}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono truncate max-w-[180px]">
                            {entry.userId}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 text-right font-semibold tabular-nums">
                          {Number(entry.allTimeBP).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Footer note */}
          <p className="mt-10 text-xs text-muted-foreground text-center">
            All metrics are derived from authenticated user activity only. No
            anonymous tracking. Last fetched: {new Date().toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
}
