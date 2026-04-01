import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type CrosswordPuzzle,
  type CrosswordWord,
  generateDailyPuzzle,
} from "@/lib/crosswordEngine";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────────

type Direction = "across" | "down";
type CellKey = string; // `${row}-${col}`

function cellKey(row: number, col: number): CellKey {
  return `${row}-${col}`;
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getWordForCell(
  puzzle: CrosswordPuzzle,
  row: number,
  col: number,
  direction: Direction,
): CrosswordWord | null {
  const cell = puzzle.grid[row]?.[col];
  if (!cell || cell.isBlack) return null;
  const wordId = direction === "across" ? cell.acrossWordId : cell.downWordId;
  if (!wordId) return null;
  return puzzle.words.find((w) => w.id === wordId) ?? null;
}

function getWordCells(
  word: CrosswordWord,
): Array<{ row: number; col: number }> {
  return Array.from({ length: word.length }, (_, i) => ({
    row: word.direction === "down" ? word.row + i : word.row,
    col: word.direction === "across" ? word.col + i : word.col,
  }));
}

function checkComplete(
  puzzle: CrosswordPuzzle,
  userInput: Record<CellKey, string>,
): boolean {
  for (let r = 0; r < puzzle.gridSize; r++) {
    for (let c = 0; c < puzzle.gridSize; c++) {
      const cell = puzzle.grid[r][c];
      if (cell.isBlack) continue;
      const input = (userInput[cellKey(r, c)] ?? "").toUpperCase();
      if (input !== cell.letter) return false;
    }
  }
  return true;
}

/**
 * Build the initial userInput state pre-filled with the first letter
 * of every placed word. These serve as hints to reduce difficulty.
 */
function buildInitialHints(puzzle: CrosswordPuzzle): Record<CellKey, string> {
  const hints: Record<CellKey, string> = {};
  for (const word of puzzle.words) {
    hints[cellKey(word.row, word.col)] = word.word[0];
  }
  return hints;
}

// ─── Crossword Grid Cell ───────────────────────────────────────────────────────

interface GridCellProps {
  row: number;
  col: number;
  puzzle: CrosswordPuzzle;
  userInput: Record<CellKey, string>;
  isSelected: boolean;
  isActiveWord: boolean;
  isComplete: boolean;
  isHint: boolean;
  isRecentlyTyped: boolean;
  onClick: (row: number, col: number) => void;
}

function GridCell({
  row,
  col,
  puzzle,
  userInput,
  isSelected,
  isActiveWord,
  isComplete,
  isHint,
  isRecentlyTyped,
  onClick,
}: GridCellProps) {
  const cell = puzzle.grid[row][col];
  const key = cellKey(row, col);
  const userLetter = (userInput[key] ?? "").toUpperCase();
  const isCorrect =
    userLetter !== "" && userLetter === cell.letter.toUpperCase();

  if (cell.isBlack) {
    return (
      <div className="aspect-square bg-muted dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-900" />
    );
  }

  let cellClass: string;
  let letterClass: string;
  let boxShadow = "none";

  if (isComplete) {
    cellClass =
      "bg-green-100 dark:bg-green-950/60 border-2 border-green-500 dark:border-green-500";
    letterClass = "text-green-700 dark:text-green-300 font-bold";
    boxShadow = "0 0 6px oklch(0.60 0.18 145 / 0.35)";
  } else if (isSelected) {
    cellClass =
      "bg-violet-200 dark:bg-violet-900/80 border-2 border-violet-600 dark:border-violet-400";
    letterClass = "text-violet-900 dark:text-violet-100 font-bold";
    boxShadow =
      "0 0 0 2px oklch(0.62 0.26 290), 0 0 16px oklch(0.55 0.22 290 / 0.55)";
  } else if (isActiveWord) {
    cellClass =
      "bg-violet-50 dark:bg-violet-950/50 border border-violet-300 dark:border-violet-700";
    letterClass = "text-gray-900 dark:text-gray-100";
    boxShadow = "inset 0 0 0 1px oklch(0.50 0.16 285 / 0.35)";
  } else if (isHint && userLetter !== "") {
    // Pre-revealed first-letter hint cell — subtle amber tint
    cellClass =
      "bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800";
    letterClass = "text-amber-700 dark:text-amber-400";
  } else if (isCorrect) {
    cellClass =
      "bg-teal-50 dark:bg-teal-950/30 border border-teal-300 dark:border-teal-800";
    letterClass = "text-teal-700 dark:text-teal-400";
  } else {
    cellClass =
      "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700";
    letterClass = "text-gray-900 dark:text-gray-200";
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled via hidden input
    // biome-ignore lint/a11y/useFocusableInteractive: keyboard handled via hidden input
    // biome-ignore lint/a11y/useSemanticElements: crossword cell cannot use td without table structure
    <div
      className={cn(
        "aspect-square relative cursor-pointer select-none transition-all duration-100",
        cellClass,
        isRecentlyTyped && !isComplete && "scale-[1.08] brightness-110 z-10",
      )}
      style={{ boxShadow }}
      onClick={() => onClick(row, col)}
    >
      {/* Clue number */}
      {cell.number !== undefined && (
        <span
          className="absolute top-0 left-0 leading-none pointer-events-none z-10 text-neutral-500 dark:text-neutral-500"
          style={{
            fontSize: "clamp(6px, 1.2vw, 9px)",
            padding: "1px 2px",
            fontFamily: "monospace",
          }}
        >
          {cell.number}
        </span>
      )}
      {/* User letter */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-bold pointer-events-none uppercase",
          letterClass,
        )}
        style={{
          fontSize: "clamp(11px, 2.5vw, 18px)",
          fontFamily: "'Courier New', Courier, monospace",
          letterSpacing: 0,
        }}
      >
        {userLetter}
      </span>
    </div>
  );
}

