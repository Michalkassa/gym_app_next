import { getExercises, getExercisesWorkoutPairs, getWorkout } from "@/app/api/actions";
import RunningExerciseList from "@/components/Exercises/RunningExerciseList";
import { auth } from "@/auth/auth"
import {redirect} from "next/navigation"




export default async function RunningWorkoutpage({params}:any){
    const session = await auth();
    if (!session) return redirect("/")

    const workout = await getWorkout(params.id)
    if (!workout) return redirect("/dashboard/workouts")
    
    const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(workout?.id)
    return(
        <div className="text-white flex justify-center align">
            <div className="flex flex-col">
                <h1 className="text-5xl">{workout?.name}</h1>
                <RunningExerciseList pairs={ExercisesWorkoutPairs}></RunningExerciseList>
            </div>
        </div>
    )

}