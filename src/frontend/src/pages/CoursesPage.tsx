import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  CheckCircle,
  Coins,
  Cpu,
  Globe,
  Lock,
  PlayCircle,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { LessonProgress } from "../backend";
import LessonModal from "../components/LessonModal";
import MegaQuizModal from "../components/MegaQuizModal";
import PlaceholderLessonModal from "../components/PlaceholderLessonModal";
import ShareActionsInline from "../components/ShareActionsInline";
import TipTheDev from "../components/TipTheDev";
import { TESTING_UNLOCK_ENABLED } from "../config/testingUnlock";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  getLocalProgressSnapshot,
  mergeProgressData,
  useGetLessonProgress,
  useIsSpecialWorldUnlocked,
  useMarkSpecialWorldUnlocked,
} from "../hooks/useQueries";
import {
  type CoherenceKeyId,
  type CoherenceKeyState,
  readCoherenceKeys,
} from "../lib/coherenceKeys";
import {
  ADVISORY_REDUCED_BP,
  DAILY_FULL_BP_THRESHOLD,
  FULL_LESSON_BP,
  getDailyBPLessons,
  recordDailyBPLesson,
} from "../lib/dailyLessonPacing";
import { downloadCertificate } from "../lib/generateCertificate";
import { allLessonsEN } from "../lib/lessonContent";
import { isBossAvailable, isLessonUnlockedInWorld } from "../lib/worldProgress";

// ─── World definitions ────────────────────────────────────────────────────────

export type LessonMeta = { id: string; title: string };
export type WorldDef = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  lessons: LessonMeta[];
};

