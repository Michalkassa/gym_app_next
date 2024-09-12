import { getLogs } from "../../app/api/actions"
import Log from "@/components/Logs/Log"


export default async function LogList(exerciseId: string) {

  const data = await getLogs(exerciseId)
  return (
    <div className="max-h-full overflow-scroll overflow-x-hidden">
      <table className="items-center bg-transparent w-full border-collapse text-white ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Weight (kg)
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Reps
                        </th>
          </tr>
        </thead>

        <tbody>
        {data.reverse().map((log) => (
          <div>
            <Log key={log.id} id={log.id} weight={log.weight} reps={log.reps} exerciseId={log.exerciseId}/>
          </div>
        ))}
        </tbody>
      </table>
    </div>
    
  )
} 

