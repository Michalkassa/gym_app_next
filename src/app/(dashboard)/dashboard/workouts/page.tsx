import { auth } from "@/app/api/auth/auth"
import AddWorkout from "@/components/Workouts/AddWorkout";
import WorkoutList from "@/components/Workouts/WorkoutList"
import { redirect } from "next/navigation"
import LoadingComponent from "@/components/Loading"


export default async function Workouts() {
  const session = await auth();

  if (!session) return redirect("/")
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="page-header">Workouts</h1>
        <AddWorkout></AddWorkout>
      </div>
      <WorkoutList></WorkoutList>
    </section>
  )
}