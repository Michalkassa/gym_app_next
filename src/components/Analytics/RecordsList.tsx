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
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Best weight</th>
            <th>Best est. 1RM</th>
            <th>Best set volume</th>
            <th>1RM achieved</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.exerciseId}>
              <td className="font-semibold">{r.exerciseName}</td>
              <td>{r.bestWeight} kg</td>
              <td>{r.bestOneRepMax} kg</td>
              <td>{r.bestVolume} kg</td>
              <td className="text-gray-400">{r.achievedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
