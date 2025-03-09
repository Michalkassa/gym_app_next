import { getWeights } from "../../app/api/auth/actions"
import { BodyWeightProps } from "@/Props"

export default async function BodyWeightStats() {

  const data = await getWeights()

  function DataToWeights(data: BodyWeightProps[]): number[]{
    const weights = []
    for (const element of data) {
       weights.push(element.weight)
    }
    return weights
  }

  function AverageBodyWeight(data: number[]): number{
    let sum = 0
    for(const weight of data){
        sum += weight
    }
    return sum / (data.length)
  }

  function LowestWeight(weights: number[]){
    let lowest = 100000000000
    for(const weight of weights){
      if (weight < lowest){
        lowest = weight
      }
    }

    return lowest
  }

  function HighestWeight(weights: number[]){
    let highest = 0
    for(const weight of weights){
      if (weight > highest){
        highest = weight
      }
    }

    return highest
  }

  if(data.length > 0){
    return (
      <div className="flex justify-between md:gap-12 gap-5 text-white">
          <div>
              <p className="text-xs">Highest</p>
              <p className="text-3xl">{HighestWeight(DataToWeights(data))}</p>
          </div>
          <div>
              <p className="text-xs">Lowest</p>
              <p className="text-3xl">{LowestWeight(DataToWeights(data))}</p>
          </div>
          <div>
              <p className="text-xs">Average</p>
              <p className="text-3xl">{parseFloat(AverageBodyWeight(DataToWeights(data)).toFixed(1))}</p>
          </div>
  
      </div>
    )
  }
  return(
    <div className="flex justify-between md:gap-12 gap-5 text-white">
          <div>
              <p className="text-xs">Highest</p>
              <p className="text-3xl">0</p>
          </div>
          <div>
              <p className="text-xs">Lowest</p>
              <p className="text-3xl">0</p>
          </div>
          <div>
              <p className="text-xs">Average</p>
              <p className="text-3xl">0</p>
          </div>
  
      </div>
  )
  
} 



