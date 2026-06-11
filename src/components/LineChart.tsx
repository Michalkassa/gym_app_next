"use client"
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const ACCENT = "#5b8def"; // lightened atlantis_blue for contrast on dark

export default function LineChart({ chartData }: any) {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  // Style every dataset consistently while respecting any provided color.
  const styledData = {
    ...data,
    datasets: (data?.datasets ?? []).map((ds: any) => {
      const color = ds.borderColor || ACCENT;
      return {
        tension: 0.35,
        borderWidth: 2,
        borderColor: color,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: color,
        fill: true,
        backgroundColor: (ctx: any) => {
          const { ctx: c, chartArea } = ctx.chart;
          if (!chartArea) return "transparent";
          const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          g.addColorStop(0, "rgba(91,141,239,0.25)");
          g.addColorStop(1, "rgba(91,141,239,0)");
          return g;
        },
        ...ds,
      };
    }),
  };

  // Guard the y-axis bounds against empty / single-point datasets.
  const allValues: number[] = (styledData.datasets ?? [])
    .flatMap((d: any) => d.data ?? [])
    .filter((v: any) => typeof v === "number" && Number.isFinite(v));
  const hasData = allValues.length > 0;
  const min = hasData ? Math.min(...allValues) : 0;
  const max = hasData ? Math.max(...allValues) : 1;
  const pad = Math.max(1, (max - min) * 0.15);

  return (
    // Fixed, responsive height keeps Chart.js from infinitely growing/collapsing.
    <div className="relative w-full h-full min-h-[14rem]">
      <Line
        data={styledData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: "index" },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#71717a", maxRotation: 0, autoSkipPadding: 16 },
              border: { display: false },
            },
            y: {
              beginAtZero: false,
              min: hasData ? min - pad : undefined,
              max: hasData ? max + pad : undefined,
              grid: { color: "rgba(255,255,255,0.06)" },
              ticks: { color: "#71717a" },
              border: { display: false },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#18181b",
              borderColor: "rgba(255,255,255,0.1)",
              borderWidth: 1,
              padding: 10,
              titleColor: "#fff",
              bodyColor: "#d4d4d8",
            },
          },
        }}
      />
    </div>
  );
}
