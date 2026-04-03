import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Shield,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  type CertPayload,
  decodeCertToken,
  verifyCertIntegrity,
} from "../lib/certToken";

// ─── Result states ────────────────────────────────────────────────────────────

type VerifyState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "verified"; payload: CertPayload; certificateId: string }
  | { status: "failed"; reason: string }
  | { status: "invalid" };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractTokenFromInput(input: string): string {
  const trimmed = input.trim();
  const verifyMatch = trimmed.match(/\/verify\/([A-Za-z0-9_-]+)$/);
  if (verifyMatch) return verifyMatch[1];
  const urlMatch = trimmed.match(/[?#&]?token=([A-Za-z0-9_-]+)/);
  if (urlMatch) return urlMatch[1];
  return trimmed;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function VerifyPage() {
  // useParams must be called unconditionally at the top level
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams({ strict: false }) as any;
  const tokenParam = params?.token as string | undefined;

  const [state, setState] = useState<VerifyState>({ status: "idle" });
  const [manualInput, setManualInput] = useState("");

  const runVerification = useCallback(async (rawToken: string) => {
    setState({ status: "loading" });
    const token = extractTokenFromInput(rawToken);
    if (!token) {
      setState({ status: "invalid" });
      return;
    }
    const payload = decodeCertToken(token);
    if (!payload) {
      setState({ status: "invalid" });
      return;
    }
    const intact = await verifyCertIntegrity(payload);
    if (intact) {
      const certId = payload.payloadHash.slice(0, 16).toUpperCase();
      setState({ status: "verified", payload, certificateId: certId });
    } else {
      setState({
        status: "failed",
        reason:
          "The certificate data does not match its recorded hash. It may have been modified after generation.",
      });
    }
  }, []);

  // Auto-verify when token is present in the URL
  useEffect(() => {
    if (tokenParam) {
      runVerification(tokenParam);
    }
  }, [tokenParam, runVerification]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        {/* Page header */}
        <div className="space-y-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            JackBear.ai
          </Link>
          <div className="flex items-center gap-3 pt-1">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Certificate Verification
              </h1>
              <p className="text-sm text-muted-foreground">
                Integrity check — Phase 1
              </p>
            </div>
          </div>
        </div>

        {/* Manual entry (shown when no token in URL and not yet verifying) */}
        {!tokenParam && state.status === "idle" && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Verify a certificate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Paste the verification URL or token from the certificate footer.
              </p>
              <div className="space-y-3">
                <textarea
                  className="w-full h-24 px-3 py-2 text-sm font-mono rounded-md border border-border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="https://jackbear.ai/verify/eyJ..."
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                />
                <Button
                  onClick={() => runVerification(manualInput)}
                  disabled={!manualInput.trim()}
                  className="w-full"
                >
                  Verify certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading */}
        {state.status === "loading" && (
          <Card>
            <CardContent className="py-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">
                Verifying integrity...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Verified */}
        {state.status === "verified" && (
          <div className="space-y-4">
            <Card className="border-green-500/40 bg-green-500/5">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-green-500/15 shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-green-400">
                        Verified for integrity
                      </p>
                      <Badge
                        variant="outline"
                        className="text-xs border-green-500/40 text-green-400"
                      >
                        Phase 1
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This certificate has not been modified since it was
                      generated.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Certificate Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <DetailRow label="World" value={state.payload.worldTitle} />
                {state.payload.worldSubtitle && (
                  <DetailRow
                    label="Subtitle"
                    value={state.payload.worldSubtitle}
                  />
                )}
                <DetailRow
                  label="Issued"
                  value={`${formatDate(state.payload.issuedAt)} (${state.payload.issuedMonth})`}
                />
                <DetailRow
                  label="Principal"
                  value={state.payload.principal ?? "Anonymous Learner"}
                  mono
                />
                <DetailRow label="Platform" value={state.payload.platform} />
                <DetailRow
                  label="Schema Version"
                  value={state.payload.version}
                />
                <div className="pt-2 border-t border-border">
                  <DetailRow
                    label="Certificate ID"
                    value={state.certificateId}
                    mono
                    muted={false}
                  />
                </div>
              </CardContent>
            </Card>

            <DisclaimerBlock />
          </div>
        )}

        {/* Failed — hash mismatch */}
        {state.status === "failed" && (
          <div className="space-y-4">
            <Card className="border-red-500/40 bg-red-500/5">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-red-500/15 shrink-0">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-red-400">
                      Integrity check failed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {state.reason}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <DisclaimerBlock />
            <TryAgainButton onClick={() => setState({ status: "idle" })} />
          </div>
        )}

        {/* Invalid token */}
        {state.status === "invalid" && (
          <div className="space-y-4">
            <Card className="border-amber-500/40 bg-amber-500/5">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-amber-500/15 shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-amber-400">
                      Unrecognized certificate token
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The token could not be decoded. Check that the full URL or
                      token was pasted correctly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <TryAgainButton onClick={() => setState({ status: "idle" })} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DetailRow({
  label,
  value,
  mono = false,
  muted = true,
}: {
  label: string;
  value: string;
  mono?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-4 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span
        className={[
          "text-right break-all",
          mono ? "font-mono text-xs" : "",
          muted ? "text-foreground" : "text-primary font-medium",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

function DisclaimerBlock() {
  return (
    <Card className="border-border/50">
      <CardContent className="pt-5 pb-5">
        <div className="flex gap-3">
          <div className="w-0.5 bg-muted-foreground/20 shrink-0 rounded" />
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              About Phase 1 Verification
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This integrity check confirms the certificate has not been
              modified since it was generated. It does not confirm
              backend-issued authenticity or that a completion record exists in
              the JackBear.ai registry.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Backend registry verification (Phase 2) will be introduced in a
              future update and will allow any certificate to be confirmed
              against an on-chain record.
            </p>
            <a
              href="https://jackbear.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              JackBear.ai <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TryAgainButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="outline" className="w-full" onClick={onClick}>
      Try a different certificate
    </Button>
  );
}
