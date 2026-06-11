'use client'

import {useEffect, useState} from 'react'
import {createManyLogs, getPreviousLogs} from "@/app/api/auth/actions"
import {useRouter} from "next/navigation"


interface ExerciseWorkoutProps {
    id: string,
    name: string
    workoutId: string;
    exerciseId: string;
    submit: boolean; 
    setSubmit: (submit: boolean) => boolean | void;
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
    const [lastSets, setLastSets] = useState<any[]>([])
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

    useEffect(() => {
        async function fetchData() {
          try {
            const fetchdata = await getPreviousLogs(exerciseId, sets.length);
            setLastSets(fetchdata);
          } catch (error) {
            console.error("Error fetching data SERVER ACTION:", error);
          }
        }
        fetchData();
      }, [sets]);

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
        <div className="card flex flex-col gap-3">
            <p className="text-lg font-semibold text-white">{name}</p>
            <div className="table-wrap">
            <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Previous</th>
                            <th>kg</th>
                            <th>Reps</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {sets.map((i) => (
                    <tr key={sets.indexOf(i)}>
                        <td className='text-gray-400'>
                            {sets.indexOf(i) + 1}
                        </td>
                        {lastSets && <td className='text-gray-500' >
                        {lastSets[sets.indexOf(i)] && lastSets[sets.indexOf(i)].reps} x {lastSets[sets.indexOf(i)] && lastSets[sets.indexOf(i)].weight} kg
                        </td>}
                        <td>
                            <input autoComplete="false" id="weight" name="weight" type="number" aria-label="Weight in kilograms" value={i.weight} onChange={e => changeWeightValue(sets.indexOf(i),Number(e.target.value))} className="input-field max-w-20 px-2 py-1 text-center"/>
                        </td>
                        <td>
                            <input autoComplete="false" id="reps" name="reps" type="number" aria-label="Repetitions" placeholder="10" value={i.reps} onChange={e => changeRepsValue(sets.indexOf(i),Number(e.target.value))} className="input-field max-w-20 px-2 py-1 text-center"/>
                        </td>
                        <td>
                            <button aria-label="Delete set" className="text-gray-500 transition hover:text-red-400" onClick={() => deleteSet(sets.indexOf(i))}>Delete</button>
                        </td>
                    </tr>))}
                    </tbody>
            </table>
            </div>
            <button className="btn-ghost self-start" onClick={AddSet}>+ Add set</button>
        </div>
    )
}


