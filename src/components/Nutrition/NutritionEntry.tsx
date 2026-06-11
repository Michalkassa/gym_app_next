'use client'
import { deleteNutritionEntry } from "@/app/api/auth/actions";
import { useState } from "react"
import Modal from "@/components/Modal"
import { useRouter } from "next/navigation"
import { FaTrashAlt } from "react-icons/fa";

export default function NutritionEntry({
  id,
  date,
  calories,
  protein,
  carbs,
  fat,
}: {
  id: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}) {
  const router = useRouter()
  const [openModalDelete, setModalOpenDelete] = useState(false);

  async function handleDelete() {
    await deleteNutritionEntry(id)
    setModalOpenDelete(false)
    router.refresh()
  }

  return (
    <div key={id} className="border-2 flex justify-around items-center text-xs">
      <p className="p-4">{date}</p>
      <p className="p-4">{calories} kcal</p>
      <p className="p-4">P {protein}g</p>
      <p className="p-4">C {carbs}g</p>
      <p className="p-4">F {fat}g</p>
      <button aria-label="Delete entry" onClick={() => setModalOpenDelete(true)}>
        <FaTrashAlt color="red" size={18} />
      </button>
      <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Deleting Entry</h3>
          <h2>Are you sure you want to delete it? There is no way to recover it after this point!</h2>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-red shadow-inner shadow-white/10" onClick={handleDelete} type="button">DELETE</button>
            <button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10" onClick={() => setModalOpenDelete(false)} type="button">CANCEL</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
