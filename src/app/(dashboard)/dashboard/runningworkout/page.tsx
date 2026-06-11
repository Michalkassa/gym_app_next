import { auth } from "@/app/api/auth/auth"
import StartWorkoutList from "@/components/Workouts/StartWorkoutList";
import { redirect } from "next/navigation"
import LoadingComponent from "@/components/Loading";


export default async function RunningWorkout() {
  const session = await auth();
  if (!session) return redirect("/")
  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="page-header">Start a Workout</h1>
        <p className="mt-1 text-gray-500">Pick a workout to begin your session.</p>
      </header>
      <StartWorkoutList/>
    </section>
  )
}