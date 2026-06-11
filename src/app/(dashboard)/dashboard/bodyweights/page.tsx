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
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="page-header">Body Weight</h1>
        <AddBodyWeight></AddBodyWeight>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-white">Progress</h2>
        <div className="mt-4 h-56">
          <BodyWeightChart/>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card"><BodyWeightStats /></div>
        <div className="card"><BodyWeightPercentages/></div>
      </div>

      <div className="card">
        <BodyWeightList></BodyWeightList>
      </div>
    </section>
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