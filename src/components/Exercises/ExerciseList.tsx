import { getExercises } from "../../app/api/actions"
import Exercise from "@/components/Exercises/Exercise"


export default async function ExerciseList() {

  const data = await getExercises()
  return (
    <div className="flex flex-row justify-center items-center flex-wrap overflow-y-scroll gap-3">
          {data.reverse().map((exercise) => (
            <Exercise key={exercise.id} id={exercise.id} name={exercise.name} description={exercise.description}/>
          ))}
    </div>
    
  )
} 
