export type CoherenceKeyId = "identity" | "consensus" | "compute";

export interface CoherenceKeyState {
  recovered: CoherenceKeyId[];
  unlocked: boolean;
}

const LS_KEY = "jb_coherence_keys";

function defaultState(): CoherenceKeyState {
  return { recovered: [], unlocked: false };
}

export function readCoherenceKeys(): CoherenceKeyState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaultState();
    return JSON.parse(raw) as CoherenceKeyState;
  } catch {
    return defaultState();
  }
}

export function markCoherenceKeyRecovered(keyId: CoherenceKeyId): {
  alreadyRecovered: boolean;
  newState: CoherenceKeyState;
} {
  const state = readCoherenceKeys();
  if (state.recovered.includes(keyId)) {
    return { alreadyRecovered: true, newState: state };
  }
  const nextRecovered = [...state.recovered, keyId] as CoherenceKeyId[];
  const newState: CoherenceKeyState = {
    recovered: nextRecovered,
    unlocked: nextRecovered.length === 3,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(newState));
  return { alreadyRecovered: false, newState };
}
