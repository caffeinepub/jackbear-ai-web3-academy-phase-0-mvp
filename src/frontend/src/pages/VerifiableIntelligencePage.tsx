import {
  Activity,
  BarChart3,
  Binary,
  Bitcoin,
  Bot,
  Brain,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FlaskConical,
  Globe,
  Lock,
  Network,
  Shield,
  Star,
  Telescope,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import IntelligenceLessonModal from "../components/IntelligenceLessonModal";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { type CoherenceKeyId, readCoherenceKeys } from "../lib/coherenceKeys";
import { isDevUnlocked } from "../lib/devUnlock";
import type { LessonContent } from "../lib/lessonContent";
import {
  module01LessonsEN,
  module01MegaQuizEN,
} from "../lib/lessonContent/module01_en";
import {
  module02LessonsEN,
  module02MegaQuizEN,
} from "../lib/lessonContent/module02_en";
import {
  module03LessonsEN,
  module03MegaQuizEN,
} from "../lib/lessonContent/module03_en";
import {
  module04LessonsEN,
  module04MegaQuizEN,
} from "../lib/lessonContent/module04_en";
import {
  module05LessonsEN,
  module05MegaQuizEN,
} from "../lib/lessonContent/module05_en";

const LESSON_ICONS: Record<string, React.ElementType> = {
  "vil-01": Brain,
  "vil-02": Globe,
  "vil-03": Cpu,
  "vil-04": Zap,
  "vil-05": BarChart3,
  "vil-06": Binary,
  "vil-07": Shield,
  "vil-08": Bitcoin,
  "vil-09": Network,
  "vil-10": Telescope,
  // Module 02 — Agent Systems
  "ags-01": Bot,
  "ags-02": Zap,
  "ags-03": Cpu,
  "ags-04": Activity,
  "ags-05": Network,
  "ags-06": Globe,
  "ags-07": Bitcoin,
  "ags-08": Shield,
  "ags-09": BarChart3,
  "ags-10": Star,
  // Module 03 — Autonomous Systems
  "aut-01": Cpu,
  "aut-02": Zap,
  "aut-03": Activity,
  "aut-04": Shield,
  "aut-05": Network,
  "aut-06": BarChart3,
  "aut-07": Globe,
  "aut-08": Binary,
  "aut-09": Telescope,
  "aut-10": Brain,
  // Module 04 — Agent Economy
  "aec-01": Globe,
  "aec-02": BarChart3,
  "aec-03": Zap,
  "aec-04": Bitcoin,
  "aec-05": Cpu,
  "aec-06": Network,
  "aec-07": Shield,
  "aec-08": Users,
  "aec-09": Activity,
  "aec-10": Telescope,
};

// ── Lesson progress helper ───────────────────────────────────────────────────────────
function getLessonProgress(): Record<
  string,
  { attempted?: boolean; completed?: boolean }
> {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

type LessonRowState = "completed" | "attempted" | "available";

function getLessonRowState(
  id: string,
  progress: Record<string, { attempted?: boolean; completed?: boolean }>,
): LessonRowState {
  const entry = progress[id];
  if (entry?.completed === true) return "completed";
  if (entry?.attempted === true) return "attempted";
  return "available";
}

// ── Legacy Coherence completion detection ────────────────────────────────────────────────
const WORLD_8_LESSON_IDS = [
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
];
const LEGACY_COHERENCE_THRESHOLD = 7;

function detectLegacyCoherenceCompletion(): boolean {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    if (!raw) return false;
    const progress = JSON.parse(raw) as Record<
      string,
      { attempted?: boolean; completed?: boolean }
    >;
    const attemptedCount = WORLD_8_LESSON_IDS.filter(
      (id) => progress[id]?.attempted === true,
    ).length;
    return attemptedCount >= LEGACY_COHERENCE_THRESHOLD;
  } catch {
    return false;
  }
}

// ── Module 01 completion detection ───────────────────────────────────────────────
function detectModule01Completion(): boolean {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    if (!raw) return false;
    const progress = JSON.parse(raw) as Record<string, { attempted?: boolean }>;
    const MODULE_01_IDS = [
      "vil-01",
      "vil-02",
      "vil-03",
      "vil-04",
      "vil-05",
      "vil-06",
      "vil-07",
      "vil-08",
      "vil-09",
      "vil-10",
    ];
    const count = MODULE_01_IDS.filter(
      (id) => progress[id]?.attempted === true,
    ).length;
    return count >= 3;
  } catch {
    return false;
  }
}

// ── Module 02 completion detection ───────────────────────────────────────────────
function detectModule02Completion(): boolean {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    if (!raw) return false;
    const progress = JSON.parse(raw) as Record<string, { attempted?: boolean }>;
    const MODULE_02_IDS = [
      "ags-01",
      "ags-02",
      "ags-03",
      "ags-04",
      "ags-05",
      "ags-06",
      "ags-07",
      "ags-08",
      "ags-09",
      "ags-10",
    ];
    const count = MODULE_02_IDS.filter(
      (id) => progress[id]?.attempted === true,
    ).length;
    return count >= 3;
  } catch {
    return false;
  }
}

// ── Module 03 completion detection ───────────────────────────────────────────────
function detectModule03Completion(): boolean {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    if (!raw) return false;
    const progress = JSON.parse(raw) as Record<string, { attempted?: boolean }>;
    const ids = [
      "aut-01",
      "aut-02",
      "aut-03",
      "aut-04",
      "aut-05",
      "aut-06",
      "aut-07",
      "aut-08",
      "aut-09",
      "aut-10",
    ];
    const count = ids.filter((id) => progress[id]?.attempted === true).length;
    return count >= 3;
  } catch {
    return false;
  }
}

