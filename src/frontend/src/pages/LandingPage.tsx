import LazyYouTubeEmbed from "@/components/LazyYouTubeEmbed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/hooks/useActor";
import { useLanguage } from "@/hooks/useLanguage";
import {
  type FlatLeaderboardEntry,
  fetchGlobalLeaderboard,
} from "@/lib/leaderboardData";
import { extractVideoId } from "@/lib/youtube";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Globe,
  GraduationCap,
  Medal,
  Puzzle,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function getRankIcon(rank: number, isDark: boolean) {
  const fallbackColor = isDark ? "oklch(0.5 0.08 290)" : "oklch(0.35 0.08 290)";
  if (rank === 1)
    return (
      <Trophy
        style={{
          width: 18,
          height: 18,
          color: "oklch(0.78 0.18 80)",
          flexShrink: 0,
          filter: "drop-shadow(0 0 6px oklch(0.78 0.18 80 / 0.6))",
        }}
      />
    );
  if (rank === 2)
    return (
      <Medal
        style={{
          width: 18,
          height: 18,
          color: "oklch(0.72 0.06 250)",
          flexShrink: 0,
        }}
      />
    );
  if (rank === 3)
    return (
      <Award
        style={{
          width: 18,
          height: 18,
          color: "oklch(0.68 0.16 55)",
          flexShrink: 0,
        }}
      />
    );
  return (
    <span
      style={{
        fontSize: 13,
        color: fallbackColor,
        fontWeight: 700,
        flexShrink: 0,
        minWidth: 18,
        textAlign: "center",
      }}
    >
      #{rank}
    </span>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  }),
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { t: _t } = useLanguage();
  const { actor, isFetching } = useActor();
  const [topLeaders, setTopLeaders] = useState<FlatLeaderboardEntry[]>([]);
  const [leadersLoading, setLeadersLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  // ── Theme-adaptive color tokens ──────────────────────────────────────────
  // Hero section
  const heroSectionBg = isDark
    ? "linear-gradient(160deg, oklch(0.09 0.06 290) 0%, oklch(0.11 0.05 290) 50%, oklch(0.10 0.04 260) 100%)"
    : "linear-gradient(160deg, oklch(0.97 0.02 290) 0%, oklch(0.96 0.03 280) 50%, oklch(0.97 0.01 260) 100%)";
  const heroOrbBg = isDark
    ? "oklch(0.55 0.22 290 / 0.12)"
    : "oklch(0.55 0.22 290 / 0.06)";
  const heroSubtitleColor = isDark
    ? "oklch(0.62 0.12 290)"
    : "oklch(0.38 0.12 290)";
  const ghostBtnBg = isDark ? "oklch(0.15 0.06 290)" : "oklch(0.93 0.04 290)";
  const ghostBtnColor = isDark
    ? "oklch(0.75 0.18 290)"
    : "oklch(0.35 0.16 290)";
  const ghostBtnBorder = isDark
    ? "1.5px solid oklch(0.35 0.12 290 / 0.6)"
    : "1.5px solid oklch(0.70 0.12 290 / 0.5)";

  // Shared section colors
  const sectionBg = isDark ? "oklch(0.10 0.05 290)" : "oklch(0.97 0.02 290)";
  const sectionBg2 = isDark ? "oklch(0.11 0.04 290)" : "oklch(0.97 0.02 290)";
  const sectionBorder = isDark
    ? "1px solid oklch(0.22 0.08 290)"
    : "1px solid oklch(0.88 0.04 290)";
  const rowBorder = isDark
    ? "1px solid oklch(0.22 0.07 290)"
    : "1px solid oklch(0.90 0.03 290)";
  const headingLgColor = isDark
    ? "oklch(0.92 0.06 290)"
    : "oklch(0.18 0.06 290)";
  const headingMdColor = isDark
    ? "oklch(0.88 0.07 290)"
    : "oklch(0.15 0.06 290)";
  const bodyTextColor = isDark ? "oklch(0.55 0.1 290)" : "oklch(0.38 0.08 290)";
  const bodyTextMuted = isDark
    ? "oklch(0.55 0.09 290)"
    : "oklch(0.38 0.07 290)";

  // Card colors
  const cardBg = isDark ? "oklch(0.13 0.06 290 / 0.9)" : "oklch(0.99 0.01 290)";
  const cardBorderColor = isDark
    ? "1.5px solid oklch(0.25 0.08 290)"
    : "1.5px solid oklch(0.88 0.04 290)";
  const cardTitleColor = isDark
    ? "oklch(0.86 0.07 290)"
    : "oklch(0.18 0.06 290)";
  const cardDescColor = isDark
    ? "oklch(0.52 0.09 290)"
    : "oklch(0.40 0.07 290)";

  // Leaderboard panel
  const lbPanelBg = isDark
    ? "oklch(0.13 0.06 290 / 0.9)"
    : "oklch(0.99 0.01 290)";
  const lbPanelBorder = isDark
    ? "1.5px solid oklch(0.28 0.1 290)"
    : "1.5px solid oklch(0.85 0.05 290)";
  const lbRank1NameColor = isDark ? "oklch(0.9 0.1 80)" : "oklch(0.35 0.12 80)";
  const lbRowNameColor = isDark
    ? "oklch(0.8 0.08 290)"
    : "oklch(0.25 0.07 290)";
  const lbRowBPColor = isDark ? "oklch(0.65 0.18 290)" : "oklch(0.40 0.18 290)";
  const lbCtaBg = isDark
    ? "oklch(0.11 0.05 290 / 0.8)"
    : "oklch(0.96 0.02 290 / 0.8)";
  const lbCtaColor = isDark ? "oklch(0.65 0.18 290)" : "oklch(0.40 0.18 290)";
  const emptyColor = isDark ? "oklch(0.5 0.08 290)" : "oklch(0.35 0.08 290)";

  // Decode section
  const decodeSectionBg = isDark
    ? "linear-gradient(160deg, oklch(0.12 0.07 55) 0%, oklch(0.11 0.05 290) 60%)"
    : "linear-gradient(160deg, oklch(0.97 0.03 55) 0%, oklch(0.96 0.02 290) 60%)";
  const decodeOrbBg = isDark
    ? "oklch(0.52 0.2 55 / 0.12)"
    : "oklch(0.52 0.2 55 / 0.06)";
  const decodeCardBg = isDark
    ? "oklch(0.13 0.06 55 / 0.8)"
    : "oklch(0.99 0.01 55)";
  const decodeCardBorder = isDark
    ? "1.5px solid oklch(0.52 0.2 55 / 0.4)"
    : "1.5px solid oklch(0.68 0.15 55 / 0.5)";
  const decodeH2Color = isDark ? "oklch(0.92 0.08 80)" : "oklch(0.25 0.1 80)";
  const decodeBodyColor = isDark
    ? "oklch(0.65 0.1 290)"
    : "oklch(0.35 0.08 290)";

  // Chain Key section
  const chainBg = isDark
    ? "linear-gradient(160deg, oklch(0.10 0.07 200) 0%, oklch(0.10 0.05 290) 70%)"
    : "linear-gradient(160deg, oklch(0.97 0.02 200) 0%, oklch(0.97 0.02 290) 70%)";
  const chainOrbBg = isDark
    ? "oklch(0.52 0.2 200 / 0.12)"
    : "oklch(0.52 0.2 200 / 0.06)";
  const chainCardBg = isDark
    ? "oklch(0.13 0.07 200 / 0.8)"
    : "oklch(0.99 0.01 200)";
  const chainCardBorder = isDark
    ? "1.5px solid oklch(0.50 0.18 200 / 0.4)"
    : "1.5px solid oklch(0.62 0.15 200 / 0.5)";
  const chainH2Color = isDark ? "oklch(0.90 0.08 200)" : "oklch(0.15 0.07 200)";
  const chainBodyColor = isDark
    ? "oklch(0.60 0.1 230)"
    : "oklch(0.35 0.08 230)";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && !hash.includes("caffeineAdminToken") && !hash.includes("=")) {
      setTimeout(() => {
        try {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } catch {
          // invalid selector — ignore
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (isFetching) return;
    let cancelled = false;
    (async () => {
      try {
        const entries = await fetchGlobalLeaderboard(actor);
        if (!cancelled) setTopLeaders(entries.slice(0, 5));
      } catch {
        if (!cancelled) setTopLeaders([]);
      } finally {
        if (!cancelled) setLeadersLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [actor, isFetching]);

  const heroVideoId =
    extractVideoId("https://www.youtube.com/watch?v=N7j6QdraKlk") ||
    "N7j6QdraKlk";

  return (
    <div className="min-h-screen bg-background">
      {/* ─────────────────────────────────────────────────────── HERO */}
      <section
        style={{
          background: heroSectionBg,
          position: "relative",
          overflow: "hidden",
          paddingBottom: 64,
        }}
      >
        {/* ambient grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(oklch(0.55 0.22 290 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.55 0.22 290 / 0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            pointerEvents: "none",
          }}
        />
        {/* top glow orb */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: heroOrbBg,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "72px 24px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            style={{ textAlign: "center", marginBottom: 16 }}
          >
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: isDark ? "oklch(0.88 0.14 290)" : "oklch(0.28 0.16 290)",
                display: "inline-block",
                marginBottom: 14,
              }}
            >
              Master Web3 & ICP
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: heroSubtitleColor,
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Learn&nbsp;•&nbsp;Play&nbsp;•&nbsp;Earn on the world computer
            </p>
          </motion.div>

          {/* Hero Video */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.12}
            style={{ marginBottom: 32, marginTop: 32 }}
          >
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1.5px solid oklch(0.55 0.22 290 / 0.3)",
                boxShadow:
                  "0 0 0 1px oklch(0.55 0.22 290 / 0.1), 0 24px 64px oklch(0.55 0.22 290 / 0.15)",
              }}
            >
              <LazyYouTubeEmbed
                videoId={heroVideoId}
                title="JackBear.ai Introduction"
              />
            </div>
          </motion.div>

          {/* 3 Primary Action Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.22}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "center",
              }}
            >
              <Button
                size="lg"
                onClick={() => void navigate({ to: "/courses" })}
                data-ocid="hero.continue_learning.primary_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.28 290) 0%, oklch(0.50 0.26 300) 100%)",
                  color: "oklch(0.98 0.01 290)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 28px",
                  height: "auto",
                  borderRadius: 10,
                  boxShadow: "0 0 24px oklch(0.55 0.28 290 / 0.35)",
                  border: "none",
                  letterSpacing: "0.02em",
                }}
              >
                <BookOpen style={{ marginRight: 8, width: 18, height: 18 }} />
                Continue Learning
              </Button>

              <Button
                size="lg"
                onClick={() => void navigate({ to: "/hangman" })}
                data-ocid="hero.play_decode.primary_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.2 60) 0%, oklch(0.48 0.22 45) 100%)",
                  color: "oklch(0.98 0.01 80)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 28px",
                  height: "auto",
                  borderRadius: 10,
                  boxShadow: "0 0 24px oklch(0.52 0.2 60 / 0.35)",
                  border: "none",
                  letterSpacing: "0.02em",
                }}
              >
                <Puzzle style={{ marginRight: 8, width: 18, height: 18 }} />
                Play Decode
              </Button>

              <Button
                size="lg"
                onClick={() => void navigate({ to: "/leaderboard" })}
                data-ocid="hero.leaderboard.primary_button"
                style={{
                  background: ghostBtnBg,
                  color: ghostBtnColor,
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 28px",
                  height: "auto",
                  borderRadius: 10,
                  border: ghostBtnBorder,
                  letterSpacing: "0.02em",
                }}
              >
                <Trophy style={{ marginRight: 8, width: 18, height: 18 }} />
                View Leaderboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────── WORLD LEADERBOARD */}
      <section
        style={{
          background: sectionBg,
          borderTop: sectionBorder,
          borderBottom: sectionBorder,
          padding: "72px 24px",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "oklch(0.78 0.18 80 / 0.1)",
                border: "1px solid oklch(0.78 0.18 80 / 0.25)",
                borderRadius: 999,
                padding: "4px 14px",
                marginBottom: 16,
              }}
            >
              <Trophy
                style={{
                  width: 14,
                  height: 14,
                  color: "oklch(0.78 0.18 80)",
                  filter: "drop-shadow(0 0 4px oklch(0.78 0.18 80 / 0.5))",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "oklch(0.78 0.18 80)",
                }}
              >
                Live Rankings
              </span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 800,
                color: headingLgColor,
                marginBottom: 10,
                letterSpacing: "-0.01em",
              }}
            >
              World Leaderboard
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: bodyTextColor,
                fontWeight: 400,
              }}
            >
              The top learners on JackBear.ai — climb the ranks to claim your
              spot
            </p>
          </motion.div>

          {/* Leaderboard panel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.1}
          >
            <div
              style={{
                background: lbPanelBg,
                border: lbPanelBorder,
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 4px 40px oklch(0.55 0.22 290 / 0.1)",
              }}
            >
              {leadersLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px 20px",
                      borderBottom: i < 5 ? rowBorder : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                    data-ocid="landing.leaderboard.loading_state"
                  >
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))
              ) : topLeaders.length === 0 ? (
                <div
                  style={{
                    padding: "36px 20px",
                    textAlign: "center",
                    color: emptyColor,
                    fontSize: 14,
                  }}
                  data-ocid="landing.leaderboard.empty_state"
                >
                  No rankings yet — be the first!
                </div>
              ) : (
                topLeaders.map((entry, idx) => {
                  const isFirst = entry.rank === 1;
                  return (
                    <div
                      key={entry.userId}
                      style={{
                        padding: "16px 20px",
                        borderBottom:
                          idx < topLeaders.length - 1 ? rowBorder : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        background: isFirst
                          ? "oklch(0.78 0.18 80 / 0.06)"
                          : "transparent",
                        borderLeft: isFirst
                          ? "3px solid oklch(0.78 0.18 80 / 0.5)"
                          : "3px solid transparent",
                      }}
                      data-ocid={`landing.leaderboard.item.${idx + 1}`}
                    >
                      <div
                        style={{
                          width: 24,
                          display: "flex",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {getRankIcon(entry.rank, isDark)}
                      </div>
                      <span
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontWeight: isFirst ? 700 : 500,
                          color: isFirst ? lbRank1NameColor : lbRowNameColor,
                          minWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {entry.displayName}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: isFirst ? "oklch(0.78 0.18 80)" : lbRowBPColor,
                          flexShrink: 0,
                          fontFamily: "monospace",
                        }}
                      >
                        {entry.allTimeBP.toLocaleString()}{" "}
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            opacity: 0.7,
                            fontFamily: "inherit",
                          }}
                        >
                          BP
                        </span>
                      </span>
                    </div>
                  );
                })
              )}

              {/* CTA row */}
              <div
                style={{
                  padding: "14px 20px",
                  borderTop: rowBorder,
                  background: lbCtaBg,
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => void navigate({ to: "/leaderboard" })}
                  data-ocid="landing.leaderboard.primary_button"
                  style={{
                    color: lbCtaColor,
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.02em",
                  }}
                >
                  View Full Leaderboard
                  <ArrowRight
                    style={{ marginLeft: 6, width: 14, height: 14 }}
                  />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────── ICP DECODE FEATURE */}
      <section
        style={{
          background: decodeSectionBg,
          borderBottom: sectionBorder,
          padding: "72px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            right: "-80px",
            transform: "translateY(-50%)",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: decodeOrbBg,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
          >
            <div
              style={{
                background: decodeCardBg,
                border: decodeCardBorder,
                borderRadius: 16,
                padding: "36px 32px",
                boxShadow:
                  "0 0 0 1px oklch(0.52 0.2 55 / 0.1), 0 24px 64px oklch(0.52 0.2 55 / 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, oklch(0.55 0.22 60) 0%, oklch(0.48 0.2 45) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 0 20px oklch(0.52 0.2 55 / 0.4)",
                    }}
                  >
                    <Puzzle
                      style={{
                        width: 26,
                        height: 26,
                        color: "oklch(0.98 0.01 80)",
                      }}
                    />
                  </div>
                  <div>
                    <h2
                      className="font-display"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: decodeH2Color,
                        letterSpacing: "-0.01em",
                        marginBottom: 2,
                      }}
                    >
                      ICP Decode
                    </h2>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        background: "oklch(0.55 0.22 60 / 0.15)",
                        border: "1px solid oklch(0.55 0.22 60 / 0.3)",
                        borderRadius: 999,
                        padding: "2px 10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          color: "oklch(0.75 0.2 60)",
                        }}
                      >
                        Mini-Game
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  style={{
                    background: "oklch(0.78 0.18 80 / 0.12)",
                    color: "oklch(0.78 0.18 80)",
                    border: "1px solid oklch(0.78 0.18 80 / 0.3)",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 8,
                  }}
                >
                  🔑 Coherence Keys
                </Badge>
              </div>

              <p
                style={{
                  fontSize: "0.975rem",
                  color: decodeBodyColor,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Decode ICP terms, recover hidden Coherence Keys, and earn Bear
                Points in this unique word-decoding game. Discover all three
                Coherence Keys to unlock World 8.
              </p>

              <Button
                size="lg"
                onClick={() => void navigate({ to: "/hangman" })}
                data-ocid="landing.decode.primary_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.22 60) 0%, oklch(0.48 0.2 45) 100%)",
                  color: "oklch(0.98 0.01 80)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 28px",
                  height: "auto",
                  borderRadius: 10,
                  boxShadow: "0 0 24px oklch(0.52 0.2 55 / 0.35)",
                  border: "none",
                  alignSelf: "flex-start",
                  letterSpacing: "0.02em",
                }}
              >
                <Puzzle style={{ marginRight: 8, width: 18, height: 18 }} />
                Play ICP Decode
                <ArrowRight style={{ marginLeft: 8, width: 16, height: 16 }} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────── CONTINUE LEARNING */}
      <section
        style={{
          background: sectionBg,
          borderBottom: sectionBorder,
          padding: "72px 24px",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 800,
                color: headingLgColor,
                marginBottom: 10,
                letterSpacing: "-0.01em",
              }}
            >
              Your Learning Path
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: bodyTextColor,
              }}
            >
              Progress through worlds, unlock deeper knowledge
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.1}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
                marginBottom: 32,
              }}
            >
              {[
                {
                  icon: <Sparkles style={{ width: 22, height: 22 }} />,
                  label: "World 0",
                  name: "Foundations",
                  desc: "Core concepts of blockchain and decentralization",
                  color: "oklch(0.55 0.28 290)",
                },
                {
                  icon: <Globe style={{ width: 22, height: 22 }} />,
                  label: "World 1",
                  name: "Blockchain Basics",
                  desc: "Consensus, wallets, transactions, and smart contracts",
                  color: "oklch(0.52 0.2 220)",
                },
                {
                  icon: <Zap style={{ width: 22, height: 22 }} />,
                  label: "World 2",
                  name: "Internet Computer",
                  desc: "Canisters, cycles, governance, and the IC ecosystem",
                  color: "oklch(0.55 0.22 60)",
                },
              ].map((world, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                  key={i}
                  style={{
                    background: cardBg,
                    border: `1.5px solid ${world.color.replace(")", " / 0.3)")}`,
                    borderRadius: 12,
                    padding: "22px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                  data-ocid={`landing.learning.item.${i + 1}`}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: `${world.color.replace(")", " / 0.15)")}`,
                      border: `1px solid ${world.color.replace(")", " / 0.3)")}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: world.color,
                    }}
                  >
                    {world.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: world.color,
                        marginBottom: 3,
                      }}
                    >
                      {world.label}
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: headingMdColor,
                        marginBottom: 6,
                      }}
                    >
                      {world.name}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: bodyTextMuted,
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {world.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <Button
                size="lg"
                onClick={() => void navigate({ to: "/courses" })}
                data-ocid="landing.learning.primary_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.28 290) 0%, oklch(0.50 0.26 300) 100%)",
                  color: "oklch(0.98 0.01 290)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 32px",
                  height: "auto",
                  borderRadius: 10,
                  boxShadow: "0 0 24px oklch(0.55 0.28 290 / 0.3)",
                  border: "none",
                }}
              >
                <BookOpen style={{ marginRight: 8, width: 18, height: 18 }} />
                Start Learning
                <ArrowRight style={{ marginLeft: 8, width: 16, height: 16 }} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────── MONTHLY PRIZE */}
      <section
        style={{
          background: sectionBg2,
          borderBottom: sectionBorder,
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
          >
            <Badge
              style={{
                background: "oklch(0.3 0.06 55 / 0.2)",
                color: "oklch(0.65 0.14 55)",
                border: "1px solid oklch(0.45 0.12 55 / 0.35)",
                fontWeight: 700,
                fontSize: 12,
                padding: "4px 14px",
                borderRadius: 999,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 16,
                display: "inline-block",
              }}
            >
              Coming Soon
            </Badge>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
                fontWeight: 800,
                color: headingMdColor,
                marginBottom: 12,
                letterSpacing: "-0.01em",
              }}
            >
              Monthly Prize
            </h2>
            <p
              style={{
                fontSize: "0.975rem",
                color: bodyTextMuted,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Monthly rewards are coming soon. Top players will earn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────── WHY JACKBEAR */}
      <section
        style={{
          background: sectionBg,
          borderBottom: sectionBorder,
          padding: "72px 24px",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            style={{ textAlign: "center", marginBottom: 36 }}
          >
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 800,
                color: headingLgColor,
                marginBottom: 10,
                letterSpacing: "-0.01em",
              }}
            >
              Why JackBear.ai?
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: bodyTextColor,
              }}
            >
              Learn with a growing global community
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0.1}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                gap: 14,
              }}
            >
              {[
                {
                  icon: <Trophy style={{ width: 20, height: 20 }} />,
                  title: "Gamified Learning",
                  desc: "Earn BP and achievements as you advance",
                  color: "oklch(0.65 0.18 80)",
                },
                {
                  icon: <Users style={{ width: 20, height: 20 }} />,
                  title: "Global Community",
                  desc: "Compete with learners from around the world",
                  color: "oklch(0.60 0.18 220)",
                },
                {
                  icon: <Zap style={{ width: 20, height: 20 }} />,
                  title: "Hands-On Practice",
                  desc: "Interactive quizzes and real-world challenges",
                  color: "oklch(0.65 0.22 300)",
                },
                {
                  icon: <GraduationCap style={{ width: 20, height: 20 }} />,
                  title: "Verified Skills",
                  desc: "Earn certificates and prove your expertise",
                  color: "oklch(0.62 0.18 160)",
                },
              ].map((f, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                  key={i}
                  style={{
                    background: cardBg,
                    border: cardBorderColor,
                    borderRadius: 12,
                    padding: "20px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 9,
                      background: `${f.color.replace(")", " / 0.13)")}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: f.color,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: cardTitleColor,
                        marginBottom: 5,
                      }}
                    >
                      {f.title}
                    </div>
                    <p
                      style={{
                        fontSize: 13,
                        color: cardDescColor,
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── CHAIN KEY */}
      <section
        style={{
          background: chainBg,
          borderBottom: sectionBorder,
          padding: "72px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "-80px",
            transform: "translateY(-50%)",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: chainOrbBg,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
          >
            <div
              style={{
                background: chainCardBg,
                border: chainCardBorder,
                borderRadius: 16,
                padding: "36px 32px",
                boxShadow: "0 24px 64px oklch(0.50 0.18 200 / 0.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.2 200) 0%, oklch(0.48 0.2 230) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 20px oklch(0.52 0.2 200 / 0.4)",
                  }}
                >
                  <Shield
                    style={{
                      width: 24,
                      height: 24,
                      color: "oklch(0.98 0.01 200)",
                    }}
                  />
                </div>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                    fontWeight: 800,
                    color: chainH2Color,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  Chain Key Cryptography Authority
                </h2>
              </div>

              <p
                style={{
                  fontSize: "0.975rem",
                  color: chainBodyColor,
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                The cryptographic foundation that makes the Internet Computer
                unique.
              </p>

              {/* compact chips */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    icon: <Shield style={{ width: 13, height: 13 }} />,
                    label: "No Bridges",
                  },
                  {
                    icon: <Zap style={{ width: 13, height: 13 }} />,
                    label: "Web Speed",
                  },
                  {
                    icon: <Globe style={{ width: 13, height: 13 }} />,
                    label: "Multi-Chain",
                  },
                ].map((chip, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: "oklch(0.52 0.2 200 / 0.12)",
                      border: "1px solid oklch(0.52 0.2 200 / 0.3)",
                      borderRadius: 999,
                      padding: "4px 12px",
                      color: "oklch(0.68 0.16 200)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {chip.icon}
                    {chip.label}
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={() => void navigate({ to: "/chain-key-cryptography" })}
                data-ocid="landing.chainkey.primary_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.2 200) 0%, oklch(0.48 0.2 230) 100%)",
                  color: "oklch(0.98 0.01 200)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "12px 24px",
                  height: "auto",
                  borderRadius: 10,
                  boxShadow: "0 0 20px oklch(0.52 0.2 200 / 0.3)",
                  border: "none",
                }}
              >
                Explore Chain Key Technology
                <ArrowRight style={{ marginLeft: 8, width: 16, height: 16 }} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
