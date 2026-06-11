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
    <div className="card flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Weekly Volume</h2>
        {weekly.length > 0 ? (
          <div className="mt-4 h-56">
            <LineChart chartData={volumeChart} />
          </div>
        ) : (
          <p className="mt-2 text-gray-500">Log some sets to see your weekly volume.</p>
        )}
      </div>
      <div>
        <h2 className="pb-3 text-lg font-semibold text-white">Activity</h2>
        <ActivityHeatmap activity={activity} />
      </div>
    </div>
  );
}
