import { auth } from "@/app/api/auth/auth"
import ProgramList from "@/components/Workouts/ProgramList"
import { redirect } from "next/navigation"

export default async function Programs() {
  const session = await auth();
  if (!session) return redirect("/")

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="page-header">Programs</h1>
        <p className="mt-1 text-gray-500">Pick a proven training program to copy into your workouts.</p>
      </header>
      <ProgramList />
    </section>
  )
}
