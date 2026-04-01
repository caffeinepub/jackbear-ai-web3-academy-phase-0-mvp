import type { LessonProgress } from "@/backend";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy } from "lucide-react";

const WORLD_IDS = [1, 2, 3, 4, 5, 6];

// Lesson IDs belonging to each numbered core world.
// Used for the allProgress fallback when jb_world_completion_times is absent.
const WORLD_LESSON_IDS: Record<number, string[]> = {
  1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  2: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
  3: ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
  4: ["31", "32", "33", "34", "35", "36", "37", "38", "39", "40"],
  5: ["41", "42", "43", "44", "45", "46", "47", "48", "49", "50"],
  6: ["51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
};

/** Derive how many consecutive worlds (1–6) are fully completed from allProgress. */
function deriveWorldsDoneFromProgress(allProgress: LessonProgress[]): number {
  const progressMap = new Map<string, boolean>();
  for (const p of allProgress) {
    progressMap.set(p.lessonId, p.completed);
  }

  let worldsDone = 0;
  for (const worldId of WORLD_IDS) {
    const lessonIds = WORLD_LESSON_IDS[worldId];
    const allComplete = lessonIds.every((id) => progressMap.get(id) === true);
    if (allComplete) {
      worldsDone = worldId; // worlds complete up through this id
    } else {
      break; // stop at first incomplete world
    }
  }

  return worldsDone;
}

function computeStreak(allProgress?: LessonProgress[]): {
  streak: number;
  lastWorldDone: number;
  fromFallback: boolean;
} {
  let raw: Record<string, string> = {};
  try {
    const stored = localStorage.getItem("jb_world_completion_times");
    if (stored) raw = JSON.parse(stored);
  } catch {
    // ignore
  }

  const completionTimes = WORLD_IDS.map((id) => {
    const ts = raw[String(id)];
    return ts ? new Date(ts).getTime() : null;
  }).filter((t): t is number => t !== null);

  // Primary path — localStorage has world completion data
  if (completionTimes.length > 0) {
    completionTimes.sort((a, b) => a - b);
    let streak = 1;
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    for (let i = 1; i < completionTimes.length; i++) {
      if (completionTimes[i] - completionTimes[i - 1] <= SEVEN_DAYS_MS) {
        streak++;
      } else {
        streak = 1;
      }
    }
    return {
      streak,
      lastWorldDone: completionTimes.length,
      fromFallback: false,
    };
  }

  // Fallback path — derive world completion state from allProgress
  if (allProgress && allProgress.length > 0) {
    const worldsDone = deriveWorldsDoneFromProgress(allProgress);
    if (worldsDone > 0) {
      return {
        streak: worldsDone,
        lastWorldDone: worldsDone,
        fromFallback: true,
      };
    }
  }

  return { streak: 0, lastWorldDone: 0, fromFallback: false };
}

/** Shared top bar + header label — keeps empty and active states visually consistent */
function StreakHeader({ streakLabel }: { streakLabel?: string }) {
  return (
    <>
      <div className="h-0.5 w-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500" />
      <div className="flex items-center justify-between px-6 pt-5 pb-0">
        <div className="flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            World Progress
          </span>
        </div>
        {streakLabel && (
          <div className="flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-sm font-bold text-amber-500">
              {streakLabel}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

interface WorldStreaksDashboardWidgetProps {
  allProgress?: LessonProgress[];
}

export default function WorldStreaksDashboardWidget({
  allProgress,
}: WorldStreaksDashboardWidgetProps) {
  const { streak, lastWorldDone, fromFallback } = computeStreak(allProgress);

  if (lastWorldDone === 0) {
    return (
      <Card
        data-ocid="world_streaks.card"
        className="surface-elevated border-primary/20 overflow-hidden"
      >
        <StreakHeader />
        <CardContent className="pt-4" data-ocid="world_streaks.empty_state">
          <p className="text-sm text-muted-foreground">
            Complete your first world to start your streak. Finish consecutive
            worlds within 7 days each to build your progress streak.
          </p>
        </CardContent>
      </Card>
    );
  }

  // When using the localStorage path, show streak label.
  // When using the fallback path, skip the streak label (no timing data).
  const streakLabel = fromFallback
    ? undefined
    : streak === 1
      ? "1 world"
      : `${streak} worlds`;

  const motivational =
    lastWorldDone < 6
      ? fromFallback
        ? `${lastWorldDone} of 6 worlds complete`
        : "Complete the next world within 7 days to extend your streak"
      : "All core worlds complete — legendary streak!";

  return (
    <Card
      data-ocid="world_streaks.card"
      className="surface-elevated border-primary/20 overflow-hidden"
    >
      <StreakHeader streakLabel={streakLabel} />
      <CardContent className="pt-4 space-y-2">
        {/* Progress segments with world labels */}
        <div className="space-y-1">
          <div className="flex gap-1">
            {WORLD_IDS.map((id) => {
              const completed = id <= lastWorldDone;
              return (
                <div key={id} className="flex-1">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      completed
                        ? "bg-gradient-to-r from-amber-500 to-orange-400"
                        : "bg-muted"
                    }`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-1">
            {WORLD_IDS.map((id) => (
              <div key={id} className="flex-1 text-center">
                <span className="text-[10px] text-muted-foreground/60 font-mono">
                  W{id}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{motivational}</p>
      </CardContent>
    </Card>
  );
}
