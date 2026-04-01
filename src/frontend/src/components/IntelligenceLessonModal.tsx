/**
 * IntelligenceLessonModal — Strict pass/fail quiz model for the Verifiable
 * Intelligence Layer (Modules 01–03+).
 *
 * Key differences from LessonModal:
 * - Standard lessons require 100% correct answers to pass.
 * - On fail: NO backend calls, NO BP awarded, NO lesson completion marked.
 * - On pass: submitQuiz + completeLesson called as normal.
 * - Mega Quizzes (id contains "mq" or "quiz") use the standard 70% threshold.
 *
 * DO NOT use this for Worlds 0–8. Use LessonModal for those.
 */
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  RotateCcw,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { emitQuizSubmitSignal } from "../additions/quizSignals";
import { useActor } from "../hooks/useActor";
import {
  getLocalBestScore,
  markLocalCompleted,
  updateLocalBestScore,
  useCompleteLesson,
  useMarkLessonAttempted,
  useSubmitQuiz,
} from "../hooks/useQueries";
import type { LessonContent } from "../lib/lessonContent";

interface Props {
  lesson: LessonContent;
  worldId: string;
  onClose: () => void;
  onLessonComplete?: (lessonId: string, bearPoints: number) => void;
}

type Phase = "content" | "quiz" | "result";
type ResultKind = "pass" | "fail" | "none";

/** Is this a Mega Quiz (looser 70% threshold)? */
function isMegaQuiz(lessonId: string): boolean {
  return lessonId.includes("mq") || lessonId.includes("quiz");
}

function showBPToast(amount: number, source: "lesson" | "quiz") {
  if (amount <= 0) return;
  try {
    window.dispatchEvent(
      new CustomEvent("bear-points-awarded", { detail: { amount, source } }),
    );
  } catch {}
}

