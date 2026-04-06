import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  GitBranch,
  Info,
  Plus,
  Shield,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const _ADMIN_PRINCIPALS = [
  "3ye7w-6s7gq-k4dpo-icdhj-r7ye2-afylq-eofxv-7p6zw-e7nsd-23fi5-pqe",
  "mqrud-rxoxo-nbepq-sktaj-q76k5-r67zx-4wcgo-rhqmv-5mwys-3dl7s-zae",
];

type MissionStatus = "draft" | "pending_approval" | "open" | "closed";
type MissionPhase = "entry" | "shortlist" | "finalist" | "winner_selected";
type MissionDifficulty = "Beginner" | "Intermediate" | "Advanced";
type PayoutStatus = "pending" | "awarded" | "paid";

interface Mission {
  id: string;
  title: string;
  company: string;
  shortDescription: string;
  fullDescription: string;
  successCriteria: string;
  bounty: number;
  category: string;
  difficulty: MissionDifficulty;
  submissionCount: number;
  deadline: string;
  status: MissionStatus;
  submissionInstructions: string;
  phase: MissionPhase;
  rewardStructure: string;
  payoutStatus: PayoutStatus;
}

const SEED_MISSIONS: Mission[] = [
  {
    id: "mission-001",
    title: "Build a Web3 Onboarding Flow",
    company: "ChainForge Labs",
    shortDescription:
      "Create a frictionless onboarding experience that guides new users from wallet setup to their first on-chain transaction in under 5 steps.",
    fullDescription:
      "ChainForge Labs needs a polished Web3 onboarding flow built with Caffeine.ai. The solution must handle wallet detection, identity creation via Internet Identity, and guide the user through their first real interaction with an ICP canister. The flow should be mobile-first, use progressive disclosure, and include clear error recovery paths.",
    successCriteria:
      "Complete working prototype deployed on ICP. User can go from zero to first canister interaction in under 5 minutes. Tested on both desktop and mobile. Includes loading states and error handling.",
    bounty: 500,
    category: "UI/UX",
    difficulty: "Intermediate",
    submissionCount: 4,
    deadline: "2025-06-15",
    status: "open",
    submissionInstructions:
      "Submit a Caffeine.ai project link with a working demo. Include a short video walkthrough (max 2 minutes). Judges will test on mobile and desktop.",
    phase: "entry",
    rewardStructure: "Winner: $500",
    payoutStatus: "pending",
  },
  {
    id: "mission-002",
    title: "Create an ICP Glossary Quiz App",
    company: "DevDAO Network",
    shortDescription:
      "Build an interactive quiz app covering 50+ ICP and Web3 terms. Users should score, learn, and share results.",
    fullDescription:
      "DevDAO Network wants a standalone quiz application covering the Internet Computer Protocol ecosystem. The app must include at least 50 questions across 5 categories (Architecture, Tokens, DeFi, Governance, Security), show explanations after each answer, maintain a local score, and include a shareable results card.",
    successCriteria:
      "50+ questions across 5 categories. Score tracking. Explanation shown after each answer. Shareable results card with score summary. Clean, engaging UI.",
    bounty: 800,
    category: "Education",
    difficulty: "Beginner",
    submissionCount: 7,
    deadline: "2025-05-30",
    status: "open",
    submissionInstructions:
      "Deploy via Caffeine.ai and submit the live URL. Include a screenshot of the results card. Must be playable without login.",
    phase: "shortlist",
    rewardStructure: "Winner: $600 · Top Submission: $200",
    payoutStatus: "pending",
  },
  {
    id: "mission-003",
    title: "Design a DAO Voting Dashboard",
    company: "NeuronStack",
    shortDescription:
      "Build a governance dashboard that visualizes neuron activity, active proposals, and voting history for ICP Network Nervous System.",
    fullDescription:
      "NeuronStack requires a comprehensive DAO voting dashboard for the Internet Computer's Network Nervous System. The dashboard must display active proposals with voting status, neuron voting power visualization, historical voting trends, and allow simulated vote submission. Data can be mocked but must be structurally accurate to real NNS proposal shapes.",
    successCriteria:
      "Active proposals list with filtering. Neuron voting power chart. Historical vote timeline. Simulated vote action with confirmation. Responsive layout.",
    bounty: 1500,
    category: "Governance",
    difficulty: "Advanced",
    submissionCount: 3,
    deadline: "2025-07-01",
    status: "open",
    submissionInstructions:
      "Submit Caffeine.ai project URL with README explaining data model choices. Judges will review code architecture and UI quality equally.",
    phase: "finalist",
    rewardStructure: "Winner: $1,000 · Finalist 1: $300 · Finalist 2: $200",
    payoutStatus: "pending",
  },
  {
    id: "mission-004",
    title: "Build a Token Swap Interface",
    company: "AxiomDEX",
    shortDescription:
      "Create a DEX swap interface prototype with token selection, price simulation, slippage controls, and transaction confirmation flow.",
    fullDescription:
      "AxiomDEX is building the next generation decentralized exchange on ICP and needs a polished swap interface prototype. The UI must include token pair selection from a predefined list, simulated price quotes with price impact calculation, adjustable slippage tolerance, and a multi-step transaction confirmation modal. Full backend integration is not required — mocked data is acceptable.",
    successCriteria:
      "Token pair selector with search. Simulated swap quote with price impact. Slippage tolerance control. Confirmation modal with summary. Transaction success/failure states.",
    bounty: 1200,
    category: "DeFi",
    difficulty: "Advanced",
    submissionCount: 9,
    deadline: "2025-05-10",
    status: "open",
    submissionInstructions:
      "Submit working Caffeine.ai prototype. Must include at least 5 token pairs. Judge focus: UX clarity and error state handling.",
    phase: "finalist",
    rewardStructure: "Winner: $900 · Runner-up: $300",
    payoutStatus: "pending",
  },
  {
    id: "mission-005",
    title: "Create a NFT Minting Tool",
    company: "PixelVault ICP",
    shortDescription:
      "Build a drag-and-drop NFT minting tool that lets creators upload artwork, set metadata, and generate a shareable mint page.",
    fullDescription:
      "PixelVault ICP needs a creator-friendly NFT minting tool. The solution must allow image upload (with preview), metadata entry (name, description, traits), collection grouping, and generate a shareable mint preview page. Actual on-chain minting is optional — the focus is on the creator experience and metadata structure.",
    successCriteria:
      "Image upload with preview. Metadata form (name, description, 3+ traits). Collection grouping. Shareable mint preview page. Export metadata as JSON.",
    bounty: 600,
    category: "NFT",
    difficulty: "Intermediate",
    submissionCount: 5,
    deadline: "2025-06-20",
    status: "open",
    submissionInstructions:
      "Submit Caffeine.ai project link. Must demonstrate full flow from upload to preview page. Include example NFT with at least 3 traits.",
    phase: "entry",
    rewardStructure: "Winner: $600",
    payoutStatus: "pending",
  },
  {
    id: "mission-006",
    title: "Deploy a Canister Status Monitor",
    company: "ICP Ops Guild",
    shortDescription:
      "Build a monitoring dashboard that tracks canister cycles, memory usage, and uptime for a fleet of ICP canisters.",
    fullDescription:
      "ICP Ops Guild needs a canister monitoring dashboard for DevOps teams. The tool should display per-canister metrics (cycles balance, memory usage, compute allocation, uptime status), support manual canister ID entry, show trend indicators, and send in-app alerts when cycles fall below a threshold. Data can be simulated for demo purposes.",
    successCriteria:
      "Dashboard showing 5+ simulated canisters. Cycles balance with trend. Memory usage bar. Alert threshold configuration. Responsive table and card views.",
    bounty: 400,
    category: "DevOps",
    difficulty: "Beginner",
    submissionCount: 2,
    deadline: "2025-04-20",
    status: "closed",
    submissionInstructions:
      "Submit Caffeine.ai project URL. Must show at least 5 simulated canisters with different health states. Winner announced 2 weeks after close.",
    phase: "winner_selected",
    rewardStructure: "Winner: $400 (awarded)",
    payoutStatus: "paid",
  },
];

