import { dayKey, weekKey } from "@/lib/analytics";

const WEEKS = 18;

function colorFor(count: number): string {
  if (count <= 0) return "bg-gray-700";
  if (count <= 2) return "bg-green-900";
  if (count <= 5) return "bg-green-700";
  if (count <= 9) return "bg-green-500";
  return "bg-green-400";
}

/**
 * GitHub-style contribution grid of the last {WEEKS} weeks. Columns are weeks
 * (Monday-started), rows are days Mon→Sun, shaded by number of logged sets.
 * Pure render — safe to use directly in a server component.
 */
export default function ActivityHeatmap({
  activity,
}: {
  activity: { date: string; count: number }[];
}) {
  const counts = new Map(activity.map((a) => [a.date, a.count]));

  // Monday that starts the current week, then walk back to build the window.
  const currentMonday = new Date(weekKey(new Date()) + "T00:00:00Z");
  const start = new Date(currentMonday);
  start.setUTCDate(start.getUTCDate() - (WEEKS - 1) * 7);

  const columns: { key: string; count: number }[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const week: { key: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(start);
      day.setUTCDate(start.getUTCDate() + w * 7 + d);
      const key = dayKey(day);
      week.push({ key, count: counts.get(key) ?? 0 });
    }
    columns.push(week);
  }

  return (
    <div className="flex gap-1 overflow-x-auto">
      {columns.map((week, i) => (
        <div key={i} className="flex flex-col gap-1">
          {week.map((cell) => (
            <div
              key={cell.key}
              title={`${cell.key}: ${cell.count} set${cell.count === 1 ? "" : "s"}`}
              className={`w-3 h-3 rounded-sm ${colorFor(cell.count)}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
