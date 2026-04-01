export type MasteryTier = "Gold" | "Silver" | "Bronze";

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  masteryTier: MasteryTier;
  accuracy: number;
  completionTime: number;
  totalAttempts: number;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
  userEntry: LeaderboardEntry | null;
}
