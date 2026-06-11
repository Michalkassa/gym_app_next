import { auth } from "@/app/api/auth/auth"
import AddNutrition from "@/components/Nutrition/AddNutrition"
import NutritionList from "@/components/Nutrition/NutritionList"
import { redirect } from "next/navigation"

export default async function Nutrition() {
  const session = await auth();
  if (!session) return redirect("/")

  return (
    <section className="flex flex-col align-middle">
      <div className="flex justify-around py-6">
        <h1 className="text-5xl text-white">Nutrition</h1>
        <AddNutrition />
      </div>
      <div className="flex w-full justify-center">
        <div className="max-w-4xl w-full p-3">
          <NutritionList />
        </div>
      </div>
    </section>
  )
}
