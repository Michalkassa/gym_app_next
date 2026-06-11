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
    <div className="flex flex-col gap-4">
        <button onClick={submitWorkout} className="btn-primary bg-green-600 hover:brightness-110"> Finish Workout </button>
          {props.pairs.map((pair: ExerciseWorkoutPairProps) => (
            <RunningExercise key={pair.exercise.id} id={pair.id} exerciseId={pair.exerciseId} workoutId={pair.workoutId} name={pair.exercise.name} submit={submit} setSubmit={setSubmit}/>
          ))}
    </div>
  )
} 