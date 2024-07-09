'use client'
import { deleteExercise } from "@/app/api/actions";
import { useState } from "react"
import Modal from "@/components/Modal"
import {useRouter} from "next/navigation"

interface BodyWeightProps {
    id: string,
    name: string,
    description: string,
}


export default function Exercise({ id , name , description} : BodyWeightProps) {
    const router = useRouter()
    const [openModalDelete, setModalOpenDelete] = useState(false);

    async function handleDelete() {
        await deleteExercise(id)
        setModalOpenDelete(false)
        router.refresh()
    }
    return(
        <div key={id} className="w-96 h-96 px-1 py-4 m-2">
            <div className="flex flex-col bg-sleek_gray p-10 rounded-xl justify-center  text-white">
                <h1 className="flex text-3xl justify-center">{name}</h1>
                <p className="flex justify-center">{description}</p>
                <button className='btn btn-sm btn-circle text-atlantis_blue' onClick={()=>setModalOpenDelete(true)}> Edit </button>
            </div>
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
        </div>
    )
}