export default function IntelligenceLessonModal({
  lesson,
  worldId,
  onClose,
  onLessonComplete,
}: Props) {
  const lessonId = String(lesson.id);
  const questions = lesson.quiz?.questions ?? [];
  const hasQuiz = questions.length > 0;
  const megaQuiz = isMegaQuiz(lessonId);

  // ── content slides ────────────────────────────────────────────────────────
  const introduction = lesson.content?.introduction;
  const sections = lesson.content?.sections ?? [];
  const conclusion = lesson.content?.conclusion;
  const slides: string[] = [];
  if (introduction) slides.push(introduction);
  for (const s of sections) slides.push(`**${s.title}**\n\n${s.content}`);
  if (conclusion) slides.push(conclusion);
  if (slides.length === 0 && lesson.description)
    slides.push(lesson.description);

  const [phase, setPhase] = useState<Phase>("content");
  const [slideIdx, setSlideIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [resultKind, setResultKind] = useState<ResultKind>("none");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => getLocalBestScore(lessonId) ?? 0,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { actor } = useActor();
  const submitQuiz = useSubmitQuiz();
  const completeLesson = useCompleteLesson();
  const markAttempted = useMarkLessonAttempted();

  useEffect(() => {
    const stored = getLocalBestScore(lessonId);
    if (stored !== null) setBestScore(stored);
  }, [lessonId]);

  const isLastSlide = slideIdx === slides.length - 1;
  const allAnswered = questions.every((_, qi) => answers[qi] !== undefined);

  // ── content navigation ────────────────────────────────────────────────────
  const handleNext = () => {
    if (isLastSlide) {
      hasQuiz ? setPhase("quiz") : handleCompleteNoQuiz();
    } else {
      setSlideIdx((i) => i + 1);
    }
  };

  const handleCompleteNoQuiz = useCallback(async () => {
    try {
      const result = await completeLesson.mutateAsync({
        args: { lessonId, worldId, xpReward: BigInt(lesson.xpReward ?? 50) },
        creditsReward: 10,
        showToast: false,
      });
      markAttempted.mutate(lessonId);
      window.dispatchEvent(
        new CustomEvent("jb:bp-write-success", {
          detail: { source: "lesson", amount: result.bpAwarded ?? 0 },
        }),
      );
      if (result.isFirstCompletion) {
        showBPToast(result.bpAwarded ?? 10, "lesson");
      }
      onLessonComplete?.(lessonId, result.bpAwarded ?? 0);
    } catch {}
    setResultKind("pass");
    setPhase("result");
  }, [
    lesson,
    lessonId,
    worldId,
    completeLesson,
    markAttempted,
    onLessonComplete,
  ]);

  // ── quiz submission ────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!hasQuiz || !actor || isSubmitting) return;
    setIsSubmitting(true);

    const evaluated = questions.map((q, qi) => ({
      questionId: String(q.id),
      selectedAnswer: String(answers[qi] ?? -1),
      isCorrect: (answers[qi] ?? -1) === q.correctAnswer,
    }));

    const localScore = evaluated.filter((a) => a.isCorrect).length;
    const total = questions.length;

    // Determine pass threshold:
    // Mega Quiz → 70% (standard). Standard lesson → 100% (all correct).
    const passThreshold = megaQuiz ? Math.ceil(total * 0.7) : total;
    const clientPassed = localScore >= passThreshold;

    // ── FAIL PATH: no backend calls ──────────────────────────────────────
    if (!clientPassed) {
      const newBest = Math.max(bestScore, localScore);
      updateLocalBestScore(lessonId, localScore);
      setBestScore(newBest);
      setScore(localScore);
      setResultKind("fail");
      setPhase("result");
      setIsSubmitting(false);
      return;
    }

    // ── PASS PATH: submit to backend ──────────────────────────────────────
    try {
      const backendResult = await submitQuiz.mutateAsync({
        args: { lessonId, answers: evaluated },
        creditsReward: 20,
        totalQuestions: total,
      });

      const finalScore = Number(backendResult.score);
      const newBest = updateLocalBestScore(lessonId, finalScore);
      setBestScore(newBest);
      setScore(finalScore);

      emitQuizSubmitSignal({
        lessonId,
        score: finalScore,
        totalQuestions: total,
        timestamp: Date.now(),
      });

      setPhase("result");
      setResultKind(backendResult.passed ? "pass" : "fail");

      if (backendResult.passed) {
        // Mark lesson complete in backend (non-critical)
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

        if (!backendResult.isFirstPass) {
          onLessonComplete?.(lessonId, 0);
        } else {
          window.dispatchEvent(
            new CustomEvent("jb:bp-write-success", {
              detail: { source: "quiz", amount: 20 },
            }),
          );
          showBPToast(20, "quiz");
          onLessonComplete?.(lessonId, 20);
        }
      } else {
        onLessonComplete?.(lessonId, 0);
      }
    } catch {
      // Backend error fallback — use client result, no BP
      const newBest = updateLocalBestScore(lessonId, localScore);
      markLocalCompleted(lessonId);
      setBestScore(newBest);
      setScore(localScore);
      setResultKind(clientPassed ? "pass" : "fail");
      setPhase("result");
      onLessonComplete?.(lessonId, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setScore(0);
    setResultKind("none");
    setPhase("quiz");
  };

  // ── slide rendering ────────────────────────────────────────────────────────
  const slideText = slides[slideIdx] ?? "";
  const lines = slideText.split("\n\n");
  const slideTitle = lines[0]?.replace(/\*\*/g, "") ?? "";
  const slideBody = lines.slice(1).join("\n\n");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop close */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

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
            onClick={onClose}
            className="ml-2 shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── CONTENT PHASE ─────────────────────────────────────────────── */}
        {phase === "content" && (
          <div className="flex flex-col flex-1 p-5 gap-4">
            {slides.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {slideIdx + 1} / {slides.length}
                </span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: `${((slideIdx + 1) / slides.length) * 100}%`,
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
              </span>
              <span className="flex items-center gap-1 text-amber-500">
                <Award className="w-3 h-3" />
                {hasQuiz ? 20 : 10} BP
              </span>
              {bestScore > 0 && (
                <span className="text-primary font-medium">
                  Best: {bestScore}/{questions.length}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <button
                type="button"
                onClick={() =>
                  slideIdx > 0 ? setSlideIdx((i) => i - 1) : undefined
                }
                disabled={slideIdx === 0}
                className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
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

        {/* ── QUIZ PHASE ────────────────────────────────────────────────── */}
        {phase === "quiz" && hasQuiz && (
          <div className="flex flex-col flex-1 p-5 gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base">Verification Check</h3>
              <div className="flex items-center gap-2">
                {!megaQuiz && (
                  <span className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    All correct required
                  </span>
                )}
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {questions.length} question{questions.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {questions.map((q, qi) => {
                const opts = q.options ?? [];
                return (
                  <div // biome-ignore lint/suspicious/noArrayIndexKey: stable
                    key={qi}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-sm font-medium">
                      {qi + 1}. {q.question}
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {opts.map((opt: string, oi: number) => {
                        const selected = answers[qi] === oi;
                        return (
                          <button
                            type="button"
                            // biome-ignore lint/suspicious/noArrayIndexKey: stable
                            key={oi}
                            onClick={() =>
                              setAnswers((prev) => ({ ...prev, [qi]: oi }))
                            }
                            className={`text-left text-sm px-3 py-2 rounded-lg border transition-colors ${
                              selected
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
                onClick={() => setPhase("content")}
                className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Review
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!allAnswered || isSubmitting || !actor}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting
                  ? "Verifying..."
                  : !actor
                    ? "Loading..."
                    : "Submit"}
              </button>
            </div>
          </div>
        )}

        {/* ── RESULT PHASE ──────────────────────────────────────────────── */}
        {phase === "result" && (
          <div className="flex flex-col flex-1 p-5 gap-4 items-center text-center">
            {resultKind === "pass" ? (
              <>
                {/* Pass state */}
                <div className="mt-2 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase">
                    System Validated
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-1">PASSED</h3>
                  {hasQuiz && (
                    <p className="text-sm text-muted-foreground">
                      Score: {score} / {questions.length}
                    </p>
                  )}
                  {hasQuiz && bestScore > 0 && (
                    <p className="text-xs text-primary mt-1 font-medium">
                      Best: {bestScore} / {questions.length}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {hasQuiz ? 50 : (lesson.xpReward ?? 50)} XP recorded
                  </span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <Award className="w-4 h-4" />
                    {hasQuiz ? 20 : 10} BP recorded
                  </span>
                </div>

                <div className="flex gap-2 mt-2">
                  {hasQuiz && (
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="flex items-center gap-1.5 px-4 py-2 bg-muted border border-border rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Retry
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Fail state */}
                <div className="mt-2 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                    <XCircle className="w-9 h-9 text-destructive" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-destructive uppercase">
                    Verification Failed
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-1">NOT PASSED</h3>
                  {hasQuiz && (
                    <p className="text-sm text-muted-foreground">
                      Score: {score} / {questions.length}
                      {!megaQuiz && (
                        <span className="ml-1 text-xs text-muted-foreground/70">
                          — {questions.length}/{questions.length} required
                        </span>
                      )}
                    </p>
                  )}
                  {bestScore > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Best attempt: {bestScore} / {questions.length}
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground max-w-xs">
                  Review the lesson and try again. No BP has been recorded for
                  this attempt.
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setPhase("content")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-muted border border-border rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Review Lesson
                  </button>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retry Quiz
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
