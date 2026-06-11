import { getUserStats } from "@/app/api/auth/actions"

/** Compact level + XP progress bar for the dashboard navbar. */
export default async function LevelBadge() {
  const stats = await getUserStats()
  if (!stats) return null

  return (
    <div className="px-4 py-2 w-full">
      <div className="flex justify-between text-xs text-white mb-1">
        <span>Level {stats.level}</span>
        <span>{stats.current}/{stats.needed} XP</span>
      </div>
      <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
        <div className="h-full bg-atlantis_blue" style={{ width: `${stats.percent}%` }} />
      </div>
    </div>
  )
}
