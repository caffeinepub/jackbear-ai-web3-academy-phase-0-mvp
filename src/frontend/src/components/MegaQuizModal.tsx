import {
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { emitBonusWorldRevealEvent } from "../additions/quizSignals";
import type { QuizAnswer } from "../backend";
import { useActor } from "../hooks/useActor";
import {
  getLocalBestScore,
  updateLocalBestScore,
  useMarkSpecialWorldUnlocked,
  useSubmitQuiz,
  writeBPOnce,
} from "../hooks/useQueries";
import { allLessonsEN } from "../lib/lessonContent";
import ShareActionsInline from "./ShareActionsInline";

import { WORLDS } from "../pages/CoursesPage";

interface MegaQuizModalProps {
  worldId: string;
  onClose: () => void;
}

type Phase = "intro" | "quiz" | "result";

// ─── Build boss quiz questions from world lessons ─────────────────────────────

function buildBossQuestions(worldId: string) {
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world) return [];

  const questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    lessonId: string;
  }> = [];

  for (const lesson of world.lessons) {
    const content = allLessonsEN.find(
      (l) => String(l.id) === String(lesson.id),
    );
    // quiz is { questions: [...] } — use .questions array
    const quizQuestions = content?.quiz?.questions ?? [];
    if (quizQuestions.length > 0) {
      // Take first question from each lesson
      const q = quizQuestions[0];
      questions.push({
        id: `boss-${worldId}-${lesson.id}-${q.id}`,
        question: q.question,
        options: q.options,
        correctAnswerIndex: q.correctAnswer, // number index
        lessonId: lesson.id,
      });
    }
  }

  return questions;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MegaQuizModal({
  worldId,
  onClose,
}: MegaQuizModalProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [shareBp, setShareBp] = useState<number>(0);
  const { actor } = useActor();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number>(
    getLocalBestScore(`boss-${worldId}`) ?? 0,
  );
  const [passed, setPassed] = useState(false);

  const submitQuiz = useSubmitQuiz();
  const markSpecialWorldUnlocked = useMarkSpecialWorldUnlocked();

  const questions = buildBossQuestions(worldId);
  const currentQ = questions[currentQuestion];
  const bossLessonId = `boss-${worldId}`;

  // Refresh best score from localStorage when modal opens
  useEffect(() => {
    const stored = getLocalBestScore(bossLessonId);
    if (stored !== null) {
      setBestScore(stored);
    }
  }, [bossLessonId]);

  const handleSelectAnswer = useCallback(
    (questionId: string, answer: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    },
    [],
  );

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestion((prev) => prev + 1);
  }, []);

  const handlePrevQuestion = useCallback(() => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  }, []);

  const handleStartQuiz = useCallback(() => {
    setPhase("quiz");
    setCurrentQuestion(0);
    setAnswers({});
  }, []);

  const handleSubmit = useCallback(async () => {
    const quizAnswers: QuizAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selectedAnswer: answers[q.id] ?? "",
      isCorrect: (answers[q.id] ?? "") === q.options[q.correctAnswerIndex],
    }));

    const correctCount = quizAnswers.filter((a) => a.isCorrect).length;
    const bossCreditsReward = 20; // BP truth: submitQuiz awards 20 BP first pass

    // Award BP exactly once for this boss quiz (dedup by bossLessonId).
    // Called before the async backend call so it always fires regardless
    // of whether the backend succeeds or fails.
    writeBPOnce(bossLessonId, bossCreditsReward);

    try {
      const result = await submitQuiz.mutateAsync({
        args: {
          lessonId: bossLessonId,
          answers: quizAnswers,
        },
        creditsReward: 0, // BP already written above via writeBPOnce
        totalQuestions: questions.length,
      });

      const newBest = updateLocalBestScore(bossLessonId, correctCount);
      setBestScore(newBest);
      setScore(correctCount);
      setPassed(result.passed);
    } catch {
      // Non-fatal — record locally
      const newBest = updateLocalBestScore(bossLessonId, correctCount);
      setBestScore(newBest);
      setScore(correctCount);
      const passThreshold = Math.ceil(questions.length * 0.7);
      setPassed(correctCount >= passThreshold);
    }

    // Trigger Bonus World 7 unlock if this is World 6's boss quiz
    if (worldId === "world-6") {
      markSpecialWorldUnlocked.mutate("world-7");
      emitBonusWorldRevealEvent();
    }

    setPhase("result");
  }, [
    questions,
    answers,
    worldId,
    bossLessonId,
    submitQuiz,
    markSpecialWorldUnlocked,
  ]);

  const handleRetry = useCallback(() => {
    setPhase("quiz");
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setPassed(false);
  }, []);

  const worldDef = WORLDS.find((w) => w.id === worldId);
  const previouslyAttempted = false; // Determined at call site; always show Start
  const isWorld6 = worldId === "world-6";

  // Fetch real BP when result screen shows
  useEffect(() => {
    if (phase !== "result" || !actor) return;
    let cancelled = false;
    actor
      .getBearCredits()
      .then((creditsOpt: any) => {
        if (cancelled) return;
        const bearCredits = Array.isArray(creditsOpt)
          ? creditsOpt[0]
          : creditsOpt;
        const bp = bearCredits
          ? Number(bearCredits.totalEarned ?? bearCredits.balance ?? 0)
          : 0;
        setShareBp(bp);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [phase, actor]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-amber-500/10 to-amber-600/10">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-foreground text-sm sm:text-base">
              Boss Quiz — {worldDef?.title ?? worldId}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {phase === "intro" && (
            <div className="p-6 space-y-4 text-center">
              <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Boss Quiz Challenge
                </h3>
                <p className="text-muted-foreground mt-2">
                  Test your mastery of {worldDef?.title ?? worldId} with
                  questions drawn from every lesson.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-left space-y-2">
                <p className="text-sm text-foreground font-medium">
                  Challenge details:
                </p>
                <ul className="space-y-1">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    {questions.length} questions from all lessons
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    20 BP · 50 XP (first pass)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    Retry anytime — best score is preserved
                  </li>
                  {isWorld6 && (
                    <li className="flex items-center gap-2 text-sm text-amber-500 font-medium">
                      <ChevronRight className="w-3 h-3 text-amber-500" />
                      Submitting unlocks Bonus World 7!
                    </li>
                  )}
                </ul>
              </div>

              {bestScore > 0 && (
                <p className="text-primary text-sm font-medium">
                  Your best score: {bestScore}/{questions.length}
                </p>
              )}

              {questions.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No quiz questions available for this world yet.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  {previouslyAttempted ? "Retry Boss Quiz" : "Start Boss Quiz"}
                </button>
              )}
            </div>
          )}

          {phase === "quiz" && currentQ && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <div className="flex gap-1">
                  {questions.map((_q, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: progress dots are positional UI
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < currentQuestion
                          ? "bg-amber-500"
                          : i === currentQuestion
                            ? "bg-amber-500/60"
                            : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="font-medium text-foreground">{currentQ.question}</p>

              <div className="space-y-2">
                {currentQ.options.map((option) => {
                  const selected = answers[currentQ.id] === option;
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleSelectAnswer(currentQ.id, option)}
                      className={`
                        w-full p-3 rounded-lg text-left text-sm transition-all
                        ${
                          selected
                            ? "bg-amber-500/20 border border-amber-500 text-foreground"
                            : "bg-muted border border-border hover:border-amber-500/50 text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={
                    currentQuestion === 0
                      ? () => setPhase("intro")
                      : handlePrevQuestion
                  }
                  className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                {currentQuestion < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    disabled={!answers[currentQ.id]}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!answers[currentQ.id] || submitQuiz.isPending}
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50"
                  >
                    {submitQuiz.isPending ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </div>
          )}

          {phase === "result" && (
            <div className="p-6 space-y-4 text-center">
              {passed ? (
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
              ) : (
                <XCircle className="w-16 h-16 text-rose-500 mx-auto" />
              )}

              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {passed ? "Boss Defeated!" : "Keep Training!"}
                </h3>
                <p className="text-muted-foreground mt-1">
                  Score: {score}/{questions.length}
                </p>
                {bestScore > 0 && (
                  <p className="text-amber-500 text-sm mt-1 font-medium">
                    Best score: {bestScore}/{questions.length}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 text-amber-500">
                  <Award className="w-4 h-4" />
                  20 BP · 50 XP (first pass)
                </span>
              </div>

              {shareBp > 0 && (
                <div className="text-left">
                  <ShareActionsInline
                    bp={shareBp}
                    worldLabel={
                      WORLDS.find((w) => w.id === worldId)?.title
                        ? `Completed Boss Quiz: ${WORLDS.find((w) => w.id === worldId)?.title}`
                        : undefined
                    }
                    compact={true}
                  />
                </div>
              )}

              {isWorld6 && (
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                  Bonus World 7 has been unlocked! Check the Learning Worlds
                  page.
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                {passed
                  ? "World progress recorded. Retry anytime to improve your score!"
                  : "Your attempt has been recorded. Retry anytime to improve your score!"}
              </p>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
