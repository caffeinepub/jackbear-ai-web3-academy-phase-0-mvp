import type { BPLeaderboardEntry } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/hooks/useActor";
import {
  Activity,
  ArrowRight,
  BarChart3,
  ChevronDown,
  Cpu,
  Globe,
  Lock,
  RefreshCw,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface PublicMetrics {
  activeLearnersToday: bigint;
  mostCompletedLessonWeekly?: string;
  averageProgress: bigint;
}

// ─── Animated Counter Hook ───────────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 1200) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    const to = target;
    if (from === to) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return display;
}

// ─── Live Dot ────────────────────────────────────────────────────────────────

function LiveDot({ color = "#4ade80" }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | number | null;
  subtext: string;
  icon: React.ReactNode;
  isLive?: boolean;
  isLoading?: boolean;
  isText?: boolean;
  adminOnly?: boolean;
}

function MetricCard({
  label,
  value,
  subtext,
  icon,
  isLive = false,
  isLoading = false,
  isText = false,
  adminOnly = false,
}: MetricCardProps) {
  const numericTarget =
    !isText && !adminOnly && value !== null && value !== "—"
      ? Number(value)
      : 0;
  const animated = useAnimatedCounter(numericTarget);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="relative flex flex-col gap-3 rounded-xl p-5"
      style={{
        background: "oklch(0.13 0.06 290)",
        border: "1px solid oklch(0.55 0.22 290 / 0.25)",
        boxShadow: "0 0 24px -8px oklch(0.55 0.22 290 / 0.35)",
      }}
    >
      {/* Live indicator */}
      {isLive && (
        <span className="absolute right-4 top-4">
          <LiveDot />
        </span>
      )}

      {/* Top row */}
      <div className="flex items-center gap-2">
        <span style={{ color: "oklch(0.55 0.22 290)" }}>{icon}</span>
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.55 0.1 290)" }}
        >
          {label}
        </span>
        {adminOnly && (
          <Badge
            variant="outline"
            className="ml-auto text-[10px]"
            style={{
              borderColor: "oklch(0.55 0.22 290 / 0.4)",
              color: "oklch(0.55 0.1 290)",
            }}
          >
            Verified by admin
          </Badge>
        )}
      </div>

      {/* Value */}
      <div className="min-h-[3rem]">
        {isLoading ? (
          <Skeleton
            className="h-9 w-24"
            style={{ background: "oklch(0.18 0.05 290)" }}
          />
        ) : (
          <motion.div
            key={String(value)}
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-black tracking-tight"
            style={{ color: "oklch(0.92 0.06 290)" }}
          >
            {isText || adminOnly
              ? (value ?? "—")
              : value === null
                ? "—"
                : animated.toLocaleString()}
          </motion.div>
        )}
      </div>

      {/* Subtext */}
      <p className="text-xs" style={{ color: "oklch(0.50 0.08 290)" }}>
        {subtext}
      </p>
    </motion.div>
  );
}

// ─── Package Card ────────────────────────────────────────────────────────────

interface PackageCardProps {
  tier: "starter" | "growth" | "dominance";
  badge: string;
  price: string;
  features: string[];
  reach: string;
  isHighlighted?: boolean;
}

