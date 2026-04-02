import { Button } from "@/components/ui/button";
import {
  type CoherenceKeyId,
  markCoherenceKeyRecovered,
  readCoherenceKeys,
} from "@/lib/coherenceKeys";
import { allGlossaryTerms } from "@/lib/glossaryData";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";
import { useCompleteQuest } from "../hooks/useQueries";

const FALLBACK_WORDS = [
  {
    term: "CANISTER",
    definition: "A computational unit on ICP that bundles code and state.",
  },
  {
    term: "STAKING",
    definition: "Locking tokens to participate in governance and earn rewards.",
  },
  {
    term: "LEDGER",
    definition: "A distributed record-keeping system for transactions.",
  },
  {
    term: "SUBNET",
    definition: "Independent blockchains that run in parallel on ICP.",
  },
  {
    term: "CONSENSUS",
    definition: "The process by which network nodes agree on a single state.",
  },
  {
    term: "MOTOKO",
    definition: "A programming language designed specifically for ICP.",
  },
  {
    term: "CYCLES",
    definition: "Computational resources consumed by canisters on ICP.",
  },
  {
    term: "BLOCKCHAIN",
    definition: "A distributed ledger secured using cryptography.",
  },
  {
    term: "IDENTITY",
    definition: "A unique digital representation in blockchain systems.",
  },
  {
    term: "SOVEREIGNTY",
    definition: "Complete self-governance over digital assets and identity.",
  },
];

const MAX_ATTEMPTS = 6;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HANGMAN_REWARDS = {
  easy: { bp: 5, xp: 10 },
  medium: { bp: 10, xp: 20 },
  hard: { bp: 20, xp: 40 },
  legendary: { bp: 30, xp: 60 },
} as const;
type HangmanDifficulty = keyof typeof HANGMAN_REWARDS;
const DEFAULT_DIFFICULTY: HangmanDifficulty = "medium";

// Coherence Key metadata — Phase 1: three fixed designated key terms
const COHERENCE_KEY_MAP: Record<string, CoherenceKeyId> = {
  IDENTITY: "identity",
  CONSENSUS: "consensus",
  COMPUTE: "compute",
};

type GameState = "playing" | "won" | "lost";
type WordSlot = { letter: string; slotId: string };

// Recent words buffer — module-level so it persists across game resets in the same session
const recentWordsBuffer: string[] = [];
const RECENT_BUFFER_SIZE = 6;

function pickRandom() {
  // Primary source: full glossary pool. Fallback only if glossary unavailable.
  const source =
    allGlossaryTerms && allGlossaryTerms.length > 0
      ? allGlossaryTerms
      : FALLBACK_WORDS;

  // Soft Coherence Key weighting:
  // If there are unrecovered keys, build a weighted pool by duplicating
  // unrecovered key entries (6x weight) so they surface naturally but
  // never feel forced. Normal glossary terms always dominate the pool.
  const coherenceState = readCoherenceKeys();
  const unrecoveredKeyTerms = Object.keys(COHERENCE_KEY_MAP).filter(
    (term) => !coherenceState.recovered.includes(COHERENCE_KEY_MAP[term]),
  );

  let candidatePool = source;

  if (unrecoveredKeyTerms.length > 0) {
    // Stronger boost: for each unrecovered key, add 6 extra copies of
    // that term entry into the pool (if it exists in the glossary).
    const boostEntries = unrecoveredKeyTerms.flatMap((keyTerm) => {
      const entry = source.find(
        (item) =>
          item.term
            .toUpperCase()
            .replace(/[^A-Z ]/g, "")
            .trim() === keyTerm,
      );
      return entry ? [entry, entry, entry, entry, entry, entry] : [];
    });
    candidatePool =
      boostEntries.length > 0 ? [...source, ...boostEntries] : source;
  }

  // Anti-repeat buffer: exclude recently seen words when the pool is large enough.
  // Single re-roll only — never loop, never block a valid selection.
  const pickOne = () =>
    candidatePool[Math.floor(Math.random() * candidatePool.length)];

  let item = pickOne();
  const normalizeWord = (t: string) =>
    t
      .toUpperCase()
      .replace(/[^A-Z ]/g, "")
      .trim();

  if (
    recentWordsBuffer.length > 0 &&
    candidatePool.length > recentWordsBuffer.length
  ) {
    const normalized = normalizeWord(item.term);
    if (recentWordsBuffer.includes(normalized)) {
      item = pickOne(); // single re-roll — accept whatever comes next
    }
  }

  // Preserve spaces so multi-word terms render as separate rows
  const normalized = normalizeWord(item.term);

  // Update recent-words buffer
  recentWordsBuffer.push(normalized);
  if (recentWordsBuffer.length > RECENT_BUFFER_SIZE) {
    recentWordsBuffer.shift();
  }

  return {
    word: normalized,
    originalTerm: item.term,
    definition: item.definition ?? "",
  };
}

