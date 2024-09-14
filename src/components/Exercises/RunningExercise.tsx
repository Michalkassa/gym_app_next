'use client'

import {useEffect, useState} from 'react'
import {createManyLogs} from "@/app/api/actions"
import {useRouter} from "next/navigation"

interface ExerciseWorkoutProps {
    id: string,
    name: string
    workoutId: string;
    exerciseId: string;
    submit: boolean; 
    setSubmit: void
}

export default function RunningExercise({ id , name, workoutId, exerciseId, submit, setSubmit} : ExerciseWorkoutProps) {
    const router = useRouter()
    let setsFromLocalStorage = [{weight:0,reps:0}];
    try{
        setsFromLocalStorage = JSON.parse(localStorage.getItem('sets') || '[{weight:0,reps:0}]')
    }
    catch{
        setsFromLocalStorage = [{weight:0,reps:0}]
    }
    const [setId, setSetId] = useState(3);
    const [sets, setSets] = useState(setsFromLocalStorage);
    useEffect(() => {
        localStorage.setItem('sets', JSON.stringify(sets))
    }, [sets]);

    useEffect(() => {
        if (submit){
            createManyLogs(exerciseId,sets)

            setSets([{weight:0,reps:0}])
            router.push("/dashboard/runningworkout/")
        }
    }, [submit])


    function AddSet(){
        setSets([...sets,{weight:0,reps:0}])
        setSetId(setId+1)
    }
    
    function changeRepsValue(id:number, value:number){
        let items = [...sets]
        let item = {...sets[id]}
        item.reps = value
        items[id] = item
        setSets(items)
    }

    function changeWeightValue(id:number, value:number){
        let items = [...sets]
        let item = {...sets[id]}
        item.weight = value
        items[id] = item
        setSets(items)
    }

    function deleteSet(id:number){
        let items = [...sets] 
        items.splice(id,1)
        setSets(items)
    }


    return(
        <div className="flex flex-col">
            <p className="border-t-0 px-6 align-center border-l-0 border-r-0 text-lg whitespace-nowrap p-4">{name}</p>
            <div>
                    <div className="flex flex-row gap-3 ">
                        <p>Set</p>
                        <p>kg</p>
                        <p>reps</p> 
                    </div>
                    {sets.map((i) => (
                    <div key={sets.indexOf(i)} className="flex flex-row gap-3">
                        {sets.indexOf(i) + 1}
                        <input autoComplete="false" id="weight" name="weight" type="number" placeholder="" value={i.weight} onChange={e => changeWeightValue(sets.indexOf(i),Number(e.target.value))} className="input input-bordered w-full text-black p-3"/>
                        <input autoComplete="false" id="reps" name="reps" type="number" placeholder="10" value={i.reps} onChange={e => changeRepsValue(sets.indexOf(i),Number(e.target.value))} className="input input-bordered w-full text-black p-3"/>
                        <button onClick={() => deleteSet(sets.indexOf(i))}>delete</button>
                    </div>
                    ))}

            </div>
            <button onClick={AddSet}>Add set</button>
        </div>
    )
}