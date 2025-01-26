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
        <tr key={id} className="border-2 border-white">
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{date}</td>
            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{weight}</td>
            <td>
                <button className="flex items-center align-middle" onClick={()=>setModalOpenDelete(true)}> <FaTrashAlt color="red" size={20}/> </button>
            </td>
            <td>
            <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Deleting Bodyweight</h3>
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
            </td>
        </tr>
    )
}