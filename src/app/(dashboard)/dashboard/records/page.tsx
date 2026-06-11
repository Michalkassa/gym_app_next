import { auth } from "@/app/api/auth/auth"
import RecordsList from "@/components/Analytics/RecordsList"
import ExportButtons from "@/components/Analytics/ExportButtons"
import { redirect } from "next/navigation"

export default async function Records() {
  const session = await auth();
  if (!session) return redirect("/")

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h1 className="page-header">Personal Records</h1>
        <p className="mt-1 text-gray-500">Your best lifts, and export your data.</p>
      </header>
      <ExportButtons />
      <div className="card">
        <RecordsList />
      </div>
    </section>
  )
}
