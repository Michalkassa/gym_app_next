import { WorkoutProps } from "@/Props"
import { getWorkouts } from "../../app/api/auth/actions"
import Workout from "@/components/Workouts/Workout"


export default async function WorkoutList() {

  const data = await getWorkouts()
  if(data.length == 0){
    return(
      <div className="flex flex-row justify-center items-center flex-wrap gap-3">
          <p className="text-gray-400">no workouts yet created</p>
    </div>
    )
  }
  return (
    <div className="flex flex-row justify-center items-center flex-wrap gap-3">
          {data.reverse().map((workout:WorkoutProps) => (
            <Workout key={workout.id} id={workout.id} name={workout.name} description={workout.description}/>
          ))}
    </div>
    
  )
} 
