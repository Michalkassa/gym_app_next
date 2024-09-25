import Link from "next/link"
import { getExercisesWorkoutPairs } from "@/app/api/actions"
import { ExerciseWorkoutPairProps } from "@/Props"
import { WorkoutProps } from "@/Props"


export default async function Workout({ id , name , description} : WorkoutProps) {
     const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(id)
    return(
        <Link href={`/dashboard/workouts/${id}`}>
        <div key={id} className="w-90 h-64 hover:scale-110 duration-200 p-3">
            <div className="flex flex-col bg-sleek_gray p-10 justify-center text-white h-full">
                <h1 className="flex text-3xl justify-center">{name}</h1>
                <p className="flex text-center justify-center limited-text">{description}</p>
                <ul>
                        {ExercisesWorkoutPairs.map((pair: ExerciseWorkoutPairProps) => (
                        <li>
                            <p className="text-sm">- {pair.exercise.name}</p>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
        </Link>
    )
}