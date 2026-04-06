import type { BPLeaderboardEntry } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { createActorWithConfig } from "@/config";
import { useActor } from "@/hooks/useActor";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Globe,
  Key,
  Lock,
  RefreshCw,
  Shield,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return display;
}

// ─── LiveDot ─────────────────────────────────────────────────────────────────

function LiveDot({ color = "#4ade80" }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ backgroundColor: color }}
      />
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

// ─── MetricCard ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | number | null;
  suffix?: string;
  why?: string;
  loading?: boolean;
  gold?: boolean;
}

function MetricCard({
  label,
  value,
  suffix,
  why,
  loading,
  gold,
}: MetricCardProps) {
  const numericTarget = typeof value === "number" ? value : 0;
  const animated = useAnimatedCounter(numericTarget);
  const isNumeric = typeof value === "number";
  const isLive = value !== null;

  return (
    <div
      className={`rounded-xl border p-6 flex flex-col gap-2 ${
        gold
          ? "border-yellow-400/40 bg-yellow-400/5"
          : "border-border bg-muted/30"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <LiveDot color={gold ? "#facc15" : "#4ade80"} />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      {loading ? (
        <Skeleton className="h-9 w-24" />
      ) : (
        <div
          className={`text-3xl font-bold ${
            gold ? "text-yellow-400" : "text-foreground"
          }`}
        >
          {isNumeric ? animated.toLocaleString() : (value as string)}
          {suffix && isLive && (
            <span className="ml-1 text-base font-normal text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      )}
      {why && (
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
          {why}
        </p>
      )}
    </div>
  );
}

// ─── PackageCard ─────────────────────────────────────────────────────────────

interface PackageCardProps {
  tier: string;
  tagline: string;
  price: string;
  features: string[];
  reach: string;
  ctaSubject: string;
  note: string;
  highlighted?: boolean;
}

function PackageCard({
  tier,
  tagline,
  price,
  features,
  reach,
  ctaSubject,
  note,
  highlighted,
}: PackageCardProps) {
  return (
    <div
      className={`rounded-xl border p-7 flex flex-col gap-5 relative ${
        highlighted
          ? "border-yellow-400/50 bg-yellow-400/5"
          : "border-border bg-muted/30"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </span>
      )}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
          {tier}
        </p>
        <h3 className="text-xl font-bold text-foreground">{tagline}</h3>
      </div>
      <p
        className={`text-2xl font-bold ${
          highlighted ? "text-yellow-400" : "text-foreground"
        }`}
      >
        {price}
      </p>
      <ul className="flex flex-col gap-2">
        {features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-foreground/70"
          >
            <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-green-400" />
            {f}
          </li>
        ))}
      </ul>
      <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground/80">Reach:</span> {reach}
      </div>
      <div className="mt-auto">
        <a
          href={`mailto:justinjackbear@icloud.com?subject=${encodeURIComponent(ctaSubject)}`}
          className="block"
          data-ocid="sponsors.request_access.button"
        >
          <Button
            className={`w-full ${
              highlighted
                ? "bg-yellow-400 hover:bg-yellow-300 text-black font-bold"
                : "border border-border bg-transparent text-foreground hover:bg-muted/50"
            }`}
          >
            Request Access <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </a>
        <p className="text-center text-xs text-muted-foreground mt-2">{note}</p>
      </div>
    </div>
  );
}

// ─── EnterpriseCard ──────────────────────────────────────────────────────────

interface EnterpriseFeature {
  icon: React.ReactNode;
  label: string;
  desc: string;
}

