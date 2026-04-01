import {
  BookOpen,
  CheckCircle,
  Lock,
  PlayCircle,
  Trophy,
  Zap,
} from "lucide-react";
import React, { useState, useCallback } from "react";
import type { LessonProgress } from "../backend";
import LessonModal from "../components/LessonModal";
import MegaQuizModal from "../components/MegaQuizModal";
import PlaceholderLessonModal from "../components/PlaceholderLessonModal";
import { TESTING_UNLOCK_ENABLED } from "../config/testingUnlock";
import {
  getLocalProgressSnapshot,
  mergeProgressData,
  useGetLessonProgress,
} from "../hooks/useQueries";
import { allLessonsEN } from "../lib/lessonContent";
import { isBossAvailable, isLessonUnlockedInWorld } from "../lib/worldProgress";

const WORLD1_DEF = {
  id: "world-1",
  title: "World 1: Sovereign Basics",
  subtitle: "Master the fundamentals of Web3",
  lessons: [
    { id: "1", title: "What is Web3?" },
    { id: "2", title: "What Is Blockchain?" },
    { id: "3", title: "Keys & Signatures" },
    { id: "4", title: "How to Use a Wallet" },
    { id: "5", title: "Consensus Basics" },
    { id: "6", title: "Fungible & Non-fungible Tokens" },
    { id: "7", title: "Bitcoin vs. ICP" },
    { id: "8", title: "Smart Contracts Explained" },
    { id: "9", title: "Case Study: Bitcoin Mining" },
    { id: "10", title: "First Steps in Web3" },
  ],
};

function getLessonContent(lessonId: string) {
  return allLessonsEN.find((l) => String(l.id) === String(lessonId)) ?? null;
}

function isLessonUnlocked(
  lessonId: string,
  lessonIndex: number,
  progress: LessonProgress[],
): boolean {
  if (TESTING_UNLOCK_ENABLED) return true;
  if (lessonIndex === 0) return true;
  if (isLessonUnlockedInWorld(lessonId, progress)) return true;
  const prevLesson = WORLD1_DEF.lessons[lessonIndex - 1];
  return isLessonUnlockedInWorld(prevLesson.id, progress);
}

export default function World1Page() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showBossQuiz, setShowBossQuiz] = useState(false);
  const [placeholderTitle, setPlaceholderTitle] = useState("");
  const [placeholderOpen, setPlaceholderOpen] = useState(false);
  const [localTick, setLocalTick] = useState(0);

  const { data: progressData = [] } = useGetLessonProgress("world-1");

  const progress: LessonProgress[] = mergeProgressData(
    progressData,
    getLocalProgressSnapshot(),
  );

  const bossUnlocked =
    TESTING_UNLOCK_ENABLED || isBossAvailable(WORLD1_DEF, progress);
  const bossAttempted = progress.some(
    (p) => p.lessonId === "boss-world-1" && p.attempted,
  );

  const handleLessonClose = useCallback(() => {
    setSelectedLesson(null);
    setLocalTick((t) => t + 1);
  }, []);

  const handleBossClose = useCallback(() => {
    setShowBossQuiz(false);
    setLocalTick((t) => t + 1);
  }, []);

  void localTick;

  const selectedLessonContent = selectedLesson
    ? getLessonContent(selectedLesson)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground font-orbitron">
              {WORLD1_DEF.title}
            </h1>
          </div>
          <p className="text-muted-foreground">{WORLD1_DEF.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {WORLD1_DEF.lessons.map((lesson, lessonIndex) => {
            const unlocked = isLessonUnlocked(lesson.id, lessonIndex, progress);
            const attempted = isLessonUnlockedInWorld(lesson.id, progress);
            const content = getLessonContent(lesson.id);

            return (
              <button
                type="button"
                key={lesson.id}
                onClick={() => {
                  if (unlocked) {
                    if (content) {
                      setSelectedLesson(lesson.id);
                    } else {
                      setPlaceholderTitle(lesson.title);
                      setPlaceholderOpen(true);
                    }
                  }
                }}
                disabled={!unlocked}
                className={`
                  p-4 rounded-xl text-left transition-all duration-200
                  ${
                    unlocked
                      ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg"
                      : "cursor-not-allowed opacity-50"
                  }
                  ${
                    attempted
                      ? "bg-primary/10 border border-primary/30"
                      : unlocked
                        ? "bg-muted border border-border hover:border-primary/50"
                        : "bg-muted/50 border border-border/50"
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    Lesson {lesson.id}
                  </span>
                  {!unlocked ? (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  ) : attempted ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : (
                    <PlayCircle className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <p className="font-medium text-foreground">{lesson.title}</p>
                {!content && unlocked && (
                  <span className="text-xs text-amber-500 mt-1 block">
                    Coming soon
                  </span>
                )}
                {attempted && (
                  <span className="text-xs text-primary mt-1 block">
                    Attempted — retry anytime
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            if (bossUnlocked) setShowBossQuiz(true);
          }}
          disabled={!bossUnlocked}
          className={`
            w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-200
            ${
              bossUnlocked
                ? "cursor-pointer hover:scale-[1.01] bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 hover:border-amber-500/70"
                : "cursor-not-allowed opacity-40 bg-muted/50 border border-border/50"
            }
          `}
        >
          <Trophy
            className={`w-6 h-6 ${bossUnlocked ? "text-amber-500" : "text-muted-foreground"}`}
          />
          <div className="text-left">
            <p
              className={`font-bold ${bossUnlocked ? "text-amber-500" : "text-muted-foreground"}`}
            >
              Boss Quiz
            </p>
            <p className="text-sm text-muted-foreground">
              {bossUnlocked
                ? bossAttempted
                  ? "Retry the Boss Quiz anytime"
                  : "All lessons attempted — Boss Quiz unlocked!"
                : `Attempt all ${WORLD1_DEF.lessons.length} lessons to unlock the Boss Quiz`}
            </p>
          </div>
          {bossUnlocked && <Zap className="w-5 h-5 text-amber-500 ml-auto" />}
        </button>
      </div>

      {selectedLesson && selectedLessonContent && (
        <LessonModal
          lesson={selectedLessonContent}
          worldId="world-1"
          onClose={handleLessonClose}
        />
      )}

      <PlaceholderLessonModal
        isOpen={placeholderOpen}
        onClose={() => setPlaceholderOpen(false)}
        lessonTitle={placeholderTitle}
      />

      {showBossQuiz && (
        <MegaQuizModal worldId="world-1" onClose={handleBossClose} />
      )}
    </div>
  );
}
