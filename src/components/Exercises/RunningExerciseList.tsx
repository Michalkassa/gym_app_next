'use client'
import { getExercisesFromWorkouts } from "../../app/api/actions"
import  RunningExercise from "@/components/Exercises/RunningExercise"
import {useEffect, useState} from 'react'
interface ExerciseProps {
    id : string
    pairs: any[]
}


export default function RunningExerciseList( {id , pairs} : ExerciseProps) {
    const [submit, setSubmit] = useState(false)
  function submitWorkout(){
    setSubmit(true)
  }  

  return (
    <div className="flex flex-col justify-center items-left flex-wrap gap-3">
        <button onClick={submitWorkout}> Submit </button>
          {pairs.map((pair) => (
            <RunningExercise key={pair.exercise.id} id={pair.id} exerciseId={pair.exerciseId} workoutId={pair.workoutId} name={pair.exercise.name} submit={submit} setSubmit={setSubmit}/>
          ))}
    </div>
    
  )
} 