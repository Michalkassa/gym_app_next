'use client'
import { deleteBodyWeight } from "@/app/api/auth/actions";
import { useState } from "react"
import Modal from "@/components/Modal"
import {useRouter} from "next/navigation"
import { FaTrashAlt } from "react-icons/fa";


export default function BodyWeight({ id , date , weight} :
    {id: string,
    date: string,
    weight: number,}) {
    const router = useRouter()
    const [openModalDelete, setModalOpenDelete] = useState(false);

    async function handleDelete() {
        await deleteBodyWeight(id)
        setModalOpenDelete(false)
        router.refresh()
    }
    return(
        <tr>
            <td className="text-gray-400">{date}</td>
            <td>{weight}</td>
            <td className="text-right">
                <button aria-label="Delete bodyweight" className="text-gray-500 transition hover:text-red-400" onClick={()=>setModalOpenDelete(true)}> <FaTrashAlt size={16}/> </button>
                <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold">Delete entry?</h3>
                        <p className="text-gray-400">This can’t be undone.</p>
                        <div className="flex gap-3">
                            <button className="btn-primary bg-red-600 hover:brightness-110" onClick={handleDelete} type="button">Delete</button>
                            <button className="btn-ghost" onClick={()=> setModalOpenDelete(false)} type="button">Cancel</button>
                        </div>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}
