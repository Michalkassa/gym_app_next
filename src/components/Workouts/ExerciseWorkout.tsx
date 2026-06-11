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
        <div className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
            <p className="text-base text-white">{name}</p>
            <button aria-label="Remove exercise" className="text-gray-500 transition hover:text-red-400" onClick={()=>setModalOpenDelete(true)}> <FaTrashAlt size={16}/> </button>
            <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Remove exercise from workout?</h3>
                    <p className="text-gray-400">You can add it back anytime.</p>
                    <div className="flex gap-3">
                    <button className="btn-primary bg-red-600 hover:brightness-110" onClick={handleDelete} type="button">Remove</button>
                    <button className="btn-ghost" onClick={()=> setModalOpenDelete(false)} type="button">Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}