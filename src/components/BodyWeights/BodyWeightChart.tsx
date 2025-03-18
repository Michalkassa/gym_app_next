import { getWeights } from '@/app/api/auth/actions';
import LineChart from "@/components/LineChart";


async function getData(){
  const Data = await getWeights()

  const dateLables = []
  const weightData = []
  for (let x of Data) {
    dateLables.push(x.createdAt.toLocaleDateString('es-MX'))
    weightData.push(x.weight)
  }
  return {
    labels: dateLables,
    datasets: [
      {
        label: "Body Weight",
        data: weightData,
        borderColor:"rgb(75,192,192)"
      }
    ]
  }
}
 
export default async function BodyWeightChart() { 
  const chartData = await getData()
  console.log(chartData)
  if(chartData.labels.length > 0){
    return  <LineChart chartData={chartData} />
  }
  return <div className='text-white max-w-full h-5/6 flex justify-center items-center'>no bodyweights are logged</div>
}