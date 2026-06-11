import { getExercises, getExercisesWorkoutPairs, getWorkout } from "@/app/api/auth/actions";
import RunningExerciseList from "@/components/Exercises/RunningExerciseList";
import { auth } from "@/app/api/auth/auth"
import {redirect} from "next/navigation"
import LoadingComponent from "@/components/Loading";
import RunningWorkoutTimer from "@/components/Workouts/RunningWorkoutTimer";



export default async function RunningWorkoutpage({params}:{params:{id : string}}){
    const session = await auth();
    if (!session) return redirect("/")
      
    const workout = await getWorkout(params.id)
    if (!workout) return redirect("/dashboard/workouts")
    
    const ExercisesWorkoutPairs = await getExercisesWorkoutPairs(workout?.id)
    return(
        <section className="flex flex-col gap-6 text-white">
            <h1 className="page-header">{workout?.name}</h1>
            <RunningExerciseList pairs={ExercisesWorkoutPairs}></RunningExerciseList>
        </section>
    )

}