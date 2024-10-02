import { getExercisesWorkoutPairs } from "../../app/api/actions"
import  ExerciseWorkout from "@/components/Workouts/ExerciseWorkout"
import {ExerciseWorkoutPairProps} from "@/Props"

export default async function ExerciseWorkoutList(props: {id: string}) {
  const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(props.id)
  
  
  return (
    <div className="flex flex-col justify-center items-left flex-wrap gap-3">
          {ExercisesWorkoutPairs.map((pair: ExerciseWorkoutPairProps) => (
            <ExerciseWorkout key={pair.exercise.id} id={pair.id} workoutId={pair.workoutId} name={pair.exercise.name}/>
          ))}
    </div>
    
  )
} 