function EnterpriseCard() {
  const features: EnterpriseFeature[] = [
    {
      icon: <Shield className="w-5 h-5 text-yellow-400" />,
      label: "Category Exclusivity",
      desc: "One enterprise partner per vertical. Once filled, it's closed permanently.",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-yellow-400" />,
      label: "Native Lesson Integration",
      desc: "Your brand woven directly into relevant lessons and quiz flows — not displayed beside them.",
    },
    {
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      label: "Leaderboard Ownership",
      desc: "Your brand on the monthly leaderboard. Seen by every competing user, every session.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-yellow-400" />,
      label: "Private Real-Time Dashboard",
      desc: "A live analytics panel built for your team. No waiting for reports.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
      label: "AI-Generated Campaign Reports",
      desc: "Automated weekly intelligence reports on user engagement with your brand.",
    },
    {
      icon: <Users className="w-5 h-5 text-yellow-400" />,
      label: "Founder Direct Access",
      desc: "Direct line to the JackBear.ai founder for campaign strategy and custom integrations.",
    },
  ];

  return (
    <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-8 md:p-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 uppercase tracking-widest text-xs font-bold">
            FLAGSHIP PARTNER
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Enterprise — Embedded Attention
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            This is not advertising. This is embedded attention. One brand per
            category. Platform-level presence across every surface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.label}
              className="rounded-xl border border-border bg-muted/30 p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                {f.icon}
                <span className="font-semibold text-foreground text-sm">
                  {f.label}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4 border-t border-yellow-400/20">
          <div className="flex flex-col gap-1">
            <p className="text-yellow-400 font-bold text-xl">
              Starting at $10,000/mo — Custom pricing available
            </p>
            <p className="text-muted-foreground/60 text-sm italic">
              &quot;Only one partner per category. Once filled, it's
              closed.&quot;
            </p>
          </div>
          <a
            href="mailto:justinjackbear@icloud.com?subject=Enterprise%20Partnership%20Application"
            data-ocid="sponsors.enterprise.button"
          >
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 text-base whitespace-nowrap">
              Apply for Enterprise <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SponsorsPage() {
  const { actor: authActor } = useActor();
  const [metrics, setMetrics] = useState<PublicMetrics | null>(null);
  const [leaderboardSize, setLeaderboardSize] = useState<number | null>(null);
  const [totalBPDistributed, setTotalBPDistributed] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const fetchData = useCallback(async () => {
    let actorToUse = authActor;
    if (!actorToUse) {
      try {
        actorToUse = await createActorWithConfig();
      } catch (err) {
        console.error("[SponsorsPage] createActorWithConfig failed:", err);
        setLoading(false);
        return;
      }
    }
    try {
      console.log(
        "[SPONSOR-METRICS] SponsorsPage: fetching getPublicMetrics + getGlobalLeaderboard",
      );
      const [m, lb] = await Promise.all([
        actorToUse.getPublicMetrics(),
        actorToUse.getGlobalLeaderboard(),
      ]);
      console.log(
        "[SPONSOR-METRICS] SponsorsPage: getPublicMetrics result:",
        m,
      );
      console.log(
        "[SPONSOR-METRICS] SponsorsPage: leaderboard rows:",
        Array.isArray(lb) ? lb.length : "?",
      );
      setMetrics(m as PublicMetrics);
      const lbEntries = lb as BPLeaderboardEntry[];
      setLeaderboardSize(Array.isArray(lb) ? lbEntries.length : 0);
      const totalBP = lbEntries.reduce(
        (sum, e) => sum + Number(e.allTimeBP),
        0,
      );
      setTotalBPDistributed(totalBP);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("[SPONSOR-METRICS] SponsorsPage: fetchData failed:", err);
    } finally {
      setLoading(false);
    }
  }, [authActor]);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30_000);
    return () => clearInterval(id);
  }, [fetchData]);

  // Derived values
  const activeLearners = metrics ? Number(metrics.activeLearnersToday) : null;
  const topLesson = metrics?.mostCompletedLessonWeekly ?? null;
  const lb = leaderboardSize ?? 0;
  const reachStarter = lb * 3;
  const reachGrowth = lb * 8;
  const reachDominance = lb * 20;

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  // ── SECTION 1 — HERO ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        {/* bg gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(250,204,21,0.08),transparent)]" />

        <motion.div
          {...fadeUp}
          className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto"
        >
          {/* Chip */}
          <div className="flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5">
            <LiveDot color="#facc15" />
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
              SPONSOR INTELLIGENCE
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
            <span className="text-yellow-400">1.5M+ Impressions.</span>
            <br />
            Real Users. Live Proof.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            JackBear.ai is a gamified Web3 AI learning platform built on ICP.
            Users earn rewards for learning. Sponsors get verified attention
            inside an active engagement loop — not a passive feed.
          </p>

          {/* Proof Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl mt-2">
            <div className="flex items-center gap-2 rounded-xl border border-yellow-400/30 bg-yellow-400/5 px-4 py-3">
              <TrendingUp className="w-4 h-4 text-yellow-400 shrink-0" />
              <span className="text-sm font-semibold text-yellow-400">
                1.5M+ Impressions (X + YouTube)
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <Users className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                {leaderboardSize
                  ? `${leaderboardSize}+ Registered`
                  : "Growing Users"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                {totalBPDistributed
                  ? `${totalBPDistributed.toLocaleString()}+ BP Earned`
                  : "Verified Engagement"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3">
              <Shield className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm font-semibold text-foreground">
                ICP Verified
              </span>
            </div>
          </div>

          {/* Italic proof line */}
          <p className="text-muted-foreground/70 italic text-sm md:text-base">
            &quot;Sponsors don't guess performance here — they watch it happen
            live.&quot;
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <a
              href="mailto:justinjackbear@icloud.com?subject=Partnership%20Application"
              data-ocid="sponsors.apply.primary_button"
            >
              <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 text-base">
                Apply for Partnership <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("live-activity")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="sponsors.live_activity.button"
              className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-8 py-3 text-base font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              View Live Activity <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 2 — TRACTION */}
      <section className="px-4 py-20 md:py-24 max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="flex flex-col gap-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Proven Attention. Early Infrastructure.
          </h2>
          <div className="flex flex-col gap-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              Over 1.5 million impressions generated organically across X and
              YouTube — without paid ads. That's real reach from a community
              that cares about Web3, AI, and the Internet Computer.
            </p>
            <p>
              That audience didn't just see a post. They clicked, followed, and
              joined a platform with lessons, quizzes, and reward loops. Passive
              attention became active users.
            </p>
            <p>
              Now we're turning that attention into infrastructure. Every day,
              users complete lessons, earn Bear Points, climb leaderboards, and
              unlock deeper content. Engagement compounds.
            </p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-yellow-400 italic">
            &quot;We've already proven attention. Now we're owning
            engagement.&quot;
          </p>
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 3 — LIVE PLATFORM ACTIVITY */}
      <section
        id="live-activity"
        className="px-4 py-20 md:py-24 max-w-6xl mx-auto"
      >
        <motion.div {...fadeUp} className="flex flex-col gap-8">
          {/* Section header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <LiveDot />
              <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                LIVE + ALL-TIME
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Platform Activity (All-Time + Live)
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Proven traction with real users. Live activity shows ongoing
              momentum.
            </p>
            <p className="text-muted-foreground/70 text-base max-w-3xl">
              All-time metrics establish authority. Live metrics show the system
              in motion.
            </p>
            <p className="text-muted-foreground/50 text-sm italic">
              All data reflects authenticated user behavior — not passive
              impressions.
            </p>
          </div>

          {/* All-time metrics */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground/70 uppercase tracking-widest text-sm">
              All-Time
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Total Learners"
                value={leaderboardSize}
                suffix="users"
                why="Registered users with verified on-chain activity."
                loading={loading}
              />
              <MetricCard
                label="Leaderboard Participants"
                value={leaderboardSize}
                suffix="ranked"
                why="Active users competing on the platform leaderboard."
                loading={loading}
              />
              <MetricCard
                label="Bear Points Distributed"
                value={totalBPDistributed}
                suffix="BP"
                why="Total Bear Points earned across all users — reflects cumulative engagement across games, lessons, and quizzes."
                loading={loading}
                gold
              />
              <MetricCard
                label="Avg Progress Score"
                value={metrics ? Number(metrics.averageProgress) : null}
                why="Average lesson progress index across the active learner base."
                loading={loading}
              />
            </div>
          </div>

          {/* Live metrics */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground/70 uppercase tracking-widest text-sm">
              Live Activity (Last 24h)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                label="Active Learners Today"
                value={activeLearners}
                suffix="users"
                why="Users who completed at least one lesson or quiz in the past 24 hours."
                loading={loading}
              />
              <MetricCard
                label="Top Activity (Live)"
                value={topLesson ?? "Games & Lessons"}
                why="Most engaged content currently. Includes Crossword, ICP Decode, and lesson activity."
                loading={loading}
              />
              <MetricCard
                label="Platform Status"
                value="LIVE"
                why="Running on Internet Computer infrastructure — transparent and always on."
                gold
              />
            </div>
          </div>

          <p className="text-muted-foreground/50 italic text-sm">
            Live metrics refresh automatically and reflect real-time platform
            activity.
          </p>

          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground/50">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              type="button"
              onClick={fetchData}
              className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-foreground/70 transition-colors"
              data-ocid="sponsors.refresh.button"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 4 — ENGAGEMENT DEPTH */}
      <section className="px-4 py-20 md:py-24 max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Users don't scroll. They participate.
            </h2>
            <p className="text-muted-foreground text-lg">
              This creates multiple engagement events per session — not a single
              impression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <BookOpen className="w-6 h-6 text-yellow-400" />,
                title: "Lesson → Quiz Loops",
                body: "Every lesson ends with a quiz. Every quiz awards Bear Points. Users return daily to maintain streaks and unlock the next level. That's 4–8 engagement events per session, minimum.",
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Streak & Reward System",
                body: "Users build daily streaks. Missed days break streaks. This creates urgency to return — and repeat exposure to everything on the platform, including your brand.",
              },
              {
                icon: <Trophy className="w-6 h-6 text-yellow-400" />,
                title: "Leaderboard Competition",
                body: "Monthly leaderboard resets create fresh competition every 30 days. Users grind harder at the end of each cycle. Top 5 earn real USDC rewards. Competition is a retention engine.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col gap-3"
              >
                {card.icon}
                <h3 className="text-lg font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-5">
            <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
              Most ad platforms give you one shot. Here, a single sponsor
              placement can be seen{" "}
              <span className="text-yellow-400 font-semibold">
                4–8 times per user session
              </span>
              , across multiple sessions.
            </p>
          </div>
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 5 — VIRAL ENGINE */}
      <section className="px-4 py-20 md:py-24 max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Built-in growth loops. No ad spend required.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Users are not just learners. They are distribution channels.
              Sharing is built into the system at every major achievement point.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Key className="w-6 h-6 text-yellow-400" />,
                title: "Coherence Key Discoveries",
                body: "Users share their Coherence Key unlocks on X, LinkedIn, and Facebook. Each share carries the JackBear.ai brand — and your sponsorship — into new audiences organically.",
              },
              {
                icon: <Award className="w-6 h-6 text-yellow-400" />,
                title: "Intelligence Certifications",
                body: "Completing the Verifiable Intelligence Layer earns a shareable certificate. Users post these publicly. Every post is a proof-of-engagement signal that new users respond to.",
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-yellow-400" />,
                title: "Leaderboard Rankings",
                body: "Monthly leaderboard share cards drive organic competition posts. Top users broadcast their rank. Mid-tier users chase them. The loop reinforces itself every cycle.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col gap-3"
              >
                {card.icon}
                <h3 className="text-lg font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-2xl md:text-3xl font-bold text-yellow-400 italic">
            &quot;Your brand moves with the user.&quot;
          </p>
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 6 — PERFORMANCE / VALUE */}
      <section className="px-4 py-20 md:py-24 max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="flex flex-col gap-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What your placement actually buys.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Globe className="w-7 h-7 text-yellow-400" />,
                label: "Reach",
                desc: "Estimated monthly learner sessions based on current platform activity.",
                figure: lb
                  ? `${(lb * 3).toLocaleString()} learners/mo`
                  : "Growing",
              },
              {
                icon: <Activity className="w-7 h-7 text-yellow-400" />,
                label: "Engagement",
                desc: "Qualified touches per sponsor placement — users who complete actions, not just load a page.",
                figure: lb
                  ? `${(lb * 8).toLocaleString()} impressions/mo`
                  : "Growing",
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-yellow-400" />,
                label: "Conversion",
                desc: "Active users who reach sponsor-adjacent content (lessons, quizzes, leaderboard surfaces).",
                figure: lb
                  ? `${(lb * 20).toLocaleString()}+ touches/mo`
                  : "Growing",
              },
            ].map((col) => (
              <div
                key={col.label}
                className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col gap-4"
              >
                {col.icon}
                <h3 className="text-xl font-bold text-foreground">
                  {col.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {col.desc}
                </p>
                <div className="mt-auto rounded-lg border border-yellow-400/20 bg-yellow-400/5 px-4 py-2">
                  <span className="text-yellow-400 font-bold text-sm">
                    {col.figure}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-5">
            <p className="text-foreground/70 text-base leading-relaxed text-center">
              &quot;This is not banner advertising. This is{" "}
              <span className="text-yellow-400 font-semibold">
                context-native placement inside active behavior
              </span>
              . &quot;
            </p>
          </div>
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 7 — SPONSOR PACKAGES */}
      <section className="px-4 py-20 md:py-24 max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Three ways to own the attention.
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl">
              You're not buying current reach. You're positioning inside a
              system that is scaling. Early partners lock in pricing before this
              becomes competitive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PackageCard
              tier="STARTER"
              tagline="Entry visibility"
              price="Starting at $500/mo"
              features={[
                "Logo placement on sponsor wall",
                "Mention in weekly platform newsletter",
                "Visibility during lesson unlock screens",
                "Monthly performance report",
              ]}
              reach={`${reachStarter > 0 ? `${reachStarter.toLocaleString()}+ learner` : "Growing"} sessions/mo (estimated)`}
              ctaSubject="Starter Partnership"
              note="Lock in early partner pricing"
            />
            <PackageCard
              tier="GROWTH"
              tagline="Repeated exposure across sessions"
              price="Starting at $2,000/mo"
              features={[
                "All Starter features",
                "Featured placement inside active quiz flows",
                "Dashboard banner visibility",
                "Bi-weekly performance report",
                "Leaderboard co-branding",
              ]}
              reach={`${reachGrowth > 0 ? `${reachGrowth.toLocaleString()}+ platform` : "Growing"} impressions/mo (estimated)`}
              ctaSubject="Growth Partnership"
              note="Best ROI at current platform scale"
              highlighted
            />
            <PackageCard
              tier="DOMINANCE"
              tagline="Platform-level integration"
              price="Custom pricing"
              features={[
                "All Growth features",
                "Category-exclusive placement",
                "Native content integration (lessons + quizzes)",
                "Weekly performance report",
                "Dedicated campaign manager",
              ]}
              reach={`${reachDominance > 0 ? `${reachDominance.toLocaleString()}+ qualified` : "Growing"} touches/mo (estimated)`}
              ctaSubject="Dominance Partnership"
              note="Limited availability"
            />
          </div>

          <p className="text-muted-foreground/50 text-sm italic text-center">
            Pricing is set for early-stage scale. It will increase as the
            platform grows. Partners who move now lock in current rates
            permanently.
          </p>
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 8 — ENTERPRISE TIER */}
      <section className="px-4 py-20 md:py-24 max-w-6xl mx-auto">
        <motion.div {...fadeUp}>
          <EnterpriseCard />
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 9 — TRUST LAYER */}
      <section className="px-4 py-20 md:py-24 max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="flex flex-col gap-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Live data. No screenshots. No theater.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Shield className="w-6 h-6 text-yellow-400" />,
                title: "On-Chain Verified",
                body: "JackBear.ai runs on the Internet Computer Protocol (ICP). All user activity is authenticated and verifiable on-chain. No inflated numbers. No vanity metrics.",
              },
              {
                icon: <Lock className="w-6 h-6 text-yellow-400" />,
                title: "Authenticated Behavior Only",
                body: "Every metric on this page reflects a real user who logged in and took action. We don't count page loads. We count completions.",
              },
              {
                icon: <Activity className="w-6 h-6 text-yellow-400" />,
                title: "Live Infrastructure",
                body: "The numbers above update every 30 seconds from a live backend. If you refresh this page, the numbers change. That's the point.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-muted/30 p-6 flex flex-col gap-3"
              >
                {card.icon}
                <h3 className="text-lg font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge className="flex items-center gap-1.5 border border-border bg-muted/30 text-muted-foreground px-3 py-1.5">
              <Globe className="w-3 h-3" /> ICP Blockchain
            </Badge>
            <Badge className="flex items-center gap-1.5 border border-border bg-muted/30 text-muted-foreground px-3 py-1.5">
              <Users className="w-3 h-3" /> Real Users Only
            </Badge>
            <Badge className="flex items-center gap-1.5 border border-border bg-muted/30 text-muted-foreground px-3 py-1.5">
              <CheckCircle className="w-3 h-3" /> No Vanity Metrics
            </Badge>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-foreground">
            &quot;If it's not measurable, it doesn't exist here.&quot;
          </p>
        </motion.div>
      </section>

      <Separator />

      {/* SECTION 10 — FINAL CTA */}
      <section className="relative px-4 py-24 md:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-yellow-400/5 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(250,204,21,0.07),transparent)]" />

        <motion.div
          {...fadeUp}
          className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Own attention before it gets expensive.
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Web3 education is growing fast. JackBear.ai is already the
            infrastructure. Early sponsors get locked-in pricing, preferred
            placement, and direct access to a community that will only become
            harder and more expensive to reach.
          </p>

          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-4 max-w-xl">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pricing increases as the platform scales. Partners who move now
              lock in current rates permanently.{" "}
              <span className="text-yellow-400 font-semibold">
                This window closes.
              </span>
            </p>
          </div>

          <a
            href="mailto:justinjackbear@icloud.com?subject=Partnership%20Application"
            data-ocid="sponsors.apply_final.primary_button"
          >
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-10 py-4 text-lg">
              Apply for Partnership <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>

          <p className="text-muted-foreground/70 text-sm">
            Direct founder access. No agencies. Replied within 24 hours.
          </p>

          <p className="text-xl md:text-2xl text-yellow-400 font-bold italic">
            &quot;This is not a media kit. This is a live revenue machine.&quot;
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8 text-center">
        <p className="text-muted-foreground/50 text-sm">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-muted-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
