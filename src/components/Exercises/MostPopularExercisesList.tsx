import { getMostPopularExercises } from "../../app/api/actions"



export default async function MostPopularExercisesList() {

  const data = await getMostPopularExercises()
  return (
    <div className="flex flex-col justify-center items-left flex-wrap overflow-y- gap-3">
          {data.map((exercise) => (
            <div key={exercise.id} className="flex justify-between p-3 bg-sleek_gray text-white">
              <p>{exercise.name}</p>
              <p>{exercise.logs.length} total Logs</p>
            </div>
          ))}
    </div>
    
  )
} 
