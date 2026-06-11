import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/prisma";
import {
  buildLogsCsv,
  buildBodyweightCsv,
  buildNutritionCsv,
} from "@/lib/export/csv";

// GET /api/export/csv?type=logs|bodyweight|nutrition
export async function GET(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const type = new URL(request.url).searchParams.get("type") ?? "logs";
  let csv: string;

  if (type === "bodyweight") {
    const rows = await prisma.body_Weight.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "asc" },
    });
    csv = buildBodyweightCsv(rows);
  } else if (type === "nutrition") {
    const rows = await prisma.nutritionEntry.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "asc" },
    });
    csv = buildNutritionCsv(rows);
  } else {
    const logs = await prisma.log.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "asc" },
      include: { exercise: true },
    });
    csv = buildLogsCsv(
      logs.map((l) => ({
        createdAt: l.createdAt,
        exerciseName: l.exercise.name,
        weight: l.weight,
        reps: l.reps,
        oneRepMax: l.oneRepMax,
      })),
    );
  }

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lockedin-${type}.csv"`,
    },
  });
}
