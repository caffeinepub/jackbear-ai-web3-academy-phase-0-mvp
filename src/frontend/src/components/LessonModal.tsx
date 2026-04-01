import {
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  XCircle,
} from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { emitQuizSubmitSignal } from "../additions/quizSignals";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  getLocalBestScore,
  markLocalCompleted,
  updateLocalBestScore,
  useCompleteLesson,
  useMarkLessonAttempted,
  useSubmitQuiz,
} from "../hooks/useQueries";
import type { LessonContent } from "../lib/lessonContent";
import ShareCardModal from "./ShareCardModal";

interface LessonModalProps {
  lesson: LessonContent;
  worldId: string;
  onClose: () => void;
  onLessonComplete?: (lessonId: string, bearPoints: number) => void;
}

type Phase = "content" | "quiz" | "result";

interface QuizState {
  currentQuestion: number;
  answers: Record<number, number>;
  submitted: boolean;
  score: number;
  bestScore: number;
  passed: boolean;
}

/**
 * Fire a Bear Points toast notification via custom DOM event.
 * This is PRESENTATION ONLY — the actual BP source is the backend.
 * Only fires on first completion to prevent misleading duplicate toasts.
 */
function showCompletionToast(
  source: "lesson" | "quiz",
  _lessonId: string,
  amount: number,
): void {
  try {
    if (amount <= 0) return;
    window.dispatchEvent(
      new CustomEvent("bear-points-awarded", {
        detail: { amount, source },
      }),
    );
  } catch {
    // non-critical — silent
  }
}