// ── Module 04 completion detection ───────────────────────────────────────────────
function detectModule04Completion(): boolean {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    if (!raw) return false;
    const progress = JSON.parse(raw) as Record<string, { attempted?: boolean }>;
    const ids = [
      "aec-01",
      "aec-02",
      "aec-03",
      "aec-04",
      "aec-05",
      "aec-06",
      "aec-07",
      "aec-08",
      "aec-09",
      "aec-10",
    ];
    const count = ids.filter((id) => progress[id]?.attempted === true).length;
    return count >= 3;
  } catch {
    return false;
  }
}

// ── Module 05 completion detection ───────────────────────────────────────────────
function detectModule05Completion(): boolean {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    if (!raw) return false;
    const progress = JSON.parse(raw) as Record<string, { attempted?: boolean }>;
    const ids = [
      "sov-01",
      "sov-02",
      "sov-03",
      "sov-04",
      "sov-05",
      "sov-06",
      "sov-07",
      "sov-08",
      "sov-09",
      "sov-10",
    ];
    const count = ids.filter((id) => progress[id]?.attempted === true).length;
    return count >= 3;
  } catch {
    return false;
  }
}

// ── Module BP/progress helper ─────────────────────────────────────────────────────────
function getModuleProgress(
  lessonIds: string[],
  megaQuizId: string,
): { lessonsAttempted: number; megaQuizComplete: boolean; bpEarned: number } {
  try {
    const raw = localStorage.getItem("jb_lesson_progress");
    const progress = raw
      ? (JSON.parse(raw) as Record<string, { attempted?: boolean }>)
      : {};
    const lessonsAttempted = lessonIds.filter(
      (id) => progress[id]?.attempted === true,
    ).length;
    const megaQuizComplete =
      megaQuizId !== "" && progress[megaQuizId]?.attempted === true;
    const bpEarned = lessonsAttempted * 10 + (megaQuizComplete ? 40 : 0);
    return { lessonsAttempted, megaQuizComplete, bpEarned };
  } catch {
    return { lessonsAttempted: 0, megaQuizComplete: false, bpEarned: 0 };
  }
}

// ── The required named Coherence Key IDs ─────────────────────────────────────────────
const COHERENCE_KEY_IDS: CoherenceKeyId[] = [
  "identity",
  "consensus",
  "compute",
];

function useIntelligenceUnlock() {
  const { identity } = useInternetIdentity();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isDevBypass, setIsDevBypass] = useState(false);

  useEffect(() => {
    const coherence = readCoherenceKeys();
    const allKeysFound =
      coherence.unlocked ||
      COHERENCE_KEY_IDS.every((k) => coherence.recovered.includes(k));

    const world8FlagAccess =
      localStorage.getItem("world8CoherenceUnlocked") === "true";
    const legacyCompletion = detectLegacyCoherenceCompletion();

    const realUnlock = allKeysFound || world8FlagAccess || legacyCompletion;

    const principalText = identity?.getPrincipal().toText();
    const devBypass = isDevUnlocked(principalText);

    setIsUnlocked(realUnlock || devBypass);
    setIsDevBypass(devBypass && !realUnlock);

    const handleKeyRecovered = () => {
      const updated = readCoherenceKeys();
      const keysNowComplete =
        updated.unlocked ||
        COHERENCE_KEY_IDS.every((k) => updated.recovered.includes(k));
      if (keysNowComplete) {
        setIsUnlocked(true);
        setIsDevBypass(false);
      }
    };
    window.addEventListener("jb:coherence-key-recovered", handleKeyRecovered);
    return () =>
      window.removeEventListener(
        "jb:coherence-key-recovered",
        handleKeyRecovered,
      );
  }, [identity]);

  return { isUnlocked, isDevBypass };
}

// ── System Status ─────────────────────────────────────────────────────────────────
type StatusLevel = "active" | "partial" | "locked";

interface StatusItem {
  label: string;
  activeLabel: string;
  lockedLabel: string;
  status: StatusLevel;
}

function StatusDot({ status }: { status: StatusLevel }) {
  if (status === "active") {
    return (
      <span className="relative inline-flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_6px_2px_oklch(0.72_0.17_162/0.6)]" />
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span className="inline-flex rounded-full h-2 w-2 bg-amber-400 shadow-[0_0_6px_2px_oklch(0.78_0.16_70/0.5)]" />
    );
  }
  return <span className="inline-flex rounded-full h-2 w-2 bg-slate-600" />;
}

