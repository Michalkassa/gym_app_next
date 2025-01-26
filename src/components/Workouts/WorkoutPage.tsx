"use client"
import { deleteWorkout , editWorkout } from "@/app/api/auth/actions";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/Modal"
import Link from "next/link" 
import {useState} from "react"
import {useRouter} from "next/navigation"


interface WorkoutProps {
    id: string,
    name: string,
    description: string,
}


export default function WorkoutPage({ id , name , description} : WorkoutProps){
    const router = useRouter()
    const [openModalDelete, setModalOpenDelete] = useState<boolean>(false);
    const [openModalNameEdit, setModalNameOpenEdit] = useState<boolean>(false);
    const [openModalDescriptionEdit, setModalDescriptionOpenEdit] = useState<boolean>(false);
    const [nameToEdit, setNameToEdit] = useState<string>(name)
    const [descriptionToEdit, setDescriptionToEdit] = useState<string>(description)

    async function handleDelete() {
        await deleteWorkout(id)
        setModalOpenDelete(false)
        router.push('/dashboard/workouts')
        router.refresh()
    }
    async function handleNameEdit() {
        setModalNameOpenEdit(false)
        router.refresh()
    }

    async function handleDescriptionEdit() {
        setModalDescriptionOpenEdit(false)
        router.refresh()
    }

    return(
        <div className="text-white">
        <div className="flex justify-between px-3">
        <Link className="text-3xl text-white flex gap-4 items-center" href="/dashboard/workouts">back</Link>
        <button className="flex text-3xl items-center align-middle text-red" onClick={()=>setModalOpenDelete(true)}> <MdDelete/></button>
        <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Deleting Workout {name}</h3>
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
        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center gap-3">
                <h1 className="text-3xl pb-3">{name}</h1>
                <button className="flex text-xl items-center align-middle text-atlantis_blue" onClick={()=>setModalNameOpenEdit(true)}> Edit </button>
                <Modal modalOpen={openModalNameEdit} setModalOpen={setModalNameOpenEdit}>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg">Editing Workout {name}</h3>
                        <form autoComplete="off" action={() => editWorkout(id,nameToEdit,descriptionToEdit)} onSubmit={handleNameEdit} className="flex gap-3">
                            <input autoComplete="false" required value={nameToEdit} onChange={(e) => setNameToEdit(e.target.value)} id="name" name="name" type="text" placeholder="Type Name of the workout Here..." className="input input-bordered w-full text-black p-3"></input>
                            <button
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-red shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                 type="submit"
                        
                            >
                            Submit
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div className="flex gap-3">
                <h2 className="max-w-80 text-justify">{description}</h2>
                <button className="flex text-xl items-center align-middle text-atlantis_blue" onClick={()=>setModalDescriptionOpenEdit(true)}> Edit </button>
                <Modal modalOpen={openModalDescriptionEdit} setModalOpen={setModalDescriptionOpenEdit}>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg">Editing Workout {name}</h3>
                        <form autoComplete="off" action={() => editWorkout(id,nameToEdit,descriptionToEdit)} onSubmit={handleDescriptionEdit} className="flex flex-col gap-3">
                            <textarea required value={descriptionToEdit} onChange={(e) => setDescriptionToEdit(e.target.value)} id="name" name="name" placeholder="Type the description of the Workout Here..." className="input input-bordered w-full text-black p-3 h-96"></textarea>
                            <button
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                 type="submit"
                        
                            >
                            Submit
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
        </div>
    )

}