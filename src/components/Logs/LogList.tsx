import { LogProps } from "@/Props"
import { getLogs } from "../../app/api/auth/actions"
import Log from "@/components/Logs/Log"


export default async function LogList(props: {exerciseId: string}) {

  const data = await getLogs(props.exerciseId)

  if (data.length === 0) {
    return <p className="text-gray-500">No logs yet — add your first set above.</p>
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Weight (kg)</th>
            <th>Reps</th>
            <th className="text-right">Remove</th>
          </tr>
        </thead>
        <tbody>
          {data.reverse().map((log:LogProps) => (
            <Log key={log.id} id={log.id} weight={log.weight} reps={log.reps} exerciseId={log.exerciseId}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}
