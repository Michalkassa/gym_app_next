import { getLogs} from '@/app/api/actions';
import {CategoryScale, TimeScale, LinearScale} from 'chart.js'; 
import { useState } from "react";
import LineChart from "@/components/LineChart";

 
export default async function ExerciseChart(props) { 

    async function getData(){
        const data = await getLogs(props.exerciseId)
      
        const dateLables = []
        const oneRepMaxData = []
        for (let x of data) {
          dateLables.push(x.createdAt.toLocaleDateString('es-MX'))
          oneRepMaxData.push(x.oneRepMax)
        }
        return {
          labels: dateLables,
          datasets: [
            {
              label: "1RM progress",
              data: oneRepMaxData,
              borderColor:"rgb(75,192,192)"
            }
          ]
        }
    }

  const chartData = await getData()
  return (
      <LineChart chartData={chartData} />
  );
}