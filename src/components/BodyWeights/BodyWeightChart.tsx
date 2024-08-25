import { getWeights } from '@/app/api/actions';
import {CategoryScale, TimeScale, LinearScale} from 'chart.js'; 
import { useState } from "react";
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
        label: "Weighs",
        data: weightData,
        borderColor:"rgb(75,192,192)"
      }
    ]
  }
}
 
export default async function BodyWeightChart() { 
  const chartData = await getData()
  return (
      <LineChart chartData={chartData} />
  );
}