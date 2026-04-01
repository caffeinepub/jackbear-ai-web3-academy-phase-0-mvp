import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { useState } from "react";

function getReferralHash(principal: string): string {
  return btoa(principal)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 8);
}

export default function ReferralPage() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const [copied, setCopied] = useState(false);

  const isLoggingIn = loginStatus === "logging-in";

  if (!identity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-primary/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="p-4 rounded-full bg-primary/10 inline-flex">
                <i className="fa-solid fa-user-plus text-primary text-3xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display mb-2">
                  Sign in to get your referral link
                </h2>
                <p className="text-muted-foreground text-sm">
                  Invite friends to JackBear.ai and help grow the Web3 learning
                  community.
                </p>
              </div>
              <Button
                onClick={login}
                disabled={isLoggingIn}
                size="lg"
                className="w-full"
                data-ocid="referral.submit_button"
              >
                {isLoggingIn ? "Logging in..." : "Login with Internet Identity"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const principal = identity.getPrincipal().toString();
  const hash = getReferralHash(principal);
  const referralUrl = `https://jackbear.app?ref=${hash}`;

  const tweetText = encodeURIComponent(
    `I'm learning Web3 and the Internet Computer on JackBear.ai — the most gamified Web3 academy on ICP. Join me! ${referralUrl}`,
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-background py-10" data-ocid="referral.page">
      <div className="container mx-auto px-4 max-w-xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/dashboard" })}
          className="mb-6 text-muted-foreground hover:text-foreground"
          data-ocid="referral.back.button"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Dashboard
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-user-plus text-primary text-xl" />
            <h1 className="text-3xl font-bold font-display">Refer a Friend</h1>
          </div>
          <p className="text-muted-foreground">
            Invite friends to JackBear.ai and help grow the Web3 learning
            community.
          </p>
        </div>

        {/* Referral link */}
        <Card className="border-primary/30 bg-primary/5 mb-5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <i className="fa-solid fa-link text-primary" />
              Your Referral Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 bg-background/60 rounded-md px-3 py-2 border border-border/50">
              <code className="text-xs text-foreground/80 flex-1 truncate">
                {referralUrl}
              </code>
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground border-border/40"
              >
                {hash}
              </Badge>
            </div>

            <Button
              size="lg"
              className="w-full shadow-glow-sm hover:shadow-glow-md transition-all"
              onClick={handleCopy}
              data-ocid="referral.primary_button"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Referral Link
                </>
              )}
            </Button>

            {copied && (
              <Alert
                className="border-emerald-500/30 bg-emerald-500/10"
                data-ocid="referral.success_state"
              >
                <AlertDescription className="text-emerald-400 text-sm">
                  <i className="fa-solid fa-circle-check mr-2" />
                  Link copied to clipboard!
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Social share */}
        <Card className="border-border/50 bg-card/60">
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-3">
              Share on social media:
            </p>
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-400 text-sm hover:bg-sky-500/20 transition-colors"
              data-ocid="referral.secondary_button"
            >
              <i className="fa-brands fa-x-twitter" />
              Share on X
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
