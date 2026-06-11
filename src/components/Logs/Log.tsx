'use client'
import { FaTrashAlt } from "react-icons/fa";
import  Modal  from "@/components/Modal"
import {useState} from 'react'
import {deleteLog} from "@/app/api/auth/actions"
import {useRouter} from "next/navigation"

interface LogProps {
    id: string,
    weight: number ,
    reps: number,
    exerciseId: string,
}

// model Log {
//     id          String     @default(cuid()) @id
//     weight      Float
//     reps        Int
//     exerciseId  String 
//     createdAt   DateTime @default(now())
// }

export default function Log({ id , weight , reps, exerciseId} : LogProps) {
    const router = useRouter()
    const [openModalDelete , setModalOpenDelete] = useState(false)

    async function handleDelete() {
        await deleteLog(id, exerciseId)
        setModalOpenDelete(false)
        router.refresh()
    }

    return(
        <div key={id} className="grid grid-cols-3 items-center py-3 text-sm text-white">
            <p>{weight}</p>
            <p>{reps}</p>
            <div className="flex justify-end">
                <button aria-label="Delete log" className="text-gray-500 transition hover:text-red-400" onClick={()=>setModalOpenDelete(true)}> <FaTrashAlt size={16}/> </button>
            </div>
            <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Delete log?</h3>
                    <p className="text-gray-400">This can’t be undone.</p>
                    <div className="flex gap-3">
                    <button className="btn-primary bg-red-600 hover:brightness-110" onClick={handleDelete} type="button">Delete</button>
                    <button className="btn-ghost" onClick={()=> setModalOpenDelete(false)} type="button">Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}