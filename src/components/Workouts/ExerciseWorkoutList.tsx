import { getExercisesFromWorkouts } from "../../app/api/actions"
import  ExerciseWorkout from "@/components/Workouts/ExerciseWorkout"
interface ExerciseProps {
    id : string
}

export default async function ExerciseWorkoutList( {id} : ExerciseProps) {
  const pairs = await getExercisesFromWorkouts(id)
  
  return (
    <div className="flex flex-col justify-center items-left flex-wrap gap-3">
          {pairs.map((pair) => (
            <ExerciseWorkout key={pair.exercise.id} id={pair.id} workoutId={pair.workoutId.id} name={pair.exercise.name}/>
          ))}
    </div>
    
  )
} 
