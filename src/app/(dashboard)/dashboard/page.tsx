import  BodyWeightChart  from "@/components/BodyWeights/BodyWeightChart"
import MostPopularExercisesList from "@/components/Exercises/MostPopularExercisesList";
import { redirect } from "next/navigation"
import { Suspense } from "react";
import { auth } from "@/app/api/auth/auth";
import LoadingComponent from "@/components/Loading"
import Link from "next/link"

export default async function Dashboard() {
  const session = await auth();
  if (!session) return redirect("/")

  return (  
    <div className="flex flex-col h-full md:grid md:grid-rows-2 md:grid-cols-dashboard_elements md:gap-5 gap-3 p-1 md:p7 justify-between pb-28">
      <div className="bg-sleek_gray bg-opacity-40 rounded-3xl p-7">
        <Link href="/dashboard/bodyweights">
        <h1 className="text-white">Bodyweight Progress</h1>
        <BodyWeightChart />
        </Link>
      </div>
      <div className="flex flex-col gap-2 bg-sleek_gray bg-opacity-40 rounded-3xl p-7 h-64">
        <h1 className="text-white">Popular exercises</h1>
        <MostPopularExercisesList />
      </div>
      <div className="grid md:gap-3 gap-2 col-span-2 text-2xl">
        <Link href="/dashboard/exercises" className="flex w-full bg-sleek_gray bg-opacity-40 justify-center items-center text-white p-4">Exercises</Link>
        <Link href="/dashboard/workouts" className="flex w-full bg-sleek_gray bg-opacity-40 justify-center items-center text-white p-4">Workouts</Link>
        <Link href="/dashboard/bodyweights" className="flex w-full bg-sleek_gray bg-opacity-40 justify-center items-center text-white p-4">Bodyweight</Link>
        <Link href="/dashboard/runningworkout" className="flex w-full bg-atlantis_blue bg-opacity-40 justify-center items-center text-white p-4">Start Workout</Link>
      </div>
    </div>
  )
}