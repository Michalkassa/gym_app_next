import { describe, it, expect } from "vitest";
import {
  dayKey,
  weekKey,
  weeklyStats,
  activityByDay,
  personalRecords,
  type LogWithExercise,
} from "@/lib/analytics";

describe("dayKey / weekKey", () => {
  it("formats a day key as YYYY-MM-DD", () => {
    expect(dayKey("2026-06-11T13:45:00Z")).toBe("2026-06-11");
  });

  it("maps any weekday to the Monday that starts its week", () => {
    // 2026-06-11 is a Thursday; its week starts Monday 2026-06-08.
    expect(weekKey("2026-06-11T00:00:00Z")).toBe("2026-06-08");
    // Sunday belongs to the week that started the previous Monday.
    expect(weekKey("2026-06-14T00:00:00Z")).toBe("2026-06-08");
    // The Monday itself maps to itself.
    expect(weekKey("2026-06-08T23:59:00Z")).toBe("2026-06-08");
  });
});

describe("weeklyStats", () => {
  it("sums volume and counts distinct training days per week", () => {
    const logs = [
      { createdAt: "2026-06-08T10:00:00Z", weight: 100, reps: 5 }, // Mon, vol 500
      { createdAt: "2026-06-08T11:00:00Z", weight: 50, reps: 10 }, // Mon, vol 500 (same day)
      { createdAt: "2026-06-10T10:00:00Z", weight: 80, reps: 5 }, // Wed, vol 400 (new day)
      { createdAt: "2026-06-15T10:00:00Z", weight: 60, reps: 5 }, // next Mon, vol 300
    ];
    const stats = weeklyStats(logs);
    expect(stats).toEqual([
      { week: "2026-06-08", volume: 1400, sessions: 2 },
      { week: "2026-06-15", volume: 300, sessions: 1 },
    ]);
  });

  it("returns an empty array for no logs", () => {
    expect(weeklyStats([])).toEqual([]);
  });
});

describe("activityByDay", () => {
  it("counts logged sets per calendar day", () => {
    const counts = activityByDay([
      { createdAt: "2026-06-08T10:00:00Z", weight: 1, reps: 1 },
      { createdAt: "2026-06-08T18:00:00Z", weight: 1, reps: 1 },
      { createdAt: "2026-06-09T08:00:00Z", weight: 1, reps: 1 },
    ]);
    expect(counts.get("2026-06-08")).toBe(2);
    expect(counts.get("2026-06-09")).toBe(1);
    expect(counts.size).toBe(2);
  });
});

describe("personalRecords", () => {
  const logs: LogWithExercise[] = [
    { exerciseId: "bench", exerciseName: "Bench", createdAt: "2026-06-01T10:00:00Z", weight: 80, reps: 5, oneRepMax: 90 },
    { exerciseId: "bench", exerciseName: "Bench", createdAt: "2026-06-08T10:00:00Z", weight: 100, reps: 3, oneRepMax: 109 },
    { exerciseId: "squat", exerciseName: "Squat", createdAt: "2026-06-02T10:00:00Z", weight: 120, reps: 5, oneRepMax: 135 },
  ];

  it("computes best weight, 1RM, and single-set volume per exercise", () => {
    const prs = personalRecords(logs);
    const bench = prs.find((p) => p.exerciseId === "bench")!;
    expect(bench.bestWeight).toBe(100);
    expect(bench.bestOneRepMax).toBe(109);
    expect(bench.bestVolume).toBe(400); // 80 * 5 beats 100 * 3
    expect(bench.achievedAt).toBe("2026-06-08");
  });

  it("returns one record per exercise, sorted by name", () => {
    const prs = personalRecords(logs);
    expect(prs.map((p) => p.exerciseName)).toEqual(["Bench", "Squat"]);
  });

  it("returns an empty array for no logs", () => {
    expect(personalRecords([])).toEqual([]);
  });
});
