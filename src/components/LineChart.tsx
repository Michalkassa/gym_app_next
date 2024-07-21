"use client"
import React from "react";
import { useState , useEffect } from "react";
import Chart from "chart.js/auto";
import {LinearScale, CategoryScale , TimeScale } from "chart.js"
import { Line } from "react-chartjs-2";

export default function LineChart({ chartData }) {
    const [data, setData] = useState(chartData);
    Chart.register(LinearScale, CategoryScale, TimeScale);

    // I LOVE THIS HOOK
    useEffect(() => {
      setData(() => chartData);
    }, [chartData]); 

    Chart.register(LinearScale, CategoryScale, TimeScale);
  return (
    <div className="chart-container text-white h-full w-full">
      <Line
        data={data}
        width="auto"
        height="auto"
        options={{
          scales: {
            x: {
              type: 'category',
              display: true,
            },
            y: {
              type: 'linear',
              beginAtZero: true
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