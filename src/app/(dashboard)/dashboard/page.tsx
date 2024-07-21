import { auth } from "@/auth/auth"
import  BodyWeightChart  from "@/components/BodyWeights/BodyWeightChart"
import MostPopularExercisesList from "@/components/Exercises/MostPopularExercisesList";
import { redirect } from "next/navigation"


export default async function Dashboard() {
  const session = await auth();
  if (!session) return redirect("/")

  return (  
    <div className="grid grid-rows-2 grid-cols-dashboard_elements gap-10">
      <div className="h-full w-full">
      <BodyWeightChart />
      </div>
      <div className="h-full flex flex-col justify-around">
      <p className="text-white text-2xl">Your Most Popular Exercises:</p>
      <MostPopularExercisesList />
      </div>
    </div>
  )
}