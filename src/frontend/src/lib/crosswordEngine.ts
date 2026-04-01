/**
 * Glossary Crossword Engine
 * Deterministic daily puzzle generation from allGlossaryTerms.
 * No backend required — seed is derived from YYYYMMDD.
 */

import { allGlossaryTerms } from "@/lib/glossaryData";

// ─── Public Types ─────────────────────────────────────────────────────────────

export interface CrosswordWord {
  id: string;
  word: string;
  clue: string;
  direction: "across" | "down";
  row: number;
  col: number;
  number: number;
  length: number;
}

export interface CrosswordCell {
  letter: string; // correct letter; '' means black/empty
  isBlack: boolean;
  number?: number; // clue number label (if this cell starts a word)
  acrossWordId?: string;
  downWordId?: string;
}

export interface CrosswordPuzzle {
  gridSize: number;
  grid: CrosswordCell[][];
  words: CrosswordWord[];
  acrossClues: CrosswordWord[];
  downClues: CrosswordWord[];
  dateKey: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GRID_SIZE = 10;
const MIN_WORDS = 4;
const MAX_WORDS = 6; // reduced from 8 — fewer words = more approachable
const MIN_WORD_LEN = 4;
const MAX_WORD_LEN = 7; // reduced from 9 — prefer shorter, recognizable words

// ─── Preferred/common terms ── boosted in candidate selection ─────────────────
// Well-known ICP and Web3 terms that are easier to recall from a clue.
// These appear twice in the shuffled pool, increasing their selection probability.

const PREFERRED_TERMS = new Set([
  "TOKEN",
  "STAKE",
  "BLOCK",
  "CHAIN",
  "LEDGER",
  "NEURON",
  "CYCLES",
  "SUBNET",
  "MOTOKO",
  "WALLET",
  "DAPP",
  "WASM",
  "MINT",
  "BURN",
  "VOTE",
  "NODE",
  "HASH",
  "FORK",
  "ASSET",
  "VAULT",
  "QUERY",
  "EPOCH",
  "NONCE",
  "RELAY",
  "SHARD",
  "INDEX",
  "PROOF",
  "SWAP",
  "PEER",
  "SIGN",
  "STAKING",
  "NEURON",
  "CONSENT",
  "FREEDOM",
]);

// ─── Fallback word pool (used if glossary is unavailable) ────────────────────

const FALLBACK_POOL: Array<{ word: string; clue: string }> = [
  {
    word: "SUBNET",
    clue: "An independent blockchain that runs in parallel on ICP.",
  },
  {
    word: "MOTOKO",
    clue: "A programming language designed specifically for ICP.",
  },
  {
    word: "CYCLES",
    clue: "Computational resources consumed by canisters on ICP.",
  },
  {
    word: "NEURON",
    clue: "A staked ICP governance token that votes on proposals.",
  },
  { word: "TOKEN", clue: "A digital asset issued on a blockchain network." },
  {
    word: "LEDGER",
    clue: "A distributed record-keeping system for transactions.",
  },
  { word: "STAKE", clue: "To lock tokens in a governance system for rewards." },
  { word: "VAULT", clue: "A secure storage system for digital assets." },
  {
    word: "NODE",
    clue: "A machine that participates in a blockchain network.",
  },
  {
    word: "BLOCK",
    clue: "A unit of data on a blockchain containing transactions.",
  },
  { word: "HASH", clue: "A cryptographic fingerprint of data." },
  {
    word: "VOTE",
    clue: "To participate in decentralized governance decisions.",
  },
  { word: "CHAIN", clue: "A sequence of linked cryptographic blocks." },
  { word: "WALLET", clue: "A tool for storing and managing digital assets." },
  {
    word: "CONSENT",
    clue: "Explicit permission for how personal data is used.",
  },
  {
    word: "FREEDOM",
    clue: "The ability to use digital services without restriction.",
  },
];

// ─── Seeded RNG (LCG) ─────────────────────────────────────────────────────────

function createRng(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0;
    return (s >>> 0) / 0x100000000;
  };
}

function shuffled<T>(arr: T[], rng: () => number): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ─── Date / seed helpers ──────────────────────────────────────────────────────

export function getDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dateToSeed(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  // XOR with a prime to avoid trivial seeds
  return (y * 10000 + m * 100 + d) ^ 0x45e3f7;
}

// ─── Word candidate extraction ────────────────────────────────────────────────

