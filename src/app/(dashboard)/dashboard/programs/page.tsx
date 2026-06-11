import { auth } from "@/app/api/auth/auth"
import ProgramList from "@/components/Workouts/ProgramList"
import { redirect } from "next/navigation"

export default async function Programs() {
  const session = await auth();
  if (!session) return redirect("/")

  return (
    <section className="flex flex-col align-middle">
      <div className="flex justify-around py-6">
        <h1 className="text-5xl text-white">Programs</h1>
      </div>
      <p className="text-center text-gray-400 pb-4">
        Pick a proven training program to copy into your workouts.
      </p>
      <div className="flex w-full justify-center">
        <div className="max-w-6xl">
          <ProgramList />
        </div>
      </div>
    </section>
  )
}
