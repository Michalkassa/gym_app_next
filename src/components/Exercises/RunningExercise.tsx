'use client'
import { FaTrashAlt } from "react-icons/fa";
import  Modal  from "@/components/Modal"
import {useEffect, useState} from 'react'
import {deleteExerciseToWorkout} from "@/app/api/actions"
import {useRouter} from "next/navigation"
import {createLog} from "@/app/api/actions"

interface ExerciseWorkoutProps {
    id: string,
    name: string
    workoutId: string;
    submit: boolean; 
}

export default function RunningExercise({ id , name, workoutId, submit} : ExerciseWorkoutProps) {
    const router = useRouter()
    const [openModalDelete , setModalOpenDelete] = useState(false)
    const [setId, setSetId] = useState(3);
    const [sets, setSets] = useState(JSON.parse(localStorage.getItem("sets")))

    useEffect(() => {
        localStorage.setItem("sets", JSON.stringify(sets))
    }, [sets])
    
    useEffect(() => {
        for(const set of sets){
            createLog(id,set.reps,set.weight)
            console.log("submited")
        }
    }, [submit])

    async function handleDelete() {
        await deleteExerciseToWorkout(id, workoutId)
        setModalOpenDelete(false)
        router.refresh()
    }

    function AddSet(){
        setSets([...sets,{id:setId, weight:0,reps:0}])
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
            <table>
                <thead>
                    <tr>
                        <th>Set</th>
                        <th>kg</th>
                        <th>reps</th> 
                    </tr>
                </thead>
                <tbody>
                    {sets.map((i) => (
                    <tr key={sets.indexOf(i)}>
                        <td>
                        {sets.indexOf(i) + 1}
                        </td>
                        <td>
                        <input autoComplete="false" id="weight" name="weight" type="number" placeholder="" value={i.weight} onChange={e => changeWeightValue(sets.indexOf(i),Number(e.target.value))} className="input input-bordered w-full text-black p-3"></input>
                        </td>
                        <td>
                        <input autoComplete="false" id="reps" name="reps" type="number" placeholder="10" value={i.reps} onChange={e => changeRepsValue(sets.indexOf(i),Number(e.target.value))} className="input input-bordered w-full text-black p-3"></input>
                        </td>
                        <td>
                            <button onClick={() => deleteSet(sets.indexOf(i))}>delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={AddSet}>Add set</button>
        </div>
    )
}