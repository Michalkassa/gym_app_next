import { getMostPopularExercises } from "../../app/api/auth/actions"



export default async function MostPopularExercisesList() {

  const data = await getMostPopularExercises()
 
  return (
    <div className="flex flex-col gap-2">
        { data &&
          data.map((exercise) => (
            <div key={exercise.id} className="flex justify-between rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-white">
              <p className="font-medium">{exercise.name}</p>
              <p className="text-gray-400">{exercise.logs.length} logs</p>
            </div>
          ))}
          {(data.length == 0) &&
          <p className="text-gray-500">No exercises created yet.</p>
          }
    </div>
  )
} 
