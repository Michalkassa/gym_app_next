"use client"
import React from "react";
import { useState , useEffect } from "react";
import Chart from "chart.js/auto";
import {LinearScale, CategoryScale , TimeScale } from "chart.js"
import { Line } from "react-chartjs-2";

export default function LineChart({ chartData }:any ) {
    const [data, setData] = useState(chartData);
    Chart.register(LinearScale, CategoryScale, TimeScale);

    // I LOVE THIS HOOK
    useEffect(() => {
      setData(() => chartData);
    }, [chartData]); 

    Chart.register(LinearScale, CategoryScale, TimeScale);
  return (
    <div className="chart-container text-white">
      <Line
        data={data}
        style={{width: "100%", height: "80%"}}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              display: true,
            },
            y: {
              type: 'linear',
              beginAtZero: false,
              min: Math.min(...data.datasets[0].data) - 15,
              max: Math.max(...data.datasets[0].data) + 5,
            }},
          plugins: {
            title: {
              display: true,
              text: ""
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}