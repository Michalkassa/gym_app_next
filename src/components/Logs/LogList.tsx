import { LogProps } from "@/Props"
import { getLogs } from "../../app/api/auth/actions"
import Log from "@/components/Logs/Log"


export default async function LogList(props: {exerciseId: string}) {

  const data = await getLogs(props.exerciseId)

  if (data.length === 0) {
    return <p className="text-gray-500">No logs yet — add your first set above.</p>
  }

  return (
    <div className="text-white">
      <div className="grid grid-cols-3 border-b border-white/10 pb-2 text-xs uppercase tracking-wide text-gray-500">
        <span>Weight (kg)</span>
        <span>Reps</span>
        <span className="text-right">Remove</span>
      </div>
      <div className="divide-y divide-white/5">
        {data.reverse().map((log:LogProps) => (
            <Log key={log.id} id={log.id} weight={log.weight} reps={log.reps} exerciseId={log.exerciseId}/>
        ))}
      </div>
    </div>
  )
}