// ─── Clue List ──────────────────────────────────────────────────────────────────

interface ClueListProps {
  title: string;
  clues: CrosswordWord[];
  activeWordId: string | null;
  onClueClick: (word: CrosswordWord) => void;
}

function ClueList({ title, clues, activeWordId, onClueClick }: ClueListProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeWordId controls scroll-to-active
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeWordId]);

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-violet-600 dark:text-violet-400 pb-1.5 border-b border-violet-200 dark:border-violet-900">
        {title}
      </h3>
      <div className="space-y-1">
        {clues.map((clue) => {
          const isActive = clue.id === activeWordId;
          return (
            <button
              key={clue.id}
              type="button"
              ref={isActive ? activeRef : null}
              onClick={() => onClueClick(clue)}
              className={cn(
                "w-full text-left rounded-r py-1.5 pr-2 transition-all duration-100 text-sm leading-snug",
                isActive
                  ? "border-l-2 border-violet-500 pl-3 bg-violet-50 dark:bg-violet-950/40 text-gray-900 dark:text-gray-100"
                  : "border-l-2 border-transparent pl-3 text-gray-500 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-violet-200 dark:hover:border-violet-800",
              )}
            >
              {isActive ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block rounded-sm px-1 py-0 text-xs font-bold bg-violet-600 text-white leading-tight">
                    {clue.number}
                  </span>
                  <span>{clue.clue}</span>
                </span>
              ) : (
                <span>
                  <span className="font-semibold mr-1 text-gray-400 dark:text-neutral-500">
                    {clue.number}.
                  </span>
                  {clue.clue}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Completion Banner ─────────────────────────────────────────────────────────

function CompletionBanner({
  dateKey,
  wordCount,
}: {
  dateKey: string;
  wordCount: number;
}) {
  return (
    <div
      className="rounded-2xl p-8 text-center mb-6 animate-in fade-in zoom-in duration-500 bg-green-50 dark:bg-green-950/40 border border-green-400 dark:border-green-600"
      style={{
        boxShadow:
          "0 0 40px oklch(0.58 0.18 145 / 0.30), 0 0 80px oklch(0.48 0.14 200 / 0.18), inset 0 1px 0 oklch(0.85 0.10 145 / 0.4)",
      }}
    >
      <div className="flex justify-center mb-4">
        <div className="animate-bounce">
          <Trophy
            size={52}
            className="text-green-500 dark:text-green-400"
            strokeWidth={1.5}
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-300 tracking-tight">
        Puzzle Solved!
      </h2>
      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
        {dateKey}
      </p>
      <p className="text-sm text-green-600 dark:text-green-500 mb-3">
        <span className="font-semibold">{wordCount} words</span> unlocked
      </p>
      <p className="text-xs text-green-500 dark:text-green-600 border-t border-green-200 dark:border-green-800 pt-3 mt-1">
        Come back tomorrow for a new challenge.
      </p>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────

export default function CrosswordPage() {
  const puzzle = useMemo<CrosswordPuzzle | null>(
    () => generateDailyPuzzle(),
    [],
  );

  // Pre-reveal the first letter of each word as a hint
  const [userInput, setUserInput] = useState<Record<CellKey, string>>(() =>
    puzzle ? buildInitialHints(puzzle) : {},
  );

  // Set of cells that contain pre-revealed hint letters
  const hintCells = useMemo<Set<CellKey>>(() => {
    if (!puzzle) return new Set();
    const s = new Set<CellKey>();
    for (const word of puzzle.words) {
      s.add(cellKey(word.row, word.col));
    }
    return s;
  }, [puzzle]);

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [direction, setDirection] = useState<Direction>("across");
  const [isComplete, setIsComplete] = useState(false);
  // Key of the most recently typed cell — cleared after 150ms for brief scale feedback
  const [recentlyTypedKey, setRecentlyTypedKey] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Focused word derived from selection
  const activeWord = useMemo<CrosswordWord | null>(() => {
    if (!puzzle || !selectedCell) return null;
    return getWordForCell(
      puzzle,
      selectedCell.row,
      selectedCell.col,
      direction,
    );
  }, [puzzle, selectedCell, direction]);

  // Set of cell keys that belong to the active word
  const activeWordCellKeys = useMemo<Set<CellKey>>(() => {
    if (!activeWord) return new Set();
    return new Set(getWordCells(activeWord).map((c) => cellKey(c.row, c.col)));
  }, [activeWord]);

  // Check completion whenever input changes
  useEffect(() => {
    if (!puzzle) return;
    if (checkComplete(puzzle, userInput)) {
      setIsComplete(true);
    }
  }, [userInput, puzzle]);

  // Focus the hidden input on mount
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, []);

  const selectCell = useCallback(
    (row: number, col: number) => {
      if (!puzzle) return;
      const cell = puzzle.grid[row]?.[col];
      if (!cell || cell.isBlack) return;

      if (
        selectedCell &&
        selectedCell.row === row &&
        selectedCell.col === col
      ) {
        // Toggle direction if clicking the same cell
        const newDir = direction === "across" ? "down" : "across";
        // Only toggle if cell belongs to a word in that direction
        const has = newDir === "across" ? cell.acrossWordId : cell.downWordId;
        if (has) setDirection(newDir);
      } else {
        setSelectedCell({ row, col });
        // Prefer the current direction if the cell supports it
        const supportsDir =
          direction === "across" ? cell.acrossWordId : cell.downWordId;
        if (!supportsDir) {
          setDirection(direction === "across" ? "down" : "across");
        }
      }
      hiddenInputRef.current?.focus();
    },
    [puzzle, selectedCell, direction],
  );

  const selectWordFromClue = useCallback((word: CrosswordWord) => {
    setDirection(word.direction);
    setSelectedCell({ row: word.row, col: word.col });
    hiddenInputRef.current?.focus();
  }, []);

  const advanceCell = useCallback(
    (row: number, col: number, dir: Direction): void => {
      if (!puzzle) return;
      const nextRow = dir === "down" ? row + 1 : row;
      const nextCol = dir === "across" ? col + 1 : col;
      if (
        nextRow < puzzle.gridSize &&
        nextCol < puzzle.gridSize &&
        !puzzle.grid[nextRow][nextCol].isBlack
      ) {
        setSelectedCell({ row: nextRow, col: nextCol });
      }
    },
    [puzzle],
  );

  const retreatCell = useCallback(
    (row: number, col: number, dir: Direction): void => {
      if (!puzzle) return;
      const prevRow = dir === "down" ? row - 1 : row;
      const prevCol = dir === "across" ? col - 1 : col;
      if (
        prevRow >= 0 &&
        prevCol >= 0 &&
        !puzzle.grid[prevRow][prevCol].isBlack
      ) {
        setSelectedCell({ row: prevRow, col: prevCol });
      }
    },
    [puzzle],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!puzzle || !selectedCell || isComplete) return;
      const { row, col } = selectedCell;

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        const key = cellKey(row, col);
        // Protect hint cells — backspace retreats instead of clearing
        if (hintCells.has(key)) {
          retreatCell(row, col, direction);
          return;
        }
        if (userInput[key]) {
          setUserInput((prev) => {
            const next = { ...prev };
            delete next[key];
            return next;
          });
        } else {
          retreatCell(row, col, direction);
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (direction !== "across") {
          setDirection("across");
          return;
        }
        advanceCell(row, col, "across");
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (direction !== "across") {
          setDirection("across");
          return;
        }
        retreatCell(row, col, "across");
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (direction !== "down") {
          setDirection("down");
          return;
        }
        advanceCell(row, col, "down");
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (direction !== "down") {
          setDirection("down");
          return;
        }
        retreatCell(row, col, "down");
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        if (!activeWord) return;
        const allWords = [...puzzle.acrossClues, ...puzzle.downClues].sort(
          (a, b) => a.number - b.number,
        );
        const idx = allWords.findIndex((w) => w.id === activeWord.id);
        const next = allWords[(idx + 1) % allWords.length];
        if (next) selectWordFromClue(next);
        return;
      }

      // Letter input
      if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        const letter = e.key.toUpperCase();
        const typedKey = cellKey(row, col);
        setUserInput((prev) => ({ ...prev, [typedKey]: letter }));
        // Brief scale feedback on the typed cell
        setRecentlyTypedKey(typedKey);
        setTimeout(
          () =>
            setRecentlyTypedKey((prev) => (prev === typedKey ? null : prev)),
          150,
        );
        advanceCell(row, col, direction);
      }
    },
    [
      puzzle,
      selectedCell,
      direction,
      userInput,
      isComplete,
      activeWord,
      hintCells,
      advanceCell,
      retreatCell,
      selectWordFromClue,
    ],
  );

  // Restore hints when clearing so the first-letter reveals persist
  const handleClearPuzzle = () => {
    setUserInput(puzzle ? buildInitialHints(puzzle) : {});
    setIsComplete(false);
  };

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Unable to generate today&apos;s puzzle. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden input to capture keyboard events */}
      <input
        ref={hiddenInputRef}
        className="sr-only"
        aria-label="Crossword input"
        readOnly
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => hiddenInputRef.current?.focus(), 50)}
      />

      {/* Page wrapper */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Header HUD */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold tracking-wide text-gray-900 dark:text-gray-100">
                Daily Crossword
              </span>
              <Badge
                variant="outline"
                className="text-xs border-violet-300 dark:border-violet-700 text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30"
              >
                {puzzle.dateKey}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-neutral-500">
              {puzzle.words.length} words &middot; First letters revealed
              &middot; Same puzzle for all players today
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isComplete && (
              <Badge className="text-sm px-3 py-1 gap-1.5 animate-in fade-in bg-green-100 dark:bg-green-950/40 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400">
                <Trophy size={12} />
                Solved!
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearPuzzle}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Completion banner */}
        {isComplete && (
          <CompletionBanner
            dateKey={puzzle.dateKey}
            wordCount={puzzle.words.length}
          />
        )}

        {/* Active clue hint bar */}
        {activeWord && !isComplete && (
          <div className="rounded-lg px-4 py-3 mb-5 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide bg-violet-600 text-white shrink-0">
              {activeWord.direction === "across" ? "\u2192" : "\u2193"}{" "}
              {activeWord.direction === "across" ? "ACROSS" : "DOWN"}
            </span>
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 shrink-0">
              {activeWord.number}
            </span>
            <span className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
              {activeWord.clue}
            </span>
          </div>
        )}

        {/* Main layout: grid + clues */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Grid */}
          <div className="flex-shrink-0">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled via hidden input */}
            {/* biome-ignore lint/a11y/useSemanticElements: CSS grid layout, not semantic table */}
            <div
              ref={gridRef}
              onClick={() => hiddenInputRef.current?.focus()}
              className="bg-muted/50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 p-2 mx-auto"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${puzzle.gridSize}, 1fr)`,
                gap: "2px",
                boxShadow:
                  "0 4px 24px oklch(0.05 0.02 270 / 0.8), inset 0 1px 0 oklch(0.20 0.04 270 / 0.5)",
                width: "min(100%, 420px)",
              }}
            >
              {puzzle.grid.map((row, ri) =>
                row.map((_, ci) => {
                  const key = cellKey(ri, ci);
                  const isSelected =
                    selectedCell?.row === ri && selectedCell?.col === ci;
                  const isActiveWordCell = activeWordCellKeys.has(key);
                  return (
                    <GridCell
                      key={key}
                      row={ri}
                      col={ci}
                      puzzle={puzzle}
                      userInput={userInput}
                      isSelected={isSelected}
                      isActiveWord={isActiveWordCell && !isSelected}
                      isComplete={isComplete}
                      isHint={hintCells.has(key)}
                      isRecentlyTyped={recentlyTypedKey === key}
                      onClick={selectCell}
                    />
                  );
                }),
              )}
            </div>

            {/* Direction indicator */}
            {!isComplete && (
              <div className="flex justify-center gap-2 mt-3">
                {(["across", "down"] as Direction[]).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => {
                      setDirection(dir);
                      hiddenInputRef.current?.focus();
                    }}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full transition-all border",
                      direction === dir
                        ? "bg-violet-600 dark:bg-violet-700 border-violet-600 dark:border-violet-600 text-white font-semibold shadow-sm"
                        : "bg-gray-100 dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 text-gray-500 dark:text-neutral-500 hover:border-violet-300 dark:hover:border-violet-700",
                    )}
                  >
                    {dir === "across" ? "\u2192 Across" : "\u2193 Down"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clues panel */}
          <div
            className="flex-1 min-w-0 rounded-xl p-4 overflow-y-auto bg-card border border-border"
            style={{ maxHeight: "480px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ClueList
                title="Across"
                clues={puzzle.acrossClues}
                activeWordId={
                  activeWord?.direction === "across" ? activeWord.id : null
                }
                onClueClick={selectWordFromClue}
              />
              <ClueList
                title="Down"
                clues={puzzle.downClues}
                activeWordId={
                  activeWord?.direction === "down" ? activeWord.id : null
                }
                onClueClick={selectWordFromClue}
              />
            </div>
          </div>
        </div>

        {/* Footer instructions */}
        <p className="text-center text-xs mt-4 text-gray-400 dark:text-neutral-600">
          Click a cell to select &middot; Type to fill &middot; Backspace to
          clear &middot; Arrow keys to navigate &middot; Tab for next word
        </p>
      </div>
    </div>
  );
}
