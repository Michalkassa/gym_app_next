import { auth } from "@/app/api/auth/auth"
import AddNutrition from "@/components/Nutrition/AddNutrition"
import NutritionList from "@/components/Nutrition/NutritionList"
import { redirect } from "next/navigation"

export default async function Nutrition() {
  const session = await auth();
  if (!session) return redirect("/")

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="page-header">Nutrition</h1>
        <AddNutrition />
      </div>
      <div className="card">
        <NutritionList />
      </div>
    </section>
  )
}
