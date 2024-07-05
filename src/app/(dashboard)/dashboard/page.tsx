import { auth } from "@/auth/auth"
import { BodyWeightDisplay } from "@/components/BodyWeightDisplay"
import { redirect } from "next/navigation"
import { Suspense } from 'react'

export default async function Dashboard() {
  const session = await auth();

  if (!session) return redirect("/")
  return (
    <div>
      Dashboard
    </div>
  )
}