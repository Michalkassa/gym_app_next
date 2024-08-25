import { getWorkouts } from "../../app/api/actions"
import Workout from "@/components/Workouts/Workout"
import StartWorkout from "./StartWorkout"


export default async function StartWorkoutList() {

  const data = await getWorkouts()
  return (
    <div className="flex flex-row justify-center items-center flex-wrap gap-3">
          {data.reverse().map((workout) => (
            <StartWorkout key={workout.id} id={workout.id} name={workout.name} description={workout.description}/>
          ))}
    </div>
    
  )
} 
