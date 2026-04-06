import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  Eye,
  Globe,
  ShieldCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Admin principals (same allowlist as AdminStatsPage) ──────────────────────
const MISSIONS_ADMIN_PRINCIPALS = [
  "3ye7w-6s7gq-k4dpo-icdhj-r7ye2-afylq-eofxv-7p6zw-e7nsd-23fi5-pqe", // dev
  "mqrud-rxoxo-nbepq-sktaj-q76k5-r67zx-4wcgo-rhqmv-5mwys-3dl7s-zae", // live
];

// ─── Types (missions-only, isolated from other platform types) ────────────────
type AdminMissionStatus =
  | "pending_review"
  | "pending_funding"
  | "approved"
  | "live"
  | "rejected"
  | "closed";

type MissionPhase = "entry" | "shortlist" | "finalist" | "winner_selected";
type PayoutStatus = "pending" | "awarded" | "paid";

interface AdminMission {
  id: string;
  title: string;
  company: string;
  contactEmail: string;
  shortDescription: string;
  fullDescription: string;
  bounty: number;
  deadline: string;
  submittedDate: string;
  status: AdminMissionStatus;
  phase: MissionPhase;
  rewardStructure: string;
  payoutStatus: PayoutStatus;
  submissionCount: number;
  category: string;
}

// ─── Seed missions for admin review queue ─────────────────────────────────────
// These represent submitted missions visible only in admin panel
const SEED_ADMIN_MISSIONS: AdminMission[] = [
  {
    id: "mission-001",
    title: "Build a Web3 Onboarding Flow",
    company: "ChainForge Labs",
    contactEmail: "hello@chainforgelabs.io",
    shortDescription:
      "Create a frictionless onboarding experience guiding new users from wallet setup to their first on-chain transaction in under 5 steps.",
    fullDescription:
      "ChainForge Labs needs a polished Web3 onboarding flow built with Caffeine.ai. The solution must handle wallet detection, identity creation via Internet Identity, and guide the user through their first real interaction with an ICP canister. Mobile-first, progressive disclosure, clear error recovery.",
    bounty: 500,
    deadline: "2025-06-15",
    submittedDate: "2025-04-01",
    status: "live",
    phase: "entry",
    rewardStructure: "Winner: $500",
    payoutStatus: "pending",
    submissionCount: 4,
    category: "UI/UX",
  },
  {
    id: "mission-002",
    title: "Create an ICP Glossary Quiz App",
    company: "DevDAO Network",
    contactEmail: "missions@devdao.network",
    shortDescription:
      "Build an interactive quiz app covering 50+ ICP and Web3 terms. Users should score, learn, and share results.",
    fullDescription:
      "DevDAO Network wants a standalone quiz application covering the ICP ecosystem. Must include 50+ questions across 5 categories, show explanations after each answer, maintain a local score, and include a shareable results card.",
    bounty: 800,
    deadline: "2025-05-30",
    submittedDate: "2025-03-28",
    status: "live",
    phase: "shortlist",
    rewardStructure: "Winner: $600 · Top Submission: $200",
    payoutStatus: "pending",
    submissionCount: 7,
    category: "Education",
  },
  {
    id: "mission-003",
    title: "Design a DAO Voting Dashboard",
    company: "NeuronStack",
    contactEmail: "build@neuronstack.xyz",
    shortDescription:
      "Build a governance dashboard visualizing neuron activity, active proposals, and voting history for ICP's NNS.",
    fullDescription:
      "NeuronStack requires a comprehensive DAO voting dashboard for the Internet Computer's Network Nervous System. Display active proposals with voting status, neuron voting power visualization, historical voting trends, and allow simulated vote submission.",
    bounty: 1500,
    deadline: "2025-07-01",
    submittedDate: "2025-03-20",
    status: "live",
    phase: "finalist",
    rewardStructure: "Winner: $1,000 · Finalist 1: $300 · Finalist 2: $200",
    payoutStatus: "pending",
    submissionCount: 3,
    category: "Governance",
  },
  {
    id: "mission-007",
    title: "ICP DeFi Portfolio Tracker",
    company: "Meridian Finance",
    contactEmail: "grants@meridianfinance.io",
    shortDescription:
      "Build a portfolio tracker that aggregates ICP token holdings, staking positions, and yield across multiple wallets.",
    fullDescription:
      "Meridian Finance needs a clean portfolio dashboard for ICP DeFi users. The tool should display total portfolio value, individual token positions, staking yields, and historical performance. Data can be simulated but structure must reflect real ICP DeFi primitives.",
    bounty: 1200,
    deadline: "2025-06-20",
    submittedDate: "2025-04-03",
    status: "pending_review",
    phase: "entry",
    rewardStructure: "Winner: $900 · Runner-up: $300",
    payoutStatus: "pending",
    submissionCount: 0,
    category: "DeFi",
  },
  {
    id: "mission-008",
    title: "On-Chain Identity Verification Flow",
    company: "VeritasID",
    contactEmail: "tech@veritasid.co",
    shortDescription:
      "Design and build a zero-knowledge identity verification prototype using ICP's Internet Identity and verifiable credentials.",
    fullDescription:
      "VeritasID wants to explore ICP's privacy-preserving identity primitives. Build a prototype that lets users prove a claim (e.g. age over 18, country of residence) without revealing the underlying data. Demonstrate the credential issuance and verification flow end-to-end.",
    bounty: 2000,
    deadline: "2025-07-15",
    submittedDate: "2025-04-04",
    status: "pending_funding",
    phase: "entry",
    rewardStructure: "Winner: $1,500 · Second: $500",
    payoutStatus: "pending",
    submissionCount: 0,
    category: "Identity",
  },
  {
    id: "mission-009",
    title: "AI Agent Task Orchestrator",
    company: "AutoMesh Labs",
    contactEmail: "hello@automeshlabs.com",
    shortDescription:
      "Build a UI for orchestrating multiple AI agents to complete multi-step tasks on ICP, with visible decision trace.",
    fullDescription:
      "AutoMesh Labs is exploring agent-based automation on ICP. They need a prototype that shows multiple AI agents receiving subtasks, executing them, and reporting results — all with a visible trace log. Agents can be simulated but the orchestration UI must be functional and clear.",
    bounty: 900,
    deadline: "2025-06-10",
    submittedDate: "2025-04-05",
    status: "rejected",
    phase: "entry",
    rewardStructure: "Winner: $900",
    payoutStatus: "pending",
    submissionCount: 0,
    category: "AI / Agents",
  },
];

