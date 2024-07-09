import { getExercises } from "../../app/api/actions"
import Exercise from "@/components/Exercises/Exercise"


export default async function BodyWeightList() {

  const data = await getExercises()
  return (
    <div className="flex flex-row rounded-md justify-center items-center flex-wrap ">
          {data.reverse().map((exercise) => (
            <Exercise key={exercise.id} id={exercise.id} name={exercise.name} description={exercise.description}/>
          ))}
    </div>
  )
} 
