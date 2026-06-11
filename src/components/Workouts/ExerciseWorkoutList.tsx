import { getExercisesWorkoutPairs } from "../../app/api/auth/actions"
import  ExerciseWorkout from "@/components/Workouts/ExerciseWorkout"
import {ExerciseWorkoutPairProps} from "@/Props"

export default async function ExerciseWorkoutList(props: {id: string}) {
  const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(props.id)
  
  
  if (ExercisesWorkoutPairs.length === 0) {
    return <p className="text-gray-500">No exercises in this workout yet.</p>
  }

  return (
    <div className="flex flex-col gap-2">
          {ExercisesWorkoutPairs.map((pair: ExerciseWorkoutPairProps) => (
            <ExerciseWorkout key={pair.exercise.id} id={pair.id} workoutId={pair.workoutId} name={pair.exercise.name}/>
          ))}
    </div>
  )
} 
