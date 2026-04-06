/**
 * MISSIONS-ONLY SHARED STORE
 *
 * Single source of truth for all mission data.
 * Used by both /missions (public feed) and /admin/missions (admin queue).
 *
 * Rules:
 * - Public feed shows only status === "live"
 * - Publish Live is blocked unless fundingStatus === "funded"
 * - All mutations go through the exported store functions
 *
 * This is completely isolated from all other platform systems.
 */

export type MissionStatus =
  | "pending_review"
  | "pending_funding"
  | "funded"
  | "live"
  | "winner_selected"
  | "paid"
  | "rejected"
  | "closed"
  | "demo_completed";

export type MissionPhase =
  | "entry"
  | "shortlist"
  | "finalist"
  | "winner_selected";
export type MissionDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type PayoutStatus = "pending" | "awarded" | "paid";
export type FundingStatus = "unfunded" | "pending_funding" | "funded";

export interface Mission {
  id: string;
  title: string;
  company: string;
  contactEmail: string;
  shortDescription: string;
  fullDescription: string;
  successCriteria: string;
  bounty: number;
  category: string;
  difficulty: MissionDifficulty;
  submissionCount: number;
  deadline: string;
  submittedDate: string;
  status: MissionStatus;
  phase: MissionPhase;
  rewardStructure: string;
  payoutStatus: PayoutStatus;
  fundingStatus: FundingStatus;
  submissionInstructions: string;
  isExample?: boolean;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
// All previously-live/closed seed missions are reclassified as demo_completed examples.
// Admin-only missions (pending_review, pending_funding, rejected) keep their statuses.

const INITIAL_MISSIONS: Mission[] = [
  {
    id: "mission-001",
    title: "Build a Web3 Onboarding Flow",
    company: "ChainForge Labs",
    contactEmail: "hello@chainforge.io",
    shortDescription:
      "Design a seamless onboarding experience for new Web3 users on ICP.",
    fullDescription:
      "Create a step-by-step onboarding flow that guides non-technical users through creating an Internet Identity, connecting to a dapp, and completing their first on-chain action. The solution must be built on Caffeine.ai and demonstrate clear UX thinking.",
    successCriteria:
      "Working prototype with at least 3 onboarding steps, mobile-friendly, and deployed on ICP.",
    bounty: 500,
    category: "UX / Product",
    difficulty: "Beginner",
    submissionCount: 7,
    deadline: "2025-07-15",
    submittedDate: "2025-06-01",
    status: "demo_completed",
    phase: "entry",
    rewardStructure: "Winner: $500 USDC · Runner-up: $100 USDC",
    payoutStatus: "paid",
    fundingStatus: "funded",
    submissionInstructions:
      "Submit a Caffeine.ai project link and a short explanation of your approach.",
    isExample: true,
  },
  {
    id: "mission-002",
    title: "Create an ICP Glossary Quiz App",
    company: "Dfinity Community DAO",
    contactEmail: "grants@icp-dao.org",
    shortDescription:
      "Build an interactive quiz app teaching ICP concepts through gamification.",
    fullDescription:
      "Develop a quiz application that covers key Internet Computer concepts. The app should include at least 20 questions, scoring, and a leaderboard. Bonus points for daily streaks or spaced repetition.",
    successCriteria:
      "Deployed app with 20+ questions, scoring system, and leaderboard.",
    bounty: 750,
    category: "Education",
    difficulty: "Intermediate",
    submissionCount: 12,
    deadline: "2025-07-22",
    submittedDate: "2025-06-05",
    status: "demo_completed",
    phase: "shortlist",
    rewardStructure:
      "Winner: $600 USDC · Finalist 1: $100 USDC · Finalist 2: $50 USDC",
    payoutStatus: "paid",
    fundingStatus: "funded",
    submissionInstructions:
      "Link to deployed app + GitHub repo if public. Include a 2-minute demo video.",
    isExample: true,
  },
  {
    id: "mission-003",
    title: "Design a DAO Voting Dashboard",
    company: "OpenGov Protocol",
    contactEmail: "builders@opengov.xyz",
    shortDescription:
      "Build a clean, real-time DAO voting interface using ICP canisters.",
    fullDescription:
      "Create a governance dashboard that displays active proposals, vote counts, and allows users to cast votes through Internet Identity. The UI should be clean, fast, and work on mobile.",
    successCriteria:
      "Working voting interface with proposal list, vote submission, and real-time tallies.",
    bounty: 1200,
    category: "Governance",
    difficulty: "Advanced",
    submissionCount: 5,
    deadline: "2025-08-01",
    submittedDate: "2025-06-10",
    status: "demo_completed",
    phase: "finalist",
    rewardStructure: "Winner: $1,000 USDC · Runner-up: $200 USDC",
    payoutStatus: "paid",
    fundingStatus: "funded",
    submissionInstructions:
      "Deploy on ICP and share the canister ID. Include a README with setup instructions.",
    isExample: true,
  },
  {
    id: "mission-004",
    title: "Build a Token Swap Interface",
    company: "ICP DeFi Alliance",
    contactEmail: "dev@icpdefi.io",
    shortDescription: "Prototype a simple token swap UI for an ICP-native DEX.",
    fullDescription:
      "Design and build a token swap interface similar to Uniswap but targeting ICP native tokens. Focus on clean UX, price display, and a simulated swap flow. Full on-chain swap execution is a bonus, not required.",
    successCriteria:
      "Working UI prototype with token selection, price feed (can be mocked), and swap button.",
    bounty: 2000,
    category: "DeFi",
    difficulty: "Advanced",
    submissionCount: 3,
    deadline: "2025-08-15",
    submittedDate: "2025-06-12",
    status: "demo_completed",
    phase: "finalist",
    rewardStructure: "Winner: $1,500 USDC · Finalist: $500 USDC",
    payoutStatus: "paid",
    fundingStatus: "funded",
    submissionInstructions:
      "Submit a Caffeine.ai project link. Include a short loom or written walkthrough.",
    isExample: true,
  },
  {
    id: "mission-005",
    title: "Create a NFT Minting Tool",
    company: "PixelBear Studios",
    contactEmail: "create@pixelbear.art",
    shortDescription:
      "Build a simple NFT minting interface for ICP's ICRC-7 standard.",
    fullDescription:
      "Create a no-code or low-code minting tool that lets creators mint NFTs on ICP using the ICRC-7 standard. The tool should support image upload, metadata entry, and mint confirmation.",
    successCriteria:
      "Working minting tool that creates at least one testnet NFT with correct ICRC-7 metadata.",
    bounty: 800,
    category: "NFT / Creator",
    difficulty: "Intermediate",
    submissionCount: 9,
    deadline: "2025-07-30",
    submittedDate: "2025-06-15",
    status: "demo_completed",
    phase: "entry",
    rewardStructure: "Winner: $650 USDC · Runner-up: $150 USDC",
    payoutStatus: "paid",
    fundingStatus: "funded",
    submissionInstructions:
      "Share a deployed demo link. Include the canister ID used for minting.",
    isExample: true,
  },
  {
    id: "mission-006",
    title: "Deploy a Canister Status Monitor",
    company: "ICP DevTools",
    contactEmail: "team@icpdevtools.dev",
    shortDescription:
      "Build a monitoring dashboard for ICP canister health and cycles.",
    fullDescription:
      "Create a dashboard that tracks canister status, cycle balances, and uptime for a list of user-provided canister IDs. Alert system (email or in-app) is a bonus.",
    successCriteria:
      "Dashboard that correctly displays cycles balance and status for at least 3 canisters.",
    bounty: 600,
    category: "DevTools",
    difficulty: "Intermediate",
    submissionCount: 14,
    deadline: "2025-06-30",
    submittedDate: "2025-05-20",
    status: "demo_completed",
    phase: "winner_selected",
    rewardStructure: "Winner: $500 USDC · Runner-up: $100 USDC",
    payoutStatus: "paid",
    fundingStatus: "funded",
    submissionInstructions:
      "Submit your deployed app link with a short explanation of the monitoring approach.",
    isExample: true,
  },
  // Admin-only missions (pending states — not visible publicly)
  {
    id: "mission-007",
    title: "ICP Social Feed Builder",
    company: "SocialChain Inc",
    contactEmail: "dev@socialchain.xyz",
    shortDescription:
      "Build a decentralized social feed using ICP storage and identity.",
    fullDescription:
      "Create a social feed app where users can post short updates stored fully on-chain via ICP canisters. Must support Internet Identity login and display posts in real-time.",
    successCriteria:
      "Deployed app with post creation, feed display, and II authentication.",
    bounty: 1500,
    category: "Social",
    difficulty: "Advanced",
    submissionCount: 0,
    deadline: "2025-09-01",
    submittedDate: "2025-06-20",
    status: "pending_review",
    phase: "entry",
    rewardStructure: "Winner: $1,200 USDC · Runner-up: $300 USDC",
    payoutStatus: "pending",
    fundingStatus: "unfunded",
    submissionInstructions: "TBD after approval.",
  },
  {
    id: "mission-008",
    title: "On-Chain Analytics Dashboard",
    company: "MetricsDAO",
    contactEmail: "grants@metricsdao.xyz",
    shortDescription:
      "Build a public analytics dashboard for ICP ecosystem activity.",
    fullDescription:
      "Create an analytics dashboard pulling real-time ICP ecosystem data: transaction volume, active canisters, cycle burn rate. Must use live IC data sources.",
    successCriteria:
      "Live dashboard with at least 5 real-time metrics from the IC.",
    bounty: 3000,
    category: "Analytics",
    difficulty: "Advanced",
    submissionCount: 0,
    deadline: "2025-09-15",
    submittedDate: "2025-06-22",
    status: "pending_funding",
    phase: "entry",
    rewardStructure: "Winner: $2,500 USDC · Finalist: $500 USDC",
    payoutStatus: "pending",
    fundingStatus: "pending_funding",
    submissionInstructions: "TBD after funding confirmed.",
  },
  {
    id: "mission-009",
    title: "Fake Bounty Submission Test",
    company: "SpamCorp",
    contactEmail: "fake@spam.com",
    shortDescription: "This mission was rejected.",
    fullDescription: "Rejected mission — should not appear publicly.",
    successCriteria: "N/A",
    bounty: 99999,
    category: "Other",
    difficulty: "Beginner",
    submissionCount: 0,
    deadline: "2025-07-01",
    submittedDate: "2025-06-23",
    status: "rejected",
    phase: "entry",
    rewardStructure: "None",
    payoutStatus: "pending",
    fundingStatus: "unfunded",
    submissionInstructions: "N/A",
  },
];

// ─── Simple reactive store using listeners ────────────────────────────────────
// A minimal pub/sub store so both pages share the same in-memory mission array
// without adding Redux, Zustand, or Context overhead.

type Listener = () => void;

let _missions: Mission[] = [...INITIAL_MISSIONS];
const _listeners = new Set<Listener>();

function notify() {
  for (const fn of _listeners) {
    fn();
  }
}

export const missionsStore = {
  /** Subscribe to store changes. Returns unsubscribe function. */
  subscribe(fn: Listener): () => void {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },

  /** Get current missions array (snapshot). */
  getAll(): Mission[] {
    return _missions;
  },

  /** Get missions visible on the public /missions page (status === "live" only). */
  getPublic(): Mission[] {
    return _missions.filter((m) => m.status === "live");
  },

  /** Update the status of a single mission. */
  updateStatus(id: string, status: MissionStatus): void {
    _missions = _missions.map((m) => (m.id === id ? { ...m, status } : m));
    notify();
  },

  /** Update funding status of a single mission. */
  updateFunding(
    id: string,
    fundingStatus: "unfunded" | "pending_funding" | "funded",
  ): void {
    _missions = _missions.map((m) =>
      m.id === id ? { ...m, fundingStatus } : m,
    );
    notify();
  },

  /** Update payout status. */
  updatePayout(id: string, payoutStatus: PayoutStatus): void {
    _missions = _missions.map((m) =>
      m.id === id ? { ...m, payoutStatus } : m,
    );
    notify();
  },

  /**
   * Publish a funded mission live.
   * Returns false (no-op) if fundingStatus !== "funded".
   */
  publishLive(id: string): boolean {
    const mission = _missions.find((m) => m.id === id);
    if (!mission || mission.fundingStatus !== "funded") return false;
    _missions = _missions.map((m) =>
      m.id === id ? { ...m, status: "live" } : m,
    );
    notify();
    return true;
  },

  /** Add a new mission (from public submission form). Starts as pending_review + unfunded. */
  submitMission(
    data: Omit<
      Mission,
      | "id"
      | "status"
      | "phase"
      | "payoutStatus"
      | "fundingStatus"
      | "submissionCount"
      | "submittedDate"
    >,
  ): Mission {
    const newMission: Mission = {
      ...data,
      id: `mission-${Date.now()}`,
      status: "pending_review",
      phase: "entry",
      payoutStatus: "pending",
      fundingStatus: "unfunded",
      submissionCount: 0,
      submittedDate: new Date().toISOString().split("T")[0],
    };
    _missions = [newMission, ..._missions];
    notify();
    return newMission;
  },

  /** Update submission count for a mission (when a builder submits). */
  incrementSubmissions(id: string): void {
    _missions = _missions.map((m) =>
      m.id === id ? { ...m, submissionCount: m.submissionCount + 1 } : m,
    );
    notify();
  },

  /** Update phase for a mission. */
  updatePhase(id: string, phase: MissionPhase): void {
    _missions = _missions.map((m) => (m.id === id ? { ...m, phase } : m));
    notify();
  },
};

/** React hook — re-renders when missions store changes. */
import { useEffect, useState } from "react";

export function useMissionsStore() {
  const [missions, setMissions] = useState<Mission[]>(() =>
    missionsStore.getAll(),
  );

  useEffect(() => {
    // Sync on mount (in case store changed between renders)
    setMissions(missionsStore.getAll());
    const unsub = missionsStore.subscribe(() => {
      setMissions(missionsStore.getAll());
    });
    return unsub;
  }, []);

  return missions;
}
