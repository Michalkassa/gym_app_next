import { getMostPopularExercises } from "../../app/api/auth/actions"



export default async function MostPopularExercisesList() {

  const data = await getMostPopularExercises()
 
  return (
    <div className="flex flex-row justify-left items-left flex-wrap overflow-y-scroll gap-3">
        { data &&
          data.map((exercise) => (
            <div key={exercise.id} className="flex p-3 bg-sleek_gray justify-between text-white min-w-full ">
              <p>{exercise.name}</p>
              <p>{exercise.logs.length} total Logs</p>
            </div>
          ))}
          {(data.length == 0) &&
          <p className="flex p-3 justify-between text-white min-w-full "> No exercises created </p>
          }

    </div>
    
  )
} 
