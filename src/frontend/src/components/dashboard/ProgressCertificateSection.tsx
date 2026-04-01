import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, Shield } from "lucide-react";

interface ProgressCertificateSectionProps {
  completedLessons: number;
  userDisplayName: string | undefined;
}

export default function ProgressCertificateSection({
  completedLessons,
  userDisplayName,
}: ProgressCertificateSectionProps) {
  if (completedLessons < 70) return null;

  const displayName = userDisplayName || "Web3 Scholar";
  const completionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = () => {
    setTimeout(() => window.print(), 150);
  };

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .certificate-print-target,
          .certificate-print-target * { visibility: visible !important; }
          .certificate-print-target {
            position: fixed !important;
            inset: 0 !important;
            z-index: 9999 !important;
            background: white !important;
            overflow: visible !important;
            padding: 2rem !important;
          }
        }
      `}</style>

      <Card
        data-ocid="certificate.card"
        className="certificate-print-target surface-elevated relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-card to-card"
        style={{
          backgroundImage:
            "linear-gradient(var(--background), var(--background)), linear-gradient(135deg, oklch(var(--primary)), oklch(var(--accent)), oklch(var(--primary)))",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        {/* Glow accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
        </div>

        <CardContent className="pt-8 pb-8 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Icon cluster */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 rounded-full bg-accent/20 border border-accent/30">
                  <Shield className="h-3 w-3 text-accent" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                JackBear.ai Academy
              </p>
              <h2 className="text-3xl font-display font-bold gradient-text-primary">
                Certificate of Completion
              </h2>
            </div>

            {/* Body */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                This certifies that
              </p>
              <p className="text-2xl font-display font-semibold text-foreground">
                {displayName}
              </p>
              <p className="text-muted-foreground text-sm">
                has successfully completed
              </p>
              <p className="text-lg font-semibold gradient-text-primary">
                70 lessons across 7 core worlds (Worlds 0–6)
              </p>
              <p className="text-muted-foreground text-sm">
                of the JackBear.ai Web3 &amp; Internet Computer Academy
              </p>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-sm font-medium">{completionDate}</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Verified by</p>
                <p className="text-sm font-medium">jackbear.app</p>
              </div>
            </div>

            {/* Action */}
            <Button
              data-ocid="certificate.download_button"
              onClick={handleDownload}
              className="shadow-glow-sm hover:shadow-glow-md transition-all"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
