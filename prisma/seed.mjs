import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * A small, opinionated library of common strength exercises tagged by muscle
 * group and required equipment. Used to populate the global ExerciseCatalog so
 * users can pick a real exercise (and inherit its muscle group) instead of
 * typing free-text every time.
 *
 * Plain ESM JS (run with `node`) so it works in the slim production Docker
 * image, which has @prisma/client but no TypeScript toolchain.
 */
const catalog = [
  // Chest
  { name: "Barbell Bench Press", muscleGroup: "Chest", equipment: "Barbell", instructions: "Lie on a flat bench, lower the bar to mid-chest, press up to lockout." },
  { name: "Incline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbell", instructions: "On a 30-45° incline, press dumbbells from chest to lockout." },
  { name: "Dumbbell Fly", muscleGroup: "Chest", equipment: "Dumbbell", instructions: "With a slight elbow bend, open arms wide then squeeze the chest to bring them together." },
  { name: "Push Up", muscleGroup: "Chest", equipment: "Bodyweight", instructions: "Keep a straight line head to heels, lower chest to floor, press back up." },
  { name: "Cable Crossover", muscleGroup: "Chest", equipment: "Cable", instructions: "Pull both cable handles down and across the body, squeezing the chest." },

  // Back
  { name: "Deadlift", muscleGroup: "Back", equipment: "Barbell", instructions: "Hinge at the hips with a flat back, drive through the floor to stand tall." },
  { name: "Pull Up", muscleGroup: "Back", equipment: "Bodyweight", instructions: "Hang from a bar, pull until chin clears the bar, lower under control." },
  { name: "Bent Over Row", muscleGroup: "Back", equipment: "Barbell", instructions: "Hinge forward, row the bar to the lower ribs, squeeze the shoulder blades." },
  { name: "Lat Pulldown", muscleGroup: "Back", equipment: "Cable", instructions: "Pull the bar to the upper chest, driving elbows down and back." },
  { name: "Seated Cable Row", muscleGroup: "Back", equipment: "Cable", instructions: "Pull the handle to the abdomen with a tall chest, squeeze the back." },

  // Legs
  { name: "Back Squat", muscleGroup: "Legs", equipment: "Barbell", instructions: "Bar on upper traps, squat to depth keeping the chest up, drive up through mid-foot." },
  { name: "Front Squat", muscleGroup: "Legs", equipment: "Barbell", instructions: "Bar racked on front delts, squat upright, drive up keeping elbows high." },
  { name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell", instructions: "Hinge at the hips with soft knees, lower the bar along the legs, feel the hamstrings." },
  { name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", instructions: "Press the platform away until legs are nearly straight, lower under control." },
  { name: "Walking Lunge", muscleGroup: "Legs", equipment: "Dumbbell", instructions: "Step forward into a lunge, drive through the front heel, alternate legs." },
  { name: "Leg Curl", muscleGroup: "Legs", equipment: "Machine", instructions: "Curl the pad toward the glutes, squeeze the hamstrings, lower slowly." },
  { name: "Calf Raise", muscleGroup: "Legs", equipment: "Machine", instructions: "Rise onto the toes through a full range, pause, lower under control." },

  // Shoulders
  { name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell", instructions: "Press the bar from shoulders to overhead lockout, keep the core braced." },
  { name: "Dumbbell Shoulder Press", muscleGroup: "Shoulders", equipment: "Dumbbell", instructions: "Press dumbbells from shoulder height to overhead, lower under control." },
  { name: "Lateral Raise", muscleGroup: "Shoulders", equipment: "Dumbbell", instructions: "Raise dumbbells out to the sides to shoulder height, lower slowly." },
  { name: "Face Pull", muscleGroup: "Shoulders", equipment: "Cable", instructions: "Pull the rope toward the face, leading with the elbows, squeeze rear delts." },

  // Arms
  { name: "Barbell Curl", muscleGroup: "Arms", equipment: "Barbell", instructions: "Curl the bar with elbows pinned to the sides, squeeze the biceps at the top." },
  { name: "Dumbbell Curl", muscleGroup: "Arms", equipment: "Dumbbell", instructions: "Curl dumbbells one or both at a time, supinating the wrists." },
  { name: "Hammer Curl", muscleGroup: "Arms", equipment: "Dumbbell", instructions: "Curl with a neutral (thumbs-up) grip to target the brachialis." },
  { name: "Tricep Pushdown", muscleGroup: "Arms", equipment: "Cable", instructions: "Push the bar down to full extension, keep elbows tucked." },
  { name: "Skullcrusher", muscleGroup: "Arms", equipment: "Barbell", instructions: "Lying down, lower the bar toward the forehead then extend the elbows." },
  { name: "Dip", muscleGroup: "Arms", equipment: "Bodyweight", instructions: "Lower until elbows reach ~90°, press back to lockout." },

  // Core
  { name: "Plank", muscleGroup: "Core", equipment: "Bodyweight", instructions: "Hold a straight line on forearms and toes, brace the core." },
  { name: "Hanging Leg Raise", muscleGroup: "Core", equipment: "Bodyweight", instructions: "Hang from a bar and raise the legs toward parallel or higher." },
  { name: "Cable Crunch", muscleGroup: "Core", equipment: "Cable", instructions: "Kneel and crunch the torso down, flexing the abs against the cable." },
  { name: "Russian Twist", muscleGroup: "Core", equipment: "Bodyweight", instructions: "Seated with feet up, rotate the torso side to side." },

  // Cardio / conditioning
  { name: "Running", muscleGroup: "Cardio", equipment: "Bodyweight", instructions: "Steady-state or interval running for cardiovascular conditioning." },
  { name: "Rowing Machine", muscleGroup: "Cardio", equipment: "Machine", instructions: "Drive with the legs, swing the torso, finish with the arms; reverse to recover." },
  { name: "Cycling", muscleGroup: "Cardio", equipment: "Machine", instructions: "Maintain a steady cadence; adjust resistance for intervals." },
];

/**
 * Prebuilt training programs offered as public, copyable templates. Each entry
 * is one workout owned by the system user; `exercises` references catalog names.
 */
const programs = [
  {
    name: "PPL Push",
    description: "Push day: chest, shoulders, triceps.",
    exercises: ["Barbell Bench Press", "Overhead Press", "Incline Dumbbell Press", "Lateral Raise", "Tricep Pushdown"],
  },
  {
    name: "PPL Pull",
    description: "Pull day: back and biceps.",
    exercises: ["Deadlift", "Pull Up", "Bent Over Row", "Face Pull", "Barbell Curl"],
  },
  {
    name: "PPL Legs",
    description: "Leg day: quads, hamstrings, calves.",
    exercises: ["Back Squat", "Romanian Deadlift", "Leg Press", "Leg Curl", "Calf Raise"],
  },
  {
    name: "StrongLifts A",
    description: "StrongLifts 5x5 workout A.",
    exercises: ["Back Squat", "Barbell Bench Press", "Bent Over Row"],
  },
  {
    name: "StrongLifts B",
    description: "StrongLifts 5x5 workout B.",
    exercises: ["Back Squat", "Overhead Press", "Deadlift"],
  },
  {
    name: "Starting Strength A",
    description: "Starting Strength workout A.",
    exercises: ["Back Squat", "Barbell Bench Press", "Deadlift"],
  },
  {
    name: "Starting Strength B",
    description: "Starting Strength workout B.",
    exercises: ["Back Squat", "Overhead Press", "Deadlift"],
  },
];

const SYSTEM_EMAIL = "system@lockedin.internal";

/** Find-or-create a system-owned Exercise mirroring a catalog entry. */
async function ensureSystemExercise(authorId, catalogName) {
  const existing = await prisma.exercise.findFirst({
    where: { authorId, name: catalogName },
  });
  if (existing) return existing;
  const cat = catalog.find((c) => c.name === catalogName);
  return prisma.exercise.create({
    data: {
      name: catalogName,
      description: cat?.instructions ?? "",
      muscleGroup: cat?.muscleGroup ?? null,
      equipment: cat?.equipment ?? null,
      authorId,
    },
  });
}

async function seedPrograms() {
  // System user owns the public templates. It has no usable password, so the
  // credentials provider can never authenticate as it.
  const system = await prisma.user.upsert({
    where: { email: SYSTEM_EMAIL },
    update: {},
    create: { email: SYSTEM_EMAIL, name: "LockedIn", password: "!" },
  });

  for (const program of programs) {
    let workout = await prisma.workout.findFirst({
      where: { authorId: system.id, name: program.name, isTemplate: true },
    });
    if (!workout) {
      workout = await prisma.workout.create({
        data: {
          name: program.name,
          description: program.description,
          authorId: system.id,
          isTemplate: true,
          isPublic: true,
        },
      });
    }
    for (const exName of program.exercises) {
      const exercise = await ensureSystemExercise(system.id, exName);
      const link = await prisma.exercisesOnWorkouts.findFirst({
        where: { workoutId: workout.id, exerciseId: exercise.id },
      });
      if (!link) {
        await prisma.exercisesOnWorkouts.create({
          data: { workoutId: workout.id, exerciseId: exercise.id },
        });
      }
    }
  }
  console.log(`Seeded ${programs.length} program templates.`);
}

async function main() {
  for (const item of catalog) {
    await prisma.exerciseCatalog.upsert({
      where: { name: item.name },
      update: {
        muscleGroup: item.muscleGroup,
        equipment: item.equipment,
        instructions: item.instructions,
      },
      create: item,
    });
  }
  console.log(`Seeded ${catalog.length} catalog exercises.`);
  await seedPrograms();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
