/**
 * MyCertificatesSection.tsx
 *
 * Dashboard section: "My Credentials"
 * Shows one row per earned certificate (worlds where all lessons are done).
 * Actions: Download PDF, Reprint PDF, Copy Verification Link, Open Verification Page,
 *          Share on X, Share on LinkedIn.
 *
 * LOADING RESILIENCE: Shows a skeleton/placeholder card while progress is still
 * loading so the section does not disappear prematurely. Only hides once it is
 * confidently known (data loaded, earnedWorlds.length === 0) that there are no
 * earned certificates.
 *
 * No backend dependency. No changes to completion logic.
 */

import type { LessonProgress } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  Check,
  Copy,
  Download,
  ExternalLink,
  Linkedin,
  RefreshCw,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { downloadCertificate } from "../../lib/generateCertificate";
import { isLessonUnlockedInWorld } from "../../lib/worldProgress";
import { WORLDS, type WorldDef } from "../../pages/CoursesPage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CertEntry {
  world: WorldDef;
  verifyUrl: string | null;
  certificateId: string | null;
  issuedLabel: string | null;
}

interface MyCertificatesSectionProps {
  allProgress: LessonProgress[];
  /** ICP principal text — passed to PDF generator for optional display */
  principal?: string | null;
  /**
   * True while the backend lesson-progress query is still in flight.
   * When true, the section shows a loading skeleton instead of collapsing
   * to null — prevents the card from disappearing prematurely.
   */
  isProgressLoading?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * A world qualifies for "My Credentials" when all its lessons are completed.
 * Boss Quiz completion is NOT required.
 */
function isWorldFullyComplete(
  world: WorldDef,
  progress: LessonProgress[],
): boolean {
  return world.lessons.every((lesson) =>
    isLessonUnlockedInWorld(lesson.id, progress),
  );
}

function buildXShareText(worldTitle: string, url: string): string {
  return `I just earned my JackBear.ai certificate in ${worldTitle}.\n\nLearning the future of AI, sovereign compute, and the protocol internet.\n\nVerify it here:\n${url}`;
}

function buildLinkedInShareUrl(worldTitle: string, url: string): string {
  const summary = `Just completed ${worldTitle} on JackBear.ai. Not just Web3 — verifiable intelligence infrastructure. ${url}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(summary)}`;
}

// ─── Loading skeleton card ────────────────────────────────────────────────────

function CertificateLoadingSkeleton() {
  return (
    <Card className="border-primary/20" data-ocid="my_certificates.loading">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          My Credentials
        </CardTitle>
        <p className="text-xs text-muted-foreground">Checking credentials...</p>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-3">
        <div className="rounded-xl border border-border bg-card/60 p-4 space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-7 w-24 rounded-md" />
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-3 w-3/4" />
      </CardContent>
    </Card>
  );
}

// ─── Per-certificate row ─────────────────────────────────────────────────────

interface CertRowProps {
  entry: CertEntry;
  principal?: string | null;
  onUpdate: (worldId: string, verifyUrl: string, certId: string) => void;
}

function CertRow({ entry, principal, onUpdate }: CertRowProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareExpanded, setShareExpanded] = useState(false);
  const navigate = useNavigate();

  const { world, verifyUrl, certificateId, issuedLabel } = entry;

  const shareUrl = verifyUrl ?? "https://jackbear.ai";