function formatDeadline(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTimeRemaining(dateStr: string): string {
  const now = new Date();
  const deadline = new Date(dateStr);
  const diff = deadline.getTime() - now.getTime();
  if (diff <= 0) return "Closed";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Last day";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

function StatusBadge({ status }: { status: MissionStatus }) {
  if (status === "open") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Open
      </span>
    );
  }
  if (status === "pending_approval") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        Pending Review
      </span>
    );
  }
  if (status === "draft") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
        Draft
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
      Closed
    </span>
  );
}

function PhaseBadge({ phase }: { phase: MissionPhase }) {
  const config: Record<MissionPhase, { label: string; className: string }> = {
    entry: {
      label: "Entry",
      className: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    },
    shortlist: {
      label: "Shortlist",
      className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    },
    finalist: {
      label: "Finalist",
      className: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    },
    winner_selected: {
      label: "Winner Selected",
      className:
        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    },
  };
  const { label, className } = config[phase];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${className}`}
    >
      <GitBranch className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

function PayoutBadge({ status }: { status: PayoutStatus }) {
  if (status === "awarded") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Award className="h-2.5 w-2.5" />
        Awarded
      </span>
    );
  }
  if (status === "paid") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle className="h-2.5 w-2.5" />
        Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
      <Clock className="h-2.5 w-2.5" />
      Payout Pending
    </span>
  );
}

function DifficultyDot({ difficulty }: { difficulty: MissionDifficulty }) {
  const colors: Record<MissionDifficulty, string> = {
    Beginner: "text-emerald-400",
    Intermediate: "text-amber-400",
    Advanced: "text-red-400",
  };
  return (
    <span className={`text-xs font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
}