function SystemStatusHeader({
  module01Complete,
  module02Complete,
  module03Complete,
  module04Complete,
  module05Complete,
}: {
  module01Complete: boolean;
  module02Complete: boolean;
  module03Complete: boolean;
  module04Complete: boolean;
  module05Complete: boolean;
}) {
  const statuses: StatusItem[] = [
    {
      label: "Identity",
      activeLabel: "Verified",
      lockedLabel: "Locked",
      status: "active",
    },
    {
      label: "Compute",
      activeLabel: "Active",
      lockedLabel: "Locked",
      status: module01Complete ? "active" : "locked",
    },
    {
      label: "Agent Layer",
      activeLabel: "Online",
      lockedLabel: "Locked",
      status: module02Complete ? "active" : "locked",
    },
    {
      label: "Automation Layer",
      activeLabel: "Active",
      lockedLabel: "Locked",
      status: module03Complete ? "active" : "locked",
    },
    {
      label: "Economy Layer",
      activeLabel: "Active",
      lockedLabel: "Locked",
      status: module04Complete ? "active" : "locked",
    },
    {
      label: "Sovereignty Layer",
      activeLabel: "Active",
      lockedLabel: "Locked",
      status: module05Complete ? "active" : "locked",
    },
  ];

  return (
    <div className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-border/40 bg-muted/30">
        <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
          System Status
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          <span className="text-xs font-mono text-emerald-400/80">online</span>
        </span>
      </div>

      {/* Status grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-border/30">
        {statuses.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5 px-4 py-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <StatusDot status={item.status} />
              <span
                className={`text-xs font-mono font-semibold ${
                  item.status === "active"
                    ? "text-emerald-400"
                    : item.status === "partial"
                      ? "text-amber-400"
                      : "text-slate-500"
                }`}
              >
                {item.status === "active" ? item.activeLabel : item.lockedLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Module definitions ────────────────────────────────────────────────────────────────
interface ModuleDef {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  cta: string;
  accentColor: "violet" | "slate";
  lessonIds: string[];
  megaQuizId: string;
}

const MODULES: ModuleDef[] = [
  {
    id: "mod-01",
    number: "Module 01",
    title: "Decentralized AI",
    subtitle: "AI that runs on protocol, not platforms",
    cta: "Enter Module",
    accentColor: "violet",
    lessonIds: [
      "vil-01",
      "vil-02",
      "vil-03",
      "vil-04",
      "vil-05",
      "vil-06",
      "vil-07",
      "vil-08",
      "vil-09",
      "vil-10",
    ],
    megaQuizId: "vil-mq",
  },
  {
    id: "mod-02",
    number: "Module 02",
    title: "Agent Systems",
    subtitle: "Autonomous execution on the world computer",
    cta: "Activate Agents",
    accentColor: "slate",
    lessonIds: [
      "ags-01",
      "ags-02",
      "ags-03",
      "ags-04",
      "ags-05",
      "ags-06",
      "ags-07",
      "ags-08",
      "ags-09",
      "ags-10",
    ],
    megaQuizId: "ags-quiz",
  },
  {
    id: "mod-03",
    number: "Module 03",
    title: "Autonomous Systems",
    subtitle: "Systems that run without human intervention",
    cta: "Enable Automation",
    accentColor: "slate",
    lessonIds: [
      "aut-01",
      "aut-02",
      "aut-03",
      "aut-04",
      "aut-05",
      "aut-06",
      "aut-07",
      "aut-08",
      "aut-09",
      "aut-10",
    ],
    megaQuizId: "aut-quiz",
  },
  {
    id: "mod-04",
    number: "Module 04",
    title: "Agent Economy",
    subtitle: "When AI participates in markets",
    cta: "Enter Economy",
    accentColor: "slate",
    lessonIds: [
      "aec-01",
      "aec-02",
      "aec-03",
      "aec-04",
      "aec-05",
      "aec-06",
      "aec-07",
      "aec-08",
      "aec-09",
      "aec-10",
    ],
    megaQuizId: "aec-quiz",
  },
  {
    id: "mod-05",
    number: "Module 05",
    title: "Sovereign Systems",
    subtitle: "Identity, compute, and value — owned, not rented",
    cta: "Claim Sovereignty",
    accentColor: "slate",
    lessonIds: [],
    megaQuizId: "",
  },
];

// ── Deploy Agent UI ───────────────────────────────────────────────────────────────────
const AGENT_DEPLOYED_KEY = "jb_agent_deployed";

function DeployAgentPanel() {
  const [deployed, setDeployed] = useState(
    () => localStorage.getItem(AGENT_DEPLOYED_KEY) === "true",
  );
  const [deploying, setDeploying] = useState(false);

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      localStorage.setItem(AGENT_DEPLOYED_KEY, "true");
      setDeployed(true);
      setDeploying(false);
    }, 1200);
  };

  return (
    <div className="mt-6 border-t border-border/40 pt-6">
      {deploying ? (
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
          <span className="relative inline-flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="text-sm font-mono text-amber-400">
            Deploying agent...
          </span>
        </div>
      ) : !deployed ? (
        <button
          type="button"
          data-ocid="intelligence.deploy_agent.button"
          onClick={handleDeploy}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors shadow-md"
        >
          <Bot className="h-4 w-4" />
          Deploy First Agent
        </button>
      ) : (
        <div className="inline-flex items-center gap-4 px-5 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 ring-1 ring-emerald-500/10 shadow-[0_0_20px_0px_oklch(0.72_0.17_162/0.08)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
              Agent
            </span>
            <span className="text-sm font-mono font-semibold text-emerald-400">
              Active
            </span>
          </div>
          <div className="w-px h-8 bg-border/40" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
              Status
            </span>
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-sm font-mono font-semibold text-emerald-400">
                Running
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Lesson row state helpers ──────────────────────────────────────────────────────────
function lessonRowClasses(state: LessonRowState): string {
  if (state === "completed")
    return "bg-emerald-500/5 border-emerald-500/25 hover:border-emerald-500/40 hover:bg-emerald-500/10";
  if (state === "attempted")
    return "bg-cyan-500/5 border-cyan-500/25 hover:border-cyan-500/40 hover:bg-cyan-500/10";
  return "bg-muted/30 border-border/30 hover:border-violet-500/40 hover:bg-violet-500/5";
}

function lessonNumberClasses(state: LessonRowState): string {
  if (state === "completed") return "text-emerald-400/70";
  if (state === "attempted") return "text-cyan-400/70";
  return "text-muted-foreground/60";
}

function lessonIconClasses(state: LessonRowState): string {
  if (state === "completed")
    return "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20";
  if (state === "attempted")
    return "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20";
  return "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20";
}

function LessonRowBadge({ state }: { state: LessonRowState }) {
  if (state === "completed") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wide shrink-0 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
        <CheckCircle2 className="h-3 w-3" /> Complete
      </span>
    );
  }
  if (state === "attempted") {
    return (
      <span className="text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-wide shrink-0 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
        In Progress
      </span>
    );
  }
  return (
    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0 group-hover:text-violet-400 transition-colors" />
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────────────
export default function VerifiableIntelligencePage() {
  const { isUnlocked, isDevBypass } = useIntelligenceUnlock();
  const [moduleExpanded, setModuleExpanded] = useState(false);
  const [module02Expanded, setModule02Expanded] = useState(false);
  const [module03Expanded, setModule03Expanded] = useState(false);
  const [module04Expanded, setModule04Expanded] = useState(false);
  const [module05Expanded, setModule05Expanded] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonContent | null>(
    null,
  );
  const [module01Complete, setModule01Complete] = useState(() =>
    detectModule01Completion(),
  );
  const [module02Complete, setModule02Complete] = useState(() =>
    detectModule02Completion(),
  );
  const [module03Complete, setModule03Complete] = useState(() =>
    detectModule03Completion(),
  );
  const [module04Complete, setModule04Complete] = useState(() =>
    detectModule04Completion(),
  );
  const [module05Complete, setModule05Complete] = useState(() =>
    detectModule05Completion(),
  );
  const [lessonProgress, setLessonProgress] = useState(() =>
    getLessonProgress(),
  );

  const [moduleProgress, setModuleProgress] = useState(() => ({
    "mod-01": getModuleProgress(
      [
        "vil-01",
        "vil-02",
        "vil-03",
        "vil-04",
        "vil-05",
        "vil-06",
        "vil-07",
        "vil-08",
        "vil-09",
        "vil-10",
      ],
      "vil-mq",
    ),
    "mod-02": getModuleProgress(
      [
        "ags-01",
        "ags-02",
        "ags-03",
        "ags-04",
        "ags-05",
        "ags-06",
        "ags-07",
        "ags-08",
        "ags-09",
        "ags-10",
      ],
      "ags-quiz",
    ),
    "mod-03": getModuleProgress(
      [
        "aut-01",
        "aut-02",
        "aut-03",
        "aut-04",
        "aut-05",
        "aut-06",
        "aut-07",
        "aut-08",
        "aut-09",
        "aut-10",
      ],
      "aut-quiz",
    ),
    "mod-04": getModuleProgress(
      [
        "aec-01",
        "aec-02",
        "aec-03",
        "aec-04",
        "aec-05",
        "aec-06",
        "aec-07",
        "aec-08",
        "aec-09",
        "aec-10",
      ],
      "aec-quiz",
    ),
    "mod-05": getModuleProgress(
      [
        "sov-01",
        "sov-02",
        "sov-03",
        "sov-04",
        "sov-05",
        "sov-06",
        "sov-07",
        "sov-08",
        "sov-09",
        "sov-10",
      ],
      "sov-quiz",
    ),
  }));

  const handleLessonClick = (lesson: LessonContent) =>
    setSelectedLesson(lesson);

  const handleLessonClose = () => {
    setSelectedLesson(null);
    setLessonProgress(getLessonProgress());
    setModule01Complete(detectModule01Completion());
    setModule02Complete(detectModule02Completion());
    setModule03Complete(detectModule03Completion());
    setModule04Complete(detectModule04Completion());
    setModule05Complete(detectModule05Completion());
    setModuleProgress({
      "mod-01": getModuleProgress(
        [
          "vil-01",
          "vil-02",
          "vil-03",
          "vil-04",
          "vil-05",
          "vil-06",
          "vil-07",
          "vil-08",
          "vil-09",
          "vil-10",
        ],
        "vil-mq",
      ),
      "mod-02": getModuleProgress(
        [
          "ags-01",
          "ags-02",
          "ags-03",
          "ags-04",
          "ags-05",
          "ags-06",
          "ags-07",
          "ags-08",
          "ags-09",
          "ags-10",
        ],
        "ags-quiz",
      ),
      "mod-03": getModuleProgress(
        [
          "aut-01",
          "aut-02",
          "aut-03",
          "aut-04",
          "aut-05",
          "aut-06",
          "aut-07",
          "aut-08",
          "aut-09",
          "aut-10",
        ],
        "aut-quiz",
      ),
      "mod-04": getModuleProgress(
        [
          "aec-01",
          "aec-02",
          "aec-03",
          "aec-04",
          "aec-05",
          "aec-06",
          "aec-07",
          "aec-08",
          "aec-09",
          "aec-10",
        ],
        "aec-quiz",
      ),
      "mod-05": getModuleProgress(
        [
          "sov-01",
          "sov-02",
          "sov-03",
          "sov-04",
          "sov-05",
          "sov-06",
          "sov-07",
          "sov-08",
          "sov-09",
          "sov-10",
        ],
        "sov-quiz",
      ),
    });
  };

  // Unlock logic: sequential
  const moduleUnlocked: Record<string, boolean> = {
    "mod-01": true,
    "mod-02": module01Complete,
    "mod-03": module02Complete,
    "mod-04": module03Complete,
    "mod-05": module04Complete,
  };

  // Determine worldId based on active lesson
  const activeWorldId =
    String(selectedLesson?.id ?? "").startsWith("ags-") ||
    selectedLesson?.id === "ags-quiz"
      ? "module-02"
      : String(selectedLesson?.id ?? "").startsWith("aut-") ||
          selectedLesson?.id === "aut-quiz"
        ? "module-03"
        : String(selectedLesson?.id ?? "").startsWith("aec-") ||
            selectedLesson?.id === "aec-quiz"
          ? "module-04"
          : String(selectedLesson?.id ?? "").startsWith("sov-") ||
              selectedLesson?.id === "sov-quiz"
            ? "module-05"
            : "module-01";

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-background to-cyan-950/20 dark:from-violet-950/50 dark:via-background dark:to-cyan-950/30" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container relative py-16 md:py-24">
            {/* Status badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {isUnlocked ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Unlocked via Coherence
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <Lock className="h-3.5 w-3.5" />
                  Requires Coherence
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted/60 text-muted-foreground border border-border/40">
                Post-Coherence Layer
              </span>
              {isDevBypass && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <FlaskConical className="h-3.5 w-3.5" />
                  Testing Unlock Active
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
              Verifiable Intelligence Layer
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              You&apos;ve moved beyond learning. Now you build systems that
              think, verify, and act.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
              <Brain className="h-5 w-5 text-violet-400/60" />
              <div className="h-px flex-1 bg-gradient-to-l from-cyan-500/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="container py-12 md:py-16">
          {isUnlocked ? (
            <div className="space-y-8">
              {/* System Status Header */}
              <SystemStatusHeader
                module01Complete={module01Complete}
                module02Complete={module02Complete}
                module03Complete={module03Complete}
                module04Complete={module04Complete}
                module05Complete={module05Complete}
              />

              {/* Section label */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Modules
                </p>
                <h2 className="text-2xl font-bold text-foreground">
                  Intelligence Modules
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Each module activates a new layer of the system. Execute in
                  sequence.
                </p>
              </div>

              {/* Module cards */}
              <div className="space-y-4">
                {MODULES.map((mod) => {
                  const isAvailable = moduleUnlocked[mod.id] ?? false;
                  const isModule01 = mod.id === "mod-01";
                  const isModule02 = mod.id === "mod-02";
                  const isModule03 = mod.id === "mod-03";
                  const isModule04 = mod.id === "mod-04";
                  const isModule05 = mod.id === "mod-05";
                  const prog =
                    moduleProgress[
                      mod.id as
                        | "mod-01"
                        | "mod-02"
                        | "mod-03"
                        | "mod-04"
                        | "mod-05"
                    ];

                  return (
                    <div
                      key={mod.id}
                      data-ocid={`intelligence.${mod.id}.card`}
                      className={`relative rounded-2xl border overflow-hidden transition-all ${
                        isAvailable
                          ? "border-violet-500/30 bg-card shadow-lg shadow-violet-500/5"
                          : "border-border/30 bg-card/50 opacity-60"
                      }`}
                    >
                      {/* Top accent line — only for available */}
                      {isAvailable && (
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />
                      )}

                      <div className="p-6 md:p-8">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div className="flex-1 min-w-0">
                            {/* Module number chip */}
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-widest border ${
                                  isAvailable
                                    ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                                    : "bg-muted/40 text-muted-foreground/60 border-border/30"
                                }`}
                              >
                                {mod.number}
                              </span>
                              {!isAvailable && (
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/50 font-mono">
                                  <Lock className="h-3 w-3" />
                                  Locked
                                </span>
                              )}
                              {isAvailable && (
                                <span className="inline-flex items-center gap-1 text-xs text-emerald-400/80 font-mono">
                                  <StatusDot status="active" />
                                  Available
                                </span>
                              )}
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-1.5">
                              {mod.title}
                            </h3>
                            <p className="text-muted-foreground text-sm max-w-lg">
                              {mod.subtitle}
                            </p>

                            {/* Lesson metadata */}
                            <div className="flex items-center gap-3 mt-4">
                              <span className="text-xs text-muted-foreground font-mono">
                                10 lessons
                              </span>
                              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                              <span className="text-xs text-muted-foreground font-mono">
                                1 Mega Quiz
                              </span>
                            </div>

                            {/* BP / Lessons / Mega Quiz totals row */}
                            {isAvailable &&
                              mod.lessonIds.length > 0 &&
                              prog && (
                                <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-border/20">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-mono text-muted-foreground/60">
                                      BP
                                    </span>
                                    <span
                                      className={`text-xs font-mono font-semibold ${prog.bpEarned > 0 ? "text-violet-400" : "text-muted-foreground/50"}`}
                                    >
                                      {prog.bpEarned}
                                    </span>
                                    <span className="text-xs font-mono text-muted-foreground/40">
                                      / 140
                                    </span>
                                  </div>
                                  <span className="w-px h-3 bg-border/40" />
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-mono text-muted-foreground/60">
                                      Lessons
                                    </span>
                                    <span
                                      className={`text-xs font-mono font-semibold ${prog.lessonsAttempted > 0 ? "text-foreground" : "text-muted-foreground/50"}`}
                                    >
                                      {prog.lessonsAttempted}
                                    </span>
                                    <span className="text-xs font-mono text-muted-foreground/40">
                                      / 10
                                    </span>
                                  </div>
                                  <span className="w-px h-3 bg-border/40" />
                                  <div className="flex items-center gap-1.5">
                                    {prog.megaQuizComplete ? (
                                      <>
                                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                                        <span className="text-xs font-mono text-emerald-400">
                                          Mega Quiz Complete
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="text-xs font-mono text-muted-foreground/50">
                                          Mega Quiz
                                        </span>
                                        <span className="text-xs font-mono text-muted-foreground/40">
                                          Incomplete
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* CTA button */}
                          <button
                            type="button"
                            data-ocid={`intelligence.${mod.id}.button`}
                            disabled={!isAvailable}
                            onClick={() => {
                              if (isModule01 && isAvailable)
                                setModuleExpanded((v) => !v);
                              if (isModule02 && isAvailable)
                                setModule02Expanded((v) => !v);
                              if (isModule03 && isAvailable)
                                setModule03Expanded((v) => !v);
                              if (isModule04 && isAvailable)
                                setModule04Expanded((v) => !v);
                              if (isModule05 && isAvailable)
                                setModule05Expanded((v) => !v);
                            }}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-md shrink-0 ${
                              isAvailable
                                ? "bg-violet-600 hover:bg-violet-500 text-white cursor-pointer"
                                : "bg-muted/40 text-muted-foreground/50 cursor-not-allowed border border-border/30"
                            }`}
                          >
                            {!isAvailable && <Lock className="h-3.5 w-3.5" />}
                            {isModule01 && isAvailable
                              ? moduleExpanded
                                ? "Close Module"
                                : mod.cta
                              : isModule02 && isAvailable
                                ? module02Expanded
                                  ? "Close Module"
                                  : mod.cta
                                : isModule03 && isAvailable
                                  ? module03Expanded
                                    ? "Close Module"
                                    : mod.cta
                                  : isModule04 && isAvailable
                                    ? module04Expanded
                                      ? "Close Module"
                                      : mod.cta
                                    : isModule05 && isAvailable
                                      ? module05Expanded
                                        ? "Close Module"
                                        : mod.cta
                                      : mod.cta}
                            {isAvailable && (
                              <ChevronRight
                                className={`h-4 w-4 transition-transform ${
                                  (isModule01 && moduleExpanded) ||
                                  (isModule02 && module02Expanded) ||
                                  (isModule03 && module03Expanded) ||
                                  (isModule04 && module04Expanded) ||
                                  (isModule05 && module05Expanded)
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            )}
                          </button>
                        </div>

                        {/* Expanded lesson list — Module 01 */}
                        {isModule01 && moduleExpanded && (
                          <div className="mt-8 border-t border-border/40 pt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 font-mono">
                              Execute — select a lesson to begin
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {module01LessonsEN.map((lesson, idx) => {
                                const Icon =
                                  LESSON_ICONS[String(lesson.id)] ?? Brain;
                                const rowState = getLessonRowState(
                                  String(lesson.id),
                                  lessonProgress,
                                );
                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    data-ocid={`intelligence.lesson.item.${idx + 1}`}
                                    onClick={() => handleLessonClick(lesson)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors text-left group cursor-pointer ${lessonRowClasses(rowState)}`}
                                  >
                                    <div
                                      className={`flex items-center justify-center h-7 w-7 rounded-md shrink-0 transition-colors ${lessonIconClasses(rowState)}`}
                                    >
                                      <Icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`text-xs font-mono ${lessonNumberClasses(rowState)}`}
                                      >
                                        {String(idx + 1).padStart(2, "0")}
                                      </p>
                                      <p className="text-sm font-medium text-foreground truncate">
                                        {lesson.title}
                                      </p>
                                    </div>
                                    <LessonRowBadge state={rowState} />
                                  </button>
                                );
                              })}
                            </div>

                            {/* Mega Quiz — Module 01 */}
                            {(() => {
                              const mqState = getLessonRowState(
                                "vil-mq",
                                lessonProgress,
                              );
                              const mqDone =
                                mqState === "completed" ||
                                mqState === "attempted";
                              return (
                                <button
                                  type="button"
                                  data-ocid="intelligence.mega_quiz.button"
                                  onClick={() =>
                                    handleLessonClick(module01MegaQuizEN)
                                  }
                                  className="mt-3 w-full flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors text-left group cursor-pointer"
                                >
                                  <div className="flex items-center justify-center h-7 w-7 rounded-md bg-amber-500/10 text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                                    <Users className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs text-amber-400/70 font-mono">
                                      Quiz
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                      {module01MegaQuizEN.title}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    {mqDone ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="h-3 w-3" />{" "}
                                        Complete
                                      </span>
                                    ) : (
                                      <>
                                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide font-mono">
                                          Mega
                                        </span>
                                        <Star className="h-3.5 w-3.5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                                      </>
                                    )}
                                  </div>
                                </button>
                              );
                            })()}

                            {/* Deploy First Agent — shown only when Module 01 complete */}
                            {module01Complete && <DeployAgentPanel />}
                          </div>
                        )}

                        {/* Expanded lesson list — Module 02 */}
                        {isModule02 && module02Expanded && (
                          <div className="mt-8 border-t border-border/40 pt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 font-mono">
                              Activate — select a lesson to begin
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {module02LessonsEN.map((lesson, idx) => {
                                const Icon =
                                  LESSON_ICONS[String(lesson.id)] ?? Bot;
                                const rowState = getLessonRowState(
                                  String(lesson.id),
                                  lessonProgress,
                                );
                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    data-ocid={`intelligence.m02.lesson.item.${idx + 1}`}
                                    onClick={() => handleLessonClick(lesson)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors text-left group cursor-pointer ${lessonRowClasses(rowState)}`}
                                  >
                                    <div
                                      className={`flex items-center justify-center h-7 w-7 rounded-md shrink-0 transition-colors ${lessonIconClasses(rowState)}`}
                                    >
                                      <Icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`text-xs font-mono ${lessonNumberClasses(rowState)}`}
                                      >
                                        {String(idx + 1).padStart(2, "0")}
                                      </p>
                                      <p className="text-sm font-medium text-foreground truncate">
                                        {lesson.title}
                                      </p>
                                    </div>
                                    <LessonRowBadge state={rowState} />
                                  </button>
                                );
                              })}
                            </div>

                            {/* Mega Quiz — Module 02 */}
                            {(() => {
                              const mqState = getLessonRowState(
                                "ags-quiz",
                                lessonProgress,
                              );
                              const mqDone =
                                mqState === "completed" ||
                                mqState === "attempted";
                              return (
                                <button
                                  type="button"
                                  data-ocid="intelligence.m02.mega_quiz.button"
                                  onClick={() =>
                                    handleLessonClick(module02MegaQuizEN)
                                  }
                                  className="mt-3 w-full flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors text-left group cursor-pointer"
                                >
                                  <div className="flex items-center justify-center h-7 w-7 rounded-md bg-amber-500/10 text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                                    <Users className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs text-amber-400/70 font-mono">
                                      Quiz
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                      {module02MegaQuizEN.title}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    {mqDone ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="h-3 w-3" />{" "}
                                        Complete
                                      </span>
                                    ) : (
                                      <>
                                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide font-mono">
                                          Mega
                                        </span>
                                        <Star className="h-3.5 w-3.5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                                      </>
                                    )}
                                  </div>
                                </button>
                              );
                            })()}
                          </div>
                        )}

                        {/* Expanded lesson list — Module 03 */}
                        {isModule03 && module03Expanded && (
                          <div className="mt-8 border-t border-border/40 pt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 font-mono">
                              Activate — select a lesson to begin
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {module03LessonsEN.map((lesson, idx) => {
                                const Icon =
                                  LESSON_ICONS[String(lesson.id)] ?? Cpu;
                                const rowState = getLessonRowState(
                                  String(lesson.id),
                                  lessonProgress,
                                );
                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    data-ocid={`intelligence.m03.lesson.item.${idx + 1}`}
                                    onClick={() => handleLessonClick(lesson)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors text-left group cursor-pointer ${lessonRowClasses(rowState)}`}
                                  >
                                    <div
                                      className={`flex items-center justify-center h-7 w-7 rounded-md shrink-0 transition-colors ${lessonIconClasses(rowState)}`}
                                    >
                                      <Icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`text-xs font-mono ${lessonNumberClasses(rowState)}`}
                                      >
                                        {String(idx + 1).padStart(2, "0")}
                                      </p>
                                      <p className="text-sm font-medium text-foreground truncate">
                                        {lesson.title}
                                      </p>
                                    </div>
                                    <LessonRowBadge state={rowState} />
                                  </button>
                                );
                              })}
                            </div>

                            {/* Mega Quiz — Module 03 */}
                            {(() => {
                              const mqState = getLessonRowState(
                                "aut-quiz",
                                lessonProgress,
                              );
                              const mqDone =
                                mqState === "completed" ||
                                mqState === "attempted";
                              return (
                                <button
                                  type="button"
                                  data-ocid="intelligence.m03.mega_quiz.button"
                                  onClick={() =>
                                    handleLessonClick(module03MegaQuizEN)
                                  }
                                  className="mt-3 w-full flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors text-left group cursor-pointer"
                                >
                                  <div className="flex items-center justify-center h-7 w-7 rounded-md bg-amber-500/10 text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                                    <Activity className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs text-amber-400/70 font-mono">
                                      Quiz
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                      {module03MegaQuizEN.title}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    {mqDone ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="h-3 w-3" />{" "}
                                        Complete
                                      </span>
                                    ) : (
                                      <>
                                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide font-mono">
                                          Mega
                                        </span>
                                        <Star className="h-3.5 w-3.5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                                      </>
                                    )}
                                  </div>
                                </button>
                              );
                            })()}
                          </div>
                        )}

                        {/* Expanded lesson list — Module 04 */}
                        {isModule04 && module04Expanded && (
                          <div className="mt-8 border-t border-border/40 pt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 font-mono">
                              Transact — select a lesson to begin
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {module04LessonsEN.map((lesson, idx) => {
                                const Icon =
                                  LESSON_ICONS[String(lesson.id)] ?? Globe;
                                const rowState = getLessonRowState(
                                  String(lesson.id),
                                  lessonProgress,
                                );
                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    data-ocid={`intelligence.m04.lesson.item.${idx + 1}`}
                                    onClick={() => handleLessonClick(lesson)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors text-left group cursor-pointer ${lessonRowClasses(rowState)}`}
                                  >
                                    <div
                                      className={`flex items-center justify-center h-7 w-7 rounded-md shrink-0 transition-colors ${lessonIconClasses(rowState)}`}
                                    >
                                      <Icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`text-xs font-mono ${lessonNumberClasses(rowState)}`}
                                      >
                                        {String(idx + 1).padStart(2, "0")}
                                      </p>
                                      <p className="text-sm font-medium text-foreground truncate">
                                        {lesson.title}
                                      </p>
                                    </div>
                                    <LessonRowBadge state={rowState} />
                                  </button>
                                );
                              })}
                            </div>

                            {/* Mega Quiz — Module 04 */}
                            {(() => {
                              const mqState = getLessonRowState(
                                "aec-quiz",
                                lessonProgress,
                              );
                              const mqDone =
                                mqState === "completed" ||
                                mqState === "attempted";
                              return (
                                <button
                                  type="button"
                                  data-ocid="intelligence.m04.mega_quiz.button"
                                  onClick={() =>
                                    handleLessonClick(module04MegaQuizEN)
                                  }
                                  className="mt-3 w-full flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors text-left group cursor-pointer"
                                >
                                  <div className="flex items-center justify-center h-7 w-7 rounded-md bg-amber-500/10 text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                                    <BarChart3 className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs text-amber-400/70 font-mono">
                                      Quiz
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                      {module04MegaQuizEN.title}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    {mqDone ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="h-3 w-3" />{" "}
                                        Complete
                                      </span>
                                    ) : (
                                      <>
                                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide font-mono">
                                          Mega
                                        </span>
                                        <Star className="h-3.5 w-3.5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                                      </>
                                    )}
                                  </div>
                                </button>
                              );
                            })()}
                          </div>
                        )}

                        {/* Expanded lesson list — Module 05 */}
                        {isModule05 && module05Expanded && (
                          <div className="mt-8 border-t border-border/40 pt-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 font-mono">
                              Govern — select a lesson to begin
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {module05LessonsEN.map((lesson, idx) => {
                                const Icon =
                                  LESSON_ICONS[String(lesson.id)] ?? Globe;
                                const rowState = getLessonRowState(
                                  String(lesson.id),
                                  lessonProgress,
                                );
                                return (
                                  <button
                                    key={lesson.id}
                                    type="button"
                                    data-ocid={`intelligence.m05.lesson.item.${idx + 1}`}
                                    onClick={() => handleLessonClick(lesson)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors text-left group cursor-pointer ${lessonRowClasses(rowState)}`}
                                  >
                                    <div
                                      className={`flex items-center justify-center h-7 w-7 rounded-md shrink-0 transition-colors ${lessonIconClasses(rowState)}`}
                                    >
                                      <Icon className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p
                                        className={`text-xs font-mono ${lessonNumberClasses(rowState)}`}
                                      >
                                        {String(idx + 1).padStart(2, "0")}
                                      </p>
                                      <p className="text-sm font-medium text-foreground truncate">
                                        {lesson.title}
                                      </p>
                                    </div>
                                    <LessonRowBadge state={rowState} />
                                  </button>
                                );
                              })}
                            </div>

                            {/* Mega Quiz — Module 05 */}
                            {(() => {
                              const mqState = getLessonRowState(
                                "sov-quiz",
                                lessonProgress,
                              );
                              const mqDone =
                                mqState === "completed" ||
                                mqState === "attempted";
                              return (
                                <button
                                  type="button"
                                  data-ocid="intelligence.m05.mega_quiz.button"
                                  onClick={() =>
                                    handleLessonClick(module05MegaQuizEN)
                                  }
                                  className="mt-3 w-full flex items-center gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors text-left group cursor-pointer"
                                >
                                  <div className="flex items-center justify-center h-7 w-7 rounded-md bg-amber-500/10 text-amber-400 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                                    <BarChart3 className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs text-amber-400/70 font-mono">
                                      Quiz
                                    </p>
                                    <p className="text-sm font-semibold text-foreground">
                                      {module05MegaQuizEN.title}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0">
                                    {mqDone ? (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-wide px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                                        <CheckCircle2 className="h-3 w-3" />{" "}
                                        Complete
                                      </span>
                                    ) : (
                                      <>
                                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide font-mono">
                                          Mega
                                        </span>
                                        <Star className="h-3.5 w-3.5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                                      </>
                                    )}
                                  </div>
                                </button>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Locked state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="relative mb-6">
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-violet-500/10 border border-violet-500/20">
                  <Lock className="h-8 w-8 text-violet-400" />
                </div>
                <div className="absolute inset-0 rounded-2xl blur-xl bg-violet-500/10" />
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-3">
                Coherence is required to access this layer.
              </h2>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                Complete World 8: Coherence or discover all three Coherence Keys
                in ICP Decode to unlock the Verifiable Intelligence Layer.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="/courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors"
                >
                  <Brain className="h-4 w-4" />
                  Go to World 8
                </a>
                <a
                  href="/hangman"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold transition-colors border border-border/40"
                >
                  <Zap className="h-4 w-4" />
                  Play ICP Decode
                </a>
              </div>

              <div className="mt-10 flex items-center gap-3 text-xs text-muted-foreground/50">
                <span className="font-mono tracking-widest">IDENTITY</span>
                <span>·</span>
                <span className="font-mono tracking-widest">CONSENSUS</span>
                <span>·</span>
                <span className="font-mono tracking-widest">COMPUTE</span>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Lesson Modal */}
      {selectedLesson && (
        <IntelligenceLessonModal
          lesson={selectedLesson}
          worldId={activeWorldId}
          onClose={handleLessonClose}
        />
      )}
    </>
  );
}
