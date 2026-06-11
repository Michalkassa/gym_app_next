"use client"
import Modal from "@/components/Modal";
import { setNutritionGoal } from "@/app/api/auth/actions";
import { useFormState } from "react-dom"
import { useState, useEffect } from "react"

const initialState = {
  message: "",
  valid: false,
}

type Goal = { calories: number; protein: number; carbs: number; fat: number } | null;

export default function SetGoalButton({ goal }: { goal: Goal }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [state, formAction] = useFormState(setNutritionGoal, initialState)

  useEffect(() => {
    if (state?.valid) setModalOpen(false)
  }, [state])

  return (
    <>
      <button onClick={() => setModalOpen(true)} className={goal ? "btn-ghost" : "btn-primary"}>
        {goal ? "Edit goal" : "Set goal"}
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Daily goal</h3>
          <input name="calories" type="number" min="0" defaultValue={goal?.calories} aria-label="Calorie goal" placeholder="Calories (kcal)" className="input-field" />
          <input name="protein" type="number" step="0.1" min="0" defaultValue={goal?.protein} aria-label="Protein goal" placeholder="Protein (g)" className="input-field" />
          <input name="carbs" type="number" step="0.1" min="0" defaultValue={goal?.carbs} aria-label="Carbohydrate goal" placeholder="Carbs (g)" className="input-field" />
          <input name="fat" type="number" step="0.1" min="0" defaultValue={goal?.fat} aria-label="Fat goal" placeholder="Fat (g)" className="input-field" />
          <p className="text-red-500 text-sm">{state?.message}</p>
          <button className="btn-primary" type="submit">Save goal</button>
        </form>
      </Modal>
    </>
  );
}
