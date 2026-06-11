import { getNutritionEntries } from "@/app/api/auth/actions"
import NutritionEntry from "@/components/Nutrition/NutritionEntry"
import LineChart from "@/components/LineChart"

export default async function NutritionList() {
  const entries = await getNutritionEntries()

  if (entries.length === 0) {
    return <p className="text-gray-400 text-center">No nutrition logged yet.</p>
  }

  const chartData = {
    labels: entries.map((e) => e.createdAt.toLocaleDateString("es-MX")),
    datasets: [
      {
        label: "Calories",
        data: entries.map((e) => e.calories),
        borderColor: "rgb(75,192,192)",
      },
    ],
  }

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="h-56">
        <LineChart chartData={chartData} />
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th className="text-right">Remove</th>
            </tr>
          </thead>
          <tbody>
            {[...entries].reverse().map((e) => (
              <NutritionEntry
                key={e.id}
                id={e.id}
                date={e.createdAt.toLocaleDateString("es-MX")}
                calories={e.calories}
                protein={e.protein}
                carbs={e.carbs}
                fat={e.fat}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
