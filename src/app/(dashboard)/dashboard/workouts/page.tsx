import { auth } from "@/auth/auth"
import AddWorkout from "@/components/Workouts/AddWorkout";
import WorkoutList from "@/components/Workouts/WorkoutList"
import { redirect } from "next/navigation"



export default async function Workouts() {
  const session = await auth();

  if (!session) return redirect("/")
  return (
    <div className="flex flex-col align-middle" >
        <AddWorkout/>
        <div className="flex w-screen justify-center w-full h-4/6">
        <div className="max-w-6xl">
        <WorkoutList></WorkoutList>
        </div>
        </div>
    </div>
  )
}