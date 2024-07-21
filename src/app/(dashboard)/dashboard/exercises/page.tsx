import { auth } from "@/auth/auth"
import AddExercise from "@/components/Exercises/AddExercise";
import ExerciseList from "@/components/Exercises/ExerciseList"
import { redirect } from "next/navigation"



export default async function Exercises() {
  const session = await auth();
  if (!session) return redirect("/")
    
  return (
    <div className="flex flex-col align-middle" >
        <AddExercise/>
        <div className="flex w-screen justify-center w-full h-4/6">
        <div className="max-w-6xl">
        <ExerciseList></ExerciseList>
        </div>
        </div>
    </div>
  )
}