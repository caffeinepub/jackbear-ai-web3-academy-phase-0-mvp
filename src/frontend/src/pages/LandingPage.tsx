import LazyYouTubeEmbed from "@/components/LazyYouTubeEmbed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActor } from "@/hooks/useActor";
import { useLanguage } from "@/hooks/useLanguage";
import { extractVideoId } from "@/lib/youtube";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Globe,
  GraduationCap,
  LayoutGrid,
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

  // Quick play zone colors
  const quickPlayLabelBg = isDark
    ? "oklch(0.18 0.08 290 / 0.6)"
    : "oklch(0.90 0.04 290 / 0.8)";
  const quickPlayLabelColor = isDark
    ? "oklch(0.72 0.18 290)"
    : "oklch(0.35 0.16 290)";
  const quickPlayLabelBorder = isDark
    ? "1px solid oklch(0.40 0.14 290 / 0.4)"
    : "1px solid oklch(0.65 0.12 290 / 0.4)";

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

          {/* ── QUICK ACCESS ZONE ─────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.22}
          >
            {/* PLAY NOW label chip */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <span
                data-ocid="hero.quickplay.label"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: quickPlayLabelBg,
                  color: quickPlayLabelColor,
                  border: quickPlayLabelBorder,
                  borderRadius: 999,
                  padding: "4px 14px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                }}
              >
                <Zap style={{ width: 11, height: 11 }} />
                Quick Access
              </span>
            </div>

            {/* Zone 1 — Primary game buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              {/* Play Daily Crossword */}
              <Button
                size="lg"
                onClick={() => void navigate({ to: "/crossword" })}
                data-ocid="hero.crossword.primary_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.20 200) 0%, oklch(0.46 0.18 210) 100%)",
                  color: "oklch(0.98 0.01 200)",
                  fontWeight: 700,
                  fontSize: "1.025rem",
                  padding: "16px 30px",
                  height: "auto",
                  borderRadius: 12,
                  boxShadow: "0 0 28px oklch(0.52 0.20 200 / 0.40)",
                  border: "none",
                  letterSpacing: "0.01em",
                  flex: "1 1 220px",
                  maxWidth: 320,
                  justifyContent: "center",
                }}
              >
                <LayoutGrid
                  style={{
                    marginRight: 9,
                    width: 19,
                    height: 19,
                    flexShrink: 0,
                  }}
                />
                Play Daily Crossword
              </Button>

              {/* Play ICP Decode */}
              <Button
                size="lg"
                onClick={() => void navigate({ to: "/hangman" })}
                data-ocid="hero.decode.primary_button"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.52 0.20 60) 0%, oklch(0.47 0.22 45) 100%)",
                  color: "oklch(0.98 0.01 80)",
                  fontWeight: 700,
                  fontSize: "1.025rem",
                  padding: "16px 30px",
                  height: "auto",
                  borderRadius: 12,
                  boxShadow: "0 0 28px oklch(0.52 0.20 60 / 0.40)",
                  border: "none",
                  letterSpacing: "0.01em",
                  flex: "1 1 220px",
                  maxWidth: 320,
                  justifyContent: "center",
                }}
              >
                <Puzzle
                  style={{
                    marginRight: 9,
                    width: 19,
                    height: 19,
                    flexShrink: 0,
                  }}
                />
                Play ICP Decode
              </Button>
            </div>

            {/* Visual separator */}
            <div
              aria-hidden
              style={{
                height: 1,
                background: isDark
                  ? "oklch(0.28 0.08 290 / 0.5)"
                  : "oklch(0.82 0.04 290 / 0.6)",
                maxWidth: 480,
                margin: "0 auto 14px",
                borderRadius: 999,
              }}
            />

            {/* Zone 2 — Secondary actions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
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
                  fontSize: "0.95rem",
                  padding: "12px 24px",
                  height: "auto",
                  borderRadius: 10,
                  boxShadow: "0 0 20px oklch(0.55 0.28 290 / 0.30)",
                  border: "none",
                  letterSpacing: "0.02em",
                }}
              >
                <BookOpen style={{ marginRight: 7, width: 16, height: 16 }} />
                Start Learning
              </Button>

              <Button
                size="lg"
                onClick={() => void navigate({ to: "/intelligence" })}
                data-ocid="hero.intelligence.secondary_button"
                style={{
                  background: ghostBtnBg,
                  color: ghostBtnColor,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "12px 24px",
                  height: "auto",
                  borderRadius: 10,
                  border: ghostBtnBorder,
                  letterSpacing: "0.02em",
                }}
              >
                <Brain style={{ marginRight: 7, width: 16, height: 16 }} />
                Enter Intelligence
              </Button>
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

      {/* ──────────────────────────────────────────── LEADERBOARD ACTIVATION */}
      <section
        style={{
          background: sectionBg2,
          borderBottom: sectionBorder,
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
          >
            {/* Badge */}
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
                marginBottom: 20,
                display: "inline-block",
              }}
            >
              ⏳ Starts May 1
            </Badge>

            {/* Hero Title */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                fontWeight: 900,
                color: headingMdColor,
                marginBottom: 12,
                letterSpacing: "-0.02em",
              }}
            >
              MAY 1 — LEADERBOARD ACTIVATION
            </h2>

            {/* Subline */}
            <p
              style={{
                fontSize: "1.05rem",
                color: bodyTextMuted,
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              Top 5 earn monthly rewards.
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: bodyTextMuted,
                lineHeight: 1.7,
                marginBottom: 4,
              }}
            >
              🥇 $30 • 🥈 $20 • 🥉 $15 • 4th $10 • 5th $5
            </p>

            {/* Supporting line */}
            <p
              style={{
                fontSize: "0.875rem",
                color: bodyTextMuted,
                lineHeight: 1.6,
                marginBottom: 28,
                opacity: 0.75,
              }}
            >
              Daily Crossword • ICP Decode • Coherence • Intelligence Layer
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <Button
                onClick={() => void navigate({ to: "/courses" })}
                style={{
                  background: "oklch(0.55 0.22 290)",
                  color: "oklch(0.98 0.01 290)",
                  fontWeight: 700,
                  padding: "10px 28px",
                  fontSize: "0.95rem",
                  borderRadius: 10,
                  border: "none",
                }}
              >
                Start Playing
              </Button>
              <Button
                onClick={() => void navigate({ to: "/leaderboard" })}
                variant="outline"
                style={{
                  fontWeight: 700,
                  padding: "10px 28px",
                  fontSize: "0.95rem",
                  borderRadius: 10,
                }}
              >
                View Leaderboard Preview
              </Button>
            </div>

            {/* Scarcity line */}
            <p
              style={{
                fontSize: "0.78rem",
                color: bodyTextMuted,
                opacity: 0.6,
                marginBottom: 40,
              }}
            >
              Early players will have an advantage.
            </p>

            {/* How It Works */}
            <div
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                padding: "24px 28px",
                textAlign: "left",
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: headingMdColor,
                  marginBottom: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                How It Works
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: bodyTextMuted,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Play daily → earn points
                <br />
                Unlock deeper layers → earn more
                <br />
                Climb the leaderboard → finish top 5<br />
                <br />
                Resets every month.
              </p>
            </div>

            {/* Leaderboard Preview */}
            <div
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 12,
                padding: "24px 28px",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: headingMdColor,
                  marginBottom: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Monthly Leaderboard Preview
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: headingMdColor,
                  marginBottom: 12,
                }}
              >
                Top 5 earn each month.
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: bodyTextMuted,
                  lineHeight: 2,
                  marginBottom: 12,
                }}
              >
                🥇 $30
                <br />🥈 $20
                <br />🥉 $15
                <br />
                4th — $10
                <br />
                5th — $5
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: bodyTextMuted,
                  lineHeight: 1.7,
                  marginBottom: 8,
                }}
              >
                Resets monthly.
                <br />
                Anyone can climb.
              </p>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: bodyTextMuted,
                  opacity: 0.55,
                  margin: 0,
                }}
              >
                Most players will stay at the surface. A few will reach the top
                5.
              </p>
            </div>
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
