import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  type FundingStatus,
  type Mission,
  type MissionStatus,
  type PayoutStatus,
  missionsStore,
  useMissionsStore,
} from "@/lib/missionsStore";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
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
import { toast } from "sonner";

// ─── Admin principals ─────────────────────────────────────────────────────────
const MISSIONS_ADMIN_PRINCIPALS = [
  "3ye7w-6s7gq-k4dpo-icdhj-r7ye2-afylq-eofxv-7p6zw-e7nsd-23fi5-pqe",
  "mqrud-rxoxo-nbepq-sktaj-q76k5-r67zx-4wcgo-rhqmv-5mwys-3dl7s-zae",
];

// ─── Helper: format date ──────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: MissionStatus }) {
  const config: Record<
    MissionStatus,
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
    funded: {
      label: "Funded",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      dot: "bg-blue-400",
    },
    live: {
      label: "Live",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400 animate-pulse",
    },
    winner_selected: {
      label: "Winner Selected",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      dot: "bg-amber-400",
    },
    paid: {
      label: "Paid",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
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

// ─── Funding Badge ────────────────────────────────────────────────────────────
function FundingBadge({ status }: { status: FundingStatus }) {
  if (status === "funded") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <BadgeCheck className="h-3 w-3" /> Funded ✓
      </span>
    );
  }
  if (status === "pending_funding") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
        <Clock className="h-3 w-3" /> Pending Funding
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
      Unfunded
    </span>
  );
}

// ─── Payout Badge ─────────────────────────────────────────────────────────────
function PayoutBadge({ status }: { status: PayoutStatus }) {
  if (status === "paid") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle className="h-3 w-3" /> Paid
      </span>
    );
  }
  if (status === "awarded") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Award className="h-3 w-3" /> Awarded
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border">
      <Clock className="h-3 w-3" /> Pending
    </span>
  );
}

// ─── Quick action buttons (row) ───────────────────────────────────────────────
function QuickActionButtons({
  mission,
  onStatusChange,
  onFundingChange,
  onPublishLive,
}: {
  mission: Mission;
  onStatusChange: (s: MissionStatus) => void;
  onFundingChange: (f: FundingStatus) => void;
  onPublishLive: () => void;
}) {
  const canPublish = mission.fundingStatus === "funded";

  if (mission.status === "pending_review") {
    return (
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          className="h-7 px-2.5 text-xs bg-blue-500 hover:bg-blue-400 text-white font-semibold"
          onClick={() => onStatusChange("pending_funding")}
          data-ocid="admin.missions.confirm_button"
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Approve</span>
        </Button>
        <Button
          size="sm"
          className="h-7 px-2.5 text-xs bg-red-500/80 hover:bg-red-500 text-white font-semibold"
          onClick={() => onStatusChange("rejected")}
          data-ocid="admin.missions.delete_button"
        >
          <XCircle className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Reject</span>
        </Button>
      </div>
    );
  }

  if (mission.status === "pending_funding") {
    return (
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          className="h-7 px-2.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
          onClick={() => {
            onFundingChange("funded");
            onStatusChange("funded");
          }}
          data-ocid="admin.missions.confirm_button"
        >
          <ShieldCheck className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Mark Funded</span>
        </Button>
        <Button
          size="sm"
          className="h-7 px-2.5 text-xs bg-red-500/80 hover:bg-red-500 text-white font-semibold"
          onClick={() => onStatusChange("rejected")}
          data-ocid="admin.missions.delete_button"
        >
          <XCircle className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Reject</span>
        </Button>
      </div>
    );
  }

  if (mission.status === "funded") {
    return (
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          className="h-7 px-2.5 text-xs bg-emerald-500 hover:bg-emerald-400 text-white font-semibold"
          disabled={!canPublish}
          onClick={onPublishLive}
          title={
            canPublish
              ? "Publish Live"
              : "Mission must be funded before publishing"
          }
          data-ocid="admin.missions.primary_button"
        >
          <Globe className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Publish Live</span>
        </Button>
        <Button
          size="sm"
          className="h-7 px-2.5 text-xs bg-red-500/80 hover:bg-red-500 text-white font-semibold"
          onClick={() => onStatusChange("rejected")}
          data-ocid="admin.missions.delete_button"
        >
          <XCircle className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Reject</span>
        </Button>
      </div>
    );
  }

  if (mission.status === "live") {
    return (
      <Button
        size="sm"
        variant="outline"
        className="h-7 px-2.5 text-xs"
        onClick={() => onStatusChange("closed")}
        data-ocid="admin.missions.secondary_button"
      >
        <X className="h-3 w-3 mr-1" />
        <span className="hidden sm:inline">Close</span>
      </Button>
    );
  }

  if (mission.status === "rejected") {
    return (
      <Button
        size="sm"
        className="h-7 px-2.5 text-xs bg-indigo-500 hover:bg-indigo-400 text-white font-semibold"
        onClick={() => onStatusChange("pending_review")}
        data-ocid="admin.missions.secondary_button"
      >
        <ChevronRight className="h-3 w-3 mr-1" />
        <span className="hidden sm:inline">Return to Review</span>
      </Button>
    );
  }

  return <span className="text-xs text-muted-foreground px-2">No actions</span>;
}

