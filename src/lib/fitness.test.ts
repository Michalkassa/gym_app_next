import { describe, it, expect } from "vitest";
import { oneRepMaxCalculator } from "@/lib/fitness";

describe("oneRepMaxCalculator (Brzycki)", () => {
  it("returns the lifted weight at 1 rep (approximately)", () => {
    // At 1 rep the denominator is 1.0278 - 0.0278 = 1.0, so 1RM ~= weight.
    expect(oneRepMaxCalculator(100, 1)).toBe(100);
  });

  it("estimates a higher 1RM as reps increase for the same weight", () => {
    const fiveReps = oneRepMaxCalculator(100, 5);
    const tenReps = oneRepMaxCalculator(100, 10);
    expect(tenReps).toBeGreaterThan(fiveReps);
    expect(fiveReps).toBeGreaterThan(100);
  });

  it("scales roughly linearly with weight (modulo flooring)", () => {
    const single = oneRepMaxCalculator(100, 5);
    const doubled = oneRepMaxCalculator(200, 5);
    // Flooring can introduce up to ~1 unit of difference vs. exact doubling.
    expect(Math.abs(doubled - single * 2)).toBeLessThanOrEqual(1);
  });

  it("returns an integer (floored)", () => {
    const result = oneRepMaxCalculator(102.5, 7);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("handles zero weight", () => {
    expect(oneRepMaxCalculator(0, 5)).toBe(0);
  });
});
