import { auth } from "@/app/api/auth/auth"
import StartWorkoutList from "@/components/Workouts/StartWorkoutList";
import { redirect } from "next/navigation"
import LoadingComponent from "@/components/Loading";


export default async function RunningWorkout() {
  const session = await auth();
  if (!session) return redirect("/")
  return (  
    <div className="flex flex-col w-screen h-screen">
          <div><h1 className="text-3xl md:text-5xl text-white py-6 text-center">Pick a workout to start:</h1></div>
          <div>
          <StartWorkoutList/>
          </div>
    </div>
  )
}