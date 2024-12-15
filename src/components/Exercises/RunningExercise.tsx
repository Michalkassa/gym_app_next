'use client'

import {useEffect, useState} from 'react'
import {createManyLogs, getPreviousLogs} from "@/app/api/actions"
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
            console.log(sets.length)
            const fetchdata = await getPreviousLogs(exerciseId, sets.length);
            console.log(fetchdata)
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
        <div className="flex flex-col">
            <p className="border-t-0 px-6 align-center border-l-0 border-r-0 text-lg whitespace-nowrap p-4">{name}</p>
            <table className='text-centre min-w-full border-collapse'>
                    <thead>
                        <tr className="">
                            <th className='p-4 border-2 border-black'>Set</th>
                            <th className='p-4 border-2 border-black'>previous</th>
                            <th className='p-4 border-2 border-black'>kg</th>
                            <th className='p-4 border-2 border-black'>reps</th> 
                            <th className='p-4 border-2 border-black'></th> 
                        </tr>
                    </thead>
                    <tbody>
                    {sets.map((i) => (
                    <tr key={sets.indexOf(i)} className="">
                        <td className='p-4 border-2 border-black text-center'>
                            {sets.indexOf(i) + 1}
                        </td>
                        {lastSets && <td className='p-4 border-2 border-black' >
                        {lastSets[sets.indexOf(i)] && lastSets[sets.indexOf(i)].reps} x {lastSets[sets.indexOf(i)] && lastSets[sets.indexOf(i)].weight} kg
                        </td>}
                        <td className='p-4 border-2 border-black' >
                            <input autoComplete="false" id="weight" name="weight" type="number" placeholder="" value={i.weight} onChange={e => changeWeightValue(sets.indexOf(i),Number(e.target.value))} className="input input-bordered text-black max-w-12 rounded-lg text-center"/>
                        </td>
                        <td className='p-4 border-2 border-black' >
                            <input autoComplete="false" id="reps" name="reps" type="number" placeholder="10" value={i.reps} onChange={e => changeRepsValue(sets.indexOf(i),Number(e.target.value))} className="input input-bordered text-black max-w-12 rounded-lg text-center"/>
                        </td>
                        <td className='p-4 border-2 border-black text-red'>
                            <button onClick={() => deleteSet(sets.indexOf(i))}>delete</button>
                        </td>
                    </tr>))}
                    </tbody>
            </table>
            <button onClick={AddSet}>Add set</button>
        </div>
    )
}


