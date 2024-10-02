import { WorkoutProps } from "@/Props"
import { getWorkouts } from "../../app/api/actions"
import Workout from "@/components/Workouts/Workout"


export default async function WorkoutList() {

  const data = await getWorkouts()
  return (
    <div className="flex flex-row justify-center items-center flex-wrap gap-3">
          {data.reverse().map((workout:WorkoutProps) => (
            <Workout key={workout.id} id={workout.id} name={workout.name} description={workout.description}/>
          ))}
    </div>
    
  )
} 
