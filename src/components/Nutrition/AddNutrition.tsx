"use client"
import Modal from "@/components/Modal";
import { addNutritionEntry } from "@/app/api/auth/actions";
import { useFormState } from "react-dom"
import { useState, useEffect } from "react"

const initialState = {
  message: "",
  valid: false,
}

export default function AddNutrition() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(addNutritionEntry, initialState)

  useEffect(() => {
    if (state?.valid) setModalOpen(false)
  }, [state])

  return (
    <div className="flex justify-center align-center">
      <button onClick={() => setModalOpen(true)} className="w-auto bg-atlantis_blue rounded-md p-3 text-lg text-white"> Add Entry</button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Log Nutrition</h3>
          <input id="calories" name="calories" type="number" min="0" aria-label="Calories" placeholder="Calories (kcal)" className="input input-bordered w-full text-black p-3" />
          <input id="protein" name="protein" type="number" step="0.1" min="0" aria-label="Protein in grams" placeholder="Protein (g)" className="input input-bordered w-full text-black p-3" />
          <input id="carbs" name="carbs" type="number" step="0.1" min="0" aria-label="Carbohydrates in grams" placeholder="Carbs (g)" className="input input-bordered w-full text-black p-3" />
          <input id="fat" name="fat" type="number" step="0.1" min="0" aria-label="Fat in grams" placeholder="Fat (g)" className="input input-bordered w-full text-black p-3" />
          <p className="text-red-600">{state?.message}</p>
          <button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 p-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
