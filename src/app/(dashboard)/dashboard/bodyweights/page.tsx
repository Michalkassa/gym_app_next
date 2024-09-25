import { auth } from "@/auth/auth"
import BodyWeightList from "@/components/BodyWeights/BodyWeightList"
import { redirect } from "next/navigation"
import  AddBodyWeight from "@/components/BodyWeights/AddBodyWeight";
import BodyWeightChart from "@/components/BodyWeights/BodyWeightChart";
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";


export default async function BodyWeights() {
  const session = await auth();
  if (!session) return redirect("/")
    
  return (
    <div className="flex flex-col md:grid md:grid-rows-1 grid-cols-dashboard_elements justify-center">
      <Suspense fallback={<LoadingComponent/>}>
      <div className="flex w-screen justify-center">
      <BodyWeightChart/>
      </div>
      <div className="flex w-screen justify-center">
      <div className="flex flex-col justify-center">
      <AddBodyWeight></AddBodyWeight>
      <BodyWeightList></BodyWeightList>
      </div>
      </div>
      </Suspense>
    </div>
  )
}