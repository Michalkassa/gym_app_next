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
    <tr>
      <td className="text-gray-400">{date}</td>
      <td>{calories} kcal</td>
      <td>{protein} g</td>
      <td>{carbs} g</td>
      <td>{fat} g</td>
      <td className="text-right">
        <button aria-label="Delete entry" className="text-gray-500 transition hover:text-red-400" onClick={() => setModalOpenDelete(true)}>
          <FaTrashAlt size={16} />
        </button>
        <Modal modalOpen={openModalDelete} setModalOpen={setModalOpenDelete}>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Delete entry?</h3>
            <p className="text-gray-400">This can’t be undone.</p>
            <div className="flex gap-3">
              <button className="btn-primary bg-red-600 hover:brightness-110" onClick={handleDelete} type="button">Delete</button>
              <button className="btn-ghost" onClick={() => setModalOpenDelete(false)} type="button">Cancel</button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  )
}
