import { auth } from "@/auth/auth"
import  BodyWeightChart  from "@/components/BodyWeights/BodyWeightChart"
import MostPopularExercisesList from "@/components/Exercises/MostPopularExercisesList";
import { redirect } from "next/navigation"
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading"
import Link from "next/link"

export default async function Dashboard() {
  const session = await auth();
  if (!session) return redirect("/")

  return (  
    <div className="flex flex-col h-screen md:grid md:grid-rows-2 md:grid-cols-dashboard_elements md:gap-5 p-7">
      <div className="bg-sleek_gray bg-opacity-40 rounded-3xl p-7">
      <Link href="/dashboard/bodyweights">
      <h1 className="text-white">Bodyweight Progress</h1>
      <Suspense fallback={<LoadingComponent/>}>
      <BodyWeightChart />
      </Suspense>
      </Link>
      </div>
      <div className="flex flex-col gap-6 bg-sleek_gray bg-opacity-40 rounded-3xl p-7 overflow-y-scroll">
      <Suspense fallback={<LoadingComponent/>}>
      <h1 className="text-white">Popular exercises</h1>
      <MostPopularExercisesList />
      </Suspense>
      </div>
      <div className="grid gap-3 col-span-2">
        <Link href="/dashboard/exercises" className="text-3xl flex w-full bg-sleek_gray bg-opacity-40 justify-center items-center text-white">Exercises</Link>
        <Link href="/dashboard/workouts" className="text-3xl flex w-full bg-sleek_gray bg-opacity-40 justify-center items-center text-white">Workouts</Link>
        <Link href="/dashboard/bodyweights" className="text-3xl flex w-full bg-sleek_gray bg-opacity-40 justify-center items-center text-white">Bodyweight</Link>
        <Link href="/dashboard/runningworkout" className="text-3xl flex w-full bg-atlantis_blue bg-opacity-40 justify-center items-center text-white">Start Workout</Link>
      </div>
    </div>
  )
}