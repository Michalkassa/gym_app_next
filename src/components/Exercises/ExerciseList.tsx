import { getExercises } from "../../app/api/auth/actions"
import Exercise from "@/components/Exercises/Exercise"

export default async function ExerciseList() {

  const data = await getExercises()
  if(data.length == 0){
    return(
      <div className="flex flex-row justify-center items-center flex-wrap gap-3">
          <p className="text-gray-400">no exercises created</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col justify-center items-center flex-wrap gap-1">
          {data.reverse().map((exercise) => (
            <Exercise key={exercise.id} id={exercise.id} name={exercise.name} description={exercise.description}/>
          ))}
    </div>
    
  )
} 