  async function triggerDownload(label: "Download" | "Reprint") {
    if (downloading) return;
    setDownloading(true);
    try {
      const result = await downloadCertificate({
        worldId: world.id,
        worldTitle: world.title,
        worldSubtitle: world.subtitle,
        principal: principal ?? undefined,
      });
      onUpdate(world.id, result.verifyUrl, result.certificateId);
    } catch (e) {
      console.warn(`[MyCertificatesSection] ${label} failed`, e);
    } finally {
      setDownloading(false);
    }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleOpenVerify() {
    if (!verifyUrl) return;
    const tokenMatch = verifyUrl.match(/\/verify\/(.+)$/);
    if (tokenMatch) {
      navigate({ to: `/verify/${tokenMatch[1]}` });
    } else {
      window.open(verifyUrl, "_blank", "noopener,noreferrer");
    }
  }

  function handleShareX() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(buildXShareText(world.title, shareUrl))}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleShareLinkedIn() {
    window.open(
      buildLinkedInShareUrl(world.title, shareUrl),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div
      className="rounded-xl border border-border bg-card/60 p-4 space-y-3"
      data-ocid={`certificate.row.${world.id}`}
      data-sovereign-credential="true"
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
          <Award className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight truncate">
            {world.title}
          </p>
          {world.subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {world.subtitle}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 h-4 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
            >
              Completed
            </Badge>
            {certificateId && (
              <span className="text-[10px] font-mono text-muted-foreground/60">
                ID: {certificateId}
              </span>
            )}
            {issuedLabel && (
              <span className="text-[10px] text-muted-foreground/50">
                {issuedLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Primary actions */}
      <div className="flex gap-2 flex-wrap">
        <Button
          size="sm"
          variant="default"
          className="gap-1.5 text-xs h-7 px-3"
          onClick={() => triggerDownload("Download")}
          disabled={downloading}
          data-ocid={`certificate.download.${world.id}`}
        >
          {downloading ? (
            <RefreshCw size={11} className="animate-spin" />
          ) : (
            <Download size={11} />
          )}
          {downloading
            ? "Generating..."
            : verifyUrl
              ? "Reprint PDF"
              : "Download PDF"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-xs h-7 px-3"
          onClick={handleCopyLink}
          data-ocid={`certificate.copy_link.${world.id}`}
        >
          {copied ? (
            <Check size={11} className="text-emerald-500" />
          ) : (
            <Copy size={11} />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 text-xs h-7 px-3"
          onClick={handleOpenVerify}
          disabled={!verifyUrl}
          title={
            verifyUrl
              ? "Open verification page"
              : "Download PDF first to generate a verify link"
          }
          data-ocid={`certificate.verify.${world.id}`}
        >
          <ExternalLink size={11} />
          Verify
        </Button>

        <Button
          size="sm"
          variant="outline"
          className={`gap-1.5 text-xs h-7 px-3 ${
            shareExpanded ? "border-primary/40 text-primary" : ""
          }`}
          onClick={() => setShareExpanded((v) => !v)}
          data-ocid={`certificate.share_toggle.${world.id}`}
        >
          <Share2 size={11} />
          Share
        </Button>
      </div>

      {shareExpanded && (
        <div className="flex gap-2 flex-wrap pl-0.5">
          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-xs h-7 px-2.5 text-muted-foreground hover:text-foreground"
            onClick={handleShareX}
          >
            <Share2 size={10} />X (Twitter)
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1.5 text-xs h-7 px-2.5 text-muted-foreground hover:text-foreground"
            onClick={handleShareLinkedIn}
          >
            <Linkedin size={10} />
            LinkedIn
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Main section component ───────────────────────────────────────────────────

export default function MyCertificatesSection({
  allProgress,
  principal,
  isProgressLoading = false,
}: MyCertificatesSectionProps) {
  const [sessionCerts, setSessionCerts] = useState<
    Record<
      string,
      { verifyUrl: string; certificateId: string; issuedLabel: string }
    >
  >({});

  // Build list of earned certs from progress
  const earnedWorlds = WORLDS.filter((w) =>
    isWorldFullyComplete(w, allProgress),
  );

  // LOADING RESILIENCE:
  // - While progress is still loading (isProgressLoading=true) AND we have no
  //   confirmed earned worlds yet, show a skeleton placeholder instead of null.
  //   This prevents the card from blinking out during slow backend responses.
  // - Once loading is complete and earnedWorlds is still empty, hide the section.
  if (earnedWorlds.length === 0) {
    if (isProgressLoading) {
      return <CertificateLoadingSkeleton />;
    }
    // Loading done, no earned worlds — confidently hide
    return null;
  }

  const now = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handleCertUpdate(
    worldId: string,
    verifyUrl: string,
    certId: string,
  ) {
    setSessionCerts((prev) => ({
      ...prev,
      [worldId]: {
        verifyUrl,
        certificateId: certId,
        issuedLabel: `Downloaded ${now}`,
      },
    }));
  }

  const entries: CertEntry[] = earnedWorlds.map((world) => {
    const session = sessionCerts[world.id];
    return {
      world,
      verifyUrl: session?.verifyUrl ?? null,
      certificateId: session?.certificateId ?? null,
      issuedLabel: session?.issuedLabel ?? null,
    };
  });

  return (
    <Card className="border-primary/20" data-ocid="my_certificates.section">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          My Credentials
          <Badge variant="secondary" className="ml-1 text-xs px-1.5 h-4">
            {entries.length}
          </Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Download, verify, or share your earned certificates
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-3">
        {entries.map((entry) => (
          <CertRow
            key={entry.world.id}
            entry={entry}
            principal={principal}
            onUpdate={handleCertUpdate}
          />
        ))}
        <p className="text-[10px] text-muted-foreground/40 pt-1">
          Certificates are generated on-demand. Download first to enable
          verification links.
        </p>
      </CardContent>
    </Card>
  );
}
