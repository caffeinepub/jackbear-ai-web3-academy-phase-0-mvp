import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  ChevronRight,
  RotateCcw,
  Star,
  Trophy,
  XCircle,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { emitBonusWorldRevealEvent } from "../additions/quizSignals";
import {
  useMarkSpecialWorldUnlocked,
  useSubmitQuiz,
  writeBPOnce,
} from "../hooks/useQueries";
import type { LessonContent } from "../lib/lessonContent";

import type { WorldDef } from "../pages/CoursesPage";
import TipTheDev from "./TipTheDev";

interface MegaBossQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  world: WorldDef;
  content: LessonContent;
  creditsReward?: number;
}

export default function MegaBossQuizModal({
  isOpen,
  onClose,
  world,
  content,
}: MegaBossQuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const submitQuizMutation = useSubmitQuiz();
  const markSpecialWorldUnlocked = useMarkSpecialWorldUnlocked();

  const questions = content?.quiz?.questions ?? [];
  const totalQuestions = questions.length;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setAnswers([]);
      setShowResult(false);
      setScore(0);
      setHasSubmitted(false);
    }
  }, [isOpen]);

  const handleAnswerSelect = (index: number) => {
    if (hasSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Final question — submit
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers: boolean[]) => {
    if (hasSubmitted) return;
    setHasSubmitted(true);

    const correctCount = finalAnswers.filter(Boolean).length;
    setScore(correctCount);
    setShowResult(true);

    // Award BP exactly once for this boss quiz (dedup by boss lessonId).
    // BP truth: submitQuiz awards 20 BP first pass.
    const bossLessonId = `boss-${world.id}`;
    writeBPOnce(bossLessonId, 20);

    // Submit quiz to backend (non-blocking — BP already recorded locally)
    try {
      const quizAnswers = questions.map((_q, i) => ({
        questionId: String(i),
        selectedAnswer: String(answers[i] ?? finalAnswers[i] ?? false),
        isCorrect: finalAnswers[i] ?? false,
      }));

      await submitQuizMutation.mutateAsync({
        args: {
          lessonId: bossLessonId,
          answers: quizAnswers,
        },
        creditsReward: 0, // BP already written above via writeBPOnce
        totalQuestions,
      });
    } catch {
      // ignore backend errors — BP already persisted locally
    }

    // Trigger Bonus World 7 unlock if this is World 6's boss quiz
    if (world.id === "world-6" || world.id === "6") {
      markSpecialWorldUnlocked.mutate("world-7");
      emitBonusWorldRevealEvent();
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setScore(0);
    setHasSubmitted(false);
  };

  if (!isOpen) return null;

  const passed = score >= Math.ceil(totalQuestions * 0.7);
  const progressPercent =
    totalQuestions > 0
      ? ((currentQuestion + (showResult ? 1 : 0)) / totalQuestions) * 100
      : 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {world.title} — Boss Quiz
              </DialogTitle>
              <DialogDescription>
                Prove your mastery of {world.title}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <span>{Math.round(progressPercent)}% complete</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            {/* Question */}
            {questions[currentQuestion] && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold leading-snug">
                  {questions[currentQuestion].question}
                </h3>
                <div className="grid gap-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      type="button"
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable list items
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 border-current">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {currentQuestion < totalQuestions - 1 ? (
                <>
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Submit Quiz <Trophy className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            {/* Result */}
            <div
              className={`p-6 rounded-xl ${passed ? "bg-green-500/10 border border-green-500/30" : "bg-orange-500/10 border border-orange-500/30"}`}
            >
              <div className="flex justify-center mb-4">
                {passed ? (
                  <CheckCircle className="w-16 h-16 text-green-500" />
                ) : (
                  <XCircle className="w-16 h-16 text-orange-500" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {passed ? "Boss Defeated!" : "Keep Training!"}
              </h3>
              <p className="text-muted-foreground mb-4">
                You scored {score} out of {totalQuestions} (
                {Math.round((score / totalQuestions) * 100)}%)
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  20 BP · 50 XP (first pass)
                </Badge>
                {passed && (
                  <Badge className="text-sm px-3 py-1 bg-green-500 hover:bg-green-600">
                    World Mastered
                  </Badge>
                )}
                {(world.id === "world-6" || world.id === "6") && (
                  <Badge className="text-sm px-3 py-1 bg-purple-500 hover:bg-purple-600">
                    Bonus World 7 Unlocked!
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRetry}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={onClose} className="flex-1">
                Continue
              </Button>
            </div>
            <TipTheDev compact />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
