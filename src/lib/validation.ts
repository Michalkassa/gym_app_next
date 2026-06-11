import { z } from "zod";

/**
 * Centralized zod schemas for server-action input validation.
 *
 * Each schema's error messages are written to be user-facing so callers can
 * surface the first issue directly via the existing `{ message }` return shape.
 * Use `firstError(result)` to pull a single message out of a failed parse.
 */

export const loginSchema = z.object({
  email: z.string().min(1, "Please Enter an Email").email("Not a valid email"),
  password: z.string().min(1, "Please Enter a Password"),
});

export const registerSchema = z
  .object({
    email: z.string().min(1, "Please enter an Email").email("Not a valid email"),
    password: z.string().min(5, "Password too short "),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not identical",
    path: ["confirmPassword"],
  });

export const exerciseSchema = z.object({
  name: z
    .string()
    .min(1, "Enter the Name and a Description")
    .max(15, "Please choose a Shorter name"),
  description: z.string().min(1, "Enter the Name and a Description"),
  // Optional metadata inherited from the exercise catalog when one is picked.
  muscleGroup: z.string().optional(),
  equipment: z.string().optional(),
});

export const workoutSchema = z.object({
  name: z
    .string()
    .min(1, "Enter the Name and a Description")
    .max(15, "Please choose a Shorter name"),
  description: z.string().min(1, "Enter the Name and a Description"),
});

export const bodyWeightSchema = z.object({
  weight: z.coerce
    .number({ invalid_type_error: "Please Enter a Weight" })
    .positive("Please Enter a Weight"),
});

export const logSchema = z.object({
  exerciseId: z.string().min(1, "enter a weight and the reps"),
  weight: z.coerce
    .number({ invalid_type_error: "enter a weight and the reps" })
    .positive("enter a weight and the reps"),
  reps: z.coerce
    .number({ invalid_type_error: "enter a weight and the reps" })
    .int()
    .positive("enter a weight and the reps"),
});

export const nutritionSchema = z.object({
  calories: z.coerce
    .number({ invalid_type_error: "Enter a calorie amount" })
    .nonnegative("Calories cannot be negative"),
  protein: z.coerce.number().nonnegative("Macros cannot be negative").default(0),
  carbs: z.coerce.number().nonnegative("Macros cannot be negative").default(0),
  fat: z.coerce.number().nonnegative("Macros cannot be negative").default(0),
});

/** Returns the first user-facing error message from a failed safeParse result. */
export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input";
}
