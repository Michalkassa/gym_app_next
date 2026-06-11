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
      <button onClick={() => setModalOpen(true)} className="btn-primary"> Add Entry</button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Log Nutrition</h3>
          <input id="calories" name="calories" type="number" min="0" aria-label="Calories" placeholder="Calories (kcal)" className="input-field" />
          <input id="protein" name="protein" type="number" step="0.1" min="0" aria-label="Protein in grams" placeholder="Protein (g)" className="input-field" />
          <input id="carbs" name="carbs" type="number" step="0.1" min="0" aria-label="Carbohydrates in grams" placeholder="Carbs (g)" className="input-field" />
          <input id="fat" name="fat" type="number" step="0.1" min="0" aria-label="Fat in grams" placeholder="Fat (g)" className="input-field" />
          <p className="text-red-500 text-sm">{state?.message}</p>
          <button className="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
