/**
 * CertificateShareSection.tsx
 *
 * Social share panel that appears below the Download Certificate button.
 * Uses the certificate's verify URL as the primary share destination.
 *
 * Share platforms: X, LinkedIn, Copy Link, (Facebook + Email as optional)
 * Pre-filled copy: dynamic, using world title and verify URL.
 * No new design system — reuses existing Button + icon patterns.
 *
 * Note: Email action shares a verification link and pre-filled text only.
 * It does NOT attach a PDF certificate.
 */

import { Button } from "@/components/ui/button";
import { Check, Facebook, Link, Linkedin, Mail, Share2 } from "lucide-react";
import { useState } from "react";

interface CertificateShareSectionProps {
  worldTitle: string;
  verifyUrl: string;
  /** Fallback world URL if verifyUrl is somehow empty */
  fallbackUrl?: string;
}

const JACKBEAR_URL = "https://jackbear.ai";

function resolveShareUrl(verifyUrl: string, fallbackUrl?: string): string {
  if (verifyUrl?.startsWith("http")) return verifyUrl;
  if (fallbackUrl?.startsWith("http")) return fallbackUrl;
  return JACKBEAR_URL;
}

function buildXText(worldTitle: string, shareUrl: string): string {
  return `I just earned my JackBear.ai certificate in ${worldTitle}.\n\nLearning the future of AI, sovereign compute, and the protocol internet.\n\nVerify it here:\n${shareUrl}`;
}

function buildLinkedInText(worldTitle: string, shareUrl: string): string {
  return `Just completed ${worldTitle} on JackBear.ai.\n\nNot just Web3 — verifiable intelligence infrastructure.\n\n${shareUrl}`;
}

export default function CertificateShareSection({
  worldTitle,
  verifyUrl,
  fallbackUrl,
}: CertificateShareSectionProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = resolveShareUrl(verifyUrl, fallbackUrl);
  const xText = buildXText(worldTitle, shareUrl);
  const liText = buildLinkedInText(worldTitle, shareUrl);

  function handleX() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleLinkedIn() {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(liText)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleEmail() {
    const subject = encodeURIComponent(
      `My JackBear.ai achievement — ${worldTitle}`,
    );
    const body = encodeURIComponent(xText);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="mt-3 p-3 rounded-lg border border-border bg-card/50"
      data-ocid="certificate.share_section"
    >
      <p
        className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
        style={{ letterSpacing: "0.08em" }}
      >
        Share your achievement
      </p>
      <div className="flex gap-2 flex-wrap">
        {/* X */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleX}
          data-ocid="certificate.share.x"
        >
          <Share2 size={12} />X
        </Button>

        {/* LinkedIn */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleLinkedIn}
          data-ocid="certificate.share.linkedin"
        >
          <Linkedin size={12} />
          LinkedIn
        </Button>

        {/* Facebook */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleFacebook}
          data-ocid="certificate.share.facebook"
        >
          <Facebook size={12} />
          Facebook
        </Button>

        {/* Email — sends verification link + text, no PDF attachment */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleEmail}
          data-ocid="certificate.share.email"
        >
          <Mail size={12} />
          Email achievement link
        </Button>

        {/* Copy Link */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs"
          onClick={handleCopy}
          data-ocid="certificate.share.copy"
        >
          {copied ? (
            <Check size={12} className="text-emerald-500" />
          ) : (
            <Link size={12} />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </Button>
      </div>
    </div>
  );
}
