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
  type Mission,
  type MissionStatus,
  type PayoutStatus,
  missionsStore,
  useMissionsStore,
} from "@/lib/missionsStore";
import {
  ArrowRight,
  Award,
  BadgeCheck,
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
import { useRef, useState } from "react";

// ─── Helper functions ─────────────────────────────────────────────────────────
function formatDeadline(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTimeRemaining(deadlineStr: string): string {
  const now = new Date();
  const deadline = new Date(deadlineStr);
  const diff = deadline.getTime() - now.getTime();
  if (diff <= 0) return "Closed";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Last day";
  if (days === 1) return "1 day left";
  if (days < 7) return `${days} days left`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week left" : `${weeks} weeks left`;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: MissionStatus }) {
  const config: Partial<
    Record<MissionStatus, { label: string; className: string; dot: string }>
  > = {
    live: {
      label: "Open",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400 animate-pulse",
    },
    closed: {
      label: "Closed",
      className: "bg-muted text-muted-foreground border-border",
      dot: "bg-muted-foreground/50",
    },
    pending_review: {
      label: "Pending Review",
      className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      dot: "bg-indigo-400",
    },
    funded: {
      label: "Funded",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
    },
  };
  const c = config[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground/50",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${c.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

// ─── Trust/Funding Badge ──────────────────────────────────────────────────────
function TrustBadges({ mission }: { mission: Mission }) {
  const badges: React.ReactNode[] = [];

  if (mission.payoutStatus === "paid") {
    badges.push(
      <span
        key="paid"
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20"
      >
        <CheckCircle className="h-3 w-3" /> Paid
      </span>,
    );
  } else if (mission.fundingStatus === "funded") {
    badges.push(
      <span
        key="verified"
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      >
        <BadgeCheck className="h-3 w-3" /> Verified Bounty
      </span>,
    );
    if (mission.status === "live" && mission.payoutStatus === "pending") {
      badges.push(
        <span
          key="payout-pending"
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
        >
          <Clock className="h-3 w-3" /> Payout Pending
        </span>,
      );
    }
  }

  if (badges.length === 0) return null;
  return <>{badges}</>;
}

// ─── Payout Badge ─────────────────────────────────────────────────────────────
function PayoutBadge({ status }: { status: PayoutStatus }) {
  if (status === "paid")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
        <CheckCircle className="h-3 w-3" /> Paid
      </span>
    );
  if (status === "awarded")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Award className="h-3 w-3" /> Awarded
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
      <Clock className="h-3 w-3" /> Pending
    </span>
  );
}

// ─── Phase Badge ──────────────────────────────────────────────────────────────
function PhaseBadge({ phase }: { phase: Mission["phase"] }) {
  const config: Record<Mission["phase"], { label: string; className: string }> =
    {
      entry: {
        label: "Entry Phase",
        className: "bg-primary/10 text-primary border-primary/20",
      },
      shortlist: {
        label: "Shortlist",
        className: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      },
      finalist: {
        label: "Finalist",
        className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      },
      winner_selected: {
        label: "Winner Selected",
        className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      },
    };
  const c = config[phase];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${c.className}`}
    >
      <GitBranch className="h-2.5 w-2.5" />
      {c.label}
    </span>
  );
}

// ─── Difficulty dot ───────────────────────────────────────────────────────────
function DifficultyDot({ difficulty }: { difficulty: Mission["difficulty"] }) {
  const map: Record<Mission["difficulty"], { color: string; label: string }> = {
    Beginner: { color: "bg-emerald-400", label: "Beginner" },
    Intermediate: { color: "bg-amber-400", label: "Intermediate" },
    Advanced: { color: "bg-red-400", label: "Advanced" },
  };
  const d = map[difficulty];
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <span className={`w-2 h-2 rounded-full ${d.color}`} />
      {d.label}
    </span>
  );
}

// ─── Phase stepper ────────────────────────────────────────────────────────────
function PhaseStepperDisplay({ phase }: { phase: Mission["phase"] }) {
  const phases: Array<{ key: Mission["phase"]; label: string }> = [
    { key: "entry", label: "Entry" },
    { key: "shortlist", label: "Shortlist" },
    { key: "finalist", label: "Finalist" },
    { key: "winner_selected", label: "Winner" },
  ];
  const idx = phases.findIndex((p) => p.key === phase);
  return (
    <div className="flex items-center gap-1">
      {phases.map((p, i) => (
        <>
          <div
            key={p.key}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
              i < idx
                ? "bg-emerald-500/10 text-emerald-400"
                : i === idx
                  ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                  : "bg-muted/50 text-muted-foreground/50"
            }`}
          >
            {i < idx && <CheckCircle className="h-2.5 w-2.5" />}
            {p.label}
          </div>
          {i < phases.length - 1 && (
            <ChevronRight
              key={`arrow-${p.key}`}
              className="h-3 w-3 text-muted-foreground/30 flex-shrink-0"
            />
          )}
        </>
      ))}
    </div>
  );
}

// ─── Phase explanation ────────────────────────────────────────────────────────
function PhaseExplanation({ phase }: { phase: Mission["phase"] }) {
  const text: Record<Mission["phase"], string> = {
    entry:
      "Submit a short concept or approach. An optional solution link is accepted but not required. Best entries advance to the shortlist.",
    shortlist:
      "Selected participants develop their solutions further. Submit an updated link + a short progress summary explaining what changed.",
    finalist:
      "Top 3–5 solutions refined and submitted. Submit your final build with an updated link and explanation of improvements.",
    winner_selected:
      "A winner has been selected. Payout is being processed. Thank you to all participants.",
  };
  return (
    <p className="text-xs text-muted-foreground leading-relaxed">
      {text[phase]}
    </p>
  );
}

