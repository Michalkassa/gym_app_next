/**
 * XP & level math. Pure and dependency-free so it can be unit-tested and shared
 * between server actions (awarding XP) and UI (showing level/progress).
 *
 * Curve: the XP required to *reach* level n is 50 * (n-1) * n — a triangular
 * curve, so each level costs a bit more than the last:
 *   level 1 → 0 xp, level 2 → 100, level 3 → 300, level 4 → 600, ...
 */

export const XP_PER_SET = 10;
export const XP_PER_WORKOUT = 25;

/** Cumulative XP required to reach the start of a given level (level >= 1). */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return 50 * (level - 1) * level;
}

/** The level a given total XP corresponds to (1-based). */
export function levelFromXp(xp: number): number {
  if (xp <= 0) return 1;
  let level = 1;
  while (xpForLevel(level + 1) <= xp) level++;
  return level;
}

export interface LevelProgress {
  level: number;
  current: number; // XP earned into the current level
  needed: number; // XP span of the current level
  percent: number; // 0-100 progress toward the next level
}

/** Level plus progress toward the next level, for a progress bar. */
export function levelProgress(xp: number): LevelProgress {
  const safeXp = Math.max(0, xp);
  const level = levelFromXp(safeXp);
  const start = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const needed = next - start;
  const current = safeXp - start;
  return {
    level,
    current,
    needed,
    percent: needed > 0 ? Math.round((current / needed) * 100) : 0,
  };
}
