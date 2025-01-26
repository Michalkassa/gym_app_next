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
        <div key={id} className="">
            <p className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{weight}</p>
            <p className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{reps}</p>
            <div>
                <button className="flex items-center align-middle" onClick={()=>setModalOpenDelete(true)}> <FaTrashAlt color="red" size={20}/> </button>
            </div>
            <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Deleting Log</h3>
                    <h2>Are you sure you want to delete it? There is no way to recover it after this point!</h2>
                    <div className="flex gap-3">
                    <button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-red shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                        onClick={handleDelete}
                        type="submit"
                        
                    >
                    DELETE
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