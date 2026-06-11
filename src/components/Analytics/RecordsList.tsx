import { getTrainingAnalytics } from "@/app/api/auth/actions";

export default async function RecordsList() {
  const { records } = await getTrainingAnalytics();

  if (records.length === 0) {
    return (
      <div className="flex justify-center">
        <p className="text-gray-400">No personal records yet — log some sets to set your first PRs.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white border-collapse">
        <thead>
          <tr className="text-left border-b border-gray-600">
            <th className="p-3">Exercise</th>
            <th className="p-3">Best weight</th>
            <th className="p-3">Best est. 1RM</th>
            <th className="p-3">Best set volume</th>
            <th className="p-3">1RM achieved</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.exerciseId} className="border-b border-gray-700">
              <td className="p-3 font-semibold">{r.exerciseName}</td>
              <td className="p-3">{r.bestWeight} kg</td>
              <td className="p-3">{r.bestOneRepMax} kg</td>
              <td className="p-3">{r.bestVolume} kg</td>
              <td className="p-3 text-gray-400">{r.achievedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
