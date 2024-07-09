import { getWeights } from "../../app/api/actions"
import BodyWeight from "@/components/BodyWeights/BodyWeight"


export default async function BodyWeightList() {

  const data = await getWeights()
  return (
    <div className="max-h-full overflow-scroll overflow-x-hidden">
      <table className="items-center bg-transparent w-full border-collapse text-white ">
        <thead>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Date
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Weight
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          
                        </th>
          </tr>
        </thead>

        <tbody>
          {data.reverse().map((bodyWeight) => (
            <BodyWeight key={bodyWeight.id} id={bodyWeight.id} date={bodyWeight.createdAt.toLocaleDateString('es-MX')} weight={bodyWeight.weight}></BodyWeight>
          ))}
        </tbody>
      </table>
    </div>
  )
} 
