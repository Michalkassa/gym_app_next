import { auth } from "@/app/api/auth/auth"
import StartWorkoutList from "@/components/Workouts/StartWorkoutList";
import { redirect } from "next/navigation"
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";


export default async function RunningWorkout() {
  const session = await auth();
  if (!session) return redirect("/")
  return (  
    <div className="flex flex-col w-screen h-screen md:grid md:grid-rows-2 md:grid-cols-dashboard_elements md:gap-10">
          <h1 className="text-3xl md:text-5xl text-white py-6 text-center">Pick a workout to start:</h1>
          <Suspense fallback={<LoadingComponent />}>
        <StartWorkoutList/>
        </Suspense>
    </div>
  )
}