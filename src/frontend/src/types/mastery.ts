export type MasteryTier = "Bronze" | "Silver" | "Gold" | "None";

export interface WorldMastery {
  worldId: string;
  accuracy: number;
  duration: number;
  tier: MasteryTier;
  computedAt: bigint;
}

export interface WorldMasterySummary {
  worldId: string;
  tier: MasteryTier;
}
