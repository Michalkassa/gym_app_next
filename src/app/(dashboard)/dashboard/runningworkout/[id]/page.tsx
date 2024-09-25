import { getExercises, getExercisesWorkoutPairs, getWorkout } from "@/app/api/actions";
import RunningExerciseList from "@/components/Exercises/RunningExerciseList";
import { auth } from "@/auth/auth"
import {redirect} from "next/navigation"
import { Suspense } from "react";
import Loading from "@/components/Loading";



export default async function RunningWorkoutpage({params}:any){
    const session = await auth();
    if (!session) return redirect("/")

    const workout = await getWorkout(params.id)
    if (!workout) return redirect("/dashboard/workouts")
    
    const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(workout?.id)
    return(
        <div className="text-white flex justify-center align">
            <Suspense fallback={<Loading />}>
            <div className="flex flex-col">
                <h1 className="text-5xl">{workout?.name}</h1>
                <RunningExerciseList pairs={ExercisesWorkoutPairs}></RunningExerciseList>
            </div>
            </Suspense>
        </div>
    )

}