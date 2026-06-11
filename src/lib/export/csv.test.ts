import { describe, it, expect } from "vitest";
import { csvField, toCsv, buildLogsCsv } from "@/lib/export/csv";

describe("csvField", () => {
  it("leaves simple values unquoted", () => {
    expect(csvField("Bench")).toBe("Bench");
    expect(csvField(100)).toBe("100");
  });

  it("quotes and escapes values containing commas, quotes or newlines", () => {
    expect(csvField("a,b")).toBe('"a,b"');
    expect(csvField('say "hi"')).toBe('"say ""hi"""');
    expect(csvField("line1\nline2")).toBe('"line1\nline2"');
  });

  it("renders null/undefined as empty", () => {
    expect(csvField(null)).toBe("");
    expect(csvField(undefined)).toBe("");
  });
});

describe("toCsv", () => {
  it("joins headers and rows with newlines", () => {
    const csv = toCsv(["a", "b"], [[1, 2], [3, 4]]);
    expect(csv).toBe("a,b\n1,2\n3,4");
  });
});

describe("buildLogsCsv", () => {
  it("formats logs with an ISO date and a header row", () => {
    const csv = buildLogsCsv([
      { createdAt: "2026-06-11T13:00:00Z", exerciseName: "Bench", weight: 100, reps: 5, oneRepMax: 112 },
    ]);
    expect(csv).toBe("date,exercise,weight_kg,reps,est_1rm_kg\n2026-06-11,Bench,100,5,112");
  });

  it("escapes exercise names containing commas", () => {
    const csv = buildLogsCsv([
      { createdAt: "2026-06-11T13:00:00Z", exerciseName: "Row, barbell", weight: 60, reps: 8, oneRepMax: 75 },
    ]);
    expect(csv).toContain('"Row, barbell"');
  });
});
