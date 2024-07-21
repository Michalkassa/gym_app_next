import Link from "next/link"
import { getExercisesFromWorkouts } from "@/app/api/actions"
import Exercise from "../Exercises/Exercise"

interface WorkoutProps {
    id: string,
    name: string,
    description: string,
}


export default async function Workout({ id , name , description} : WorkoutProps) {
     const exercises = await getExercisesFromWorkouts(id)
    return(
        <Link href={`/dashboard/workouts/${id}`}>
        <div key={id} className="w-90 h-64 hover:scale-110 duration-200 p-3">
            <div className="flex flex-col bg-sleek_gray p-10 justify-center text-white h-full">
                <h1 className="flex text-3xl justify-center">{name}</h1>
                <p className="flex text-center justify-center limited-text">{description}</p>
                <h2>Exercises:</h2>
                <ul>
                        {exercises.map((exercise) => (
                        <li>
                            <p className="text-sm">- {exercise.exercise.name}</p>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
        </Link>
    )
}