// ─── Helper: format date ──────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: AdminMissionStatus }) {
  const config: Record<
    AdminMissionStatus,
    { label: string; className: string; dot: string }
  > = {
    pending_review: {
      label: "Pending Review",
      className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      dot: "bg-indigo-400",
    },
    pending_funding: {
      label: "Pending Funding",
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      dot: "bg-yellow-400",
    },
    approved: {
      label: "Approved",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      dot: "bg-blue-400",
    },
    live: {
      label: "Live",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400 animate-pulse",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      dot: "bg-red-400",
    },
    closed: {
      label: "Closed",
      className: "bg-muted text-muted-foreground border-border",
      dot: "bg-muted-foreground/50",
    },
  };
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${c.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

// ─── PayoutBadge ─────────────────────────────────────────────────────────────
function PayoutBadge({ status }: { status: PayoutStatus }) {
  if (status === "paid")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminMissionsPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();

  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState<AdminMission[]>(SEED_ADMIN_MISSIONS);
  const [selectedMission, setSelectedMission] = useState<AdminMission | null>(
    null,
  );
  const [filterStatus, setFilterStatus] = useState<AdminMissionStatus | "All">(
    "All",
  );

  // ── Admin gate ──
  useEffect(() => {
    if (!identity) return;
    const principalStr = identity.getPrincipal().toText();
    const isAdmin = MISSIONS_ADMIN_PRINCIPALS.includes(principalStr);
    if (!isAdmin) setDenied(true);
    setLoading(false);
  }, [identity]);

  // ── Status update action ──
  function updateStatus(id: string, status: AdminMissionStatus) {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
    // If we're viewing the mission, update its detail too
    setSelectedMission((prev) =>
      prev?.id === id ? { ...prev, status } : prev,
    );
  }

  function updatePayoutStatus(id: string, payoutStatus: PayoutStatus) {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, payoutStatus } : m)),
    );
    setSelectedMission((prev) =>
      prev?.id === id ? { ...prev, payoutStatus } : prev,
    );
  }

  // ── Computed stats ──
  const totalPendingReview = missions.filter(
    (m) => m.status === "pending_review",
  ).length;
  const totalPendingFunding = missions.filter(
    (m) => m.status === "pending_funding",
  ).length;
  const totalLive = missions.filter((m) => m.status === "live").length;

  // ── Filtered list ──
  const filtered =
    filterStatus === "All"
      ? missions
      : missions.filter((m) => m.status === filterStatus);

  // ── Access denied ──
  if (denied || (!loading && !identity)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-sm">Access denied.</p>
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="text-xs underline text-muted-foreground hover:text-foreground"
        >
          Return home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Verifying access…</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Mission Review Queue
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Missions-only · Admin access · Internal use only
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Admin Access
          </span>
          <button
            type="button"
            onClick={() => navigate({ to: "/admin/stats" })}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Analytics
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Back to Admin
          </button>
        </div>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-center">
          <p className="text-2xl font-bold text-indigo-400">
            {totalPendingReview}
          </p>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
            Pending Review
          </p>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-500">
            {totalPendingFunding}
          </p>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
            Pending Funding
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{totalLive}</p>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
            Live
          </p>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex flex-wrap gap-1 p-1 bg-muted/50 rounded-lg border border-border/40 mb-6 w-fit">
        {(
          [
            "All",
            "pending_review",
            "pending_funding",
            "approved",
            "live",
            "rejected",
            "closed",
          ] as const
        ).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              filterStatus === s
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "pending_review"
              ? "Pending Review"
              : s === "pending_funding"
                ? "Pending Funding"
                : s === "All"
                  ? "All"
                  : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Mission table ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          No missions in this category.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((mission) => (
            <MissionRow
              key={mission.id}
              mission={mission}
              onView={() => setSelectedMission(mission)}
              onStatusChange={(s) => updateStatus(mission.id, s)}
            />
          ))}
        </div>
      )}

      {/* ── Mission detail drawer ── */}
      <Dialog
        open={!!selectedMission}
        onOpenChange={(open) => !open && setSelectedMission(null)}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedMission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold pr-6">
                  {selectedMission.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Status + payout row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={selectedMission.status} />
                  <PayoutBadge status={selectedMission.payoutStatus} />
                  <span className="text-xs text-muted-foreground ml-auto">
                    Submitted {formatDate(selectedMission.submittedDate)}
                  </span>
                </div>

                <Separator />

                {/* Mission metadata grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Company
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedMission.company}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Contact
                    </p>
                    <a
                      href={`mailto:${selectedMission.contactEmail}`}
                      className="text-primary hover:underline text-sm"
                    >
                      {selectedMission.contactEmail}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Bounty
                    </p>
                    <p className="font-bold text-amber-400">
                      ${selectedMission.bounty.toLocaleString()} USDC
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Deadline
                    </p>
                    <p className="font-semibold text-foreground">
                      {formatDate(selectedMission.deadline)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Category
                    </p>
                    <p className="text-foreground">
                      {selectedMission.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Submissions
                    </p>
                    <p className="text-foreground">
                      {selectedMission.submissionCount}
                    </p>
                  </div>
                </div>

                {/* Reward structure */}
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                    Reward Structure
                  </p>
                  <p className="text-sm text-foreground">
                    {selectedMission.rewardStructure}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                    Full Description
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMission.fullDescription}
                  </p>
                </div>

                <Separator />

                {/* Admin actions */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
                    Admin Actions
                  </p>
                  <AdminActionButtons
                    mission={selectedMission}
                    onStatusChange={(s) => updateStatus(selectedMission.id, s)}
                    onPayoutChange={(p) =>
                      updatePayoutStatus(selectedMission.id, p)
                    }
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Mission row component ────────────────────────────────────────────────────
function MissionRow({
  mission,
  onView,
  onStatusChange,
}: {
  mission: AdminMission;
  onView: () => void;
  onStatusChange: (s: AdminMissionStatus) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-colors">
      <div className="flex items-start gap-4">
        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <StatusBadge status={mission.status} />
            <span className="text-xs text-muted-foreground">
              {mission.category}
            </span>
          </div>
          <p className="font-semibold text-sm text-foreground truncate">
            {mission.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {mission.company} ·{" "}
            <a
              href={`mailto:${mission.contactEmail}`}
              className="hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {mission.contactEmail}
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {mission.shortDescription}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-amber-400" />
              <span className="text-amber-400 font-semibold">
                ${mission.bounty.toLocaleString()}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Deadline {formatDate(mission.deadline)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {mission.submissionCount} submission
              {mission.submissionCount !== 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1">
              Submitted {formatDate(mission.submittedDate)}
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2.5 text-xs"
            onClick={onView}
          >
            <Eye className="h-3 w-3 mr-1" />
            Details
          </Button>
          <QuickActionMenu mission={mission} onStatusChange={onStatusChange} />
        </div>
      </div>
    </div>
  );
}

// ─── Quick action dropdown ────────────────────────────────────────────────────
function QuickActionMenu({
  mission,
  onStatusChange,
}: {
  mission: AdminMission;
  onStatusChange: (s: AdminMissionStatus) => void;
}) {
  const actions: {
    label: string;
    status: AdminMissionStatus;
    className: string;
    icon: React.ReactNode;
    show: boolean;
  }[] = [
    {
      label: "Approve",
      status: "approved",
      className: "bg-blue-500 hover:bg-blue-400 text-white",
      icon: <CheckCircle className="h-3 w-3" />,
      show: mission.status === "pending_review",
    },
    {
      label: "Reject",
      status: "rejected",
      className: "bg-red-500/80 hover:bg-red-500 text-white",
      icon: <XCircle className="h-3 w-3" />,
      show:
        mission.status === "pending_review" ||
        mission.status === "approved" ||
        mission.status === "pending_funding",
    },
    {
      label: "Mark Pending Funding",
      status: "pending_funding",
      className: "bg-yellow-500/80 hover:bg-yellow-500 text-black",
      icon: <DollarSign className="h-3 w-3" />,
      show: mission.status === "approved",
    },
    {
      label: "Mark Funded",
      status: "approved",
      className: "bg-blue-600 hover:bg-blue-500 text-white",
      icon: <ShieldCheck className="h-3 w-3" />,
      show: mission.status === "pending_funding",
    },
    {
      label: "Publish Live",
      status: "live",
      className: "bg-emerald-500 hover:bg-emerald-400 text-white",
      icon: <Globe className="h-3 w-3" />,
      show:
        mission.status === "approved" || mission.status === "pending_funding",
    },
    {
      label: "Close",
      status: "closed",
      className:
        "bg-muted hover:bg-muted/80 text-muted-foreground border border-border",
      icon: <X className="h-3 w-3" />,
      show: mission.status === "live",
    },
  ];

  const visible = actions.filter((a) => a.show);
  if (visible.length === 0) {
    return (
      <span className="text-xs text-muted-foreground px-2">
        {mission.status === "rejected" ? "Rejected" : "No actions"}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      {visible.map((action) => (
        <Button
          key={action.label}
          size="sm"
          className={`h-7 px-2.5 text-xs font-semibold ${action.className}`}
          onClick={() => onStatusChange(action.status)}
          title={action.label}
        >
          {action.icon}
          <span className="ml-1 hidden sm:inline">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}

// ─── Admin action buttons (detail view) ──────────────────────────────────────
function AdminActionButtons({
  mission,
  onStatusChange,
  onPayoutChange,
}: {
  mission: AdminMission;
  onStatusChange: (s: AdminMissionStatus) => void;
  onPayoutChange: (p: PayoutStatus) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Status actions */}
      <div className="flex flex-wrap gap-2">
        {mission.status === "pending_review" && (
          <>
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs"
              onClick={() => onStatusChange("approved")}
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Approve
            </Button>
            <Button
              size="sm"
              className="bg-red-500/80 hover:bg-red-500 text-white font-semibold text-xs"
              onClick={() => onStatusChange("rejected")}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </Button>
          </>
        )}

        {mission.status === "approved" && (
          <>
            <Button
              size="sm"
              className="bg-yellow-500/80 hover:bg-yellow-500 text-black font-semibold text-xs"
              onClick={() => onStatusChange("pending_funding")}
            >
              <DollarSign className="h-3.5 w-3.5 mr-1.5" />
              Mark Pending Funding
            </Button>
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs"
              onClick={() => onStatusChange("live")}
            >
              <Globe className="h-3.5 w-3.5 mr-1.5" />
              Publish Live
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => onStatusChange("rejected")}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </Button>
          </>
        )}

        {mission.status === "pending_funding" && (
          <>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
              onClick={() => onStatusChange("approved")}
            >
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
              Mark Funded
            </Button>
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs"
              onClick={() => onStatusChange("live")}
            >
              <Globe className="h-3.5 w-3.5 mr-1.5" />
              Publish Live
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => onStatusChange("rejected")}
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </Button>
          </>
        )}

        {mission.status === "live" && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => onStatusChange("closed")}
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Close Mission
          </Button>
        )}

        {mission.status === "rejected" && (
          <Button
            size="sm"
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs"
            onClick={() => onStatusChange("pending_review")}
          >
            <ChevronRight className="h-3.5 w-3.5 mr-1.5" />
            Return to Review
          </Button>
        )}
      </div>

      {/* Payout status actions */}
      {(mission.status === "live" || mission.status === "closed") && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-2">
            Payout Status
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={
                mission.payoutStatus === "pending" ? "default" : "outline"
              }
              className="text-xs h-7"
              onClick={() => onPayoutChange("pending")}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant={
                mission.payoutStatus === "awarded" ? "default" : "outline"
              }
              className="text-xs h-7"
              onClick={() => onPayoutChange("awarded")}
            >
              Awarded
            </Button>
            <Button
              size="sm"
              variant={mission.payoutStatus === "paid" ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => onPayoutChange("paid")}
            >
              Paid
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
