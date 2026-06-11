import Link from "next/link"
import { getExercisesWorkoutPairs } from "@/app/api/auth/actions"
import { ExerciseProps } from "@/Props"

interface WorkoutProps {
    id: string,
    name: string,
    description: string,
}


export default async function StartWorkout({ id , name , description} : WorkoutProps) {
     const pairs = await getExercisesWorkoutPairs(id)
    return(
        <Link key={id} href={`/dashboard/runningworkout/${id}`} className="card flex flex-col transition hover:border-white/10 hover:bg-white/[0.05]">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="mt-1 text-sm text-gray-400 limited-text">{description}</p>
            <ul className="mt-3 flex-1 space-y-1">
                {pairs.map((pair) => (
                    <li key={pair.id} className="text-sm text-gray-500">{pair.exercise.name}</li>
                ))}
            </ul>
            <span className="btn-primary mt-4 w-full">Start</span>
        </Link>
    )
}
