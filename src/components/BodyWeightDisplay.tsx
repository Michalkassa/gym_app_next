import { useMutation } from "@tanstack/react-query"
import { getWeights } from "../app/api/actions"

export async function BodyWeightDisplay() {

  const data = await getWeights()
  return (
    <div className="bg-sleek_gray text-white rounded-xl p-10 w-full">
    <div className='flex'>
        <p className="p-10">Weight</p>
        <p className="p-10">Date</p>
    </div>
    <div>
    {data.map((post) =>
        <div key={post.id} className="flex">
        <p className="mr-32">{post.weight}</p>
        {post.createdAt.toLocaleDateString('es-MX')}
        </div>
    )}
    </div> 
    </div>
  )
} 
