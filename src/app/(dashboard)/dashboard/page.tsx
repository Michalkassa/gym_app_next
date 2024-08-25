import { auth } from "@/auth/auth"
import  BodyWeightChart  from "@/components/BodyWeights/BodyWeightChart"
import MostPopularExercisesList from "@/components/Exercises/MostPopularExercisesList";
import { redirect } from "next/navigation"
import { Suspense } from "react";


export default async function Dashboard() {
  const session = await auth();
  if (!session) return redirect("/")

  return (  
    <div className="flex flex-col h-screen md:grid md:grid-rows-2 md:grid-cols-dashboard_elements md:gap-10">
      <div className="">
      <h1 className="text-3xl text-white">Body Weight</h1>
      <Suspense fallback={<p>Loading...</p>}>
      <BodyWeightChart />
      </Suspense>
      </div>
      <div className="flex flex-col justify-around">
      <p className="text-white text-2xl">Your Most Popular Exercises:</p>
      <Suspense fallback={<p>Loading...</p>}>
      <MostPopularExercisesList />
      </Suspense>
      </div>
    </div>
  )
}