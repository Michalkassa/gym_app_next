'use client'
import  RunningExercise from "@/components/Exercises/RunningExercise"
import {ExerciseWorkoutPairProps} from "@/Props"
import {useState} from 'react'


export default function RunningExerciseList(props:{pairs: ExerciseWorkoutPairProps[]}) {
    const [submit, setSubmit] = useState(false)
  function submitWorkout(){
    setSubmit(true)
  }  

  return (
    <div className="flex flex-col justify-center items-left flex-wrap gap-3">
        <button onClick={submitWorkout}> Submit </button>
          {props.pairs.map((pair: ExerciseWorkoutPairProps) => (
            <RunningExercise key={pair.exercise.id} id={pair.id} exerciseId={pair.exerciseId} workoutId={pair.workoutId} name={pair.exercise.name} submit={submit} setSubmit={setSubmit}/>
          ))}
    </div>
    
  )
} 