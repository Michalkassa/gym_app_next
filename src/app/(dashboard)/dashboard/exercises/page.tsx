import { auth } from "@/app/api/auth/auth"
import AddExercise from "@/components/Exercises/AddExercise";
import ExerciseList from "@/components/Exercises/ExerciseList"
import LoadingComponent from "@/components/Loading";
import { redirect } from "next/navigation"



export default async function Exercises() {
  const session = await auth();
  if (!session) return redirect("/")
    
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="page-header">Exercises</h1>
        <AddExercise/>
      </div>
      <ExerciseList></ExerciseList>
    </section>
  )
}