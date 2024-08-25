import { getExercise } from "@/app/api/actions";
import ExerciseChart from "@/components/Exercises/ExerciseChart";
import ExercisePage from "@/components/Exercises/ExercisePage";
import AddLog from "@/components/Logs/AddLog";
import LogList from "@/components/Logs/LogList"
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/Loading";


export default async function SingleExercisePage({params}:any){
    const session = await auth();
    if (!session) return redirect("/")

    const exercise = await getExercise(params.id)
    if (!exercise) return redirect("/dashboard/workouts") 
    
    return(
        <div>
            <ExercisePage id={params.id} name={exercise?.name} description={exercise?.description} />
            <AddLog exerciseId={params.id}/>
            <div className="flex flex-row gap-10 justify-center align-middle w-screen h-full">
            <LogList exerciseId={params.id}/>
            <ExerciseChart exerciseId={params.id}/>
            </div>
        </div>
    )

}