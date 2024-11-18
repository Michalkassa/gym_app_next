import { auth } from "@/app/api/auth/auth"
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
    <div className="flex flex-col md:flex-row justify-center md:h-full">
      <Suspense fallback={<LoadingComponent/>}>
      <div className="flex justify-center">
      <BodyWeightChart/>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <AddBodyWeight></AddBodyWeight>
          <BodyWeightList></BodyWeightList>
        </div>
      </div>
      </Suspense>
    </div>
  )
}