import { getWorkouts } from "../../app/api/auth/actions"
import Workout from "@/components/Workouts/Workout"
import StartWorkout from "./StartWorkout"
import { WorkoutProps } from "@/Props"


export default async function StartWorkoutList() {

  const data = await getWorkouts()
  return (
    <div className="flex flex-row justify-center items-center flex-wrap gap-3">
          {data.reverse().map((workout:WorkoutProps) => (
            <StartWorkout key={workout.id} id={workout.id} name={workout.name} description={workout.description}/>
          ))}
    </div>
    
  )
} 
