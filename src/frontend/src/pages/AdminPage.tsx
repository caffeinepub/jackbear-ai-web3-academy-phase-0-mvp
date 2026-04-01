import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { formatMonthKey } from "@/lib/monthlyPrize";
import {
  type WinnerClaim,
  getWinnerClaims as backendGetWinnerClaims,
  markClaimPaid as backendMarkClaimPaid,
} from "@/lib/sharedLeaderboard";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { UpdateEntry } from "./UpdatesPage";

const ADMIN_PRINCIPAL =
  "pkt5m-vzera-uztne-or4se-vgejr-xajuz-ulw55-zdxon-3euz7-gvakp-5qe";

// ── Backend-powered Monthly Prize Claims Section ─────────────────────────

function AdminPrizeClaims({ actor }: { actor: any }) {
  const [claims, setClaims] = useState<WinnerClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [paidMsg, setPaidMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!actor) return;
    backendGetWinnerClaims(actor)
      .then((data) => {
        setClaims(data);
        setLoading(false);
      })
      .catch(() => {
        setErrorMsg("Failed to load claims from backend.");
        setLoading(false);
      });
  }, [actor]);

  const handleMarkPaid = async (claim: WinnerClaim) => {
    try {
      await backendMarkClaimPaid(
        actor,
        Number(claim.month),
        Number(claim.year),
      );
      setClaims((prev) =>
        prev.map((c) =>
          c.month === claim.month && c.year === claim.year
            ? { ...c, isPaid: true }
            : c,
        ),
      );
      const key = `${claim.year}-${String(Number(claim.month)).padStart(2, "0")}`;
      setPaidMsg(`Marked ${formatMonthKey(key)} winner as paid.`);
      setTimeout(() => setPaidMsg(""), 4000);
    } catch {
      setErrorMsg("Failed to mark as paid. Try again.");
    }
  };

  const formatClaimMonth = (claim: WinnerClaim) => {
    const key = `${claim.year}-${String(Number(claim.month)).padStart(2, "0")}`;
    return formatMonthKey(key);
  };

  const pending = claims.filter((c) => !c.isPaid);
  const paid = claims.filter((c) => c.isPaid);

  return (
    <Card className="border-border/50 bg-card/60" data-ocid="admin.card">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <i className="fa-solid fa-coins text-yellow-400" />
          Monthly Prize Claims
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {paidMsg && (
          <Alert
            className="border-emerald-500/30 bg-emerald-500/10"
            data-ocid="admin.success_state"
          >
            <AlertDescription className="text-emerald-400 text-sm">
              <i className="fa-solid fa-circle-check mr-2" />
              {paidMsg}
            </AlertDescription>
          </Alert>
        )}
        {errorMsg && (
          <Alert
            className="border-red-500/30 bg-red-500/10"
            data-ocid="admin.error_state"
          >
            <AlertDescription className="text-red-400 text-sm">
              <i className="fa-solid fa-triangle-exclamation mr-2" />
              {errorMsg}
            </AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-2" data-ocid="admin.loading_state">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <>
            {/* Pending claims */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Pending ({pending.length})
              </p>
              {pending.length === 0 ? (
                <div
                  className="text-sm text-muted-foreground py-3 text-center bg-background/30 rounded-md"
                  data-ocid="admin.empty_state"
                >
                  No pending claims.
                </div>
              ) : (
                <div className="space-y-2">
                  {pending.map((claim) => (
                    <div
                      key={`${claim.month}-${claim.year}`}
                      data-ocid="admin.row"
                      style={{
                        background: "oklch(0.14 0.05 290)",
                        border: "1px solid oklch(0.3 0.1 290)",
                        borderRadius: 8,
                        padding: "12px 14px",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="text-sm font-bold"
                              style={{ color: "oklch(0.85 0.12 290)" }}
                            >
                              {formatClaimMonth(claim)}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded"
                              style={{
                                background: "oklch(0.2 0.08 55 / 0.3)",
                                color: "oklch(0.72 0.18 55)",
                                border: "1px solid oklch(0.45 0.18 55 / 0.4)",
                              }}
                            >
                              $100 USDC
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <i className="fa-solid fa-user mr-1" />
                            {claim.displayName}
                          </div>
                          <div
                            className="text-xs font-mono break-all"
                            style={{ color: "oklch(0.65 0.14 290)" }}
                          >
                            <i className="fa-solid fa-wallet mr-1" />
                            {claim.usdcAddress}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <i className="fa-solid fa-clock mr-1" />
                            Submitted:{" "}
                            {new Date(
                              Number(claim.submittedAt) / 1_000_000,
                            ).toLocaleString()}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleMarkPaid(claim)}
                          data-ocid="admin.confirm_button"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs shrink-0"
                        >
                          <i className="fa-solid fa-circle-check mr-1" />
                          Mark as Paid
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Paid history */}
            {paid.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Paid History ({paid.length})
                </p>
                <div className="space-y-1">
                  {paid.map((claim) => (
                    <div
                      key={`${claim.month}-${claim.year}-paid`}
                      data-ocid="admin.row"
                      className="flex items-center justify-between bg-background/30 rounded-md px-3 py-2 text-sm gap-3"
                    >
                      <span style={{ color: "oklch(0.65 0.1 290)" }}>
                        {formatClaimMonth(claim)}
                      </span>
                      <span className="text-xs text-muted-foreground truncate flex-1">
                        {claim.displayName}
                      </span>
                      <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30">
                        Paid
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ── Admin page ────────────────────────────────────────────────────────────

export default function AdminPage() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const { actor } = useActor();

  const isLoggingIn = loginStatus === "logging-in";
  const principalStr = identity?.getPrincipal().toText() ?? null;
  const isAdmin = principalStr === ADMIN_PRINCIPAL;

  // Redirect non-admins
  useEffect(() => {
    if (identity && !isAdmin) {
      void navigate({ to: "/" });
    }
  }, [identity, isAdmin, navigate]);

  // Feature flags
  const [easterEggsEnabled, setEasterEggsEnabled] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ff_easterEggs") ?? "true");
    } catch {
      return true;
    }
  });
  const [rewardEngineEnabled, setRewardEngineEnabled] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ff_rewardEngine") ?? "true");
    } catch {
      return true;
    }
  });

  const toggleEasterEggs = (v: boolean) => {
    setEasterEggsEnabled(v);
    localStorage.setItem("ff_easterEggs", JSON.stringify(v));
  };
  const toggleRewardEngine = (v: boolean) => {
    setRewardEngineEnabled(v);
    localStorage.setItem("ff_rewardEngine", JSON.stringify(v));
  };

  // Changelog
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("feature");
  const [changelogMsg, setChangelogMsg] = useState("");

  const addChangelogEntry = () => {
    if (!newTitle.trim()) return;
    try {
      const raw = localStorage.getItem("jb_custom_updates");
      const entries: UpdateEntry[] = raw ? JSON.parse(raw) : [];
      entries.unshift({
        version: `v${Date.now().toString(36).slice(-4).toUpperCase()}`,
        date: new Date().toISOString().split("T")[0],
        title: newTitle.trim(),
        description: newDesc.trim() || "No description.",
        category: newCategory as UpdateEntry["category"],
      });
      localStorage.setItem("jb_custom_updates", JSON.stringify(entries));
      setNewTitle("");
      setNewDesc("");
      setChangelogMsg("Entry added successfully.");
      setTimeout(() => setChangelogMsg(""), 3000);
    } catch {
      // ignore
    }
  };

  // Announcements
  const [announcement, setAnnouncement] = useState("");
  const [announcementMsg, setAnnouncementMsg] = useState("");

  const pushAnnouncement = () => {
    if (!announcement.trim()) return;
    try {
      const raw = localStorage.getItem("jb_notifications");
      const notifs = raw ? JSON.parse(raw) : [];
      notifs.unshift({
        id: `ann-${Date.now()}`,
        type: "announcement",
        message: announcement.trim(),
        timestamp: Date.now(),
        read: false,
      });
      localStorage.setItem("jb_notifications", JSON.stringify(notifs));
      setAnnouncement("");
      setAnnouncementMsg("Announcement pushed.");
      setTimeout(() => setAnnouncementMsg(""), 3000);
    } catch {
      // ignore
    }
  };

  // Not logged in
  if (!identity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-sm w-full border-border/50 bg-card/60">
          <CardContent className="pt-6 text-center space-y-4">
            <i
              className="fas fa-lock"
              style={{ fontSize: 32, color: "oklch(0.55 0.14 290)" }}
            />
            <div className="text-lg font-bold">Admin Access Required</div>
            <p className="text-sm text-muted-foreground">
              Login with your admin Internet Identity to continue.
            </p>
            <Button
              onClick={() => login()}
              disabled={isLoggingIn}
              className="w-full"
              data-ocid="admin.primary_button"
            >
              {isLoggingIn ? "Logging in..." : "Login with Internet Identity"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-sm w-full border-border/50">
          <CardContent className="pt-6 text-center">
            <i
              className="fas fa-ban"
              style={{
                fontSize: 32,
                color: "oklch(0.55 0.18 25)",
                marginBottom: 12,
                display: "block",
              }}
            />
            <div className="text-lg font-bold">Access Denied</div>
            <p className="text-sm text-muted-foreground mt-2">
              This panel is restricted to authorized administrators.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10" data-ocid="admin.page">
      <div className="container mx-auto px-4 max-w-3xl space-y-6">
        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.08 290 / 0.4), oklch(0.13 0.05 290 / 0.3))",
            border: "1px solid oklch(0.3 0.1 290 / 0.5)",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <div className="flex items-center gap-3">
            <i
              className="fas fa-shield-halved"
              style={{ color: "oklch(0.72 0.18 290)", fontSize: 24 }}
            />
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground font-mono">
                {principalStr}
              </p>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <Card className="border-border/50 bg-card/60" data-ocid="admin.card">
          <CardHeader>
            <CardTitle className="text-base">
              <i className="fa-solid fa-chart-bar mr-2 text-purple-400" />
              Platform Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Lessons", value: "80" },
                { label: "Worlds", value: "8" },
                { label: "Easter Eggs", value: "9" },
                { label: "Glossary Terms", value: "100+" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ color: "oklch(0.72 0.2 290)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Prize Claims — backend powered */}
        <AdminPrizeClaims actor={actor} />

        {/* World 8 Codes */}
        <Card className="border-border/50 bg-card/60" data-ocid="admin.card">
          <CardHeader>
            <CardTitle className="text-base">
              <i className="fa-solid fa-key mr-2 text-cyan-400" />
              World 8 Unlock Codes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { key: "HUMAN", hint: "From LinkedIn" },
              { key: "INTELLIGENCE", hint: "From X (Twitter)" },
              { key: "SOVEREIGN", hint: "From Instagram" },
            ].map((c) => (
              <div
                key={c.key}
                className="flex items-center justify-between bg-background/40 rounded-lg px-4 py-2"
              >
                <span
                  className="font-mono text-sm"
                  style={{ color: "oklch(0.75 0.16 200)" }}
                >
                  {c.key}
                </span>
                <span className="text-xs text-muted-foreground">{c.hint}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Push Announcement */}
        <Card className="border-border/50 bg-card/60" data-ocid="admin.card">
          <CardHeader>
            <CardTitle className="text-base">
              <i className="fa-solid fa-bullhorn mr-2 text-orange-400" />
              Push Announcement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcementMsg && (
              <Alert
                className="border-emerald-500/30 bg-emerald-500/10"
                data-ocid="admin.success_state"
              >
                <AlertDescription className="text-emerald-400 text-sm">
                  {announcementMsg}
                </AlertDescription>
              </Alert>
            )}
            <Textarea
              placeholder="Platform announcement message..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="min-h-[80px]"
              data-ocid="admin.textarea"
            />
            <Button
              onClick={pushAnnouncement}
              size="sm"
              data-ocid="admin.submit_button"
            >
              <i className="fa-solid fa-paper-plane mr-2" />
              Push to All Users
            </Button>
          </CardContent>
        </Card>

        {/* Add Changelog Entry */}
        <Card className="border-border/50 bg-card/60" data-ocid="admin.card">
          <CardHeader>
            <CardTitle className="text-base">
              <i className="fa-solid fa-pen-to-square mr-2 text-blue-400" />
              Add What's New Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {changelogMsg && (
              <Alert
                className="border-emerald-500/30 bg-emerald-500/10"
                data-ocid="admin.success_state"
              >
                <AlertDescription className="text-emerald-400 text-sm">
                  {changelogMsg}
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="changelog-title">Title</Label>
              <Input
                id="changelog-title"
                placeholder="Feature title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                data-ocid="admin.input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="changelog-desc">Description</Label>
              <Textarea
                id="changelog-desc"
                placeholder="What changed?"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="min-h-[60px]"
                data-ocid="admin.textarea"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="changelog-cat">Category</Label>
              <select
                id="changelog-cat"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm"
                data-ocid="admin.select"
              >
                <option value="feature">Feature</option>
                <option value="fix">Fix</option>
                <option value="content">Content</option>
                <option value="milestone">Milestone</option>
              </select>
            </div>
            <Button
              onClick={addChangelogEntry}
              size="sm"
              data-ocid="admin.submit_button"
            >
              <i className="fa-solid fa-plus mr-2" />
              Add Entry
            </Button>
          </CardContent>
        </Card>

        {/* Feature Flags */}
        <Card className="border-border/50 bg-card/60" data-ocid="admin.card">
          <CardHeader>
            <CardTitle className="text-base">
              <i className="fa-solid fa-toggle-on mr-2 text-green-400" />
              Feature Flags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Easter Egg System</div>
                <div className="text-xs text-muted-foreground">
                  Enable all 9 easter egg triggers
                </div>
              </div>
              <Switch
                checked={easterEggsEnabled}
                onCheckedChange={toggleEasterEggs}
                data-ocid="admin.switch"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Reward Engine</div>
                <div className="text-xs text-muted-foreground">
                  Enable Bear Points reward system
                </div>
              </div>
              <Switch
                checked={rewardEngineEnabled}
                onCheckedChange={toggleRewardEngine}
                data-ocid="admin.switch"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2">
          {[
            ["/leaderboard", "Leaderboard"],
            ["/monthly-prize", "Monthly Prize"],
            ["/bp-history", "BP History"],
            ["/updates", "Changelog"],
          ].map(([to, label]) => (
            <Button
              key={to}
              variant="outline"
              size="sm"
              onClick={() => void navigate({ to: to as any })}
              data-ocid="admin.link"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
