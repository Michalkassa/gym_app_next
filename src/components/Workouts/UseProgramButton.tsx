"use client"
import { copyWorkoutTemplate } from "@/app/api/auth/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function UseProgramButton({ templateId }: { templateId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    await copyWorkoutTemplate(templateId)
    router.push("/dashboard/workouts")
    router.refresh()
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="mt-auto bg-atlantis_blue rounded-md p-3 text-white disabled:opacity-60"
    >
      {loading ? "Adding..." : "Use this program"}
    </button>
  )
}