export const WORLDS: WorldDef[] = [
  {
    id: "world-0",
    title: "World 0: Sovereign Basics",
    subtitle: "Foundation of Web3 knowledge",
    icon: <BookOpen className="w-5 h-5" />,
    color: "from-slate-600 to-slate-800",
    lessons: [
      { id: "0.00", title: "What is Web3?" },
      { id: "0.10", title: "What Is Blockchain?" },
      { id: "0.20", title: "Keys & Signatures" },
      { id: "0.30", title: "How to Use a Wallet" },
      { id: "0.40", title: "Consensus Basics" },
      { id: "0.50", title: "Fungible & Non-fungible Tokens" },
      { id: "0.60", title: "Bitcoin vs. ICP" },
      { id: "0.70", title: "Smart Contracts Explained" },
      { id: "0.80", title: "Case Study: Bitcoin Mining" },
      { id: "0.90", title: "First Steps in Web3" },
    ],
  },
  {
    id: "world-1",
    title: "World 1: Sovereign Basics",
    subtitle: "Master the fundamentals of Web3",
    icon: <Globe className="w-5 h-5" />,
    color: "from-blue-600 to-blue-800",
    lessons: [
      { id: "1", title: "Decentralization Explained" },
      { id: "2", title: "Cryptographic Hashing" },
      { id: "3", title: "Peer-to-Peer Networks" },
      { id: "4", title: "Digital Signatures Deep Dive" },
      { id: "5", title: "Merkle Trees" },
      { id: "6", title: "Transaction Lifecycle" },
      { id: "7", title: "Mining and Validation" },
      { id: "8", title: "Forks and Chain Splits" },
      { id: "9", title: "Blockchain Scalability" },
      { id: "10", title: "Mega Quiz: World 1 Mastery" },
    ],
  },
  {
    id: "world-2",
    title: "World 2: ICP Deep Dive",
    subtitle: "Explore the Internet Computer Protocol",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-purple-600 to-purple-800",
    lessons: [
      { id: "11", title: "Introduction to Internet Computer" },
      { id: "12", title: "Canisters: Smart Contracts Evolved" },
      { id: "13", title: "Network Nervous System (NNS)" },
      { id: "14", title: "Subnets and Scalability" },
      { id: "15", title: "Chain-Key Cryptography" },
      { id: "16", title: "Cycles: ICP's Reverse Gas Model" },
      { id: "17", title: "Internet Identity" },
      { id: "18", title: "Motoko Programming Language" },
      { id: "19", title: "HTTP Outcalls and Web2 Integration" },
      { id: "20", title: "Mega Quiz: ICP Fundamentals Mastery" },
    ],
  },
  {
    id: "world-3",
    title: "World 3: AI & Blockchain Integration",
    subtitle: "AI convergence with blockchain and Web3",
    icon: <Shield className="w-5 h-5" />,
    color: "from-emerald-600 to-emerald-800",
    lessons: [
      { id: "21", title: "AI and Blockchain Convergence" },
      { id: "22", title: "On-Chain AI Models" },
      { id: "23", title: "AI-Powered Smart Contracts" },
      { id: "24", title: "Decentralized AI Training" },
      { id: "25", title: "AI DAOs and Governance" },
      { id: "26", title: "Natural Language Interfaces for Web3" },
      { id: "27", title: "AI-Generated Content and NFTs" },
      { id: "28", title: "Predictive Analytics for DeFi" },
      { id: "29", title: "AI Security and Threat Detection" },
      { id: "30", title: "Mega Quiz: AI Integration Mastery" },
    ],
  },
  {
    id: "world-4",
    title: "World 4: DeFi Mastery",
    subtitle: "Decentralized finance fundamentals",
    icon: <Coins className="w-5 h-5" />,
    color: "from-amber-600 to-amber-800",
    lessons: [
      { id: "31", title: "DeFi Fundamentals" },
      { id: "32", title: "Automated Market Makers" },
      { id: "33", title: "Liquidity Pools" },
      { id: "34", title: "Lending Protocols" },
      { id: "35", title: "Stablecoins" },
      { id: "36", title: "Derivatives" },
      { id: "37", title: "Flash Loans" },
      { id: "38", title: "DeFi Security" },
      { id: "39", title: "Cross-chain DeFi" },
      { id: "40", title: "DeFi Governance" },
    ],
  },
  {
    id: "world-5",
    title: "World 5: Smart Contract Development",
    subtitle: "Advanced smart contract patterns and deployment",
    icon: <Star className="w-5 h-5" />,
    color: "from-pink-600 to-pink-800",
    lessons: [
      { id: "41", title: "Advanced Smart Contract Patterns" },
      { id: "42", title: "Gas Optimization Techniques" },
      { id: "43", title: "Upgradeable Contract Design" },
      { id: "44", title: "Security Best Practices" },
      { id: "45", title: "Testing and Formal Verification" },
      { id: "46", title: "Frontend Integration" },
      { id: "47", title: "Indexing and Querying Blockchain Data" },
      { id: "48", title: "Oracles and External Data" },
      { id: "49", title: "Multi-Signature and Access Control" },
      { id: "50", title: "Production Deployment and Maintenance" },
    ],
  },
  {
    id: "world-6",
    title: "World 6: Web3 Ecosystem & Community",
    subtitle: "Building and growing Web3 communities",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "from-rose-600 to-rose-800",
    lessons: [
      { id: "51", title: "Building Web3 Communities" },
      { id: "52", title: "Tokenomics Design" },
      { id: "53", title: "DAO Formation and Governance" },
      { id: "54", title: "Fundraising and Token Sales" },
      { id: "55", title: "Marketing and Growth Strategies" },
      { id: "56", title: "Legal and Regulatory Compliance" },
      { id: "57", title: "Partnerships and Ecosystem Development" },
      { id: "58", title: "Sustainability and Impact" },
      { id: "59", title: "Thought Leadership and Advocacy" },
      { id: "60", title: "Your Web3 Legacy" },
    ],
  },
];

