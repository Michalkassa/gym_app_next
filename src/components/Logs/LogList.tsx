import { LogProps } from "@/Props"
import { getLogs } from "../../app/api/auth/actions"
import Log from "@/components/Logs/Log"


export default async function LogList(props: {exerciseId: string}) {

  const data = await getLogs(props.exerciseId)
  return (
    <div className="max-h-full overflow-scroll overflow-x-hidden justify-around">
      <div className="items-center bg-transparent w-full border-collapse text-white justify-around">
        <div>
          <div className="flex justify-around bg-blueGray-50">
            <div className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Weight (kg)
                        </div>
          <div className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Repetitions
                        </div>
          <div className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                           
          </div>
          </div>
        </div>

        <div>
        {data.reverse().map((log:LogProps) => (
            <Log key={log.id} id={log.id} weight={log.weight} reps={log.reps} exerciseId={log.exerciseId}/>
        ))}
        </div>
      </div>
    </div>
    
  )
} 

