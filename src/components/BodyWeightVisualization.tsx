"use server";
import { getWeights } from '@/app/api/actions';
import BodyWeightChart from './BodyWeightChart';

export default async function BodyWeightVisualization(){
    const weightData = await getWeights()

  const weights = []
  const dates = []

  for (let x in weightData) {
    weights.push(weightData[x].weight)
    dates.push(weightData[x].createdAt.toLocaleDateString('es-MX'))
    }
    
    return (
        <div>
            <BodyWeightChart dates={dates} weights={weights} />
        </div>
    );
};
      