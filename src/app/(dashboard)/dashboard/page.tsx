import { auth } from "@/auth/auth"
import  BodyWeightChart  from "@/components/BodyWeights/BodyWeightChart"
import { redirect } from "next/navigation"
import { Suspense } from 'react'

export default async function Dashboard() {
  const session = await auth();

  if (!session) return redirect("/")

  return (
    <div>
      <BodyWeightChart />
    </div>
  )
}