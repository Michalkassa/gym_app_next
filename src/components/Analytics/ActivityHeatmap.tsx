"use client"
import { useState } from "react";
import { dayKey } from "@/lib/analytics";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

function colorFor(count: number): string {
  if (count <= 0) return "bg-white/[0.06]";
  if (count <= 2) return "bg-green-900";
  if (count <= 5) return "bg-green-700";
  if (count <= 9) return "bg-green-500";
  return "bg-green-400";
}

/** Monday (UTC) on or before the given date. */
function mondayOnOrBefore(d: Date): Date {
  const out = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = out.getUTCDay(); // 0 = Sun
  out.setUTCDate(out.getUTCDate() - (day === 0 ? 6 : day - 1));
  return out;
}

/**
 * GitHub-style contribution graph for a selectable calendar year. Columns are
 * weeks (Mon→Sun rows), shaded by logged sets that day, with weekday + month
 * labels, a legend, and a year picker. Future / other-year days render blank.
 */
export default function ActivityHeatmap({
  activity,
}: {
  activity: { date: string; count: number }[];
}) {
  const counts = new Map(activity.map((a) => [a.date, a.count]));
  const currentYear = new Date().getUTCFullYear();

  // Years to offer: every year present in the data, plus the current year.
  const years = Array.from(
    new Set<number>([currentYear, ...activity.map((a) => Number(a.date.slice(0, 4)))]),
  ).sort((a, b) => b - a);

  const [year, setYear] = useState(currentYear);

  // Rectangular grid of whole weeks spanning Jan 1 → Dec 31 of the year.
  const start = mondayOnOrBefore(new Date(Date.UTC(year, 0, 1)));
  const yearEnd = new Date(Date.UTC(year, 11, 31));

  const columns: { repMonth: number | null; days: { key: string; inYear: boolean; weekday: string; count: number }[] }[] = [];
  const cursor = new Date(start);
  while (cursor <= yearEnd) {
    const days = [];
    let repMonth: number | null = null;
    for (let d = 0; d < 7; d++) {
      const day = new Date(cursor);
      day.setUTCDate(cursor.getUTCDate() + d);
      const inYear = day.getUTCFullYear() === year;
      if (inYear && repMonth === null) repMonth = day.getUTCMonth();
      const key = dayKey(day);
      const weekday = day.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
      days.push({ key, inYear, weekday, count: counts.get(key) ?? 0 });
    }
    columns.push({ repMonth, days });
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }

  // Month label on the first column whose in-year month differs from the last.
  let lastLabeled = -1;
  const monthLabels = columns.map((c) => {
    if (c.repMonth !== null && c.repMonth !== lastLabeled) {
      lastLabeled = c.repMonth;
      return MONTHS[c.repMonth];
    }
    return "";
  });

  return (
    <div>
      {/* Year picker */}
      <div className="mb-3 flex flex-wrap gap-2">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`rounded-lg px-3 py-1 text-sm transition ${
              y === year ? "bg-atlantis_blue text-white" : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="inline-block">
          {/* Month labels */}
          <div className="mb-1 flex gap-[3px] pl-9">
            {monthLabels.map((m, i) => (
              <div key={i} className="w-2.5 whitespace-nowrap text-[10px] text-gray-500">{m}</div>
            ))}
          </div>

          <div className="flex">
            {/* Weekday labels */}
            <div className="flex w-9 flex-col gap-[3px] pr-2">
              {WEEKDAYS.map((wd, i) => (
                <div key={i} className="h-2.5 text-[10px] leading-[10px] text-gray-500">{wd}</div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {columns.map((col, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {col.days.map((cell) =>
                    cell.inYear ? (
                      <div
                        key={cell.key}
                        title={`${cell.weekday} ${cell.key} — ${cell.count} set${cell.count === 1 ? "" : "s"}`}
                        className={`h-2.5 w-2.5 rounded-sm ${colorFor(cell.count)}`}
                      />
                    ) : (
                      <div key={cell.key} className="h-2.5 w-2.5 rounded-sm bg-transparent" />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1 pt-2 text-[10px] text-gray-500">
            <span className="pr-1">Less</span>
            <div className="h-2.5 w-2.5 rounded-sm bg-white/[0.06]" />
            <div className="h-2.5 w-2.5 rounded-sm bg-green-900" />
            <div className="h-2.5 w-2.5 rounded-sm bg-green-700" />
            <div className="h-2.5 w-2.5 rounded-sm bg-green-500" />
            <div className="h-2.5 w-2.5 rounded-sm bg-green-400" />
            <span className="pl-1">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
