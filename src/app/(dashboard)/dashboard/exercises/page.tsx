import { auth } from "@/auth/auth"
import AddExercise from "@/components/Exercises/AddExercise";
import ExerciseList from "@/components/Exercises/ExerciseList"
import { redirect } from "next/navigation"



export default async function Exercises() {
  const session = await auth();

  if (!session) return redirect("/")
  return (
    <div>
        <ExerciseList></ExerciseList>
        <AddExercise/>
    </div>
  )
}