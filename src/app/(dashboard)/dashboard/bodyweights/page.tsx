import { auth } from "@/auth/auth"
import { BodyWeightDisplay } from "@/components/BodyWeightDisplay"
import { redirect } from "next/navigation"
import { Suspense } from 'react'
import  BodyWeightVisualization from "@/components/BodyWeightVisualization";
import  BodyWeightCreateForm from "@/components/BodyWeightCreateForm";

export default async function BodyWeights() {
  const session = await auth();

  if (!session) return redirect("/")
  return (
    <div className="flex align-center">
      <Suspense fallback={<p className="text-white">Loading Body Weight...</p>}>
      <div>
      <BodyWeightDisplay/>
      <BodyWeightCreateForm />
      </div>
      </Suspense>
      <Suspense fallback={<p className="text-white">Loading Body Weight Chart...</p>}>
      <BodyWeightVisualization />
      </Suspense>
    </div>
  )
}