import { getExercises, getExercisesWorkoutPairs, getWorkout } from "@/app/api/auth/actions";
import WorkoutPage from "@/components/Workouts/WorkoutPage";
import ExerciseWorkoutList from "@/components/Workouts/ExerciseWorkoutList";
import AddExerciseToWorkout from "@/components/Workouts/AddExerciseToWorkout";
import { auth } from "@/app/api/auth/auth"
import {redirect} from "next/navigation"
import LoadingComponent from "@/components/Loading"



export default async function SingleWorkoutpage({params}:{params:{id : string}}){
    const session = await auth();
    if (!session) return redirect("/")

    const workout = await getWorkout(params.id)
    if (!workout) return redirect("/dashboard/workouts")
    
    const exercises = await getExercises()

    return(
        <div className="">
            <WorkoutPage id={params.id} name={workout?.name} description={workout?.description} />
            <AddExerciseToWorkout workoutId={params.id} exercises={exercises}/>
            <div className="flex flex-row gap-10 justify-center align-middle w-screen h-full">
            <ExerciseWorkoutList id={params.id}></ExerciseWorkoutList>
            </div>
        </div>
    )

}