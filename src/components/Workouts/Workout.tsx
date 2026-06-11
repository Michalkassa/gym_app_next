import Link from "next/link"
import { getExercisesWorkoutPairs } from "@/app/api/auth/actions"
import { ExerciseWorkoutPairProps } from "@/Props"
import { WorkoutProps } from "@/Props"


export default async function Workout({ id , name , description} : WorkoutProps) {
     const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(id)
    return(
        <Link key={id} href={`/dashboard/workouts/${id}`} className="card block transition hover:border-white/10 hover:bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="mt-1 text-sm text-gray-400 limited-text">{description}</p>
            <ul className="mt-3 space-y-1">
                {ExercisesWorkoutPairs.map((pair: ExerciseWorkoutPairProps) => (
                    <li key={pair.id} className="text-sm text-gray-500">{pair.exercise.name}</li>
                ))}
            </ul>
        </Link>
    )
}