function PhaseStepperDisplay({ phase }: { phase: MissionPhase }) {
  const steps: { key: MissionPhase; label: string }[] = [
    { key: "entry", label: "Entry" },
    { key: "shortlist", label: "Shortlist" },
    { key: "finalist", label: "Finalist" },
    { key: "winner_selected", label: "Winner" },
  ];
  const currentIndex = steps.findIndex((s) => s.key === phase);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {steps.map((step, idx) => (
        <div key={step.key} className="flex items-center gap-1">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              idx === currentIndex
                ? "bg-primary/15 text-primary border border-primary/30"
                : idx < currentIndex
                  ? "bg-muted/60 text-muted-foreground border border-border/40 line-through opacity-60"
                  : "bg-muted/30 text-muted-foreground/50 border border-border/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                idx === currentIndex
                  ? "bg-primary"
                  : idx < currentIndex
                    ? "bg-muted-foreground/40"
                    : "bg-muted-foreground/20"
              }`}
            />
            {step.label}
          </div>
          {idx < steps.length - 1 && (
            <ChevronRight className="h-3 w-3 text-muted-foreground/30 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

function PhaseExplanation({ phase }: { phase: MissionPhase }) {
  const explanations: Record<MissionPhase, string> = {
    entry:
      "Submit your concept or approach. A solution link is optional at this stage.",
    shortlist:
      "Selected participants are submitting improved versions. Include a progress summary and updated link.",
    finalist:
      "Top solutions are being refined. Finalists submit their best updated build.",
    winner_selected: "A winner has been selected. See payout status below.",
  };
  return (
    <p className="text-sm text-muted-foreground leading-relaxed">
      {explanations[phase]}
    </p>
  );
}

function MissionCard({
  mission,
  onClick,
}: {
  mission: Mission;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left bg-card border border-border/50 rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 cursor-pointer flex flex-col gap-3"
    >
      {/* Top row: status + category */}
      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={mission.status} />
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
          {mission.category}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
          {mission.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 font-medium">
          {mission.company}
        </p>
      </div>

      {/* Short description */}
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {mission.shortDescription}
      </p>

      {/* Phase + reward row */}
      <div className="flex items-center gap-2 flex-wrap">
        <PhaseBadge phase={mission.phase} />
        <span className="text-xs font-semibold text-amber-400">
          {mission.rewardStructure.split("·")[0].trim()}
        </span>
        {mission.status === "closed" && (
          <PayoutBadge status={mission.payoutStatus} />
        )}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="flex items-center gap-1 text-sm font-bold text-amber-400">
          <DollarSign className="h-3.5 w-3.5" />
          {mission.bounty.toLocaleString()}
        </span>
        <span className="text-muted-foreground/40 text-xs">•</span>
        <DifficultyDot difficulty={mission.difficulty} />
        <span className="text-muted-foreground/40 text-xs">•</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          {mission.submissionCount} submission
          {mission.submissionCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Deadline */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {mission.status === "closed"
            ? `Closed ${formatDeadline(mission.deadline)}`
            : `${getTimeRemaining(mission.deadline)} · ${formatDeadline(mission.deadline)}`}
        </span>
        <span className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          View Mission <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

export default function MissionsPage() {
  const isMissionsAdmin =
    typeof window !== "undefined" && window.location.search.includes("admin=1");

  const [missions, setMissions] = useState<Mission[]>(SEED_MISSIONS);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [postFormData, setPostFormData] = useState({
    title: "",
    company: "",
    description: "",
    outcome: "",
    bounty: "",
    deadline: "",
    email: "",
    rewardStructure: "",
  });
  const [submitFormData, setSubmitFormData] = useState({
    name: "",
    link: "",
    explanation: "",
    progressSummary: "",
    whatChanged: "",
  });
  const [postSuccess, setPostSuccess] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"open" | "closed" | "All">(
    "All",
  );
  const [submittingFor, setSubmittingFor] = useState<Mission | null>(null);

  const feedRef = useRef<HTMLDivElement>(null);

  // Only public missions
  const publicMissions = missions.filter(
    (m) => m.status === "open" || m.status === "closed",
  );

  const filteredMissions =
    filterStatus === "All"
      ? publicMissions
      : publicMissions.filter((m) => m.status === filterStatus);

  const totalBounty = publicMissions
    .filter((m) => m.status !== "closed")
    .reduce((sum, m) => sum + m.bounty, 0);

  const totalSubmissions = publicMissions.reduce(
    (sum, m) => sum + m.submissionCount,
    0,
  );

  // Pending approval missions (admin only)
  const pendingMissions = missions.filter(
    (m) => m.status === "pending_approval",
  );

  function scrollToFeed() {
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleApproveMission(id: string) {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "open" as const } : m)),
    );
  }

  function handlePostSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newMission: Mission = {
      id: `mission-${Date.now()}`,
      title: postFormData.title,
      company: postFormData.company,
      shortDescription: postFormData.description,
      fullDescription: postFormData.description,
      successCriteria: postFormData.outcome,
      bounty: Number(postFormData.bounty) || 0,
      category: "General",
      difficulty: "Intermediate",
      submissionCount: 0,
      deadline: postFormData.deadline,
      status: "pending_approval",
      submissionInstructions:
        "Submit your solution link and a short explanation of your approach.",
      phase: "entry",
      rewardStructure: postFormData.rewardStructure || "Winner: TBD",
      payoutStatus: "pending",
    };
    setMissions((prev) => [newMission, ...prev]);
    setPostSuccess(true);
    setTimeout(() => {
      setShowPostForm(false);
      setPostSuccess(false);
      setPostFormData({
        title: "",
        company: "",
        description: "",
        outcome: "",
        bounty: "",
        deadline: "",
        email: "",
        rewardStructure: "",
      });
    }, 2000);
  }

  function handleSubmitEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!submittingFor) return;
    setMissions((prev) =>
      prev.map((m) =>
        m.id === submittingFor.id
          ? { ...m, submissionCount: m.submissionCount + 1 }
          : m,
      ),
    );
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowSubmitForm(false);
      setSubmitSuccess(false);
      setSubmitFormData({
        name: "",
        link: "",
        explanation: "",
        progressSummary: "",
        whatChanged: "",
      });
      setSubmittingFor(null);
    }, 2000);
  }

  function openSubmitModal(mission: Mission) {
    setSelectedMission(null);
    setSubmittingFor(mission);
    setShowSubmitForm(true);
  }

  // sync selectedMission with any bounty updates
  useEffect(() => {
    if (selectedMission) {
      const updated = missions.find((m) => m.id === selectedMission.id);
      if (updated) setSelectedMission(updated);
    }
  }, [missions, selectedMission]);

  const submitFormTitle = submittingFor
    ? submittingFor.phase === "entry"
      ? "Submit Your Concept"
      : submittingFor.phase === "shortlist"
        ? "Submit Shortlist Update"
        : submittingFor.phase === "finalist"
          ? "Submit Finalist Build"
          : "Submissions Closed"
    : "Submit Solution";

  const isEntryPhase = submittingFor?.phase === "entry";
  const isAdvancedPhase =
    submittingFor?.phase === "shortlist" || submittingFor?.phase === "finalist";
  const isWinnerSelected = submittingFor?.phase === "winner_selected";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        data-ocid="missions.section"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/8 via-transparent to-transparent" />
        {/* Accent glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="container relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase">
              <Zap className="h-3 w-3" />
              ChainKey Missions — Live Marketplace
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-6">
            Solve real problems.
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Get paid.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Businesses post challenges. Builders create solutions.
            <br className="hidden md:block" />
            Best submissions win the bounty.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 gap-2 shadow-lg shadow-amber-500/20"
              onClick={() => setShowPostForm(true)}
              data-ocid="missions.primary_button"
            >
              <Plus className="h-4 w-4" />
              Post a Problem
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 hover:border-primary/50 gap-2"
              onClick={scrollToFeed}
              data-ocid="missions.secondary_button"
            >
              <Target className="h-4 w-4" />
              Browse Missions
            </Button>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="border-y border-border/40 bg-card/50">
        <div className="container py-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {publicMissions.length}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                Total Missions
              </p>
            </div>
            <div className="text-center border-x border-border/40">
              <p className="text-3xl md:text-4xl font-bold text-amber-400">
                ${totalBounty.toLocaleString()}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                Bounty Available
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {totalSubmissions}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                Total Submissions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ADMIN: PENDING REVIEW SECTION ──────────────────────────────────── */}
      {isMissionsAdmin && pendingMissions.length > 0 && (
        <section className="container py-8">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Admin — Pending Review ({pendingMissions.length})
              </h2>
            </div>
            <div className="space-y-3">
              {pendingMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="flex items-center justify-between gap-4 p-4 bg-background/60 rounded-lg border border-indigo-500/20"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate">
                      {mission.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mission.company} · ${mission.bounty.toLocaleString()} ·{" "}
                      {mission.rewardStructure}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={mission.status} />
                    <Button
                      size="sm"
                      className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs h-7 px-3"
                      onClick={() => handleApproveMission(mission.id)}
                      data-ocid="missions.confirm_button"
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── MISSIONS FEED ──────────────────────────────────────────────────── */}
      <section
        id="missions-feed"
        ref={feedRef}
        className="container py-16 md:py-20"
      >
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Open Missions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredMissions.length} mission
              {filteredMissions.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Filter tabs */}
          <div
            className="flex gap-1 p-1 bg-muted/50 rounded-lg border border-border/40"
            data-ocid="missions.filter.tab"
          >
            {(["All", "open", "closed"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize ${
                  filterStatus === status
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {status === "open"
                  ? "Open"
                  : status === "closed"
                    ? "Closed"
                    : "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Mission grid */}
        {filteredMissions.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="missions.empty_state"
          >
            <Target className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No missions match this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMissions.map((mission, idx) => (
              <div key={mission.id} data-ocid={`missions.item.${idx + 1}`}>
                <MissionCard
                  mission={mission}
                  onClick={() => setSelectedMission(mission)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="bg-muted/20 border-y border-border/40 py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How ChainKey Missions Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-2xl">
                🎯
              </div>
              <h3 className="font-bold text-base">
                Businesses post real problems
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Companies and organizations define their challenge, set a bounty
                budget, and specify success criteria.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-2xl">
                🔨
              </div>
              <h3 className="font-bold text-base">Builders create solutions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Developers, designers, and prompters browse open missions and
                build solutions using Caffeine.ai.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-2xl">
                🏆
              </div>
              <h3 className="font-bold text-base">Best solution wins</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Missions are evaluated on quality and fit. Best submission wins
                the full bounty. Payment on delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST / EXPLANATION ────────────────────────────────────────────── */}
      <section className="container py-16 md:py-20">
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-primary/5" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">
              &ldquo;This is not hiring. This is outcome-based problem
              solving.&rdquo;
            </p>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Businesses get working solutions — not resumes.
              </p>
              <p className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                Builders get rewarded for execution — not interviews.
              </p>
              <p className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                No resume required. No interviews. Just build, submit, and earn.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-background/60 border border-border/60 rounded-lg text-center">
                <p className="text-base font-bold text-amber-400">
                  Real problems.
                </p>
                <p className="text-xs text-muted-foreground">Real rewards.</p>
              </div>
              <div className="px-4 py-2 bg-background/60 border border-border/60 rounded-lg text-center">
                <p className="text-base font-bold text-foreground">
                  Best solution wins.
                </p>
                <p className="text-xs text-muted-foreground">Always.</p>
              </div>
              <div className="px-4 py-2 bg-background/60 border border-border/60 rounded-lg text-center">
                <p className="text-base font-bold text-primary">
                  Build. Submit.
                </p>
                <p className="text-xs text-muted-foreground">Earn.</p>
              </div>
            </div>
          </div>

          {/* Decorative trophy */}
          <Trophy className="absolute bottom-8 right-8 h-24 w-24 text-amber-400/8 hidden md:block" />
        </div>
      </section>

      {/* ─── MISSION DETAIL MODAL ───────────────────────────────────────────── */}
      <Dialog
        open={!!selectedMission}
        onOpenChange={(open) => {
          if (!open) setSelectedMission(null);
        }}
      >
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="missions.dialog"
        >
          {selectedMission && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                  <div className="flex gap-2 flex-wrap">
                    <StatusBadge status={selectedMission.status} />
                    <PhaseBadge phase={selectedMission.phase} />
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {selectedMission.category}
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-xl font-bold leading-tight">
                  {selectedMission.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedMission.company}
                </p>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Bounty + Meta */}
                <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-xl border border-border/40">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-400">
                      ${selectedMission.bounty.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Bounty</p>
                  </div>
                  <div className="w-px bg-border/40" />
                  <div className="text-center">
                    <p className="text-sm font-semibold">
                      {selectedMission.submissionCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Submissions</p>
                  </div>
                  <div className="w-px bg-border/40" />
                  <div className="text-center">
                    <p className="text-sm font-semibold">
                      {selectedMission.status === "closed"
                        ? "Closed"
                        : formatDeadline(selectedMission.deadline)}
                    </p>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                  </div>
                  <div className="w-px bg-border/40" />
                  <div className="text-center">
                    <DifficultyDot difficulty={selectedMission.difficulty} />
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                  </div>
                </div>

                {/* Phase stepper — How this mission works */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">
                    How this mission works
                  </h4>
                  <PhaseStepperDisplay phase={selectedMission.phase} />
                  <PhaseExplanation phase={selectedMission.phase} />
                </div>

                {/* Reward structure */}
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <h4 className="text-sm font-semibold mb-1 text-amber-400 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" />
                    Reward Structure
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedMission.rewardStructure}
                  </p>
                </div>

                {/* Payout status — only for closed or winner_selected */}
                {(selectedMission.status === "closed" ||
                  selectedMission.phase === "winner_selected") && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-medium">
                      Payout Status:
                    </span>
                    <PayoutBadge status={selectedMission.payoutStatus} />
                  </div>
                )}

                {/* Full description */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">
                    Problem Description
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMission.fullDescription}
                  </p>
                </div>

                {/* Success criteria */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">
                    Success Criteria
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMission.successCriteria}
                  </p>
                </div>

                {/* Submission instructions */}
                <div className="p-3 bg-primary/5 border border-primary/15 rounded-lg">
                  <h4 className="text-sm font-semibold mb-1 text-primary">
                    Submission Instructions
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedMission.submissionInstructions}
                  </p>
                </div>

                {/* Business trust copy */}
                <div className="flex items-start gap-2 p-3 bg-muted/30 border border-border/40 rounded-lg">
                  <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    &ldquo;Businesses do not choose blindly. They review
                    shortlisted and finalist solutions before selecting a
                    winner.&rdquo;
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex gap-3 pt-2">
                  {selectedMission.status !== "closed" && (
                    <Button
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold"
                      onClick={() => openSubmitModal(selectedMission)}
                      data-ocid="missions.primary_button"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Submit Solution
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedMission(null)}
                    data-ocid="missions.close_button"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── SUBMIT SOLUTION MODAL ──────────────────────────────────────────── */}
      <Dialog
        open={showSubmitForm}
        onOpenChange={(open) => {
          if (!open) {
            setShowSubmitForm(false);
            setSubmitSuccess(false);
          }
        }}
      >
        <DialogContent className="max-w-lg" data-ocid="missions.modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              {submitFormTitle}
            </DialogTitle>
            {submittingFor && (
              <p className="text-sm text-muted-foreground">
                For:{" "}
                <span className="font-medium text-foreground">
                  {submittingFor.title}
                </span>
              </p>
            )}
          </DialogHeader>

          {submitSuccess ? (
            <div
              className="py-10 text-center space-y-3"
              data-ocid="missions.success_state"
            >
              <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
              <p className="font-bold text-base">Entry submitted!</p>
              <p className="text-sm text-muted-foreground">
                Good luck. Best solution wins.
              </p>
            </div>
          ) : isWinnerSelected ? (
            <div
              className="py-10 text-center space-y-3"
              data-ocid="missions.panel"
            >
              <X className="h-12 w-12 text-muted-foreground mx-auto opacity-40" />
              <p className="font-bold text-base text-muted-foreground">
                Submissions closed
              </p>
              <p className="text-sm text-muted-foreground">
                A winner has been selected for this mission.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitEntry} className="space-y-4 mt-2">
              {/* Name — always shown */}
              <div className="space-y-1.5">
                <Label htmlFor="submit-name">Name or Handle</Label>
                <Input
                  id="submit-name"
                  placeholder="Your name or alias"
                  value={submitFormData.name}
                  onChange={(e) =>
                    setSubmitFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  data-ocid="missions.input"
                />
              </div>

              {/* Entry phase fields */}
              {isEntryPhase && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="submit-explanation">
                      Your Concept / Approach{" "}
                      <span className="text-xs text-muted-foreground">
                        ({submitFormData.explanation.length}/500)
                      </span>
                    </Label>
                    <Textarea
                      id="submit-explanation"
                      placeholder="Describe your approach to solving this problem..."
                      value={submitFormData.explanation}
                      onChange={(e) =>
                        setSubmitFormData((p) => ({
                          ...p,
                          explanation: e.target.value.slice(0, 500),
                        }))
                      }
                      required
                      rows={4}
                      data-ocid="missions.textarea"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="submit-link">
                      Solution Link{" "}
                      <span className="text-xs text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="submit-link"
                      type="url"
                      placeholder="https://..."
                      value={submitFormData.link}
                      onChange={(e) =>
                        setSubmitFormData((p) => ({
                          ...p,
                          link: e.target.value,
                        }))
                      }
                      data-ocid="missions.input"
                    />
                  </div>
                </>
              )}

              {/* Shortlist / Finalist phase fields */}
              {isAdvancedPhase && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="submit-link">Updated Solution Link</Label>
                    <Input
                      id="submit-link"
                      type="url"
                      placeholder="https://..."
                      value={submitFormData.link}
                      onChange={(e) =>
                        setSubmitFormData((p) => ({
                          ...p,
                          link: e.target.value,
                        }))
                      }
                      required
                      data-ocid="missions.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="submit-progress">
                      Progress Summary{" "}
                      <span className="text-xs text-muted-foreground">
                        ({submitFormData.progressSummary.length}/500)
                      </span>
                    </Label>
                    <Textarea
                      id="submit-progress"
                      placeholder="Summarize the current state of your solution..."
                      value={submitFormData.progressSummary}
                      onChange={(e) =>
                        setSubmitFormData((p) => ({
                          ...p,
                          progressSummary: e.target.value.slice(0, 500),
                        }))
                      }
                      required
                      rows={3}
                      data-ocid="missions.textarea"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="submit-changed">
                      What changed since the last phase?{" "}
                      <span className="text-xs text-muted-foreground">
                        ({submitFormData.whatChanged.length}/300)
                      </span>
                    </Label>
                    <Textarea
                      id="submit-changed"
                      placeholder="Describe the improvements you made..."
                      value={submitFormData.whatChanged}
                      onChange={(e) =>
                        setSubmitFormData((p) => ({
                          ...p,
                          whatChanged: e.target.value.slice(0, 300),
                        }))
                      }
                      required
                      rows={3}
                      data-ocid="missions.textarea"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-1">
                <Button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold"
                  data-ocid="missions.submit_button"
                >
                  Submit Entry
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSubmitForm(false)}
                  data-ocid="missions.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── POST A PROBLEM MODAL ───────────────────────────────────────────── */}
      <Dialog
        open={showPostForm}
        onOpenChange={(open) => {
          if (!open) {
            setShowPostForm(false);
            setPostSuccess(false);
          }
        }}
      >
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="missions.modal"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-amber-400" />
              Post a Problem
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Define your challenge. Set a bounty. Get solutions.
            </p>
          </DialogHeader>

          {postSuccess ? (
            <div
              className="py-10 text-center space-y-3"
              data-ocid="missions.success_state"
            >
              <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
              <p className="font-bold text-base">Mission submitted!</p>
              <p className="text-sm text-muted-foreground">
                Mission submitted for review. It will go live once approved.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePostSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="post-title">Problem Title</Label>
                <Input
                  id="post-title"
                  placeholder="e.g. Build a Web3 Onboarding Flow"
                  value={postFormData.title}
                  onChange={(e) =>
                    setPostFormData((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                  data-ocid="missions.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="post-company">Company or Organization</Label>
                <Input
                  id="post-company"
                  placeholder="Your company name"
                  value={postFormData.company}
                  onChange={(e) =>
                    setPostFormData((p) => ({ ...p, company: e.target.value }))
                  }
                  required
                  data-ocid="missions.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="post-description">Short Description</Label>
                <Textarea
                  id="post-description"
                  placeholder="Describe the problem clearly and concisely..."
                  value={postFormData.description}
                  onChange={(e) =>
                    setPostFormData((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  required
                  rows={3}
                  data-ocid="missions.textarea"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="post-outcome">Desired Outcome</Label>
                <Textarea
                  id="post-outcome"
                  placeholder="What does a successful solution look like?"
                  value={postFormData.outcome}
                  onChange={(e) =>
                    setPostFormData((p) => ({ ...p, outcome: e.target.value }))
                  }
                  required
                  rows={3}
                  data-ocid="missions.textarea"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="post-bounty">Bounty Amount (USD)</Label>
                  <Input
                    id="post-bounty"
                    type="number"
                    min="50"
                    placeholder="500"
                    value={postFormData.bounty}
                    onChange={(e) =>
                      setPostFormData((p) => ({
                        ...p,
                        bounty: e.target.value,
                      }))
                    }
                    required
                    data-ocid="missions.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="post-deadline">Deadline</Label>
                  <Input
                    id="post-deadline"
                    type="date"
                    value={postFormData.deadline}
                    onChange={(e) =>
                      setPostFormData((p) => ({
                        ...p,
                        deadline: e.target.value,
                      }))
                    }
                    required
                    data-ocid="missions.input"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="post-reward">Reward Structure</Label>
                <Input
                  id="post-reward"
                  placeholder="e.g. Winner: $500 · Finalist: $150"
                  value={postFormData.rewardStructure}
                  onChange={(e) =>
                    setPostFormData((p) => ({
                      ...p,
                      rewardStructure: e.target.value,
                    }))
                  }
                  data-ocid="missions.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="post-email">Contact Email</Label>
                <Input
                  id="post-email"
                  type="email"
                  placeholder="you@company.com"
                  value={postFormData.email}
                  onChange={(e) =>
                    setPostFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  data-ocid="missions.input"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <Button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold"
                  data-ocid="missions.submit_button"
                >
                  Submit Mission
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPostForm(false)}
                  data-ocid="missions.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
