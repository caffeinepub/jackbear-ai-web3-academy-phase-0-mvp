import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, Zap } from "lucide-react";
import { useState } from "react";

const BP_SECTIONS = [
  {
    title: "Learning",
    items: [
      { label: "Lesson — first completion", value: "10 BP" },
      { label: "Quiz — first pass", value: "20 BP" },
      { label: "First lesson of the day", value: "+25% bonus" },
      { label: "Retry lesson / quiz", value: "0 BP" },
    ],
  },
  {
    title: "Decode Game",
    items: [
      { label: "Easy win", value: "5 BP" },
      { label: "Medium win", value: "10 BP" },
      { label: "Hard win", value: "20 BP" },
      { label: "Legendary win", value: "30 BP" },
    ],
  },
  {
    title: "Streak Multipliers",
    items: [
      { label: "Streak 1–3 days", value: "1.0×" },
      { label: "Streak 4–7 days", value: "1.1×" },
      { label: "Streak 8–14 days", value: "1.25×" },
      { label: "Streak 15+ days", value: "1.5×" },
    ],
  },
  {
    title: "Daily Volume Limits",
    items: [
      { label: "Lessons 1–5 per day", value: "100%" },
      { label: "Lessons 6–10 per day", value: "50%" },
      { label: "Lessons 11+ per day", value: "20%" },
    ],
  },
  {
    title: "Bonuses",
    items: [
      { label: "Hidden Fragments", value: "varies" },
      { label: "Quests", value: "varies" },
    ],
  },
];

export default function HowToEarnBPWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-border bg-card hover:bg-card/80 hover:border-primary/30 transition-colors text-left group"
        aria-label="How to earn Bear Points — tap to view"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 shrink-0">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              How to Earn BP
            </p>
            <p className="text-xs text-muted-foreground">
              Tap to view all BP rules
            </p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              How to Earn BP
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-1">
            {BP_SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">
                  {section.title}
                </p>
                <div className="rounded-lg border border-border overflow-hidden">
                  {section.items.map(({ label, value }, idx) => (
                    <div
                      key={label}
                      className={`flex items-center justify-between px-3 py-2.5 text-sm ${
                        idx < section.items.length - 1
                          ? "border-b border-border/60"
                          : ""
                      }`}
                    >
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-semibold text-foreground tabular-nums">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
