/**
 * Pure CSV serialization helpers. Kept free of Prisma/Next so they can be
 * unit-tested and reused by the export route handlers.
 */

/** Quote a single CSV field, escaping quotes and wrapping when needed (RFC 4180). */
export function csvField(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/** Serialize a header row + data rows into a CSV string. */
export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(csvField).join(",")];
  for (const row of rows) {
    lines.push(row.map(csvField).join(","));
  }
  return lines.join("\n");
}

export interface LogRow {
  createdAt: Date | string;
  exerciseName: string;
  weight: number;
  reps: number;
  oneRepMax: number;
}

export function buildLogsCsv(logs: LogRow[]): string {
  return toCsv(
    ["date", "exercise", "weight_kg", "reps", "est_1rm_kg"],
    logs.map((l) => [iso(l.createdAt), l.exerciseName, l.weight, l.reps, l.oneRepMax]),
  );
}

export interface BodyweightRow {
  createdAt: Date | string;
  weight: number;
}

export function buildBodyweightCsv(rows: BodyweightRow[]): string {
  return toCsv(
    ["date", "weight_kg"],
    rows.map((r) => [iso(r.createdAt), r.weight]),
  );
}

export interface NutritionRow {
  createdAt: Date | string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function buildNutritionCsv(rows: NutritionRow[]): string {
  return toCsv(
    ["date", "calories", "protein_g", "carbs_g", "fat_g"],
    rows.map((r) => [iso(r.createdAt), r.calories, r.protein, r.carbs, r.fat]),
  );
}

function iso(value: Date | string): string {
  const d = value instanceof Date ? value : new Date(value);
  return d.toISOString().slice(0, 10);
}
