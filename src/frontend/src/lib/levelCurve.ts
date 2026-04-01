// Level 1-20 linear curve utility for deterministic XP progression
export const MAX_LEVEL = 20;
export const XP_PER_LEVEL = 1000;

export function calculateLevel(xp: number): number {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  return Math.min(level, MAX_LEVEL);
}

export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  return (level - 1) * XP_PER_LEVEL;
}

export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) return getXPForLevel(MAX_LEVEL);
  return currentLevel * XP_PER_LEVEL;
}

export function getXPInCurrentLevel(totalXP: number): number {
  return totalXP % XP_PER_LEVEL;
}

export function getXPToNextLevel(
  totalXP: number,
  currentLevel: number,
): number {
  if (currentLevel >= MAX_LEVEL) return 0;
  const xpInLevel = getXPInCurrentLevel(totalXP);
  return XP_PER_LEVEL - xpInLevel;
}

export function getProgressPercentage(totalXP: number): number {
  const xpInLevel = getXPInCurrentLevel(totalXP);
  return (xpInLevel / XP_PER_LEVEL) * 100;
}