export default function LessonModal({
  lesson,
  worldId,
  onClose,
  onLessonComplete,
}: LessonModalProps) {
  const [phase, setPhase] = useState<Phase>("content");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState<{
    rank: number | null;
    bp: number;
    worldLabel?: string;
  } | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    submitted: false,
    score: 0,
    bestScore: getLocalBestScore(String(lesson.id)) ?? 0,
    passed: false,
  });

  const markAttempted = useMarkLessonAttempted();
  const completeLesson = useCompleteLesson();
  const [bonusCopy, setBonusCopy] = React.useState<string | null>(null);
  const submitQuiz = useSubmitQuiz();
  const { actor } = useActor();
  const { identity } = useInternetIdentity();

  const lessonId = String(lesson.id);

  const questions = lesson.quiz?.questions ?? [];
  const hasQuiz = questions.length > 0;

  const introduction = lesson.content?.introduction;
  const sections = lesson.content?.sections ?? [];
  const conclusion = lesson.content?.conclusion;

  const contentSlides: string[] = [];
  if (introduction) contentSlides.push(introduction);
  for (const s of sections) {
    contentSlides.push(`**${s.title}**\n\n${s.content}`);
  }
  if (conclusion) contentSlides.push(conclusion);
  if (contentSlides.length === 0 && lesson.description) {
    contentSlides.push(lesson.description);
  }

  const totalSlides = contentSlides.length;
  const isLastSlide = currentSection === totalSlides - 1;

  useEffect(() => {
    const stored = getLocalBestScore(lessonId);
    if (stored !== null) {
      setQuizState((prev) => ({ ...prev, bestScore: stored }));
    }
  }, [lessonId]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleNextSlide = () => {
    if (isLastSlide) {
      if (hasQuiz) {
        setPhase("quiz");
      } else {
        handleCompleteLesson(true);
      }
    } else {
      setCurrentSection((s) => s + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSection > 0) setCurrentSection((s) => s - 1);
  };

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionIndex]: answerIndex },
    }));
  };

  const triggerShareCard = useCallback((actorRef: any, identityRef: any) => {
    if (!actorRef) return;
    const principal = identityRef?.getPrincipal().toString() ?? "";
    Promise.all([actorRef.getBearCredits(), actorRef.getGlobalLeaderboard()])
      .then(([credits, leaderboard]) => {
        const bp = Number((credits as any)?.totalEarned ?? 0);
        const myRow = (leaderboard as any[]).find(
          (r) =>
            r.userId?.toString() === principal ||
            r.principal?.toString() === principal,
        );
        const rank = myRow ? Number(myRow.rank) : null;
        setShareData({ rank, bp });
        setShareOpen(true);
      })
      .catch(() => {});
  }, []);

  const handleCompleteLesson = useCallback(
    async (showToast = true) => {
      const creditsReward = 10; // matches backend completeLesson hardcoded award

      try {
        const completionResult = await completeLesson.mutateAsync({
          args: {
            lessonId,
            worldId,
            xpReward: BigInt(lesson.xpReward ?? 50),
          },
          creditsReward,
          showToast: false,
        });

        // isFirstCompletion is now backend truth, not localStorage
        const isFirstCompletion = completionResult.isFirstCompletion ?? false;
        markAttempted.mutate(lessonId);

        // Always fire data-refresh event after confirmed backend write
        window.dispatchEvent(
          new CustomEvent("jb:bp-write-success", {
            detail: {
              source: "lesson",
              amount: completionResult.bpAwarded ?? 0,
            },
          }),
        );

        if (showToast && isFirstCompletion) {
          showCompletionToast(
            "lesson",
            lessonId,
            completionResult.bpAwarded ?? creditsReward,
          );
          // Show bonus copy if applicable
          const bonusLines: string[] = [];
          if (completionResult.dailyBonusApplied)
            bonusLines.push("Daily bonus applied");
          if (completionResult.streakBonusApplied)
            bonusLines.push("Streak boost active");
          if (bonusLines.length > 0) {
            setBonusCopy(bonusLines.join(" · "));
          }
          triggerShareCard(actor, identity);
        } else if (!isFirstCompletion) {
        }

        onLessonComplete?.(lessonId, completionResult.bpAwarded ?? 0);
        if (!hasQuiz) {
          setPhase("result");
          setQuizState((prev) => ({ ...prev, submitted: true, passed: true }));
        }
      } catch {
        // Non-fatal
      }
    },
    [
      lesson,
      lessonId,
      worldId,
      completeLesson,
      markAttempted,
      hasQuiz,
      onLessonComplete,
      actor,
      identity,
      triggerShareCard,
    ],
  );

  const handleSubmitQuiz = async () => {
    if (!hasQuiz) return;

    if (!actor) {
      console.warn("[QUIZ] actor not available, skipping submit");
      return;
    }

    const answers = questions.map((q, qi) => {
      const selected = quizState.answers[qi] ?? -1;
      const correctIndex = q.correctAnswer;
      return {
        questionId: String(q.id),
        selectedAnswer: String(selected),
        isCorrect: selected === correctIndex,
      };
    });

    const creditsReward = 20; // matches backend submitQuiz hardcoded award
    const localScore = answers.filter((a) => a.isCorrect).length;
    const localPassed = localScore >= Math.ceil(questions.length * 0.7);

    let backendResult: Awaited<
      ReturnType<typeof submitQuiz.mutateAsync>
    > | null = null;

    try {
      backendResult = await submitQuiz.mutateAsync({
        args: { lessonId, answers },
        creditsReward,
        totalQuestions: questions.length,
      });
    } catch (err) {
      console.error("[BP-AUDIT] quiz submit error | raw error:", err);
      // Graceful local fallback — do NOT award BP
      const bestScore = updateLocalBestScore(lessonId, localScore);
      markLocalCompleted(lessonId);
      setQuizState((prev) => ({
        ...prev,
        submitted: true,
        score: localScore,
        bestScore,
        passed: localPassed,
      }));
      setPhase("result");
      emitQuizSubmitSignal({
        lessonId,
        score: localScore,
        totalQuestions: questions.length,
        timestamp: Date.now(),
      });
      onLessonComplete?.(lessonId, 0);
      return;
    }

    // ── BACKEND CALL SUCCEEDED ─────────────────────────────────────────────
    const result = backendResult;
    const alreadyCompleted = !result.isFirstPass;
    const newScore = Number(result.score);
    const bestScore = updateLocalBestScore(lessonId, newScore);

    setQuizState((prev) => ({
      ...prev,
      submitted: true,
      score: newScore,
      bestScore,
      passed: result.passed,
    }));

    // Set phase immediately after confirmed backend success — before optional UX
    setPhase("result");
    emitQuizSubmitSignal({
      lessonId,
      score: newScore,
      totalQuestions: questions.length,
      timestamp: Date.now(),
    });

    // ── OPTIONAL POST-SUCCESS UX (non-blocking, fail-closed) ─────────────
    // Any failure here must NOT mask the backend success above.
    try {
      // Complete the lesson record in backend (non-critical if it fails)
      await completeLesson
        .mutateAsync({
          args: {
            lessonId,
            worldId,
            xpReward: BigInt(lesson.xpReward ?? 50),
          },
          creditsReward: 0,
          showToast: false,
        })
        .catch(() => {});

      if (result.passed) {
        window.dispatchEvent(
          new CustomEvent("jb:bp-write-success", {
            detail: { source: "quiz", amount: alreadyCompleted ? 0 : 20 },
          }),
        );
      }

      if (result.passed && !alreadyCompleted) {
        showCompletionToast("quiz", lessonId, creditsReward);
        triggerShareCard(actor, identity);
        onLessonComplete?.(lessonId, creditsReward);
      } else if (result.passed && alreadyCompleted) {
        onLessonComplete?.(lessonId, 0);
      } else {
        onLessonComplete?.(lessonId, 0);
      }
    } catch (optionalErr) {
      // Optional UX failed — backend submit already confirmed successful above
      console.warn(
        "[BP-AUDIT] quiz post-success optional UX error (non-fatal):",
        optionalErr,
      );
    }
  };

  const handleRetry = () => {
    setPhase("quiz");
    setQuizState((prev) => ({
      ...prev,
      currentQuestion: 0,
      answers: {},
      submitted: false,
      score: 0,
      passed: false,
    }));
  };

  const handleBackToContent = () => {
    setPhase("content");
    setCurrentSection(0);
  };

  const allAnswered =
    hasQuiz && questions.every((_, qi) => quizState.answers[qi] !== undefined);

  const currentSlideText = contentSlides[currentSection] ?? "";
  const slideLines = currentSlideText.split("\n\n");
  const slideTitle = slideLines[0]?.replace(/\*\*/g, "") ?? "";
  const slideBody = slideLines.slice(1).join("\n\n");

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop close is supplementary */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background border border-border shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded shrink-0">
                {lessonId}
              </span>
              <h2 className="font-semibold text-sm truncate">{lesson.title}</h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="ml-2 shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close lesson"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Phase */}
          {phase === "content" && (
            <div className="flex flex-col flex-1 p-5 gap-4">
              {totalSlides > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {currentSection + 1} / {totalSlides}
                  </span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${((currentSection + 1) / totalSlides) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex-1">
                {slideBody ? (
                  <>
                    <h3 className="text-lg font-bold mb-3">{slideTitle}</h3>
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {slideBody}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {slideTitle}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {hasQuiz ? 50 : (lesson.xpReward ?? 50)} XP
                  <span className="text-[10px] opacity-50 font-normal ml-0.5">
                    learning progress
                  </span>
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Award className="w-3 h-3" />
                  {hasQuiz ? 20 : 10} BP
                  <span className="text-[10px] opacity-50 font-normal ml-0.5">
                    leaderboard points
                  </span>
                </span>
                {quizState.bestScore > 0 && (
                  <span className="text-primary font-medium">
                    Best: {quizState.bestScore}/{questions.length}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  disabled={currentSection === 0}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  disabled={completeLesson.isPending}
                  className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLastSlide
                    ? hasQuiz
                      ? "Take Quiz"
                      : completeLesson.isPending
                        ? "Completing..."
                        : "Complete"
                    : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Quiz Phase */}
          {phase === "quiz" && hasQuiz && (
            <div className="flex flex-col flex-1 p-5 gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Knowledge Check</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {questions.length} question{questions.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex flex-col gap-5">
                {questions.map((q, qi) => {
                  const options = q.options ?? [];
                  return (
                    <div // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                      key={qi}
                      className="flex flex-col gap-2"
                    >
                      <p className="text-sm font-medium">
                        {qi + 1}. {q.question}
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {options.map((opt: string, oi: number) => {
                          const isSelected = quizState.answers[qi] === oi;
                          return (
                            <button
                              type="button"
                              // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                              key={oi}
                              onClick={() => handleSelectAnswer(qi, oi)}
                              className={`text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                                isSelected
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:border-primary/50 hover:bg-muted"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={handleBackToContent}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Review
                </button>
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered || submitQuiz.isPending || !actor}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitQuiz.isPending
                    ? "Submitting..."
                    : !actor
                      ? "Loading..."
                      : "Submit Quiz"}
                </button>
              </div>
            </div>
          )}

          {/* Result Phase */}
          {phase === "result" && (
            <div className="flex flex-col flex-1 p-5 gap-4 items-center text-center">
              <div className="mt-2">
                {quizState.passed ? (
                  <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
                ) : (
                  <XCircle className="w-14 h-14 text-destructive mx-auto" />
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-1">
                  {quizState.passed ? "Well Done!" : "Keep Practicing!"}
                </h3>
                {hasQuiz && (
                  <p className="text-muted-foreground text-sm">
                    Score: {quizState.score} / {questions.length}
                  </p>
                )}
                {hasQuiz && quizState.bestScore > 0 && (
                  <p className="text-xs text-primary mt-1 font-medium">
                    Best score: {quizState.bestScore} / {questions.length}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {hasQuiz ? 50 : (lesson.xpReward ?? 50)} XP earned
                  <span className="text-[10px] opacity-50 font-normal">
                    — learning progress
                  </span>
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <Award className="w-4 h-4" />
                  {hasQuiz ? 20 : 10} BP recorded
                  <span className="text-[10px] opacity-50 font-normal text-muted-foreground">
                    — leaderboard points
                  </span>
                </span>
                {bonusCopy && (
                  <p className="text-xs text-emerald-500 dark:text-emerald-400 font-medium mt-1">
                    {bonusCopy}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-2">
                {hasQuiz && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="flex items-center gap-1.5 px-4 py-2 bg-muted border border-border rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retry
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {quizState.passed ? "Continue" : "Close"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ShareCardModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        rank={shareData?.rank ?? null}
        bp={shareData?.bp ?? 0}
        worldLabel={shareData?.worldLabel}
      />
    </>
  );
}
