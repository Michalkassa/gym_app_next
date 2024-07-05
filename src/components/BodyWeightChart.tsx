"use client"
import dynamic from 'next/dynamic';
import 'chart.js/auto';

export const Chart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: true,
});
const data = {
  labels: [],
  datasets: [
    {
      label: 'Body Weights Chart',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};
export default async function BodyWeightChart(props){

  data.labels = props.dates
  data.datasets[0].data = props.weights

  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>Example 1: Line Chart</h1>
      <Chart data={data} />
    </div>
  );
};