function buildCandidatePool(): Array<{ word: string; clue: string }> {
  const source =
    allGlossaryTerms && allGlossaryTerms.length > 0 ? allGlossaryTerms : null;

  if (!source) return FALLBACK_POOL;

  const seen = new Set<string>();
  const result: Array<{ word: string; clue: string }> = [];

  for (const entry of source) {
    // Strip to alpha-only uppercase; skip multi-word terms
    const raw = entry.term.toUpperCase();
    if (raw.includes(" ")) continue;
    const word = raw.replace(/[^A-Z]/g, "");
    if (word.length < MIN_WORD_LEN || word.length > MAX_WORD_LEN) continue;
    if (seen.has(word)) continue;
    seen.add(word);
    result.push({ word, clue: entry.definition });
  }

  // Pad with fallbacks if pool is too small
  if (result.length < MIN_WORDS * 3) {
    for (const fb of FALLBACK_POOL) {
      // Respect the length constraint even for fallbacks
      if (!seen.has(fb.word) && fb.word.length <= MAX_WORD_LEN) {
        seen.add(fb.word);
        result.push(fb);
      }
    }
  }

  return result;
}

// ─── Grid helpers ─────────────────────────────────────────────────────────────

type RawGrid = string[][];

function makeGrid(): RawGrid {
  return Array.from({ length: GRID_SIZE }, () =>
    Array<string>(GRID_SIZE).fill(""),
  );
}

/**
 * Returns true if word can be placed at (row, col) in direction without
 * conflicting with existing letters or creating illegal adjacency.
 * requireIntersect: first word can skip this check.
 */
function canPlace(
  grid: RawGrid,
  word: string,
  row: number,
  col: number,
  dir: "across" | "down",
  requireIntersect: boolean,
): boolean {
  if (row < 0 || col < 0) return false;
  if (dir === "across" && col + word.length > GRID_SIZE) return false;
  if (dir === "down" && row + word.length > GRID_SIZE) return false;

  // Adjacency: word must not extend/merge with another word
  if (dir === "across") {
    if (col > 0 && grid[row][col - 1] !== "") return false;
    if (col + word.length < GRID_SIZE && grid[row][col + word.length] !== "")
      return false;
  } else {
    if (row > 0 && grid[row - 1][col] !== "") return false;
    if (row + word.length < GRID_SIZE && grid[row + word.length][col] !== "")
      return false;
  }

  let intersections = 0;
  for (let i = 0; i < word.length; i++) {
    const r = dir === "down" ? row + i : row;
    const c = dir === "across" ? col + i : col;
    const existing = grid[r][c];

    if (existing === "") {
      // Check no parallel neighbour that would create an illegal merge
      if (dir === "across") {
        if (r > 0 && grid[r - 1][c] !== "") return false;
        if (r < GRID_SIZE - 1 && grid[r + 1][c] !== "") return false;
      } else {
        if (c > 0 && grid[r][c - 1] !== "") return false;
        if (c < GRID_SIZE - 1 && grid[r][c + 1] !== "") return false;
      }
    } else if (existing === word[i]) {
      intersections++;
    } else {
      return false; // Letter conflict
    }
  }

  return !requireIntersect || intersections > 0;
}

function writeWord(
  grid: RawGrid,
  word: string,
  row: number,
  col: number,
  dir: "across" | "down",
): void {
  for (let i = 0; i < word.length; i++) {
    const r = dir === "down" ? row + i : row;
    const c = dir === "across" ? col + i : col;
    grid[r][c] = word[i];
  }
}

// ─── Grid placement ───────────────────────────────────────────────────────────

interface PlacedWord {
  word: string;
  clue: string;
  row: number;
  col: number;
  direction: "across" | "down";
}

function attemptPlacement(
  pool: Array<{ word: string; clue: string }>,
  rng: () => number,
): PlacedWord[] {
  const grid = makeGrid();
  const placed: PlacedWord[] = [];

  // ── Tiered shuffle: preferred/short words come first ──────────────────────
  // This biases the puzzle toward common, recognizable glossary terms.
  // Tier 1: preferred terms or words ≤ 6 letters
  // Tier 2: everything else (length 7, less common terms)
  const tier1 = pool.filter(
    (e) => PREFERRED_TERMS.has(e.word) || e.word.length <= 6,
  );
  const tier2 = pool.filter(
    (e) => !PREFERRED_TERMS.has(e.word) && e.word.length > 6,
  );
  const candidates = [...shuffled(tier1, rng), ...shuffled(tier2, rng)];

  if (candidates.length === 0) return placed;

  // Place first word horizontally at center
  const first = candidates[0];
  const startRow = Math.floor(GRID_SIZE / 2);
  const startCol = Math.floor((GRID_SIZE - first.word.length) / 2);
  writeWord(grid, first.word, startRow, startCol, "across");
  placed.push({ ...first, row: startRow, col: startCol, direction: "across" });

  // Try to intersect remaining words
  for (let wi = 1; wi < candidates.length && placed.length < MAX_WORDS; wi++) {
    const candidate = candidates[wi];
    // Skip if this exact word is already placed
    if (placed.some((p) => p.word === candidate.word)) continue;
    let success = false;

    for (let ai = 0; ai < placed.length && !success; ai++) {
      const anchor = placed[ai];
      const newDir: "across" | "down" =
        anchor.direction === "across" ? "down" : "across";

      for (let ni = 0; ni < candidate.word.length && !success; ni++) {
        for (let pi = 0; pi < anchor.word.length && !success; pi++) {
          if (candidate.word[ni] !== anchor.word[pi]) continue;

          // Compute intersection point on grid
          const intR =
            anchor.direction === "across" ? anchor.row : anchor.row + pi;
          const intC =
            anchor.direction === "across" ? anchor.col + pi : anchor.col;

          // Start position of new word
          const newRow = newDir === "down" ? intR - ni : intR;
          const newCol = newDir === "across" ? intC - ni : intC;

          if (canPlace(grid, candidate.word, newRow, newCol, newDir, true)) {
            writeWord(grid, candidate.word, newRow, newCol, newDir);
            placed.push({
              ...candidate,
              row: newRow,
              col: newCol,
              direction: newDir,
            });
            success = true;
          }
        }
      }
    }
  }

  return placed;
}