// ─── Admin Action Buttons (detail view) ──────────────────────────────────────
function AdminActionButtons({
  mission,
  onStatusChange,
  onFundingChange,
  onPayoutChange,
  onPublishLive,
}: {
  mission: Mission;
  onStatusChange: (s: MissionStatus) => void;
  onFundingChange: (f: FundingStatus) => void;
  onPayoutChange: (p: PayoutStatus) => void;
  onPublishLive: () => void;
}) {
  const canPublish = mission.fundingStatus === "funded";

  return (
    <div className="space-y-4">
      {/* Status actions */}
      <div className="flex flex-wrap gap-2">
        {mission.status === "pending_review" && (
          <>
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs"
              onClick={() => onStatusChange("pending_funding")}
              data-ocid="admin.missions.confirm_button"
            >
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Approve
            </Button>
            <Button
              size="sm"
              className="bg-red-500/80 hover:bg-red-500 text-white font-semibold text-xs"
              onClick={() => onStatusChange("rejected")}
              data-ocid="admin.missions.delete_button"
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
              onClick={() => {
                onFundingChange("funded");
                onStatusChange("funded");
              }}
              data-ocid="admin.missions.confirm_button"
            >
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
              Mark Funded
            </Button>
            <Button
              size="sm"
              className="bg-red-500/80 hover:bg-red-500 text-white font-semibold text-xs"
              onClick={() => onStatusChange("rejected")}
              data-ocid="admin.missions.delete_button"
            >
              <XCircle className="h-3.5 w-3.5 mr-1.5" />
              Reject
            </Button>
          </>
        )}

        {mission.status === "funded" && (
          <>
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs"
              disabled={!canPublish}
              onClick={onPublishLive}
              title={
                !canPublish
                  ? "Mission must be funded before publishing"
                  : undefined
              }
              data-ocid="admin.missions.primary_button"
            >
              <Globe className="h-3.5 w-3.5 mr-1.5" />
              Publish Live
            </Button>
            {!canPublish && (
              <p className="text-xs text-yellow-500 flex items-center gap-1 mt-1">
                <ShieldCheck className="h-3 w-3" />
                Mission must be funded before publishing
              </p>
            )}
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => onStatusChange("rejected")}
              data-ocid="admin.missions.delete_button"
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
            data-ocid="admin.missions.secondary_button"
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
            data-ocid="admin.missions.secondary_button"
          >
            <ChevronRight className="h-3.5 w-3.5 mr-1.5" />
            Return to Review
          </Button>
        )}
      </div>

      {/* Payout status actions */}
      {(mission.status === "live" ||
        mission.status === "closed" ||
        mission.status === "winner_selected" ||
        mission.status === "paid") && (
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
              data-ocid="admin.missions.toggle"
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
              data-ocid="admin.missions.toggle"
            >
              Awarded
            </Button>
            <Button
              size="sm"
              variant={mission.payoutStatus === "paid" ? "default" : "outline"}
              className="text-xs h-7"
              onClick={() => onPayoutChange("paid")}
              data-ocid="admin.missions.toggle"
            >
              Paid
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mission Row ──────────────────────────────────────────────────────────────
function MissionRow({
  mission,
  onView,
  onStatusChange,
  onFundingChange,
  onPublishLive,
}: {
  mission: Mission;
  onView: () => void;
  onStatusChange: (s: MissionStatus) => void;
  onFundingChange: (f: FundingStatus) => void;
  onPublishLive: () => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:border-border/80 transition-colors">
      <div className="flex items-start gap-4">
        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <StatusBadge status={mission.status} />
            <FundingBadge status={mission.fundingStatus} />
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
            <span>Submitted {formatDate(mission.submittedDate)}</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2.5 text-xs"
            onClick={onView}
            data-ocid="admin.missions.secondary_button"
          >
            <Eye className="h-3 w-3 mr-1" />
            Details
          </Button>
          <QuickActionButtons
            mission={mission}
            onStatusChange={onStatusChange}
            onFundingChange={onFundingChange}
            onPublishLive={onPublishLive}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminMissionsPage() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();

  const [denied, setDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<MissionStatus | "All">(
    "All",
  );

  const allMissions = useMissionsStore();
  const selectedMission: Mission | null = selectedId
    ? (allMissions.find((m) => m.id === selectedId) ?? null)
    : null;

  // ── Admin gate ──
  useEffect(() => {
    if (!identity) return;
    const principalStr = identity.getPrincipal().toText();
    const isAdmin = MISSIONS_ADMIN_PRINCIPALS.includes(principalStr);
    if (!isAdmin) setDenied(true);
    setLoading(false);
  }, [identity]);

  // ── Store mutation helpers ──
  function handleStatusChange(id: string, status: MissionStatus) {
    missionsStore.updateStatus(id, status);
  }

  function handleFundingChange(id: string, fundingStatus: FundingStatus) {
    missionsStore.updateFundingStatus(id, fundingStatus);
  }

  function handlePayoutChange(id: string, payoutStatus: PayoutStatus) {
    missionsStore.updatePayoutStatus(id, payoutStatus);
  }

  function handlePublishLive(id: string) {
    const success = missionsStore.publishLive(id);
    if (!success) {
      toast.error("Mission must be funded before publishing live.");
    } else {
      toast.success("Mission is now live on /missions.");
    }
  }

  // ── Computed stats (from shared store) ──
  const totalPendingReview = allMissions.filter(
    (m) => m.status === "pending_review",
  ).length;
  const totalPendingFunding = allMissions.filter(
    (m) => m.status === "pending_funding",
  ).length;
  const totalFunded = allMissions.filter((m) => m.status === "funded").length;
  const totalLive = allMissions.filter((m) => m.status === "live").length;

  // ── Filtered list ──
  const filtered =
    filterStatus === "All"
      ? allMissions
      : allMissions.filter((m) => m.status === filterStatus);

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
            onClick={() => navigate({ to: "/" })}
            className="text-xs text-muted-foreground hover:text-foreground underline"
          >
            Back to Admin
          </button>
        </div>
      </div>

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{totalFunded}</p>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">
            Funded
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
            "funded",
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
            data-ocid="admin.missions.tab"
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
        <div
          className="text-center py-16 text-muted-foreground text-sm"
          data-ocid="admin.missions.empty_state"
        >
          No missions in this category.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((mission, idx) => (
            <MissionRow
              key={mission.id}
              mission={mission}
              onView={() => setSelectedId(mission.id)}
              onStatusChange={(s) => handleStatusChange(mission.id, s)}
              onFundingChange={(f) => handleFundingChange(mission.id, f)}
              onPublishLive={() => handlePublishLive(mission.id)}
              data-ocid={`admin.missions.item.${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Mission detail drawer ── */}
      <Dialog
        open={!!selectedMission}
        onOpenChange={(open) => !open && setSelectedId(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="admin.missions.dialog"
        >
          {selectedMission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-bold pr-6">
                  {selectedMission.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Status + funding + payout row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={selectedMission.status} />
                  <FundingBadge status={selectedMission.fundingStatus} />
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
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Phase
                    </p>
                    <p className="text-foreground capitalize">
                      {selectedMission.phase.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-0.5">
                      Funding Status
                    </p>
                    <FundingBadge status={selectedMission.fundingStatus} />
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

                {/* Funded verification warning */}
                {selectedMission.fundingStatus !== "funded" &&
                  selectedMission.status !== "live" &&
                  selectedMission.status !== "closed" &&
                  selectedMission.status !== "rejected" && (
                    <div className="flex items-start gap-2 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                      <ShieldCheck className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-500 leading-relaxed">
                        This mission is not yet funded. Publish Live is blocked
                        until funding is verified and marked.
                      </p>
                    </div>
                  )}

                <Separator />

                {/* Admin actions */}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
                    Admin Actions
                  </p>
                  <AdminActionButtons
                    mission={selectedMission}
                    onStatusChange={(s) =>
                      handleStatusChange(selectedMission.id, s)
                    }
                    onFundingChange={(f) =>
                      handleFundingChange(selectedMission.id, f)
                    }
                    onPayoutChange={(p) =>
                      handlePayoutChange(selectedMission.id, p)
                    }
                    onPublishLive={() => handlePublishLive(selectedMission.id)}
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
