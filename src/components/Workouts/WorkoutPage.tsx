"use client"
import { deleteWorkout , editWorkout } from "@/app/api/auth/actions";
import { FaLongArrowAltLeft, FaPen, FaRegTrashAlt } from "react-icons/fa";
import Modal from "@/components/Modal"
import Link from "next/link"
import {useState} from "react"
import {useRouter} from "next/navigation"


interface WorkoutProps {
    id: string,
    name: string,
    description: string,
}


export default function WorkoutPage({ id , name , description } : WorkoutProps){
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
        await editWorkout(id,nameToEdit,descriptionToEdit)
        setModalNameOpenEdit(false)
        router.refresh()
    }
    async function handleDescriptionEdit() {
        await editWorkout(id,nameToEdit,descriptionToEdit)
        setModalDescriptionOpenEdit(false)
        router.refresh()
    }

    return(
        <div className="flex flex-col gap-4 text-white">
            {/* Top bar */}
            <div className="flex items-center justify-between">
                <Link className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white" href="/dashboard/workouts">
                    <FaLongArrowAltLeft /> Back
                </Link>
                <button className="btn-ghost text-red-400" onClick={()=>setModalOpenDelete(true)}>
                    <FaRegTrashAlt /> Delete
                </button>
            </div>

            {/* Title + description card */}
            <div className="card">
                <div className="flex items-start justify-between gap-3">
                    <h1 className="page-header">{name}</h1>
                    <button aria-label="Edit name" className="mt-2 text-gray-400 transition hover:text-white" onClick={()=>setModalNameOpenEdit(true)}>
                        <FaPen size={16} />
                    </button>
                </div>
                <div className="mt-2 flex items-start justify-between gap-3">
                    <p className="whitespace-pre-wrap break-words text-gray-400">{description}</p>
                    <button aria-label="Edit description" className="shrink-0 text-gray-400 transition hover:text-white" onClick={()=>setModalDescriptionOpenEdit(true)}>
                        <FaPen size={14} />
                    </button>
                </div>
            </div>

            {/* Delete confirm */}
            <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Delete workout “{name}”?</h3>
                    <p className="text-gray-400">This can’t be undone.</p>
                    <div className="flex gap-3">
                        <button className="btn-primary bg-red-600 hover:brightness-110" onClick={handleDelete} type="button">Delete</button>
                        <button className="btn-ghost" onClick={()=> setModalOpenDelete(false)} type="button">Cancel</button>
                    </div>
                </div>
            </Modal>

            {/* Edit name */}
            <Modal modalOpen={openModalNameEdit} setModalOpen={setModalNameOpenEdit}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Edit name</h3>
                    <form autoComplete="off" action={() => editWorkout(id,nameToEdit,descriptionToEdit)} onSubmit={handleNameEdit} className="flex flex-col gap-3">
                        <input maxLength={15} autoComplete="false" required value={nameToEdit} onChange={(e) => setNameToEdit(e.target.value)} id="name" name="name" type="text" placeholder="Workout name" className="input-field"></input>
                        <button className="btn-primary" type="submit">Save</button>
                    </form>
                </div>
            </Modal>

            {/* Edit description */}
            <Modal modalOpen={openModalDescriptionEdit} setModalOpen={setModalDescriptionOpenEdit}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Edit description</h3>
                    <form autoComplete="off" action={() => editWorkout(id,nameToEdit,descriptionToEdit)} onSubmit={handleDescriptionEdit} className="flex flex-col gap-3">
                        <textarea required value={descriptionToEdit} onChange={(e) => setDescriptionToEdit(e.target.value)} id="description" name="description" placeholder="Description" className="input-field h-64"></textarea>
                        <button className="btn-primary" type="submit">Save</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
