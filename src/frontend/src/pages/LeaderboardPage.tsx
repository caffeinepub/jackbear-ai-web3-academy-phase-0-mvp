import ShareActionsInline from "@/components/ShareActionsInline";
import ShareCardModal from "@/components/ShareCardModal";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { debugActorReady } from "@/lib/betaDebug";
import {
  type BPMasteryTier,
  type FlatLeaderboardEntry,
  getMasteryTier as _getMasteryTier,
  fetchGlobalLeaderboard,
  fetchMonthlyLeaderboard,
} from "@/lib/leaderboardData";
import {
  MONTHLY_PRIZE_ACTIVE,
  PRIZE_AMOUNT,
  formatMonthKey,
  getCurrentMonthKey,
  getPreviousMonthKey,
} from "@/lib/monthlyPrize";
import { type PrestigeTier, getPrestigeTier, isGoldBear } from "@/lib/prestige";
import { updatePageMetadata } from "@/lib/seo";
import {
  submitWinnerClaim as backendSubmitClaim,
  getWinnerClaims,
} from "@/lib/sharedLeaderboard";
import { useNavigate } from "@tanstack/react-router";
import { Award, Loader2, Medal, Trophy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

updatePageMetadata({
  title: "Bear Points Leaderboard | JackBear.ai",
  description:
    "See the top Web3 learners on JackBear.ai ranked by Bear Points earned. Monthly prize coming soon.",
});

function getMasteryTier(bp: number): BPMasteryTier {
  if (bp >= 5000) return "Master";
  if (bp >= 2000) return "Expert";
  if (bp >= 500) return "Scholar";
  return "Novice";
}
void _getMasteryTier;

const TIER_STYLES: Record<
  BPMasteryTier,
  { label: string; style: React.CSSProperties }
> = {
  Master: {
    label: "Master",
    style: {
      background: "hsl(var(--caffeine-yellow) / 0.15)",
      color: "hsl(var(--caffeine-yellow-foreground))",
      border: "1px solid hsl(var(--caffeine-yellow) / 0.5)",
    },
  },
  Expert: {
    label: "Expert",
    style: {
      background: "hsl(var(--primary) / 0.12)",
      color: "hsl(var(--primary))",
      border: "1px solid hsl(var(--primary) / 0.35)",
    },
  },
  Scholar: {
    label: "Scholar",
    style: {
      background: "hsl(var(--muted))",
      color: "hsl(var(--muted-foreground))",
      border: "1px solid hsl(var(--border))",
    },
  },
  Novice: {
    label: "Novice",
    style: {
      background: "hsl(var(--muted))",
      color: "hsl(var(--muted-foreground))",
      border: "1px solid hsl(var(--border))",
    },
  },
};

function getRankIcon(rank: number) {
  if (rank === 1)
    return (
      <Trophy
        style={{ width: 20, height: 20, color: "hsl(var(--caffeine-yellow))" }}
      />
    );
  if (rank === 2)
    return (
      <Medal
        style={{ width: 20, height: 20, color: "hsl(var(--muted-foreground))" }}
      />
    );
  if (rank === 3)
    return (
      <Award style={{ width: 20, height: 20, color: "hsl(var(--accent))" }} />
    );
  return (
    <span
      style={{
        color: "hsl(var(--muted-foreground))",
        fontWeight: 600,
        fontSize: 14,
      }}
    >
      #{rank}
    </span>
  );
}

function TierBadge({ tier }: { tier: BPMasteryTier }) {
  const config = TIER_STYLES[tier];
  return (
    <span
      style={{
        ...config.style,
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      {config.label}
    </span>
  );
}

type RankContext = {
  myEntry: FlatLeaderboardEntry;
  above: FlatLeaderboardEntry | null;
  below: FlatLeaderboardEntry | null;
  gapAbove: number | null;
  gapBelow: number | null;
};

function computeRankContext(
  entries: Array<{
    userId: string;
    rank: number;
    allTimeBP: number;
    isCurrentUser?: boolean;
  }>,
  currentPrincipal: string,
): RankContext | null {
  const idx = entries.findIndex(
    (e) => e.isCurrentUser || e.userId === currentPrincipal,
  );
  if (idx === -1) return null;
  const me = entries[idx];
  const above = idx > 0 ? entries[idx - 1] : null;
  const below = idx < entries.length - 1 ? entries[idx + 1] : null;
  return {
    myEntry: me as FlatLeaderboardEntry,
    above: above as FlatLeaderboardEntry | null,
    below: below as FlatLeaderboardEntry | null,
    gapAbove: above ? above.allTimeBP - me.allTimeBP : null,
    gapBelow: below ? me.allTimeBP - below.allTimeBP : null,
  };
}

function LeaderboardRow({
  entry,
  rankDelta,
  gapAbove,
  gapBelow,
  goldBear,
  prestigeTier,
}: {
  entry: FlatLeaderboardEntry & { tier: BPMasteryTier };
  rankDelta?: number | null;
  gapAbove?: number | null;
  gapBelow?: number | null;
  goldBear?: boolean;
  prestigeTier?: PrestigeTier | null;
}) {
  const effectiveTier: PrestigeTier | null =
    prestigeTier !== undefined
      ? (prestigeTier ?? null)
      : goldBear
        ? "gold"
        : null;
  const tierColors: Record<
    PrestigeTier,
    {
      border: string;
      shadow: string;
      chipColor: string;
      chipBg: string;
      chipBorder: string;
      emoji: string;
      label: string;
    }
  > = {
    gold: {
      border: "rgba(234,179,8,0.4)",
      shadow: "rgba(234,179,8,0.18)",
      chipColor: "oklch(0.78 0.18 80)",
      chipBg: "rgba(234,179,8,0.10)",
      chipBorder: "rgba(234,179,8,0.30)",
      emoji: "🥇",
      label: "Gold Bear",
    },
    platinum: {
      border: "rgba(161,161,170,0.4)",
      shadow: "rgba(161,161,170,0.18)",
      chipColor: "oklch(0.75 0.06 250)",
      chipBg: "rgba(161,161,170,0.10)",
      chipBorder: "rgba(161,161,170,0.30)",
      emoji: "🟡",
      label: "Platinum Bear",
    },
    diamond: {
      border: "rgba(34,211,238,0.4)",
      shadow: "rgba(34,211,238,0.18)",
      chipColor: "oklch(0.80 0.15 200)",
      chipBg: "rgba(34,211,238,0.10)",
      chipBorder: "rgba(34,211,238,0.30)",
      emoji: "💎",
      label: "Diamond Bear",
    },
  };
  const tc = effectiveTier ? tierColors[effectiveTier] : null;
  return (
    <div
      data-ocid={`leaderboard.item.${entry.rank}`}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "12px 16px",
        borderRadius: 8,
        background: entry.isCurrentUser
          ? "hsl(var(--primary) / 0.1)"
          : "transparent",
        border: entry.isCurrentUser
          ? tc
            ? `1px solid ${tc.border}`
            : "1px solid hsl(var(--primary) / 0.3)"
          : "1px solid transparent",
        boxShadow: entry.isCurrentUser
          ? tc
            ? `0 0 14px ${tc.shadow}`
            : "0 0 12px hsl(var(--primary) / 0.15)"
          : "none",
        transition: "background 0.15s",
        marginBottom: 4,
      }}
    >
      {/* Main row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32,
            display: "flex",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {getRankIcon(entry.rank)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: entry.isCurrentUser ? 700 : 500,
                color: entry.isCurrentUser
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--foreground) / 0.85)",
              }}
            >
              {entry.displayName}
            </span>
            {entry.isCurrentUser && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "hsl(var(--primary))",
                  background: "hsl(var(--primary) / 0.1)",
                  border: "1px solid hsl(var(--primary) / 0.25)",
                  padding: "1px 6px",
                  borderRadius: 3,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                You
              </span>
            )}
            {entry.isCurrentUser && tc && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: tc.chipColor,
                  background: tc.chipBg,
                  border: `1px solid ${tc.chipBorder}`,
                  padding: "1px 6px",
                  borderRadius: 3,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                }}
              >
                {tc.emoji} {tc.label}
              </span>
            )}
            <TierBadge tier={entry.tier} />
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: entry.isCurrentUser
                ? "hsl(var(--foreground))"
                : "hsl(var(--foreground) / 0.8)",
            }}
          >
            {entry.allTimeBP.toLocaleString()}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "hsl(var(--muted-foreground))",
              marginLeft: 3,
            }}
          >
            BP
          </span>
          {rankDelta !== null && rankDelta !== undefined && rankDelta !== 0 && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: rankDelta > 0 ? "hsl(142 70% 45%)" : "hsl(0 70% 55%)",
                marginLeft: 4,
              }}
            >
              {rankDelta > 0 ? `↑ +${rankDelta}` : `↓ ${rankDelta}`}
            </span>
          )}
        </div>
      </div>

      {/* Competitive pressure subrow — current user only */}
      {entry.isCurrentUser && (gapAbove != null || gapBelow != null) && (
        <div
          style={{
            marginTop: 4,
            paddingLeft: 44,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {gapAbove != null && (
            <span
              style={{
                fontSize: 11,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              Only {gapAbove} BP to reach #{entry.rank - 1}
            </span>
          )}
          {gapBelow != null && (
            <span
              style={{
                fontSize: 11,
                color: "hsl(var(--muted-foreground))",
              }}
            >
              {gapBelow} BP ahead of #{entry.rank + 1}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Backend-aware winner claim card ──────────────────────────────────────

function BackendWinnerClaimCard({
  actor,
  prevMonthEntries,
  currentPrincipal,
}: {
  actor: any;
  prevMonthEntries: FlatLeaderboardEntry[];
  currentPrincipal: string;
}) {
  const prevMonthKey = getPreviousMonthKey();
  const [yearStr, monthStr] = prevMonthKey.split("-");
  const prevMonth = Number(monthStr);
  const prevYear = Number(yearStr);

  const topEntry = prevMonthEntries[0];
  const isWinner = !!topEntry && topEntry.isCurrentUser;

  const [claimLoading, setClaimLoading] = useState(true);
  const [hasClaimed, setHasClaimed] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [usdcAddress, setUsdcAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchClaimStatus = useCallback(async () => {
    if (!actor || !isWinner) {
      setClaimLoading(false);
      return;
    }
    try {
      const claims = await getWinnerClaims(actor);
      const match = claims.find(
        (c) =>
          c.userId === currentPrincipal &&
          Number(c.month) === prevMonth &&
          Number(c.year) === prevYear,
      );
      setHasClaimed(!!match);
      setIsPaid(!!match && !!match.isPaid);
    } catch {
      setHasClaimed(false);
      setIsPaid(false);
    } finally {
      setClaimLoading(false);
    }
  }, [actor, isWinner, currentPrincipal, prevMonth, prevYear]);

  useEffect(() => {
    void fetchClaimStatus();
  }, [fetchClaimStatus]);

  if (!isWinner) return null;

  if (claimLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
          color: "hsl(var(--muted-foreground))",
          fontSize: 13,
        }}
      >
        Checking claim status…
      </div>
    );
  }

  if (hasClaimed && isPaid) {
    return (
      <div
        data-ocid="leaderboard.success_state"
        style={{
          background: "hsl(var(--muted))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        <i
          className="fas fa-circle-check"
          style={{
            color: "#16a34a",
            fontSize: 28,
            marginBottom: 10,
            display: "block",
          }}
        />
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "hsl(var(--foreground))",
            marginBottom: 6,
          }}
        >
          Payment processed
        </div>
        <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
          Your {PRIZE_AMOUNT} prize has been dispatched. Congrats, champion!
        </div>
      </div>
    );
  }

  if (hasClaimed) {
    return (
      <div
        data-ocid="leaderboard.loading_state"
        style={{
          background: "hsl(var(--muted))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        <i
          className="fas fa-hourglass-half"
          style={{
            color: "hsl(var(--caffeine-yellow))",
            fontSize: 24,
            marginBottom: 10,
            display: "block",
          }}
        />
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "hsl(var(--foreground))",
            marginBottom: 6,
          }}
        >
          Claim submitted — awaiting dispatch
        </div>
        <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
          Prize will be dispatched within 48 hours.
        </div>
      </div>
    );
  }

  const handleClaim = async () => {
    const trimmed = usdcAddress.trim();
    if (!trimmed || trimmed.length < 10) {
      setError("Please enter a valid USDC receive address.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const result = await backendSubmitClaim(
        actor,
        prevMonth,
        prevYear,
        trimmed,
      );
      if (result.startsWith("error")) {
        setError(result.replace("error:", "").trim());
      } else {
        setClaimLoading(true);
        await fetchClaimStatus();
      }
    } catch {
      setError("Failed to submit claim. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      data-ocid="leaderboard.card"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--caffeine-yellow) / 0.4)",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 24,
        boxShadow: "0 0 20px hsl(var(--caffeine-yellow) / 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <i
          className="fas fa-trophy"
          style={{ color: "hsl(var(--caffeine-yellow))", fontSize: 22 }}
        />
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "hsl(var(--foreground))",
            }}
          >
            You won {formatMonthKey(prevMonthKey)}!
          </div>
          <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
            You are the top Bear Points earner. Claim your $100 USDC prize
            below.
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Input
          placeholder="Your USDC receive address (any EVM chain)"
          value={usdcAddress}
          onChange={(e) => setUsdcAddress(e.target.value)}
          data-ocid="leaderboard.input"
          style={{
            flex: 1,
            minWidth: 200,
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
          }}
        />
        <Button
          onClick={handleClaim}
          disabled={submitting}
          data-ocid="leaderboard.primary_button"
          style={{
            background: "hsl(var(--caffeine-yellow))",
            color: "hsl(var(--caffeine-yellow-foreground))",
            fontWeight: 700,
            border: "none",
          }}
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <i className="fas fa-coins mr-2" />
          )}
          {submitting ? "Submitting..." : "Claim Prize"}
        </Button>
      </div>
      {error && (
        <div
          data-ocid="leaderboard.error_state"
          style={{ fontSize: 12, color: "hsl(350 80% 50%)", marginTop: 8 }}
        >
          <i className="fas fa-triangle-exclamation mr-1" />
          {error}
        </div>
      )}
      <div
        style={{
          fontSize: 11,
          color: "hsl(var(--muted-foreground))",
          marginTop: 10,
        }}
      >
        <i className="fas fa-clock mr-1" />
        Manual dispersement within 48 hours. USDC accepted on any EVM-compatible
        chain.
      </div>
    </div>
  );
}

// ── Leaderboard loading skeleton ──────────────────────────────────────────

function LeaderboardSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  const currentPrincipal = identity?.getPrincipal().toString() ?? "";
  const _isAuthenticated = !!identity;
  const now = new Date();
  const currentMonth = now.getUTCMonth() + 1;
  const currentYear = now.getUTCFullYear();
  const prevMonthNum = now.getUTCMonth() === 0 ? 12 : now.getUTCMonth();
  const prevYearNum =
    now.getUTCMonth() === 0 ? now.getUTCFullYear() - 1 : now.getUTCFullYear();

  const [allTimeEntries, setAllTimeEntries] = useState<
    (FlatLeaderboardEntry & { tier: BPMasteryTier })[]
  >([]);
  const [monthlyEntries, setMonthlyEntries] = useState<
    (FlatLeaderboardEntry & { tier: BPMasteryTier })[]
  >([]);
  const [prevMonthEntries, setPrevMonthEntries] = useState<
    FlatLeaderboardEntry[]
  >([]);
  const [loadingAllTime, setLoadingAllTime] = useState(true);
  const [loadingMonthly, setLoadingMonthly] = useState(true);
  const [backendError, setBackendError] = useState(false);

  // Share card state
  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState<{
    rank: number | null;
    bp: number;
    displayName: string;
  } | null>(null);

  // Real rank delta: userId -> delta
  const [rankDeltas, setRankDeltas] = useState<Record<string, number | null>>(
    {},
  );

  // Competitive pressure context
  const [rankContext, setRankContext] = useState<RankContext | null>(null);

  // Milestone ack refs — in-session guard only; truth lives in backend
  const milestoneAcked = useRef({ top50: false, top10: false });

  // Timeout fallback: never leave the page stuck in loading state
  useEffect(() => {
    const t = setTimeout(() => {
      setLoadingAllTime(false);
      setLoadingMonthly(false);
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  const load = useCallback(async () => {
    if (!actor) return;
    console.log(
      "[BP-AUDIT] LeaderboardPage: READ ONLY MODE — leaderboard fetch only",
    );

    console.log(
      "[BP-AUDIT] LeaderboardPage: fetching public leaderboard rows (month:",
      currentMonth,
      "year:",
      currentYear,
      ")",
    );
    const [allTime, monthly, prevMonth] = await Promise.all([
      fetchGlobalLeaderboard(actor, currentPrincipal),
      fetchMonthlyLeaderboard(
        actor,
        currentMonth,
        currentYear,
        currentPrincipal,
      ),
      fetchMonthlyLeaderboard(
        actor,
        prevMonthNum,
        prevYearNum,
        currentPrincipal,
      ),
    ]);

    console.log(
      "[BP-AUDIT] LeaderboardPage: global row count =",
      allTime.length,
    );
    console.log(
      "[BP-AUDIT] LeaderboardPage: monthly row count =",
      monthly.length,
    );
    console.log(
      "[BP-AUDIT] LeaderboardPage: prevMonth row count =",
      prevMonth.length,
    );

    setAllTimeEntries(
      allTime.map((e) => ({ ...e, tier: getMasteryTier(e.allTimeBP) })),
    );
    setMonthlyEntries(
      monthly.map((e) => ({ ...e, tier: getMasteryTier(e.allTimeBP) })),
    );
    setPrevMonthEntries(prevMonth);

    // Compute rank context (competitive pressure indicators)
    const ctx = computeRankContext(allTime, currentPrincipal);
    setRankContext(ctx);

    // ── Rank delta + milestone share triggers ────────────────────────────────
    const myEntry = allTime.find((e) => e.isCurrentUser);
    if (myEntry && actor && currentPrincipal) {
      const currentRank = myEntry.rank;
      actor
        .updateMyRankSnapshot(BigInt(currentRank))
        .then((optDelta: bigint | null) => {
          const delta = optDelta !== null ? Number(optDelta) : null;
          setRankDeltas((prev) => ({ ...prev, [currentPrincipal]: delta }));
        })
        .catch(() => {});

      const bp = myEntry.allTimeBP;
      if (currentRank <= 10 && !milestoneAcked.current.top10) {
        milestoneAcked.current.top10 = true;
        actor
          .hasSeenShareMilestone("top10")
          .then((seen: boolean) => {
            if (!seen) {
              actor.markShareMilestoneSeen("top10").catch(() => {});
              setShareData({
                rank: currentRank,
                bp,
                displayName: myEntry.displayName,
              });
              setShareOpen(true);
            }
          })
          .catch(() => {});
      } else if (currentRank <= 50 && !milestoneAcked.current.top50) {
        milestoneAcked.current.top50 = true;
        actor
          .hasSeenShareMilestone("top50")
          .then((seen: boolean) => {
            if (!seen) {
              actor.markShareMilestoneSeen("top50").catch(() => {});
              setShareData({
                rank: currentRank,
                bp,
                displayName: myEntry.displayName,
              });
              setShareOpen(true);
            }
          })
          .catch(() => {});
      }
    }

    setLoadingAllTime(false);
    setLoadingMonthly(false);
  }, [
    actor,
    currentPrincipal,
    currentMonth,
    currentYear,
    prevMonthNum,
    prevYearNum,
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: actorFetching captured inside load
  useEffect(() => {
    debugActorReady(!!actor, !!actorFetching);
    load().catch(() => {
      setBackendError(true);
      setLoadingAllTime(false);
      setLoadingMonthly(false);
    });
  }, [load]);

  useEffect(() => {
    const handler = () => {
      load().catch(() => {});
    };
    window.addEventListener("jb:bp-write-success", handler);
    return () => window.removeEventListener("jb:bp-write-success", handler);
  }, [load]);

  // Compute gapToTop10 for share caption enrichment
  const gapToTop10: number | null = (() => {
    if (!rankContext) return null;
    const myRank = rankContext.myEntry.rank;
    if (myRank <= 10) return null;
    const top10Entry = allTimeEntries.find((e) => e.rank === 10);
    if (!top10Entry) return null;
    const gap = top10Entry.allTimeBP - rankContext.myEntry.allTimeBP;
    return gap > 0 ? gap : null;
  })();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Monthly Prize Banner */}
        <button
          type="button"
          data-ocid="leaderboard.card"
          onClick={() => void navigate({ to: "/monthly-prize" })}
          style={{
            all: "unset",
            display: "block",
            width: "100%",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              background: "hsl(var(--primary) / 0.05)",
              border: "1px solid hsl(var(--primary) / 0.2)",
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
              boxShadow: "0 0 20px hsl(var(--primary) / 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <i
                className="fas fa-medal"
                style={{ color: "hsl(var(--caffeine-yellow))", fontSize: 20 }}
              />
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Monthly Prize
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "hsl(var(--muted-foreground))",
                  }}
                >
                  Monthly Prize is not currently running.
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "hsl(var(--primary))",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              Learn more{" "}
              <i className="fas fa-arrow-right" style={{ fontSize: 10 }} />
            </span>
          </div>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <Trophy
              style={{ width: 40, height: 40, color: "hsl(var(--primary))" }}
            />
          </div>
          <h1
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 900,
              color: "hsl(var(--foreground))",
              marginBottom: 8,
            }}
          >
            Bear Points Leaderboard
          </h1>
          <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))" }}>
            Real-time rankings across all JackBear.ai learners
          </p>
          {backendError && (
            <Alert
              className="mt-4 border-yellow-500/30 bg-yellow-500/10"
              data-ocid="leaderboard.error_state"
            >
              <AlertDescription className="text-yellow-400 text-sm">
                <i className="fas fa-circle-info mr-2" />
                Showing local data — backend sync unavailable
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Winner claim for previous month (backend-verified) */}
        {currentPrincipal && MONTHLY_PRIZE_ACTIVE && (
          <BackendWinnerClaimCard
            actor={actor}
            prevMonthEntries={prevMonthEntries}
            currentPrincipal={currentPrincipal}
          />
        )}

        {/* Tabs */}
        <Tabs defaultValue="allTime">
          <TabsList
            className="w-full mb-6"
            style={{
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
            }}
          >
            <TabsTrigger
              value="allTime"
              className="flex-1"
              data-ocid="leaderboard.tab"
            >
              <i className="fas fa-infinity mr-2" style={{ fontSize: 12 }} />
              All Time
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="flex-1"
              data-ocid="leaderboard.tab"
            >
              <i className="fas fa-calendar mr-2" style={{ fontSize: 12 }} />
              This Month
              <Badge
                className="ml-2 text-xs"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                  border: "1px solid hsl(var(--border))",
                }}
              >
                Coming Soon
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="allTime">
            <Card
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <CardHeader style={{ paddingBottom: 8 }}>
                <CardTitle
                  className="text-sm"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  <i className="fas fa-globe mr-2" />
                  All-Time Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingAllTime ? (
                  <LeaderboardSkeleton />
                ) : allTimeEntries.length === 0 ? (
                  <div
                    data-ocid="leaderboard.empty_state"
                    className="text-center py-8"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <i
                      className="fas fa-users"
                      style={{
                        fontSize: 32,
                        marginBottom: 12,
                        display: "block",
                      }}
                    />
                    No rankings yet. Complete lessons to earn Bear Points!
                  </div>
                ) : (
                  <>
                    {allTimeEntries.map((entry) => (
                      <LeaderboardRow
                        key={entry.userId}
                        entry={entry}
                        rankDelta={
                          entry.isCurrentUser
                            ? (rankDeltas[currentPrincipal] ?? null)
                            : null
                        }
                        gapAbove={
                          entry.isCurrentUser
                            ? (rankContext?.gapAbove ?? null)
                            : null
                        }
                        gapBelow={
                          entry.isCurrentUser
                            ? (rankContext?.gapBelow ?? null)
                            : null
                        }
                        goldBear={
                          entry.isCurrentUser
                            ? isGoldBear(entry.rank, entry.allTimeBP)
                            : false
                        }
                        prestigeTier={
                          entry.isCurrentUser
                            ? getPrestigeTier(entry.rank, entry.allTimeBP)
                            : null
                        }
                      />
                    ))}
                    {allTimeEntries.some((e) => e.isCurrentUser) && (
                      <div className="mt-3" data-ocid="leaderboard.panel">
                        <ShareActionsInline
                          rank={
                            rankContext?.myEntry.rank ?? shareData?.rank ?? null
                          }
                          bp={
                            rankContext?.myEntry.allTimeBP ?? shareData?.bp ?? 0
                          }
                          displayName={
                            rankContext?.myEntry.displayName ??
                            shareData?.displayName
                          }
                          gapToTop10={gapToTop10}
                          prestigeTier={getPrestigeTier(
                            rankContext?.myEntry.rank ??
                              shareData?.rank ??
                              null,
                            rankContext?.myEntry.allTimeBP ??
                              shareData?.bp ??
                              null,
                          )}
                          compact={true}
                        />
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <CardHeader style={{ paddingBottom: 8 }}>
                <CardTitle
                  className="text-sm"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  <i className="fas fa-calendar-star mr-2" />
                  {formatMonthKey(getCurrentMonthKey())} Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingMonthly ? (
                  <LeaderboardSkeleton />
                ) : monthlyEntries.length === 0 ? (
                  <div
                    data-ocid="leaderboard.empty_state"
                    className="text-center py-8"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <i
                      className="fas fa-star"
                      style={{
                        fontSize: 32,
                        marginBottom: 12,
                        display: "block",
                      }}
                    />
                    No entries this month yet. Start earning BP!
                  </div>
                ) : (
                  monthlyEntries.map((entry) => (
                    <LeaderboardRow
                      key={entry.userId}
                      entry={entry}
                      rankDelta={null}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer nav */}
        <div className="text-center mt-8">
          <Button
            variant="ghost"
            onClick={() => void navigate({ to: "/" })}
            data-ocid="leaderboard.link"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <i className="fas fa-arrow-left mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
      <ShareCardModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        rank={shareData?.rank ?? null}
        bp={shareData?.bp ?? 0}
        displayName={shareData?.displayName}
      />
    </div>
  );
}
