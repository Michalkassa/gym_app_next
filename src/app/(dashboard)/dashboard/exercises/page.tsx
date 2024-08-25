import { auth } from "@/auth/auth"
import AddExercise from "@/components/Exercises/AddExercise";
import ExerciseList from "@/components/Exercises/ExerciseList"
import Loading from "@/components/Loading";
import { redirect } from "next/navigation"
import { Suspense } from "react";



export default async function Exercises() {
  const session = await auth();
  if (!session) return redirect("/")
    
  return (
    <div className="flex flex-col align-middle" >
      <Suspense fallback={<Loading/>}>
      <div className="flex justify-around py-6">
        <h1 className="text-5xl text-white">Exercises</h1>
        <AddExercise/>
      </div>
        <div className="flex w-screen justify-center w-full h-4/6">
        <div className="min-w-full">
        <Suspense fallback={<Loading/>}>
        <ExerciseList></ExerciseList>
        </Suspense>
        </div>
        </div>
      </Suspense>
    </div>
  )
}