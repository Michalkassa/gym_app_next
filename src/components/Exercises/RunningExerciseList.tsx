'use client'
import  RunningExercise from "@/components/Exercises/RunningExercise"
import {ExerciseWorkoutPairProps} from "@/Props"
import {useState} from 'react'
import RunningWorkoutTimer from "../Workouts/RunningWorkoutTimer"


export default function RunningExerciseList(props:{pairs: any[]}) {
    const [submit, setSubmit] = useState(false)
  function submitWorkout(){
    setSubmit(true)
  }  
//<RunningWorkoutTimer submit={submit}/>
  return (
    <div className="flex flex-col justify-center items-left flex-wrap gap-3">
        <button onClick={submitWorkout} className="p-2 border-2 border-white rounded-lg bg-green-700"> Finish Workout </button>
          {props.pairs.map((pair: ExerciseWorkoutPairProps) => (
            <RunningExercise key={pair.exercise.id} id={pair.id} exerciseId={pair.exerciseId} workoutId={pair.workoutId} name={pair.exercise.name} submit={submit} setSubmit={setSubmit}/>
          ))}
    </div>
    
  )
} 