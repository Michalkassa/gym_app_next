import { getTrainingAnalytics } from "@/app/api/auth/actions";
import LineChart from "@/components/LineChart";
import ActivityHeatmap from "@/components/Analytics/ActivityHeatmap";

/**
 * Dashboard analytics block: weekly training volume trend + activity heatmap.
 * Fetches the derived analytics once and renders both views.
 */
export default async function TrainingSummary() {
  const { weekly, activity } = await getTrainingAnalytics();

  const volumeChart = {
    labels: weekly.map((w) => w.week),
    datasets: [
      {
        label: "Weekly volume",
        data: weekly.map((w) => w.volume),
        borderColor: "rgb(75,192,192)",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 bg-sleek_gray bg-opacity-40 rounded-3xl p-7 col-span-2">
      <div>
        <h1 className="text-white">Weekly Volume</h1>
        {weekly.length > 0 ? (
          <div className="h-56">
            <LineChart chartData={volumeChart} />
          </div>
        ) : (
          <p className="text-gray-400">Log some sets to see your weekly volume.</p>
        )}
      </div>
      <div>
        <h1 className="text-white pb-2">Activity</h1>
        <ActivityHeatmap activity={activity} />
      </div>
    </div>
  );
}
