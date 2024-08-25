import { auth } from "@/auth/auth"
import StartWorkoutList from "@/components/Workouts/StartWorkoutList";
import { redirect } from "next/navigation"


export default async function RunningWorkout() {
  const session = await auth();
  if (!session) return redirect("/")
  return (  
    <div className="flex flex-col justify-center w-screen h-screen md:grid md:grid-rows-2 md:grid-cols-dashboard_elements md:gap-10">
      <StartWorkoutList/>
    </div>
  )
}