// ─── Mission Card ─────────────────────────────────────────────────────────────
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

      {/* Trust badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <TrustBadges mission={mission} />
      </div>

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

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MissionsPage() {
  const allMissions = useMissionsStore();
  const publicMissions = allMissions.filter(
    (m) => m.status === "live" || m.status === "closed",
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedMission = selectedId
    ? (publicMissions.find((m) => m.id === selectedId) ?? null)
    : null;

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
  const [filterStatus, setFilterStatus] = useState<"live" | "closed" | "All">(
    "All",
  );
  const [submittingForId, setSubmittingForId] = useState<string | null>(null);
  const submittingFor = submittingForId
    ? (allMissions.find((m) => m.id === submittingForId) ?? null)
    : null;

  const feedRef = useRef<HTMLDivElement>(null);

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

  function scrollToFeed() {
    feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handlePostSubmit(e: React.FormEvent) {
    e.preventDefault();
    missionsStore.submitMission({
      title: postFormData.title,
      company: postFormData.company,
      contactEmail: postFormData.email,
      shortDescription: postFormData.description,
      fullDescription: postFormData.description,
      successCriteria: postFormData.outcome,
      bounty: Number(postFormData.bounty) || 0,
      category: "General",
      difficulty: "Intermediate",
      deadline: postFormData.deadline,
      rewardStructure: postFormData.rewardStructure || "Winner: TBD",
      submissionInstructions:
        "Submit your solution link and a short explanation of your approach.",
    });
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
    if (!submittingForId) return;
    missionsStore.incrementSubmissions(submittingForId);
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
      setSubmittingForId(null);
    }, 2000);
  }

  function openSubmitModal(mission: Mission) {
    setSelectedId(null);
    setSubmittingForId(mission.id);
    setShowSubmitForm(true);
  }

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

      {/* ─── TRUST SECTION ──────────────────────────────────────────────────── */}
      <section className="border-y border-amber-500/20 bg-amber-500/5">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <BadgeCheck className="h-5 w-5 text-amber-400 flex-shrink-0" />
            <p className="text-sm font-semibold text-amber-400">
              Only verified funded missions go live. Builders compete on real
              bounties, not promises.
            </p>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-card/50">
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
              {filteredMissions.length !== 1 ? "s" : ""} available
            </p>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1 p-1 bg-muted/50 rounded-lg border border-border/40">
            {(["All", "live", "closed"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  filterStatus === s
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid="missions.tab"
              >
                {s === "live" ? "Open" : s === "closed" ? "Closed" : "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Mission grid */}
        {filteredMissions.length === 0 ? (
          <div
            className="text-center py-24 space-y-3"
            data-ocid="missions.empty_state"
          >
            <Target className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground font-medium">
              No missions in this category yet.
            </p>
            <p className="text-sm text-muted-foreground/60">
              Check back soon or post a problem.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMissions.map((mission, idx) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onClick={() => setSelectedId(mission.id)}
                data-ocid={`missions.item.${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ─── TRUST / EXPLANATION SECTION ────────────────────────────────────── */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="container py-20 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase">
                <Shield className="h-3 w-3" />
                Solution Engine
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                This is not a job board.
                <br />
                <span className="text-muted-foreground font-normal">
                  This is a solution engine.
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Businesses post real problems. Builders submit working
                solutions. The best solution wins the bounty. No interviews. No
                resumes. Just execution.
              </p>
              <p className="text-sm font-semibold text-foreground">
                This is not hiring. This is outcome-based problem solving.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Target className="h-5 w-5" />,
                  title: "Real problems.",
                  body: "Real rewards.",
                },
                {
                  icon: <Zap className="h-5 w-5" />,
                  title: "Best solution wins.",
                  body: "Always.",
                },
                {
                  icon: <Trophy className="h-5 w-5" />,
                  title: "Build. Submit.",
                  body: "Earn.",
                },
                {
                  icon: <Award className="h-5 w-5" />,
                  title: "No resume required.",
                  body: "Just results.",
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="p-4 bg-background border border-border/60 rounded-xl space-y-2"
                >
                  <div className="text-amber-400">{icon}</div>
                  <p className="text-sm font-bold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION DETAIL MODAL ───────────────────────────────────────────── */}
      <Dialog
        open={!!selectedMission}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
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

                {/* Trust / Funding status */}
                <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/40">
                  <span className="text-xs text-muted-foreground font-medium">
                    Funding:
                  </span>
                  {selectedMission.fundingStatus === "funded" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <BadgeCheck className="h-3 w-3" /> Verified &amp; Funded
                    </span>
                  ) : selectedMission.fundingStatus === "pending_funding" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                      <Clock className="h-3 w-3" /> Pending Funding
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
                      Unfunded
                    </span>
                  )}
                  {(selectedMission.status === "closed" ||
                    selectedMission.phase === "winner_selected") && (
                    <>
                      <span className="text-xs text-muted-foreground font-medium ml-2">
                        Payout:
                      </span>
                      <PayoutBadge status={selectedMission.payoutStatus} />
                    </>
                  )}
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
                    onClick={() => setSelectedId(null)}
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
