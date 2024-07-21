import { getMostPopularExercises } from "../../app/api/actions"



export default async function MostPopularExercisesList() {

  const data = await getMostPopularExercises()
  return (
    <div className="flex flex-col justify-center items-left flex-wrap overflow-y-scroll gap-3">
          {data.map((exercise) => (
            <div className="flex justify-between p-3 bg-sleek_gray">
              <p>{exercise.name}</p>
              <p>{exercise.logs.length} total Logs</p>
            </div>
          ))}
    </div>
    
  )
} 
