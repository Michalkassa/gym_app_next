/**
 * Estimated one-rep max using the Brzycki formula (Matt Brzycki).
 * Returns the floored estimated 1RM in the same unit as `kgWeight`.
 */
export const oneRepMaxCalculator = (kgWeight: number, repetitions: number): number => {
  return Math.floor(kgWeight / (1.0278 + -0.0278 * repetitions));
};
