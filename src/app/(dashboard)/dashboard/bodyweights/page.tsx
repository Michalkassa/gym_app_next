import { auth } from "@/app/api/auth/auth"
import BodyWeightList from "@/components/BodyWeights/BodyWeightList"
import { redirect } from "next/navigation"
import  AddBodyWeight from "@/components/BodyWeights/AddBodyWeight";
import BodyWeightChart from "@/components/BodyWeights/BodyWeightChart";
import BodyWeightStats from "@/components/BodyWeights/BodyWeightStats";
import BodyWeightPercentages from "@/components/BodyWeights/BodyWeightPercentages";
import LoadingComponent from "@/components/Loading";


export default async function BodyWeights() {
  const session = await auth();
  if (!session) return redirect("/")
    
  return (
    <div className="flex md:flex-row md:h-full">
      <div className="flex flex-col gap-10 justify-center align-middle min-w-full h-full">
      <BodyWeightChart/>
      <div className="flex justify-evenly">
        <AddBodyWeight></AddBodyWeight>
        <BodyWeightStats />
      </div>
      <BodyWeightPercentages/>
      <BodyWeightList></BodyWeightList>
      </div>
    </div>
  )
}



{/* <Suspense fallback={<LoadingComponent/>}>
            <ExercisePage id={id} name={exercise?.name} description={exercise?.description} />
            <div className="flex flex-col gap-10 justify-center align-middle w-screen h-full">
            <ExerciseChart exerciseId={id}/>
            <AddLog exerciseId={id}/>
            <LogList exerciseId={id}/>
            </div>
            </Suspense> */}