function buildWordRows(w: string): WordSlot[][] {
  return w.split(" ").map((wordPart, wordIdx) =>
    wordPart.split("").map((letter, pos) => ({
      letter,
      slotId: `slot-${wordIdx}-${pos}`,
    })),
  );
}

export default function HangmanPage() {
  const [word, setWord] = useState("");
  const [originalTerm, setOriginalTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [gameState, setGameState] = useState<GameState>("playing");
  const [hintRevealedLetter, setHintRevealedLetter] = useState<string | null>(
    null,
  );
  const [recoveredKeyInfo, setRecoveredKeyInfo] = useState<{
    keyId: CoherenceKeyId;
    count: number;
    isAllUnlocked: boolean;
  } | null>(null);
  // Tracks repeat solves of an already-recovered coherence key
  const [keyAlreadyKnown, setKeyAlreadyKnown] = useState(false);
  const [rewardSuccess, setRewardSuccess] = useState(false);

  const completeQuest = useCompleteQuest();
  const { actor } = useActor();
  const rewardFiredRef = useRef<string | null>(null);
  const hintUsedRef = useRef(false);
  const coherenceCheckFiredRef = useRef(false);

  const initGame = useCallback(() => {
    const { word: w, originalTerm: t, definition: d } = pickRandom();
    setWord(w);
    setOriginalTerm(t);
    setDefinition(d);
    setGuessedLetters(new Set());
    setGameState("playing");
    rewardFiredRef.current = null;
    hintUsedRef.current = false;
    coherenceCheckFiredRef.current = false;
    setHintRevealedLetter(null);
    setRecoveredKeyInfo(null);
    setKeyAlreadyKnown(false);
    setRewardSuccess(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Hint trigger — fires exactly once when remaining attempts drops to 1.
  useEffect(() => {
    if (gameState !== "playing") return;
    if (!word) return;
    const wrongCount = [...guessedLetters].filter(
      (l) => !word.includes(l),
    ).length;
    if (MAX_ATTEMPTS - wrongCount !== 1) return;
    if (hintUsedRef.current) return;
    const firstUnrevealed =
      word.split("").find((l) => l !== " " && !guessedLetters.has(l)) ?? null;
    if (!firstUnrevealed) return;
    hintUsedRef.current = true;
    setHintRevealedLetter(firstUnrevealed);
  }, [gameState, word, guessedLetters]);

  // Reward effect — fires once on win via backend quest
  useEffect(() => {
    if (gameState !== "won") return;
    if (!actor) return;

    const dateStr = new Date().toISOString().split("T")[0];
    const questId = `hangman-${word}-${dateStr}`;

    if (rewardFiredRef.current === questId) return;
    rewardFiredRef.current = questId;

    const { bp, xp } = HANGMAN_REWARDS[DEFAULT_DIFFICULTY];

    completeQuest
      .mutateAsync({
        questId,
        questDescription: `Hangman: guessed "${originalTerm}" correctly`,
        creditsReward: BigInt(bp),
        xpReward: BigInt(xp),
      })
      .then(() => {
        setRewardSuccess(true);
        window.dispatchEvent(
          new CustomEvent("bear-points-awarded", {
            detail: { amount: bp, source: "hangman" },
          }),
        );
      })
      .catch((err: unknown) => {
        console.warn("[Hangman] reward call failed (non-fatal):", err);
      });
  }, [gameState, word, originalTerm, actor, completeQuest]);

  // Coherence Key recovery — fires once on win, checks if current word is a key term
  useEffect(() => {
    if (gameState !== "won") return;
    if (coherenceCheckFiredRef.current) return;
    const keyId = COHERENCE_KEY_MAP[word];
    if (!keyId) return;
    coherenceCheckFiredRef.current = true;
    const { alreadyRecovered, newState } = markCoherenceKeyRecovered(keyId);
    if (!alreadyRecovered) {
      setRecoveredKeyInfo({
        keyId,
        count: newState.recovered.length,
        isAllUnlocked: newState.unlocked,
      });
      window.dispatchEvent(
        new CustomEvent("jb:coherence-key-recovered", { detail: newState }),
      );
    } else {
      setKeyAlreadyKnown(true);
    }
  }, [gameState, word]);

  const wordRows = useMemo(() => buildWordRows(word), [word]);

  // Whether the current word is a coherence key (used for pre-solve gold styling)
  const isCoherenceKey = Boolean(COHERENCE_KEY_MAP[word]);

  function handleGuess(letter: string) {
    if (gameState !== "playing" || guessedLetters.has(letter)) return;
    const next = new Set(guessedLetters);
    next.add(letter);
    setGuessedLetters(next);

    const wrongCount = [...next].filter((l) => !word.includes(l)).length;
    // Exclude spaces — they are never guessed
    const allRevealed = word
      .split("")
      .filter((l) => l !== " ")
      .every((l) => next.has(l));

    if (allRevealed) {
      setGameState("won");
    } else if (MAX_ATTEMPTS - wrongCount <= 0) {
      setGameState("lost");
    }
  }

  const wrongGuesses = [...guessedLetters].filter(
    (l) => !word.includes(l),
  ).length;
  const remainingAttempts = MAX_ATTEMPTS - wrongGuesses;

  const attemptsColor =
    remainingAttempts > 3
      ? "text-green-500"
      : remainingAttempts >= 2
        ? "text-yellow-500"
        : "text-red-500";

  // Puzzle container classes — add gold glow when playing a coherence key
  const puzzleContainerClass = [
    "rounded-xl border px-6 py-5 mb-6",
    gameState === "playing" && isCoherenceKey
      ? "border-yellow-400/40 bg-muted/20 shadow-[0_0_0_1px_rgba(251,191,36,0.25),0_0_20px_rgba(251,191,36,0.20),0_0_40px_rgba(251,191,36,0.08)]"
      : "border-border/60 bg-muted/20",
  ].join(" ");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-lg mx-auto py-10 px-4" data-ocid="hangman.page">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">
          ICP Decode
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-1">
          Decode the hidden protocol term.
        </p>
        <p className="text-center text-muted-foreground/70 text-xs mb-8">
          Decrypting protocol term…
        </p>

        {/* Signal integrity */}
        <p
          className={`text-center text-sm font-medium ${attemptsColor}`}
          data-ocid="hangman.panel"
        >
          Signal integrity: {remainingAttempts} / {MAX_ATTEMPTS}
        </p>
        <div className="w-48 mx-auto mt-1 mb-6 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-muted-foreground/50 transition-all"
            style={{ width: `${(remainingAttempts / MAX_ATTEMPTS) * 100}%` }}
          />
        </div>

        {/* Last-life hint banner */}
        {hintRevealedLetter && gameState === "playing" && (
          <p className="text-center text-xs text-primary/70 italic mb-3 animate-pulse">
            Signal trace detected… revealing fragment.
          </p>
        )}

        {/* Puzzle container — gold glow when coherence key, terminal/module style otherwise */}
        <div className={puzzleContainerClass}>
          <div
            className="flex flex-col items-center gap-3"
            data-ocid="hangman.card"
          >
            {wordRows.map((rowSlots, rowIdx) => {
              const rowKey = `row-${rowSlots.map((s) => s.letter).join("")}-${rowIdx}`;
              return (
                <div key={rowKey} className="flex gap-2 flex-nowrap">
                  {rowSlots.map(({ letter, slotId }) => {
                    const revealed =
                      guessedLetters.has(letter) ||
                      letter === hintRevealedLetter;
                    const isHint =
                      !guessedLetters.has(letter) &&
                      letter === hintRevealedLetter;
                    return (
                      <div
                        key={slotId}
                        className={[
                          "w-10 h-12 flex items-center justify-center rounded-lg border font-mono",
                          revealed
                            ? isHint
                              ? "border-yellow-400/60 bg-yellow-400/10 text-yellow-400 font-bold text-lg"
                              : "border-primary/50 bg-background text-foreground font-bold text-lg"
                            : isCoherenceKey && gameState === "playing"
                              ? "border-yellow-400/20 bg-yellow-400/5 text-muted-foreground/30"
                              : "border-border bg-muted/40 text-muted-foreground/30",
                        ].join(" ")}
                      >
                        <span>{revealed ? letter : ""}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Revealed letters */}
        {guessedLetters.size > 0 && (
          <p className="text-center text-xs text-muted-foreground mb-6">
            <span className="font-medium">Revealed: </span>
            {[...guessedLetters].sort().join("  ")}
          </p>
        )}

        {/* Win state */}
        {gameState === "won" && (
          <div
            className="rounded-xl border bg-card p-5 mb-6 text-center"
            data-ocid="hangman.success_state"
          >
            <p className="text-2xl font-bold mb-1">Decoded successfully.</p>
            <p className="text-sm text-muted-foreground mb-2">
              Signal restored.
            </p>
            <p className="text-muted-foreground text-sm font-medium mb-3">
              {originalTerm}
            </p>
            {definition && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {definition}
              </p>
            )}

            {/* Post-solve feedback panel — shown for all words */}
            <div className="mt-4 rounded-lg border border-border/40 bg-muted/30 px-4 py-3 text-center space-y-1">
              <p className="text-sm font-semibold text-green-400">✓ Correct</p>
              {rewardSuccess ? (
                <p className="text-xs text-muted-foreground">
                  +{HANGMAN_REWARDS[DEFAULT_DIFFICULTY].bp} BP earned
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Glossary mastery increased
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Glossary mastery increased
              </p>
              {COHERENCE_KEY_MAP[word] && (
                <p className="text-xs text-yellow-400/80 font-medium">
                  🔑 Coherence fragment recovered
                </p>
              )}
            </div>

            {/* Coherence Key first-time discovery feedback */}
            {recoveredKeyInfo && (
              <div className="mt-4 rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-violet-300 mb-1">
                  🔑 Coherence Key Discovered
                </p>
                <p className="text-base font-bold text-violet-200 tracking-widest uppercase mb-1">
                  {recoveredKeyInfo.keyId}
                </p>
                <p className="text-xs text-violet-400/80 mb-1">
                  Used to unlock World 8: Coherence
                </p>
                {!recoveredKeyInfo.isAllUnlocked && (
                  <p className="text-xs text-violet-400/80">
                    Continue decoding to discover all three
                  </p>
                )}
                {recoveredKeyInfo.isAllUnlocked && (
                  <p className="text-xs text-violet-300 font-semibold mt-1">
                    Coherence achieved.
                  </p>
                )}
              </div>
            )}

            {/* Already-discovered state for repeat solves of a coherence key */}
            {keyAlreadyKnown && !recoveredKeyInfo && (
              <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-center">
                <p className="text-sm text-yellow-400/70">
                  🔑 Key already discovered
                </p>
              </div>
            )}
          </div>
        )}

        {/* Lose state */}
        {gameState === "lost" && (
          <div
            className="rounded-xl border bg-card p-5 mb-6 text-center"
            data-ocid="hangman.error_state"
          >
            <p className="text-2xl font-bold mb-1">Signal lost.</p>
            <p className="text-sm text-muted-foreground mb-2">
              Reinitialize and try again.
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              The protocol term was:
            </p>
            <p className="font-bold text-lg mb-3">{originalTerm}</p>
            {definition && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {definition}
              </p>
            )}
          </div>
        )}

        {/* Retry Decode */}
        {gameState !== "playing" && (
          <div className="flex justify-center mb-8">
            <Button onClick={initGame} data-ocid="hangman.primary_button">
              Retry Decode
            </Button>
          </div>
        )}

        {/* Alphabet buttons */}
        <div
          className="flex flex-wrap justify-center gap-1.5"
          data-ocid="hangman.panel"
        >
          {ALPHABET.map((letter) => {
            const guessed = guessedLetters.has(letter);
            const correct = guessed && word.includes(letter);
            const wrong = guessed && !word.includes(letter);
            return (
              <Button
                key={letter}
                variant="outline"
                size="sm"
                className={[
                  "w-9 h-9 p-0 text-sm font-mono font-semibold transition-colors",
                  "hover:brightness-125 hover:border-primary/40",
                  "disabled:hover:brightness-100",
                  correct ? "border-green-500 text-green-500 opacity-70" : "",
                  wrong ? "border-red-400 text-red-400 opacity-40" : "",
                ].join(" ")}
                disabled={guessed || gameState !== "playing"}
                onClick={() => handleGuess(letter)}
                data-ocid="hangman.button"
                aria-label={`Reveal character ${letter}`}
              >
                {letter}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
