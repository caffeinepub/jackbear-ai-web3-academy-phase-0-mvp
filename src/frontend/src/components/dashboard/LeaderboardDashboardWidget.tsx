import ShareActionsInline from "@/components/ShareActionsInline";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { getMasteryTier } from "@/lib/leaderboardData";
import { type PrestigeTier, getPrestigeTier } from "@/lib/prestige";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const TIER_COLORS = {
  Master: "oklch(0.78 0.18 55)",
  Expert: "oklch(0.72 0.2 290)",
  Scholar: "oklch(0.68 0.14 220)",
  Novice: "oklch(0.58 0.08 290)",
};

type DashRankContext = {
  rank: number;
  gapAbove: number | null;
  gapBelow: number | null;
  gapToTop10: number | null;
};

export default function LeaderboardDashboardWidget() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const [bp, setBp] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [rankContext, setRankContext] = useState<DashRankContext | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: identity read inside effect body, not a reactive dep
  useEffect(() => {
    if (!actor) return;
    let cancelled = false;
    (async () => {
      try {
        console.log(
          "[BP-AUDIT] BACKEND SOURCE OF TRUTH ACTIVE — LeaderboardDashboardWidget using backend BP only",
        );
        const principal = identity?.getPrincipal().toString() ?? "";
        const [creditsOpt, leaderboardRaw] = await Promise.all([
          actor.getBearCredits(),
          actor.getGlobalLeaderboard(),
        ]);
        if (!cancelled) {
          // BP
          const bearCredits = Array.isArray(creditsOpt)
            ? creditsOpt[0]
            : creditsOpt;
          const canisterBP = bearCredits
            ? Number(bearCredits.totalEarned ?? bearCredits.balance ?? 0)
            : 0;
          setBp(canisterBP);

          // Rank context from leaderboard
          if (principal && Array.isArray(leaderboardRaw)) {
            const entries: Array<{
              userId: string;
              rank: number;
              allTimeBP: number;
            }> = (leaderboardRaw as any[]).map((e: any) => ({
              userId: String(e.userId ?? e.principal ?? ""),
              rank: Number(e.rank ?? 0),
              allTimeBP: Number(e.allTimeBP ?? e.bp ?? e.totalEarned ?? 0),
            }));
            // Sort by rank ascending to ensure neighbors are correct
            entries.sort((a, b) => a.rank - b.rank);
            const idx = entries.findIndex((e) => e.userId === principal);
            if (idx !== -1) {
              const me = entries[idx];
              const above = idx > 0 ? entries[idx - 1] : null;
              const below = idx < entries.length - 1 ? entries[idx + 1] : null;
              const top10Entry = entries.length >= 10 ? entries[9] : null;
              const gapToTop10 =
                me.rank > 10 && top10Entry
                  ? top10Entry.allTimeBP - me.allTimeBP
                  : null;
              setRankContext({
                rank: me.rank,
                gapAbove: above ? above.allTimeBP - me.allTimeBP : null,
                gapBelow: below ? me.allTimeBP - below.allTimeBP : null,
                gapToTop10,
              });
            } else {
              setRankContext(null);
            }
          }
        }
      } catch {
        if (!cancelled) setBp(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [actor]); // identity read inside, not a dep

  // Refetch after a confirmed backend BP write
  useEffect(() => {
    const handler = async () => {
      if (!actor) return;
      try {
        const creditsOpt = await actor.getBearCredits();
        const bearCredits = Array.isArray(creditsOpt)
          ? creditsOpt[0]
          : creditsOpt;
        const canisterBP = bearCredits
          ? Number(
              (bearCredits as any).totalEarned ??
                (bearCredits as any).balance ??
                0,
            )
          : 0;
        setBp(canisterBP);
      } catch {
        // ignore
      }
    };
    window.addEventListener("jb:bp-write-success", handler);
    return () => window.removeEventListener("jb:bp-write-success", handler);
  }, [actor]);

  const displayBP = bp ?? 0;
  const tier = getMasteryTier(displayBP);
  const tierColor = TIER_COLORS[tier];
  const prestigeTier: PrestigeTier | null = getPrestigeTier(
    rankContext?.rank ?? null,
    displayBP > 0 ? displayBP : null,
  );

  const showPressure = !loading && rankContext !== null && displayBP > 0;

  return (
    <DashboardSection
      title="Bear Points Rank"
      description="Your global leaderboard position"
    >
      <div
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--card))",
        }}
      >
        {/* Stats row */}
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "hsl(var(--muted))",
              border: "1px solid hsl(var(--border))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Trophy
              style={{ width: 18, height: 18, color: "oklch(0.78 0.18 80)" }}
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {loading ? (
              <>
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 6 }}
                >
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "hsl(var(--foreground))",
                      lineHeight: 1,
                    }}
                  >
                    {displayBP.toLocaleString()}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                    }}
                  >
                    BP
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: tierColor,
                      background: "hsl(var(--muted))",
                      border: `1px solid ${tierColor}40`,
                      padding: "1px 6px",
                      borderRadius: 3,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase" as const,
                    }}
                  >
                    {tier}
                  </span>
                  {prestigeTier &&
                    (() => {
                      const PRESTIGE_CHIP: Record<
                        import("@/lib/prestige").PrestigeTier,
                        {
                          color: string;
                          bg: string;
                          border: string;
                          emoji: string;
                          label: string;
                        }
                      > = {
                        gold: {
                          color: "oklch(0.78 0.18 80)",
                          bg: "rgba(234,179,8,0.10)",
                          border: "rgba(234,179,8,0.30)",
                          emoji: "🥇",
                          label: "Gold Bear",
                        },
                        platinum: {
                          color: "oklch(0.75 0.06 250)",
                          bg: "rgba(161,161,170,0.10)",
                          border: "rgba(161,161,170,0.30)",
                          emoji: "🟡",
                          label: "Platinum Bear",
                        },
                        diamond: {
                          color: "oklch(0.80 0.15 200)",
                          bg: "rgba(34,211,238,0.10)",
                          border: "rgba(34,211,238,0.30)",
                          emoji: "💎",
                          label: "Diamond Bear",
                        },
                      };
                      const pc = PRESTIGE_CHIP[prestigeTier];
                      return (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: pc.color,
                            background: pc.bg,
                            border: `1px solid ${pc.border}`,
                            padding: "1px 6px",
                            borderRadius: 3,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase" as const,
                            marginLeft: 4,
                          }}
                        >
                          {pc.emoji} {pc.label}
                        </span>
                      );
                    })()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Competitive pressure panel */}
        {showPressure && rankContext && (
          <div
            data-ocid="leaderboard.panel"
            style={{
              padding: "0 16px 12px",
              borderTop: "1px solid hsl(var(--border))",
              paddingTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {rankContext.rank === 1 ? (
              <span
                style={{
                  fontSize: 12,
                  color: "hsl(var(--muted-foreground))",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                🏆 You're leading globally
              </span>
            ) : (
              <>
                {rankContext.gapAbove != null && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    🔥 Only {rankContext.gapAbove} BP to reach #
                    {rankContext.rank - 1}
                  </span>
                )}
                {rankContext.gapBelow != null && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "hsl(var(--muted-foreground))",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    ⚠️ Someone is only {rankContext.gapBelow} BP behind you
                  </span>
                )}
              </>
            )}
          </div>
        )}

        {/* View leaderboard button */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid hsl(var(--border))",
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs hover:bg-primary/10 hover:text-primary"
            onClick={() => navigate({ to: "/leaderboard" })}
            data-ocid="leaderboard.primary_button"
          >
            View Leaderboard <ArrowRight size={13} className="ml-1" />
          </Button>
        </div>
        {!loading && displayBP > 0 && (
          <div style={{ padding: "0 12px 12px" }}>
            <ShareActionsInline
              rank={rankContext?.rank ?? null}
              bp={displayBP}
              compact={true}
              gapToTop10={rankContext?.gapToTop10 ?? null}
              prestigeTier={prestigeTier}
            />
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
