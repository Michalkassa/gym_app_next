import { describe, it, expect } from "vitest";
import {
  loginSchema,
  registerSchema,
  exerciseSchema,
  bodyWeightSchema,
  logSchema,
  firstError,
} from "@/lib/validation";

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    expect(loginSchema.safeParse({ email: "a@b.com", password: "secret" }).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({ email: "notanemail", password: "secret" });
    expect(result.success).toBe(false);
    if (!result.success) expect(firstError(result.error)).toBe("Not a valid email");
  });

  it("rejects a missing email", () => {
    const result = loginSchema.safeParse({ email: "", password: "secret" });
    expect(result.success).toBe(false);
    if (!result.success) expect(firstError(result.error)).toBe("Please Enter an Email");
  });
});

describe("registerSchema", () => {
  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      email: "a@b.com",
      password: "longenough",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(firstError(result.error)).toBe("Passwords are not identical");
  });

  it("rejects a short password", () => {
    const result = registerSchema.safeParse({
      email: "a@b.com",
      password: "abc",
      confirmPassword: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("accepts matching valid passwords", () => {
    expect(
      registerSchema.safeParse({
        email: "a@b.com",
        password: "longenough",
        confirmPassword: "longenough",
      }).success,
    ).toBe(true);
  });
});

describe("exerciseSchema", () => {
  it("rejects names longer than 15 chars", () => {
    const result = exerciseSchema.safeParse({
      name: "a".repeat(16),
      description: "desc",
    });
    expect(result.success).toBe(false);
    if (!result.success) expect(firstError(result.error)).toBe("Please choose a Shorter name");
  });

  it("rejects an empty description", () => {
    expect(exerciseSchema.safeParse({ name: "Bench", description: "" }).success).toBe(false);
  });
});

describe("bodyWeightSchema", () => {
  it("coerces a numeric string", () => {
    const result = bodyWeightSchema.safeParse({ weight: "82.5" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.weight).toBe(82.5);
  });

  it("rejects zero or negative weight", () => {
    expect(bodyWeightSchema.safeParse({ weight: "0" }).success).toBe(false);
    expect(bodyWeightSchema.safeParse({ weight: "-5" }).success).toBe(false);
  });
});

describe("logSchema", () => {
  it("accepts valid log input from form strings", () => {
    const result = logSchema.safeParse({ exerciseId: "abc", weight: "100", reps: "5" });
    expect(result.success).toBe(true);
  });

  it("rejects non-integer reps", () => {
    expect(logSchema.safeParse({ exerciseId: "abc", weight: "100", reps: "5.5" }).success).toBe(
      false,
    );
  });

  it("rejects a missing exerciseId", () => {
    expect(logSchema.safeParse({ exerciseId: "", weight: "100", reps: "5" }).success).toBe(false);
  });
});
