import { describe, it, expect } from "vitest";
import { xpForLevel, levelFromXp, levelProgress } from "@/lib/xp";

describe("xpForLevel", () => {
  it("follows the triangular curve", () => {
    expect(xpForLevel(1)).toBe(0);
    expect(xpForLevel(2)).toBe(100);
    expect(xpForLevel(3)).toBe(300);
    expect(xpForLevel(4)).toBe(600);
  });
});

describe("levelFromXp", () => {
  it("starts at level 1", () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(99)).toBe(1);
  });

  it("crosses level boundaries exactly at the thresholds", () => {
    expect(levelFromXp(100)).toBe(2);
    expect(levelFromXp(299)).toBe(2);
    expect(levelFromXp(300)).toBe(3);
    expect(levelFromXp(600)).toBe(4);
  });

  it("clamps negative XP to level 1", () => {
    expect(levelFromXp(-50)).toBe(1);
  });
});

describe("levelProgress", () => {
  it("reports progress within the current level", () => {
    // 150 XP → level 2 (starts at 100, next at 300, span 200, 50 in)
    expect(levelProgress(150)).toEqual({ level: 2, current: 50, needed: 200, percent: 25 });
  });

  it("is 0% at the start of a level", () => {
    expect(levelProgress(100)).toEqual({ level: 2, current: 0, needed: 200, percent: 0 });
  });
});
