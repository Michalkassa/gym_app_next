import { renderToBuffer } from "@react-pdf/renderer";
import { auth } from "@/app/api/auth/auth";
import prisma from "@/app/api/prisma";
import { personalRecords } from "@/lib/analytics";
import { ProgressReport } from "@/lib/export/ProgressReport";

// GET /api/export/pdf — a progress summary report for the current user.
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [logs, bodyweights] = await Promise.all([
    prisma.log.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "asc" },
      include: { exercise: true },
    }),
    prisma.body_Weight.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const records = personalRecords(
    logs.map((l) => ({
      createdAt: l.createdAt,
      weight: l.weight,
      reps: l.reps,
      oneRepMax: l.oneRepMax,
      exerciseId: l.exerciseId,
      exerciseName: l.exercise.name,
    })),
  );

  const totalVolume = logs.reduce((sum, l) => sum + l.weight * l.reps, 0);

  const buffer = await renderToBuffer(
    ProgressReport({
      email: session.user?.email ?? "",
      generatedAt: new Date().toISOString().slice(0, 10),
      totalSets: logs.length,
      totalVolume,
      bodyweightStart: bodyweights[0]?.weight ?? null,
      bodyweightLatest: bodyweights[bodyweights.length - 1]?.weight ?? null,
      records,
    }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="lockedin-progress-report.pdf"',
    },
  });
}
