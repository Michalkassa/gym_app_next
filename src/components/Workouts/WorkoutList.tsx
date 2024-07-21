import { getWorkouts } from "../../app/api/actions"
import Workout from "@/components/Workouts/Workout"


export default async function WorkoutList() {

  const data = await getWorkouts()
  return (
    <div className="flex flex-row justify-center items-center flex-wrap overflow-y-scroll gap-3">
          {data.reverse().map((workout) => (
            <Workout key={workout.id} id={workout.id} name={workout.name} description={workout.description}/>
          ))}
    </div>
    
  )
} 
