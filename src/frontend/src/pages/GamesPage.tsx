import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Gamepad2, Grid3X3, Sparkles } from "lucide-react";

export default function GamesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Games Hub
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Play &amp; Discover
          </h1>
          <p className="text-muted-foreground text-base">
            Learn ICP through play. Every game teaches real concepts.
          </p>
        </div>

        {/* Featured: Decode */}
        <div className="rounded-2xl border border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-950/30 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/50 px-2.5 py-1 rounded-full border border-violet-200 dark:border-violet-800">
                  <Gamepad2 className="h-3.5 w-3.5" />
                  Featured
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                ICP Decode
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-md">
                Solve. Unlock. Discover hidden fragments. Decode ICP terminology
                one letter at a time and recover Coherence Keys hidden across
                the platform.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded-full">
                  🔑 Coherence Keys
                </span>
                <span className="bg-muted px-2 py-1 rounded-full">
                  ⚡ BP Rewards
                </span>
                <span className="bg-muted px-2 py-1 rounded-full">
                  🎯 Daily challenge
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button
                size="lg"
                className="font-semibold bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white w-full md:w-auto"
                onClick={() => void navigate({ to: "/hangman" })}
              >
                Play Decode
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Crossword */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Grid3X3 className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-bold text-foreground">
                  Daily Crossword
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Daily glossary puzzle. Same puzzle for all players. New one
                every day.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-muted px-2 py-1 rounded-full">
                📅 Daily reset
              </span>
              <span className="bg-muted px-2 py-1 rounded-full">
                📖 Glossary terms
              </span>
            </div>
            <Button
              variant="outline"
              className="mt-auto font-medium border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              onClick={() => void navigate({ to: "/crossword" })}
            >
              Play Crossword
            </Button>
          </div>

          {/* Hidden Fragments */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h2 className="text-lg font-bold text-foreground">
                  Hidden Fragments
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Discover and unlock hidden knowledge scattered across the
                platform. Progress-driven discovery — explore to find them.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="bg-muted px-2 py-1 rounded-full">
                🔍 Exploration
              </span>
              <span className="bg-muted px-2 py-1 rounded-full">
                ✨ Rare discoveries
              </span>
            </div>
            <Button
              variant="outline"
              className="mt-auto font-medium border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
              onClick={() => void navigate({ to: "/dashboard" })}
            >
              View Discoveries
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