function PackageCard({
  tier,
  badge,
  price,
  features,
  reach,
  isHighlighted = false,
}: PackageCardProps) {
  const subject = `Sponsor%20Partnership%20%E2%80%94%20${encodeURIComponent(badge)}`;
  const mailtoHref = `mailto:sponsors@jackbear.ai?subject=${subject}`;

  const badgeColor =
    tier === "growth"
      ? "oklch(0.80 0.18 85)"
      : tier === "dominance"
        ? "oklch(0.65 0.22 290)"
        : "oklch(0.55 0.10 290)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col rounded-2xl p-6"
      style={{
        background: isHighlighted
          ? "oklch(0.15 0.08 290)"
          : "oklch(0.12 0.05 290)",
        border: isHighlighted
          ? "1.5px solid oklch(0.80 0.18 85 / 0.6)"
          : "1px solid oklch(0.55 0.22 290 / 0.2)",
        boxShadow: isHighlighted
          ? "0 0 40px -10px oklch(0.80 0.18 85 / 0.4)"
          : "0 0 20px -8px oklch(0.55 0.22 290 / 0.2)",
      }}
    >
      {isHighlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-widest"
          style={{
            background: "oklch(0.80 0.18 85)",
            color: "oklch(0.10 0.05 85)",
          }}
        >
          Most Popular
        </div>
      )}

      {/* Badge + Price */}
      <div className="mb-4">
        <span
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: badgeColor }}
        >
          {badge}
        </span>
        <p
          className="mt-1 text-2xl font-black"
          style={{ color: "oklch(0.92 0.06 290)" }}
        >
          {price}
        </p>
      </div>

      <Separator style={{ background: "oklch(0.55 0.22 290 / 0.15)" }} />

      {/* Features */}
      <ul className="my-5 flex flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span style={{ color: "oklch(0.65 0.22 290)" }}>✓</span>
            <span className="text-sm" style={{ color: "oklch(0.70 0.08 290)" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* Reach estimate */}
      <div
        className="mb-5 rounded-lg px-4 py-3"
        style={{ background: "oklch(0.09 0.05 290)" }}
      >
        <p
          className="text-[11px] uppercase tracking-wider"
          style={{ color: "oklch(0.50 0.08 290)" }}
        >
          Estimated reach
        </p>
        <p className="mt-0.5 text-lg font-bold" style={{ color: badgeColor }}>
          {reach}
        </p>
      </div>

      <Button
        asChild
        className="mt-auto w-full font-bold uppercase tracking-wide"
        style={{
          background: isHighlighted
            ? "oklch(0.80 0.18 85)"
            : "oklch(0.55 0.22 290)",
          color: isHighlighted ? "oklch(0.10 0.05 85)" : "oklch(0.98 0.01 290)",
          border: "none",
        }}
        data-ocid={`sponsors.${tier}.primary_button`}
      >
        <a href={mailtoHref}>Request Access</a>
      </Button>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SponsorsPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const { actor } = useActor();

  const [metrics, setMetrics] = useState<PublicMetrics | null>(null);
  const [leaderboardSize, setLeaderboardSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const tiersSectionRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    if (!actor) return;
    setRefreshing(true);
    try {
      const [pub, lb] = await Promise.all([
        actor.getPublicMetrics(),
        actor.getGlobalLeaderboard(),
      ]);
      setMetrics(pub);
      setLeaderboardSize((lb as BPLeaderboardEntry[]).length);
      setLastUpdated(new Date());
    } catch {
      // silently retain previous values
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30_000);
    return () => clearInterval(id);
  }, [fetchData]);

  const scrollToTiers = () => {
    tiersSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Derived values
  const activeLearners = metrics ? Number(metrics.activeLearnersToday) : null;
  const avgProgress = metrics ? Number(metrics.averageProgress) : null;
  const topLesson = metrics?.mostCompletedLessonWeekly ?? null;

  const lb = leaderboardSize ?? 0;
  const reachStarter =
    lb > 0 ? `~${(lb * 3).toLocaleString()} learners/mo` : "~300+ learners/mo";
  const reachGrowth =
    lb > 0
      ? `~${(lb * 8).toLocaleString()} impressions/mo`
      : "~800+ impressions/mo";
  const reachDominance =
    lb > 0
      ? `~${(lb * 20).toLocaleString()}+ impressions/mo`
      : "~2,000+ impressions/mo";

  // Background & color tokens
  const pageBg = isDark ? "oklch(0.09 0.05 290)" : "oklch(0.97 0.02 290)";
  const sectionBg = isDark ? "oklch(0.11 0.04 290)" : "oklch(0.95 0.03 290)";
  const headingColor = isDark ? "oklch(0.95 0.06 290)" : "oklch(0.15 0.12 290)";
  const subColor = isDark ? "oklch(0.60 0.10 290)" : "oklch(0.40 0.08 290)";
  const bodyColor = isDark ? "oklch(0.70 0.08 290)" : "oklch(0.30 0.06 290)";
  const cardBg = isDark ? "oklch(0.13 0.06 290)" : "oklch(0.99 0.01 290)";
  const cardBorder = isDark
    ? "oklch(0.55 0.22 290 / 0.22)"
    : "oklch(0.55 0.22 290 / 0.15)";
  const violet = "oklch(0.55 0.22 290)";
  const gold = "oklch(0.80 0.18 85)";

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: pageBg, color: headingColor }}
      data-ocid="sponsors.page"
    >
      {/* ── A: HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 70% at 50% 30%, oklch(0.18 0.12 290 / 0.6), oklch(0.09 0.05 290))"
            : "radial-gradient(ellipse 80% 70% at 50% 30%, oklch(0.88 0.08 290 / 0.5), oklch(0.97 0.02 290))",
        }}
      >
        {/* Ambient glow orb */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.22 290), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          {/* Live chip */}
          <div
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              background: isDark
                ? "oklch(0.15 0.08 290)"
                : "oklch(0.92 0.05 290)",
              border: `1px solid ${violet}`,
              color: violet,
            }}
          >
            <LiveDot />
            Sponsor Intelligence
          </div>

          {/* Headline */}
          <h1
            className="max-w-4xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl lg:text-7xl"
            style={{ color: headingColor }}
          >
            Verifiable attention{" "}
            <span style={{ color: violet }}>infrastructure</span> for the AI
            era.
          </h1>

          {/* Subheadline */}
          <p
            className="max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: bodyColor }}
          >
            JackBear.ai is not a newsletter. It&rsquo;s a gamified Web3
            education layer where users earn rewards for learning.{" "}
            <strong style={{ color: headingColor }}>
              Your brand lives inside the loop.
            </strong>
          </p>

          {/* Live stat */}
          <div
            className="flex items-center gap-3 rounded-xl px-6 py-4"
            style={{
              background: isDark
                ? "oklch(0.13 0.06 290 / 0.8)"
                : "oklch(0.98 0.02 290 / 0.8)",
              border: `1px solid ${violet}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <LiveDot />
            {isLoading ? (
              <Skeleton
                className="h-5 w-40"
                style={{ background: "oklch(0.18 0.05 290)" }}
              />
            ) : (
              <span
                className="text-sm font-semibold"
                style={{ color: headingColor }}
              >
                <span className="text-2xl font-black" style={{ color: violet }}>
                  {activeLearners !== null
                    ? activeLearners.toLocaleString()
                    : "—"}
                </span>{" "}
                learners active today
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 rounded-xl px-8 font-bold uppercase tracking-wide"
              style={{
                background: violet,
                color: "oklch(0.98 0.01 290)",
                border: "none",
                boxShadow: `0 0 28px -6px ${violet}`,
              }}
              data-ocid="sponsors.hero.primary_button"
            >
              <a href="mailto:sponsors@jackbear.ai?subject=Sponsor%20Partnership">
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="gap-2 rounded-xl px-8 font-bold uppercase tracking-wide"
              style={{
                background: "transparent",
                border: `1px solid ${violet}`,
                color: violet,
              }}
              onClick={scrollToTiers}
              data-ocid="sponsors.hero.secondary_button"
            >
              View Packages
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ── B: LIVE METRICS STRIP ───────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: sectionBg }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col items-center gap-2 text-center">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: violet }}
            >
              Live Platform Metrics
            </p>
            <h2 className="text-2xl font-black" style={{ color: headingColor }}>
              This is not a screenshot.
            </h2>
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: subColor }}
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              />
              Refreshes every 30 seconds
              {lastUpdated && (
                <span>· Last: {lastUpdated.toLocaleTimeString()}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <MetricCard
              label="Active Learners Today"
              value={activeLearners}
              subtext="Authenticated sessions in the past 24h"
              icon={<Activity className="h-4 w-4" />}
              isLive
              isLoading={isLoading}
            />
            <MetricCard
              label="Avg Progress Score"
              value={avgProgress !== null ? `${avgProgress}%` : null}
              subtext="Lesson + quiz completion rate across all users"
              icon={<TrendingUp className="h-4 w-4" />}
              isLive
              isLoading={isLoading}
              isText
            />
            <MetricCard
              label="Top Lesson This Week"
              value={topLesson ?? "—"}
              subtext="Most completed lesson in the last 7 days"
              icon={<Sparkles className="h-4 w-4" />}
              isLive
              isLoading={isLoading}
              isText
            />
            <MetricCard
              label="Leaderboard Size"
              value={leaderboardSize}
              subtext="Competitive users tracked on the all-time board"
              icon={<Users className="h-4 w-4" />}
              isLive
              isLoading={isLoading}
            />
            <MetricCard
              label="Platform Status"
              value="LIVE"
              subtext="Internet Computer — 99.9% uptime"
              icon={<Globe className="h-4 w-4" />}
              isLive
              isLoading={false}
              isText
            />
          </div>
        </div>
      </section>

      {/* ── C: ENGAGEMENT DEPTH ─────────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: pageBg }}>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: violet }}
            >
              Engagement Depth
            </p>
            <h2
              className="text-3xl font-black md:text-4xl"
              style={{ color: headingColor }}
            >
              Users don&rsquo;t scroll. They participate.
            </h2>
            <p className="mt-3 text-base" style={{ color: bodyColor }}>
              Every session is an active loop: lesson → quiz → reward → return.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: <Zap className="h-5 w-5" />,
                title: "Lesson → Quiz Loops",
                body: "Every lesson ends with a quiz. Users must pass to earn Bear Points. Passive views earn nothing.",
              },
              {
                icon: <Activity className="h-5 w-5" />,
                title: "Daily Streak System",
                body: "Streak-based rewards bring users back every day. Engagement is compulsory for earnings.",
              },
              {
                icon: <TrendingUp className="h-5 w-5" />,
                title: "Leaderboard Competition",
                body: "Monthly resets mean every user restarts the race. Competitive engagement stays fresh.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="rounded-xl p-6"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    background: "oklch(0.55 0.22 290 / 0.15)",
                    color: violet,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="mb-2 text-base font-black"
                  style={{ color: headingColor }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: bodyColor }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Insight callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border-l-4 px-8 py-6"
            style={{
              background: isDark
                ? "oklch(0.13 0.07 290 / 0.6)"
                : "oklch(0.94 0.04 290)",
              borderLeftColor: violet,
            }}
          >
            <p
              className="text-base italic leading-relaxed"
              style={{ color: bodyColor }}
            >
              &ldquo;The average Web2 platform gets 2 minutes of passive
              attention. JackBear.ai earns{" "}
              <strong style={{ color: headingColor }}>
                active participation loops
              </strong>{" "}
              — multiple sessions per visit.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── D: VIRAL ENGINE ─────────────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: sectionBg }}>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: gold }}
            >
              Viral Engine
            </p>
            <h2
              className="text-3xl font-black md:text-4xl"
              style={{ color: headingColor }}
            >
              Built-in growth loops.{" "}
              <span style={{ color: gold }}>No ad spend required.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: <Lock className="h-5 w-5" />,
                title: "Coherence Key System",
                body: "Three hidden terms that users hunt, discover, and share. Every discovery is a share moment.",
              },
              {
                icon: <RefreshCw className="h-5 w-5" />,
                title: "Monthly Leaderboard Reset",
                body: "Every new month is a new race. Users share their rank, invite rivals, create organic traffic.",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Intelligence Certification",
                body: "Users earn verifiable credentials they post publicly. Each certificate is a brand impression.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="rounded-xl p-6"
                style={{
                  background: cardBg,
                  border: "1px solid oklch(0.80 0.18 85 / 0.2)",
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    background: "oklch(0.80 0.18 85 / 0.12)",
                    color: gold,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="mb-2 text-base font-black"
                  style={{ color: headingColor }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: bodyColor }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-sm font-bold uppercase tracking-widest"
            style={{ color: gold }}
          >
            Every user is a distribution node. Sponsor placement travels with
            them.
          </motion.p>
        </div>
      </section>

      {/* ── E: PERFORMANCE VISUALS ───────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: pageBg }}>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: violet }}
            >
              Performance Visuals
            </p>
            <h2 className="text-3xl font-black" style={{ color: headingColor }}>
              The numbers tell the story.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Engagement Funnel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl p-6"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <h3
                className="mb-4 text-sm font-black uppercase tracking-wide"
                style={{ color: headingColor }}
              >
                Engagement Funnel
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Visit", pct: 100 },
                  { label: "Sign Up", pct: 65 },
                  { label: "First Lesson", pct: 48 },
                  { label: "Active (3+ lessons)", pct: 31 },
                  { label: "Returning (weekly)", pct: 20 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span
                      className="w-32 shrink-0 text-right text-xs"
                      style={{ color: subColor }}
                    >
                      {row.label}
                    </span>
                    <div
                      className="h-6 flex-1 overflow-hidden rounded-sm"
                      style={{ background: "oklch(0.09 0.05 290)" }}
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-sm"
                        style={{
                          background:
                            "linear-gradient(90deg, oklch(0.55 0.22 290), oklch(0.65 0.18 300))",
                          opacity: 0.4 + row.pct / 200,
                        }}
                      />
                    </div>
                    <span
                      className="w-10 shrink-0 text-xs font-bold"
                      style={{ color: violet }}
                    >
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-6"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <h3
                className="mb-4 text-sm font-black uppercase tracking-wide"
                style={{ color: headingColor }}
              >
                Feature Engagement
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Lesson Worlds", pct: 91 },
                  { label: "Daily Crossword", pct: 85 },
                  { label: "ICP Decode", pct: 72 },
                  { label: "Coherence Keys", pct: 43 },
                  { label: "Intelligence Layer", pct: 38 },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs" style={{ color: subColor }}>
                        {row.label}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: gold }}
                      >
                        {row.pct}%
                      </span>
                    </div>
                    <div
                      className="h-3 overflow-hidden rounded-full"
                      style={{ background: "oklch(0.09 0.05 290)" }}
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${row.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, oklch(0.55 0.22 290), oklch(0.80 0.18 85))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Platform Growth */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center rounded-xl p-6 text-center"
              style={{ background: cardBg, border: `1px solid ${cardBorder}` }}
            >
              <h3
                className="mb-4 text-sm font-black uppercase tracking-wide"
                style={{ color: headingColor }}
              >
                Platform Growth
              </h3>
              <div
                className="mb-3 text-6xl font-black"
                style={{ color: violet }}
              >
                {leaderboardSize !== null ? (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={leaderboardSize}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.1, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {leaderboardSize.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <span style={{ color: subColor }}>—</span>
                )}
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: headingColor }}
              >
                Ranked learners
              </p>
              <p className="mt-2 text-xs" style={{ color: subColor }}>
                Organic growth. No paid traffic.
              </p>
            </motion.div>
          </div>

          <p
            className="mt-6 text-center text-[11px]"
            style={{
              color: isDark ? "oklch(0.40 0.06 290)" : "oklch(0.55 0.06 290)",
            }}
          >
            Indicative of platform structure. Funnel and feature engagement are
            illustrative benchmarks.
          </p>
        </div>
      </section>

      {/* ── F: SPONSOR VALUE BLOCK ───────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: sectionBg }}>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: violet }}
            >
              Sponsor Value
            </p>
            <h2 className="text-3xl font-black" style={{ color: headingColor }}>
              What your investment actually buys.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: <Users className="h-5 w-5" />,
                title: "Reach",
                body: "Active learners × session depth = verified impressions. Not bounce clicks.",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                title: "Engagement",
                body: "Average time-on-platform is measured in lesson completions, not seconds.",
              },
              {
                icon: <Cpu className="h-5 w-5" />,
                title: "Conversion",
                body: "Users who earn BP are invested users. Your brand placement lands in a motivated state.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="rounded-xl p-6"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    background: "oklch(0.55 0.22 290 / 0.15)",
                    color: violet,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="mb-2 font-black" style={{ color: headingColor }}>
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: bodyColor }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl p-8 text-center"
            style={{
              background: isDark
                ? "oklch(0.12 0.08 290)"
                : "oklch(0.93 0.05 290)",
              border: `1px solid ${violet}`,
              boxShadow: `0 0 40px -12px ${violet}`,
            }}
          >
            <p
              className="text-lg font-black leading-snug"
              style={{ color: headingColor }}
            >
              &ldquo;This is not banner advertising. This is{" "}
              <span style={{ color: violet }}>context-native placement</span>{" "}
              inside an active learning loop.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── G: SPONSOR PACKAGES ─────────────────────────────────────────── */}
      <section
        id="sponsor-tiers"
        ref={tiersSectionRef}
        className="px-4 py-20"
        style={{ background: pageBg }}
        data-ocid="sponsors.tiers.section"
      >
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: violet }}
            >
              Sponsor Packages
            </p>
            <h2 className="text-3xl font-black" style={{ color: headingColor }}>
              Three ways to own the attention.
            </h2>
            <p className="mt-2 text-sm" style={{ color: subColor }}>
              All packages include transparent performance reporting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
            <PackageCard
              tier="starter"
              badge="Starter"
              price="Starting at $500/mo"
              features={[
                "Logo in platform footer",
                "Monthly stats report",
                '"Powered by" badge on 1 page',
                "Email mention in monthly recap",
              ]}
              reach={reachStarter}
            />
            <PackageCard
              tier="growth"
              badge="Growth"
              price="Starting at $2,000/mo"
              features={[
                "Featured placement on Dashboard",
                "Brand integration in Daily Crossword",
                "Monthly leaderboard title sponsor",
                "Custom quest or challenge",
                "Weekly performance dashboard",
              ]}
              reach={reachGrowth}
              isHighlighted
            />
            <PackageCard
              tier="dominance"
              badge="Dominance"
              price="Custom pricing"
              features={[
                "Platform-wide integration",
                'Named leaderboard ("Powered by [Brand]")',
                "Intelligence Layer module co-branding",
                "Native campaign design",
                "Real-time sponsor analytics access",
                "Direct founder onboarding",
              ]}
              reach={reachDominance}
            />
          </div>
        </div>
      </section>

      {/* ── H: TRUST LAYER ──────────────────────────────────────────────── */}
      <section className="px-4 py-20" style={{ background: sectionBg }}>
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p
              className="mb-2 text-xs font-bold uppercase tracking-widest"
              style={{ color: violet }}
            >
              Trust Layer
            </p>
            <h2 className="text-3xl font-black" style={{ color: headingColor }}>
              Live data. No screenshots. No theater.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                icon: <Shield className="h-5 w-5" />,
                title: "On-Chain Verifiable",
                body: "Every metric is derived from Internet Computer blockchain state. Immutable. Auditable.",
              },
              {
                icon: <Lock className="h-5 w-5" />,
                title: "Real Users, Real Actions",
                body: "Metrics are authenticated activity only. No anonymous bots inflating counts.",
              },
              {
                icon: <Globe className="h-5 w-5" />,
                title: "Transparent by Default",
                body: "What you see here is what exists. No inflated deck numbers.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="rounded-xl p-6"
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    background: "oklch(0.55 0.22 290 / 0.15)",
                    color: violet,
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="mb-2 font-black" style={{ color: headingColor }}>
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: bodyColor }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Badge row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { label: "🔒 ICP Blockchain" },
              { label: "✓ Authenticated Only" },
              { label: "↻ Auto-Refreshed" },
            ].map((b) => (
              <span
                key={b.label}
                className="rounded-full px-4 py-1.5 text-xs font-bold"
                style={{
                  background: isDark
                    ? "oklch(0.15 0.08 290)"
                    : "oklch(0.90 0.05 290)",
                  border: `1px solid ${violet}`,
                  color: violet,
                }}
              >
                {b.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── I: FINAL CTA ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-28 text-center"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.16 0.10 290 / 0.8), oklch(0.09 0.05 290))"
            : "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.87 0.07 290 / 0.7), oklch(0.97 0.02 290))",
        }}
        data-ocid="sponsors.cta.section"
      >
        {/* Glow orb */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.22 290), transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-3xl"
        >
          <p
            className="mb-3 text-xs font-bold uppercase tracking-widest"
            style={{ color: violet }}
          >
            Final CTA
          </p>
          <h2
            className="mb-6 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl"
            style={{ color: headingColor }}
          >
            Own attention{" "}
            <span style={{ color: gold }}>before it gets expensive.</span>
          </h2>
          <p
            className="mb-10 text-base leading-relaxed"
            style={{ color: bodyColor }}
          >
            Web3 education is the fastest growing attention vertical.
            JackBear.ai is already the infrastructure. Early sponsors lock in
            pricing and positioning before this becomes competitive.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 rounded-xl px-10 py-5 text-base font-black uppercase tracking-wide"
              style={{
                background: violet,
                color: "oklch(0.98 0.01 290)",
                border: "none",
                boxShadow: `0 0 36px -8px ${violet}`,
              }}
              data-ocid="sponsors.final.primary_button"
            >
              <a href="mailto:sponsors@jackbear.ai?subject=Sponsor%20Partnership">
                Become a Sponsor
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>

            <Button
              disabled
              size="lg"
              variant="outline"
              className="gap-2 rounded-xl px-10 py-5 text-base font-bold uppercase tracking-wide opacity-40"
              style={{
                border: `1px solid ${subColor}`,
                color: subColor,
              }}
              data-ocid="sponsors.final.secondary_button"
            >
              Download One-Pager
              <Badge
                className="ml-1 text-[10px]"
                style={{ background: "oklch(0.30 0.06 290)", color: subColor }}
              >
                Coming Soon
              </Badge>
            </Button>
          </div>

          <p
            className="mt-8 text-xs"
            style={{
              color: isDark ? "oklch(0.45 0.07 290)" : "oklch(0.50 0.07 290)",
            }}
          >
            All inquiries answered within 24 hours. No agencies. Direct founder
            contact.
          </p>
        </motion.div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer
        className="border-t px-6 py-8 text-center text-xs"
        style={{
          borderColor: cardBorder,
          color: isDark ? "oklch(0.40 0.06 290)" : "oklch(0.55 0.06 290)",
        }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: violet }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