// ─── Cell / number building ───────────────────────────────────────────────────

function buildPuzzleCells(placed: PlacedWord[]): {
  grid: CrosswordCell[][];
  words: CrosswordWord[];
} {
  // Reconstruct raw grid for letter lookup
  const raw = makeGrid();
  for (const pw of placed)
    writeWord(raw, pw.word, pw.row, pw.col, pw.direction);

  // Word-id membership per cell
  type CellMembership = { across?: string; down?: string };
  const membership: CellMembership[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({}) as CellMembership),
  );

  const tempWords = placed.map((pw, idx) => ({
    id: `word-${idx}`,
    word: pw.word,
    clue: pw.clue,
    direction: pw.direction,
    row: pw.row,
    col: pw.col,
    length: pw.word.length,
  }));

  for (const tw of tempWords) {
    for (let i = 0; i < tw.word.length; i++) {
      const r = tw.direction === "down" ? tw.row + i : tw.row;
      const c = tw.direction === "across" ? tw.col + i : tw.col;
      if (tw.direction === "across") membership[r][c].across = tw.id;
      else membership[r][c].down = tw.id;
    }
  }

  // Standard crossword numbering: top-to-bottom, left-to-right
  let clueNum = 1;
  const cellNum: number[][] = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0),
  );
  const wordNum: Record<string, number> = {};

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (raw[r][c] === "") continue;

      const mem = membership[r][c];
      const acrossStart =
        mem.across !== undefined && (c === 0 || raw[r][c - 1] === "");
      const downStart =
        mem.down !== undefined && (r === 0 || raw[r - 1][c] === "");

      if (acrossStart || downStart) {
        cellNum[r][c] = clueNum;
        if (acrossStart && mem.across) wordNum[mem.across] = clueNum;
        if (downStart && mem.down) wordNum[mem.down] = clueNum;
        clueNum++;
      }
    }
  }

  // Build CrosswordCell grid
  const grid: CrosswordCell[][] = Array.from({ length: GRID_SIZE }, (_, r) =>
    Array.from({ length: GRID_SIZE }, (_, c) => {
      const letter = raw[r][c];
      if (letter === "") return { letter: "", isBlack: true };
      const mem = membership[r][c];
      return {
        letter,
        isBlack: false,
        number: cellNum[r][c] || undefined,
        acrossWordId: mem.across,
        downWordId: mem.down,
      };
    }),
  );

  // Build CrosswordWord array with final numbers
  const words: CrosswordWord[] = tempWords.map((tw) => ({
    ...tw,
    number: wordNum[tw.id] ?? 0,
  }));

  return { grid, words };
}

// ─── Public entry point ───────────────────────────────────────────────────────

/**
 * Generate the daily crossword puzzle.
 * Deterministic for a given date — identical for all users on the same day.
 */
export function generateDailyPuzzle(
  date: Date = new Date(),
): CrosswordPuzzle | null {
  const baseSeed = dateToSeed(date);
  const pool = buildCandidatePool();

  // Try base seed first; retry with offsets if not enough words placed
  for (let attempt = 0; attempt < 10; attempt++) {
    const rng = createRng(baseSeed + attempt * 997);
    const placed = attemptPlacement(pool, rng);

    if (placed.length < MIN_WORDS) continue;

    const { grid, words } = buildPuzzleCells(placed);

    const acrossClues = words
      .filter((w) => w.direction === "across")
      .sort((a, b) => a.number - b.number);
    const downClues = words
      .filter((w) => w.direction === "down")
      .sort((a, b) => a.number - b.number);

    return {
      gridSize: GRID_SIZE,
      grid,
      words,
      acrossClues,
      downClues,
      dateKey: getDateKey(date),
    };
  }

  return null; // Extremely unlikely; only if pool is nearly empty
}
