/**
 * Pure, dependency-free aggregation helpers for training analytics.
 * Kept free of Prisma/React so they can be unit-tested in isolation and reused
 * by both server actions and components.
 */

export interface SimpleLog {
  createdAt: Date | string;
  weight: number;
  reps: number;
  oneRepMax?: number;
}

export interface LogWithExercise extends SimpleLog {
  exerciseId: string;
  exerciseName: string;
}

export interface WeeklyStat {
  week: string; // ISO date (YYYY-MM-DD) of the Monday that starts the week
  volume: number; // total weight × reps lifted that week
  sessions: number; // distinct training days that week
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  bestWeight: number;
  bestOneRepMax: number;
  bestVolume: number; // best single-set weight × reps
  achievedAt: string; // ISO date of the bestOneRepMax set
}

function toDate(value: Date | string): Date {
  return value instanceof Date ? value : new Date(value);
}

/** UTC calendar day key, e.g. "2026-06-11". */
export function dayKey(value: Date | string): string {
  const d = toDate(value);
  return d.toISOString().slice(0, 10);
}

/** Monday (UTC) that starts the week containing `value`, as a YYYY-MM-DD key. */
export function weekKey(value: Date | string): string {
  const d = toDate(value);
  const utc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = utc.getUTCDay(); // 0 = Sunday .. 6 = Saturday
  const shift = day === 0 ? -6 : 1 - day; // move back to Monday
  utc.setUTCDate(utc.getUTCDate() + shift);
  return utc.toISOString().slice(0, 10);
}

/** Total weekly volume and distinct training days, sorted oldest → newest. */
export function weeklyStats(logs: SimpleLog[]): WeeklyStat[] {
  const volumeByWeek = new Map<string, number>();
  const daysByWeek = new Map<string, Set<string>>();

  for (const log of logs) {
    const wk = weekKey(log.createdAt);
    volumeByWeek.set(wk, (volumeByWeek.get(wk) ?? 0) + log.weight * log.reps);
    const days = daysByWeek.get(wk) ?? new Set<string>();
    days.add(dayKey(log.createdAt));
    daysByWeek.set(wk, days);
  }

  return Array.from(volumeByWeek.keys())
    .sort()
    .map((week) => ({
      week,
      volume: volumeByWeek.get(week) ?? 0,
      sessions: daysByWeek.get(week)?.size ?? 0,
    }));
}

/** Count of logged sets per calendar day, for a contribution-style heatmap. */
export function activityByDay(logs: SimpleLog[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const log of logs) {
    const key = dayKey(log.createdAt);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

/** Best weight, estimated 1RM and single-set volume per exercise. */
export function personalRecords(logs: LogWithExercise[]): PersonalRecord[] {
  const byExercise = new Map<string, PersonalRecord>();

  for (const log of logs) {
    const oneRepMax = log.oneRepMax ?? 0;
    const volume = log.weight * log.reps;
    const current = byExercise.get(log.exerciseId);
    if (!current) {
      byExercise.set(log.exerciseId, {
        exerciseId: log.exerciseId,
        exerciseName: log.exerciseName,
        bestWeight: log.weight,
        bestOneRepMax: oneRepMax,
        bestVolume: volume,
        achievedAt: dayKey(log.createdAt),
      });
      continue;
    }
    if (log.weight > current.bestWeight) current.bestWeight = log.weight;
    if (volume > current.bestVolume) current.bestVolume = volume;
    if (oneRepMax > current.bestOneRepMax) {
      current.bestOneRepMax = oneRepMax;
      current.achievedAt = dayKey(log.createdAt);
    }
  }

  return Array.from(byExercise.values()).sort((a, b) =>
    a.exerciseName.localeCompare(b.exerciseName),
  );
}
