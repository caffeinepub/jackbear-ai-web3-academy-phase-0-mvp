import { useEffect } from "react";

/**
 * GlobalBPSync — READ ONLY MODE.
 * All sync logic has been disabled (Phase 1: leaderboard write removal).
 * Component is kept mounted to avoid import errors elsewhere.
 */
export default function GlobalBPSync() {
  useEffect(() => {
    console.log("[BP-AUDIT] GlobalBPSync: READ ONLY MODE — all sync disabled");
  }, []);
  return null;
}
