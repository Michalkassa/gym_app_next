import { dayKey, weekKey } from "@/lib/analytics";

const WEEKS = 18;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Labels shown on the Mon / Wed / Fri rows (matching GitHub's sparse labelling).
const WEEKDAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

function colorFor(count: number): string {
  if (count <= 0) return "bg-white/[0.06]";
  if (count <= 2) return "bg-green-900";
  if (count <= 5) return "bg-green-700";
  if (count <= 9) return "bg-green-500";
  return "bg-green-400";
}

/**
 * GitHub-style contribution grid of the last {WEEKS} weeks. Columns are weeks
 * (Monday-started), rows are days Mon→Sun, with weekday + month labels and a
 * legend so each square's day is clear. Hover shows the exact date + set count.
 */
export default function ActivityHeatmap({
  activity,
}: {
  activity: { date: string; count: number }[];
}) {
  const counts = new Map(activity.map((a) => [a.date, a.count]));

  const currentMonday = new Date(weekKey(new Date()) + "T00:00:00Z");
  const start = new Date(currentMonday);
  start.setUTCDate(start.getUTCDate() - (WEEKS - 1) * 7);

  const columns: { month: number; days: { key: string; weekday: string; count: number }[] }[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const days = [];
    let month = 0;
    for (let d = 0; d < 7; d++) {
      const day = new Date(start);
      day.setUTCDate(start.getUTCDate() + w * 7 + d);
      if (d === 0) month = day.getUTCMonth();
      const key = dayKey(day);
      const weekday = day.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
      days.push({ key, weekday, count: counts.get(key) ?? 0 });
    }
    columns.push({ month, days });
  }

  // A month label sits above the first week that falls in a new month.
  const monthLabels = columns.map((c, i) =>
    i === 0 || columns[i - 1].month !== c.month ? MONTHS[c.month] : "",
  );

  return (
    <div className="max-w-full overflow-x-auto">
      <div className="inline-block">
        {/* Month labels */}
        <div className="mb-1 flex gap-1 pl-9">
          {monthLabels.map((m, i) => (
            <div key={i} className="w-3 whitespace-nowrap text-[10px] text-gray-500">{m}</div>
          ))}
        </div>

        <div className="flex">
          {/* Weekday labels */}
          <div className="flex w-9 flex-col gap-1 pr-2">
            {WEEKDAYS.map((wd, i) => (
              <div key={i} className="h-3 text-[10px] leading-3 text-gray-500">{wd}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-1">
                {col.days.map((cell) => (
                  <div
                    key={cell.key}
                    title={`${cell.weekday} ${cell.key} — ${cell.count} set${cell.count === 1 ? "" : "s"}`}
                    className={`h-3 w-3 rounded-sm ${colorFor(cell.count)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 pt-2 text-[10px] text-gray-500">
          <span className="pr-1">Less</span>
          <div className="h-3 w-3 rounded-sm bg-white/[0.06]" />
          <div className="h-3 w-3 rounded-sm bg-green-900" />
          <div className="h-3 w-3 rounded-sm bg-green-700" />
          <div className="h-3 w-3 rounded-sm bg-green-500" />
          <div className="h-3 w-3 rounded-sm bg-green-400" />
          <span className="pl-1">More</span>
        </div>
      </div>
    </div>
  );
}