// Bonus World 7 definition (shown after World 6 boss quiz submission)
const BONUS_WORLD_7: WorldDef = {
  id: "world-7",
  title: "Bonus World 7: Advanced Frontiers",
  subtitle: "Exclusive advanced content — unlocked by completing World 6",
  icon: <Sparkles className="w-5 h-5" />,
  color: "from-yellow-600 to-amber-700",
  lessons: [
    { id: "61", title: "Chain-Key Cryptography Foundations" },
    { id: "62", title: "Subnet Signatures and Network Topology" },
    { id: "63", title: "Chain-Key Evolution and Key Rotation" },
    { id: "64", title: "ckBTC: Chain-Key Bitcoin" },
    { id: "65", title: "ckETH and Chain-Key Tokens" },
    { id: "66", title: "vetKeys: Verifiable Encrypted Threshold Keys" },
    { id: "67", title: "HTTPS Outcalls and Secure Randomness" },
    { id: "68", title: "Threshold ECDSA and Cross-Chain Signing" },
    { id: "69", title: "Internet Computer Consensus Protocol" },
    { id: "70", title: "The Future of Chain-Key Technology" },
  ],
};

const WORLD_8_COHERENCE: WorldDef = {
  id: "world-8",
  title: "World 8: Coherence",
  subtitle: "Understanding Intelligence Without Losing Ourselves",
  icon: <Sparkles className="w-5 h-5" />,
  color: "from-violet-700 to-indigo-900",
  lessons: [
    { id: "71", title: "Humanity's New Threshold" },
    { id: "72", title: "What Is Coherence?" },
    { id: "73", title: "Artificial Intelligence vs Verifiable Intelligence" },
    { id: "74", title: "The Internet Is Becoming Autonomous" },
    { id: "75", title: "Data Is Identity" },
    { id: "76", title: "Platforms vs Protocols" },
    { id: "77", title: "AI and Human Agency" },
    { id: "78", title: "The Ethics of Intelligence" },
    { id: "79", title: "Designing a Coherent Future" },
    { id: "80", title: "The Coherence Principle" },
  ],
};

// ─── World 8 unlock helpers ───────────────────────────────────────────────────
const COHERENCE_KEYS = ["HUMAN", "INTELLIGENCE", "SOVEREIGN"];

