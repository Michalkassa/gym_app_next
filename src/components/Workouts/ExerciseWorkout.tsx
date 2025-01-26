'use client'
import { FaTrashAlt } from "react-icons/fa";
import  Modal  from "@/components/Modal"
import {useState} from 'react'
import {deleteExerciseToWorkout} from "@/app/api/auth/actions"
import {useRouter} from "next/navigation"

interface ExerciseWorkoutProps {
    id: string,
    name: string
    workoutId: string;
}

export default function ExerciseWorkout({ id , name, workoutId} : ExerciseWorkoutProps) {
    const router = useRouter()
    const [openModalDelete , setModalOpenDelete] = useState(false)

    async function handleDelete() {
        await deleteExerciseToWorkout(id, workoutId)
        setModalOpenDelete(false)
        router.refresh()
    }

    return(
        <div className="flex">
            <p className="border-t-0 px-6 align-center border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">{name}</p>
            <div className="flex flex-col justify-center">
                <button className="flex items-center align-middle" onClick={()=>setModalOpenDelete(true)}> <FaTrashAlt color="red" size={20}/> </button>
            </div>
            <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Removing Exercise from Workout</h3>
                    <h2>Are you sure you want to delete it? There is no way to recover it after this point!</h2>
                    <div className="flex gap-3">
                    <button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-red shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={handleDelete}
                        type="submit"
                        
                    >
                    Remove
                    </button>
                    <button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={()=> setModalOpenDelete(false)}
                        type="submit"
                        
                    >
                    CANCEL
                    </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}