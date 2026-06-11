import { auth } from "@/app/api/auth/auth"
import RecordsList from "@/components/Analytics/RecordsList"
import { redirect } from "next/navigation"

export default async function Records() {
  const session = await auth();
  if (!session) return redirect("/")

  return (
    <section className="flex flex-col align-middle">
      <div className="flex justify-around py-6">
        <h1 className="text-5xl text-white">Personal Records</h1>
      </div>
      <div className="flex w-full justify-center">
        <div className="max-w-4xl w-full p-3">
          <RecordsList />
        </div>
      </div>
    </section>
  )
}
