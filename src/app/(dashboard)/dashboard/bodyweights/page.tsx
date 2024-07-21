import { auth } from "@/auth/auth"
import BodyWeightList from "@/components/BodyWeights/BodyWeightList"
import { redirect } from "next/navigation"
import  AddBodyWeight from "@/components/BodyWeights/AddBodyWeight";
import BodyWeightChart from "@/components/BodyWeights/BodyWeightChart";


export default async function BodyWeights() {
  const session = await auth();
  if (!session) return redirect("/")
    
  return (
    <div className="grid grid-rows-1 grid-cols-dashboard_elements justify-center">
      <div className="">
      <AddBodyWeight></AddBodyWeight>
      <BodyWeightList></BodyWeightList>
      </div>
      <div className="">
      <BodyWeightChart/>
      </div>
    </div>
  )
}