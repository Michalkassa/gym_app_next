import { getExercisesFromWorkouts } from "../../app/api/actions"

interface ExerciseProps {
    id : string
}

export default async function ExerciseWorkoutList( {id} : ExerciseProps) {
  const exercises = await getExercisesFromWorkouts(id)
  
  return (
    <div className="flex flex-col justify-center items-left flex-wrap overflow-y-scroll gap-3">
          {exercises.map((exercise) => (
            <div className="flex justify-between p-3 bg-sleek_gray">
              <p>{exercise.exercise.name}</p>
            </div>
          ))}
    </div>
    
  )
} 
