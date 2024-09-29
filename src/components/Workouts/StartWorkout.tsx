import Link from "next/link"
import { getExercisesWorkoutPairs } from "@/app/api/actions"
import { ExerciseProps } from "@/Props"

interface WorkoutProps {
    id: string,
    name: string,
    description: string,
}


export default async function StartWorkout({ id , name , description} : WorkoutProps) {
     const pairs = await getExercisesWorkoutPairs(id)
    return(
        <Link href={`/dashboard/runningworkout/${id}`}>
        <div key={id} className="w-90 h-64 hover:scale-110 duration-200 p-3">
            <div className="flex flex-col bg-sleek_gray p-10 justify-center text-white h-full">
                <h1 className="flex text-3xl justify-center">{name}</h1>
                <p className="flex text-center justify-center limited-text">{description}</p>
                <h2>Exercises:</h2>
                <ul>
                        {pairs.map((pair) => (
                        <li key={pair.id}>
                            <p className="text-sm">- {pair.exercise.name}</p>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
        </Link>
    )
}
