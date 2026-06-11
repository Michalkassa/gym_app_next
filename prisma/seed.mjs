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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
