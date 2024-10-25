import { getExercises, getExercisesWorkoutPairs, getWorkout } from "@/app/api/actions";
import RunningExerciseList from "@/components/Exercises/RunningExerciseList";
import { auth } from "@/app/api/auth/auth"
import {redirect} from "next/navigation"
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";



export default async function RunningWorkoutpage({params}:{params:{id : string}}){
    const session = await auth();
    if (!session) return redirect("/")
      
    console.log(params.id)
    const workout = await getWorkout(params.id)
    if (!workout) return redirect("/dashboard/workouts")
    
    const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(workout?.id)
    return(
        <div className="text-white flex justify-center align">
            <Suspense fallback={<LoadingComponent />}>
            <div className="flex flex-col">
                <h1 className="text-5xl">{workout?.name}</h1>
                <RunningExerciseList pairs={ExercisesWorkoutPairs}></RunningExerciseList>
            </div>
            </Suspense>
        </div>
    )

}