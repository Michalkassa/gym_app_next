import { describe, it, expect } from "vitest";
import { caloriesFromMacros } from "@/lib/nutrition";

describe("caloriesFromMacros", () => {
  it("uses 4/4/9 kcal per gram", () => {
    // 30P + 40C + 10F = 120 + 160 + 90 = 370
    expect(caloriesFromMacros(30, 40, 10)).toBe(370);
  });

  it("is zero for no macros", () => {
    expect(caloriesFromMacros(0, 0, 0)).toBe(0);
  });

  it("rounds to the nearest kcal", () => {
    expect(caloriesFromMacros(10.4, 0, 0)).toBe(42); // 41.6 → 42
  });

  it("treats non-finite inputs as zero", () => {
    expect(caloriesFromMacros(NaN, 20, 5)).toBe(125); // 0 + 80 + 45
  });
});
