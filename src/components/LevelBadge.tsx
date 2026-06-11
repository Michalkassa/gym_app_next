import { getUserStats } from "@/app/api/auth/actions"

/** Compact level + XP progress bar for the dashboard navbar. */
export default async function LevelBadge() {
  const stats = await getUserStats()
  if (!stats) return null

  return (
    <div className="w-full pt-3">
      <div className="mb-1 flex justify-between text-xs">
        <span className="font-medium text-white">Level {stats.level}</span>
        <span className="text-gray-500">{stats.current}/{stats.needed} XP</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-atlantis_blue transition-all" style={{ width: `${stats.percent}%` }} />
      </div>
    </div>
  )
}
