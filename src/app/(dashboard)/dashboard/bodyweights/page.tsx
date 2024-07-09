import { auth } from "@/auth/auth"
import BodyWeightList from "@/components/BodyWeights/BodyWeightList"
import { redirect } from "next/navigation"
import { Suspense } from 'react'
import  AddBodyWeight from "@/components/BodyWeights/AddBodyWeight";
import BodyWeightChart from "@/components/BodyWeights/BodyWeightChart";


export default async function BodyWeights() {
  const session = await auth();

  if (!session) return redirect("/")
  return (
    <div className="flex flex-row justify-center">
      <div className="w-1/3 p-8 h-screen">
      <AddBodyWeight></AddBodyWeight>
      <BodyWeightList></BodyWeightList>
      </div>
      <div className="w-full p-8 ">
      <BodyWeightChart/>
      </div>
    </div>
  )
}