// Phase 1 Coherence Key display order
const COHERENCE_KEY_IDS: CoherenceKeyId[] = [
  "identity",
  "consensus",
  "compute",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLessonContent(lessonId: string) {
  return allLessonsEN.find((l) => String(l.id) === String(lessonId)) ?? null;
}

function isLessonUnlocked(
  lessonId: string,
  worldIndex: number,
  lessonIndex: number,
  progress: LessonProgress[],
  worldDef: WorldDef,
): boolean {
  // Testing override
  if (TESTING_UNLOCK_ENABLED) return true;

  // First lesson of first world is always unlocked
  if (worldIndex === 0 && lessonIndex === 0) return true;

  // If the lesson has been attempted, it's permanently unlocked
  if (isLessonUnlockedInWorld(lessonId, progress)) return true;

  // First lesson of any world: unlocked if ALL previous world lessons were attempted
  if (lessonIndex === 0) {
    if (worldIndex === 0) return true;
    // Resolve prev world by ID — invariant to bonus-world insertion into displayedWorlds
    const worldDefIdx = WORLDS.findIndex((w) => w.id === worldDef.id);
    const prevWorld = worldDefIdx >= 1 ? WORLDS[worldDefIdx - 1] : null;
    if (!prevWorld) return false; // world-8 / bonus world: require explicit unlock
    return prevWorld.lessons.every((l) =>
      isLessonUnlockedInWorld(l.id, progress),
    );
  }

  // Subsequent lessons: unlock after the previous lesson in the same world is attempted
  const prevLesson = worldDef.lessons[lessonIndex - 1];
  return isLessonUnlockedInWorld(prevLesson.id, progress);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<{
    id: string;
    worldId: string;
  } | null>(null);
  const [selectedBossWorld, setSelectedBossWorld] = useState<string | null>(
    null,
  );
  const [placeholderTitle, setPlaceholderTitle] = useState("");
  const [placeholderOpen, setPlaceholderOpen] = useState(false);
  const [localTick, setLocalTick] = useState(0);
  const [world8Unlocked, setWorld8Unlocked] = useState(false);
  const [world8KeyExpanded, setWorld8KeyExpanded] = useState(false);
  const [world8Keys, setWorld8Keys] = useState(["", "", ""]);
  const [world8KeyError, setWorld8KeyError] = useState(false);

  // Daily pacing state — re-evaluated from localStorage on mount
  const [dailyBPCount, setDailyBPCount] = useState(() => getDailyBPLessons());

  // Phase 1 Coherence Key tracking
  const [coherenceKeyState, setCoherenceKeyState] = useState<CoherenceKeyState>(
    () => readCoherenceKeys(),
  );

  const { data: progressData = [] } = useGetLessonProgress("all");
  const markSpecialWorldUnlocked = useMarkSpecialWorldUnlocked();
  const { data: world8UnlockedBackend = false } =
    useIsSpecialWorldUnlocked("world-8");
  const { data: bonusWorld7Backend = false } =
    useIsSpecialWorldUnlocked("world-7");
  const { actor } = useActor();
  const { identity } = useInternetIdentity();

  // Inline completion share state (replaces modal for world completion)
  const [completionShareData, setCompletionShareData] = useState<{
    worldId: string;
    worldLabel: string;
    rank: number | null;
    bp: number;
  } | null>(null);
  const [dismissedWorldShares, setDismissedWorldShares] = useState<Set<string>>(
    new Set(),
  );

  // Track which worlds have already had world-completion share triggered this session
  const triggeredWorldCompletions = useRef(new Set<string>());
  const progressInitialized = useRef(false);

  // Listen for coherence key recovery events from ICP Decode
  useEffect(() => {
    const handleKeyRecovered = () => {
      setCoherenceKeyState(readCoherenceKeys());
    };
    window.addEventListener("jb:coherence-key-recovered", handleKeyRecovered);
    return () => {
      window.removeEventListener(
        "jb:coherence-key-recovered",
        handleKeyRecovered,
      );
    };
  }, []);

  // Sync world8Unlocked from backend
  useEffect(() => {
    if (world8UnlockedBackend) {
      setWorld8Unlocked(true);
    }
  }, [world8UnlockedBackend]);

  // One-time migration: move legacy localStorage unlock state to backend
  useEffect(() => {
    if (!actor) return;
    try {
      if (localStorage.getItem("bonusWorld7Unlocked") === "true") {
        actor.markSpecialWorldUnlocked("world-7").catch(() => {});
      }
      if (localStorage.getItem("world8CoherenceUnlocked") === "true") {
        actor.markSpecialWorldUnlocked("world-8").catch(() => {});
      }
    } catch {
      // ignore migration errors
    }
  }, [actor]);

  // Re-check bonus world reveal from window event (for same-session reveal animation)
  useEffect(() => {
    const handleReveal = () => {
      // Invalidation handled by markSpecialWorldUnlocked mutation; just trigger re-render
    };
    window.addEventListener("additions:bonus-world-reveal", handleReveal);
    return () => {
      window.removeEventListener("additions:bonus-world-reveal", handleReveal);
    };
  }, []);

  // Merge with live localStorage snapshot on every render for instant UI consistency
  const mergeWithLocal = useCallback(
    (data: LessonProgress[]): LessonProgress[] => {
      const local = getLocalProgressSnapshot();
      return mergeProgressData(data, local);
    },
    [],
  );

  const progress = mergeWithLocal(progressData);

  // Bonus World 7: unlocked if backend special unlock OR boss-world-6 was attempted
  const bonusWorld7Unlocked =
    bonusWorld7Backend ||
    progress.some((p) => p.lessonId === "boss-world-6" && p.attempted);

  // ── World completion share trigger ──────────────────────────────────────────
  useEffect(() => {
    if (!progressInitialized.current) {
      for (const world of WORLDS) {
        if (
          world.lessons.every((l) =>
            progress.some((p) => p.lessonId === l.id && p.completed),
          )
        ) {
          triggeredWorldCompletions.current.add(world.id);
        }
      }
      progressInitialized.current = true;
      return;
    }
    for (const world of WORLDS) {
      if (
        !triggeredWorldCompletions.current.has(world.id) &&
        world.lessons.length > 0 &&
        world.lessons.every((l) =>
          progress.some((p) => p.lessonId === l.id && p.completed),
        )
      ) {
        triggeredWorldCompletions.current.add(world.id);
        if (actor && identity) {
          const worldLabel = world.title;
          const principal = identity.getPrincipal().toString();
          Promise.all([actor.getBearCredits(), actor.getGlobalLeaderboard()])
            .then(([credits, leaderboard]) => {
              const bp = Number((credits as any)?.totalEarned ?? 0);
              const myRow = (leaderboard as any[]).find(
                (r) => r.userId?.toString() === principal,
              );
              const rank = myRow ? Number(myRow.rank) : null;
              setCompletionShareData({
                worldId: world.id,
                worldLabel,
                rank,
                bp,
              });
            })
            .catch(() => {});
        }
        break;
      }
    }
  }, [progress, actor, identity]);

  const handleLessonClose = useCallback(() => {
    setSelectedLesson(null);
    setLocalTick((t) => t + 1);
  }, []);

  const handleBossClose = useCallback(() => {
    setSelectedBossWorld(null);
    setLocalTick((t) => t + 1);
  }, []);

  // Daily pacing handler — called by LessonModal when a lesson awards BP
  const handleLessonComplete = useCallback(
    (_lessonId: string, bpAwarded: number) => {
      // Only track and notify when the backend actually awarded BP
      // (bpAwarded > 0 means it was a first-time completion)
      if (bpAwarded > 0) {
        const newCount = recordDailyBPLesson();
        setDailyBPCount(newCount);
        if (newCount <= DAILY_FULL_BP_THRESHOLD) {
          const remaining = DAILY_FULL_BP_THRESHOLD - newCount;
          if (remaining > 0) {
            toast(`+${FULL_LESSON_BP} BP earned`, {
              description: `${remaining} full-BP lesson${
                remaining !== 1 ? "s" : ""
              } remaining today.`,
            });
          } else {
            // Just hit the threshold
            toast(`+${FULL_LESSON_BP} BP earned`, {
              description:
                "Daily full-BP lessons complete — further lessons still count, but with reduced BP. Come back tomorrow for full rewards.",
            });
          }
        } else {
          // Over threshold — advisory reduced BP message
          toast(`+${ADVISORY_REDUCED_BP} BP (reduced)`, {
            description:
              "Daily full-BP lessons complete — further lessons still count, but with reduced BP. Come back tomorrow for full rewards.",
          });
        }
      }
    },
    [],
  );

  const _handleWorld8KeySubmit = useCallback(() => {
    const valid = world8Keys.every(
      (k, i) => k.trim().toUpperCase() === COHERENCE_KEYS[i],
    );
    if (valid) {
      setWorld8Unlocked(true);
      setWorld8KeyExpanded(false);
      setWorld8KeyError(false);
      setWorld8Keys(["", "", ""]);
      markSpecialWorldUnlocked.mutate("world-8");
      window.dispatchEvent(new CustomEvent("additions:world8-unlocked"));
    } else {
      setWorld8KeyError(true);
    }
  }, [world8Keys, markSpecialWorldUnlocked]);

  // Suppress unused variable warning — localTick is used to force re-renders
  void localTick;
  // Phase 2 — legacy key entry path preserved
  void world8KeyExpanded;
  void world8KeyError;

  // Dispatch world-8-complete when all World 8 lessons are attempted
  useEffect(() => {
    if (!world8Unlocked) return;
    const world8LessonIds = WORLD_8_COHERENCE.lessons.map((l) => l.id);
    const allAttempted = world8LessonIds.every((id) =>
      isLessonUnlockedInWorld(id, progress),
    );
    if (allAttempted) {
      window.dispatchEvent(new CustomEvent("additions:world-8-complete"));
    }
  }, [progress, world8Unlocked]);

  // Build the list of worlds to display
  const displayedWorlds = [
    ...(bonusWorld7Unlocked ? [...WORLDS, BONUS_WORLD_7] : WORLDS),
    WORLD_8_COHERENCE,
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 font-orbitron">
            Learning Worlds
          </h1>
          <p className="text-muted-foreground">
            Complete lessons to unlock new worlds and master Web3 concepts.
          </p>
          {/* Daily pacing status — lightweight, non-blocking */}
          {dailyBPCount >= DAILY_FULL_BP_THRESHOLD && (
            <div
              data-ocid="courses.daily_pacing.toast"
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium"
            >
              <span>⚡</span>
              <span>
                Daily full-BP lessons complete — further lessons earn reduced
                BP. Come back tomorrow for full rewards.
              </span>
            </div>
          )}
          {dailyBPCount > 0 && dailyBPCount < DAILY_FULL_BP_THRESHOLD && (
            <div
              data-ocid="courses.daily_pacing.toast"
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
            >
              <span>⚡</span>
              <span>
                {DAILY_FULL_BP_THRESHOLD - dailyBPCount} full-BP lesson
                {DAILY_FULL_BP_THRESHOLD - dailyBPCount !== 1 ? "s" : ""}{" "}
                remaining today.
              </span>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {displayedWorlds.map((world, worldIndex) => {
            const worldProgress = progress;
            const allLessonsAttempted = world.lessons.every((lesson) =>
              isLessonUnlockedInWorld(lesson.id, worldProgress),
            );
            const bossUnlocked =
              TESTING_UNLOCK_ENABLED ||
              isBossAvailable(
                { id: world.id, title: world.title, lessons: world.lessons },
                worldProgress,
              );
            const bossAttempted = progress.some(
              (p) => p.lessonId === `boss-${world.id}` && p.attempted,
            );
            const isBonus = world.id === "world-7";
            const isWorldFullyComplete = allLessonsAttempted && bossAttempted;
            const isCoherence = world.id === "world-8";

            const worldLessonIds = new Set(
              world.lessons.map((l) => String(l.id)),
            );
            const attemptedInWorld = progress.filter(
              (p) => worldLessonIds.has(p.lessonId) && p.attempted,
            ).length;
            const earnedBP = attemptedInWorld * 10;
            const totalWorldBP = world.lessons.length * 10;

            return (
              <div
                key={world.id}
                className={`surface-elevated rounded-xl overflow-hidden ${isBonus ? "ring-2 ring-yellow-500/40" : ""} ${isCoherence && !world8Unlocked ? "ring-2 ring-violet-500/30" : ""}`}
              >
                {/* World Header */}
                <div
                  className={`bg-gradient-to-r ${world.color} p-4 flex items-center gap-3`}
                >
                  <div className="text-white">{world.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-white font-bold font-orbitron text-lg">
                        {world.title}
                      </h2>
                      {isBonus && (
                        <Badge className="bg-yellow-500/30 text-yellow-200 border-yellow-400/40 text-xs">
                          Bonus
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/70 text-sm">{world.subtitle}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {world.lessons.length > 0 && (
                      <div className="text-right">
                        <p className="text-white/90 text-xs font-semibold">
                          {earnedBP} / {totalWorldBP} BP
                        </p>
                      </div>
                    )}
                    {allLessonsAttempted && world.lessons.length > 0 && (
                      <span className="text-white/90 text-xs bg-white/20 px-2 py-1 rounded-full">
                        All lessons attempted
                      </span>
                    )}
                  </div>
                </div>

                {/* World rendering */}
                {isCoherence && !world8Unlocked ? (
                  // ── Phase 1 Coherence Key Panel ──────────────────────────
                  <div className="p-6 max-w-sm mx-auto text-center space-y-4">
                    {coherenceKeyState.unlocked ? (
                      // ── Completed state ──
                      <>
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-violet-300 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                          COHERENCE ACHIEVED
                        </div>
                        <div className="space-y-2">
                          {COHERENCE_KEY_IDS.map((keyId) => (
                            <div
                              key={keyId}
                              className="flex items-center justify-center gap-2 text-sm font-medium text-violet-300"
                            >
                              <span>✓</span>
                              <span className="capitalize tracking-wide">
                                {keyId}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-violet-400/70 tracking-wide">
                          All three Coherence Keys recovered.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setWorld8Unlocked(true);
                            markSpecialWorldUnlocked.mutate("world-8");
                            window.dispatchEvent(
                              new CustomEvent("additions:world8-unlocked"),
                            );
                          }}
                          className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
                          data-ocid="world8.unlock.button"
                        >
                          Unlock World 8: Coherence
                        </button>
                      </>
                    ) : (
                      // ── In-progress state ──
                      <>
                        <p className="text-muted-foreground text-sm italic">
                          Coherence is not given.
                        </p>
                        <p className="text-muted-foreground text-sm italic mb-2">
                          It must be discovered.
                        </p>
                        <p className="text-muted-foreground/70 text-xs mb-4">
                          Recover the three Coherence Keys by playing ICP
                          Decode.
                        </p>
                        <div className="space-y-2 mb-4">
                          {COHERENCE_KEY_IDS.map((keyId) => {
                            const isRecovered =
                              coherenceKeyState.recovered.includes(keyId);
                            return (
                              <div
                                key={keyId}
                                className={`flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                                  isRecovered
                                    ? "text-violet-300"
                                    : "text-muted-foreground/40"
                                }`}
                              >
                                <span>{isRecovered ? "✓" : "○"}</span>
                                <span className="capitalize tracking-wide">
                                  {keyId}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-muted-foreground/50 italic">
                          Only those who decode will find them.
                        </p>
                        {/* Play ICP Decode CTA */}
                        <button
                          type="button"
                          onClick={() => void navigate({ to: "/hangman" })}
                          className="w-full py-2.5 rounded-lg border border-violet-500/40 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-500/70 text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors"
                          data-ocid="coherence.play_decode.button"
                        >
                          Play ICP Decode
                        </button>
                      </>
                    )}
                  </div>
                ) : isBonus && world.lessons.length === 0 ? (
                  <div className="p-8 text-center">
                    <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Advanced Content Coming Soon
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      You have unlocked Bonus World 7! Advanced frontier lessons
                      are being prepared. Check back soon for exclusive content.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Lessons Grid */}
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {world.lessons.map((lesson, lessonIndex) => {
                        const unlocked = isLessonUnlocked(
                          lesson.id,
                          worldIndex,
                          lessonIndex,
                          worldProgress,
                          world,
                        );
                        const attempted = isLessonUnlockedInWorld(
                          lesson.id,
                          worldProgress,
                        );
                        const content = getLessonContent(lesson.id);

                        return (
                          <button
                            type="button"
                            key={lesson.id}
                            onClick={() => {
                              if (unlocked) {
                                if (content) {
                                  setSelectedLesson({
                                    id: lesson.id,
                                    worldId: world.id,
                                  });
                                } else {
                                  setPlaceholderTitle(lesson.title);
                                  setPlaceholderOpen(true);
                                }
                              }
                            }}
                            disabled={!unlocked}
                            className={`
                              relative p-3 rounded-lg text-left transition-all duration-200
                              ${
                                unlocked
                                  ? "cursor-pointer hover:scale-105 hover:shadow-lg"
                                  : "cursor-not-allowed opacity-50"
                              }
                              ${
                                attempted
                                  ? "bg-primary/10 border border-primary/30"
                                  : unlocked
                                    ? "bg-muted border border-border hover:border-primary/50"
                                    : "bg-muted/50 border border-border/50"
                              }
                            `}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs font-mono text-muted-foreground">
                                {lesson.id}
                              </span>
                              {!unlocked ? (
                                <Lock className="w-3 h-3 text-muted-foreground" />
                              ) : attempted ? (
                                <CheckCircle className="w-3 h-3 text-primary" />
                              ) : (
                                <PlayCircle className="w-3 h-3 text-muted-foreground" />
                              )}
                            </div>
                            <p className="text-xs font-medium text-foreground leading-tight line-clamp-2">
                              {lesson.title}
                            </p>
                            {unlocked && content && (
                              <span className="text-[10px] text-amber-500 font-medium mt-1 block">
                                {(content.quiz?.questions?.length ?? 0) > 0
                                  ? "20 BP · 50 XP"
                                  : "10 BP"}
                              </span>
                            )}
                            {!content && unlocked && (
                              <span className="text-xs text-amber-500 mt-1 block">
                                Coming soon
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Boss Quiz */}
                    <div className="px-4 pb-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (bossUnlocked) {
                            setSelectedBossWorld(world.id);
                          }
                        }}
                        disabled={!bossUnlocked}
                        className={`
                          w-full p-3 rounded-lg flex items-center gap-3 transition-all duration-200
                          ${
                            bossUnlocked
                              ? "cursor-pointer hover:scale-[1.01] bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 hover:border-amber-500/70"
                              : "cursor-not-allowed opacity-40 bg-muted/50 border border-border/50"
                          }
                        `}
                      >
                        <Trophy
                          className={`w-5 h-5 ${bossUnlocked ? "text-amber-500" : "text-muted-foreground"}`}
                        />
                        <div className="text-left">
                          <p
                            className={`text-sm font-bold ${bossUnlocked ? "text-amber-500" : "text-muted-foreground"}`}
                          >
                            Boss Quiz
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {bossUnlocked
                              ? bossAttempted
                                ? "Retry the Boss Quiz anytime"
                                : "Challenge unlocked — attempt the Boss Quiz!"
                              : `Attempt all ${world.lessons.length} lessons to unlock`}
                          </p>
                        </div>
                        {bossUnlocked && (
                          <Zap className="w-4 h-4 text-amber-500 ml-auto" />
                        )}
                      </button>
                      {/* Download Certificate */}
                      {isWorldFullyComplete && (
                        <button
                          type="button"
                          onClick={() =>
                            downloadCertificate({
                              worldTitle: world.title,
                              worldSubtitle: world.subtitle,
                              principal: identity
                                ? identity.getPrincipal().toText()
                                : undefined,
                            })
                          }
                          className="mt-3 w-full p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:scale-[1.01] transition-all duration-200 bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/40 hover:border-violet-500/70"
                          data-ocid="world.download_certificate.button"
                        >
                          <Award className="w-5 h-5 text-violet-400" />
                          <div className="text-left">
                            <p className="text-sm font-bold text-violet-400">
                              Download Certificate
                            </p>
                            <p className="text-xs text-muted-foreground">
                              World complete — claim your certificate
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson Modal */}
      {selectedLesson && (
        <LessonModal
          lesson={getLessonContent(selectedLesson.id)!}
          worldId={selectedLesson.worldId}
          onClose={handleLessonClose}
          onLessonComplete={handleLessonComplete}
        />
      )}

      {/* Placeholder Modal */}
      <PlaceholderLessonModal
        isOpen={placeholderOpen}
        onClose={() => setPlaceholderOpen(false)}
        lessonTitle={placeholderTitle}
      />

      {/* Boss Quiz Modal */}
      {selectedBossWorld && (
        <MegaQuizModal worldId={selectedBossWorld} onClose={handleBossClose} />
      )}
      {completionShareData &&
        !dismissedWorldShares.has(completionShareData.worldId) && (
          <div className="mb-4 max-w-2xl mx-auto px-4 space-y-3">
            <ShareActionsInline
              rank={completionShareData.rank}
              bp={completionShareData.bp}
              worldLabel={`Completed: ${completionShareData.worldLabel}`}
              onDismiss={() =>
                setDismissedWorldShares((prev) =>
                  new Set(prev).add(completionShareData.worldId),
                )
              }
            />
            <TipTheDev compact />
          </div>
        )}
    </div>
  );
}
