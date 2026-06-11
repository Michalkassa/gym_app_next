"use client"
import Modal from "@/components/Modal";
import { setNutritionGoal } from "@/app/api/auth/actions";
import { caloriesFromMacros } from "@/lib/nutrition";
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

  // Editing an existing goal starts in manual mode to preserve its saved
  // calories; a brand-new goal defaults to auto-calculating from macros.
  const [auto, setAuto] = useState(!goal);
  const [protein, setProtein] = useState(goal?.protein?.toString() ?? "");
  const [carbs, setCarbs] = useState(goal?.carbs?.toString() ?? "");
  const [fat, setFat] = useState(goal?.fat?.toString() ?? "");
  const [calories, setCalories] = useState(goal?.calories?.toString() ?? "");

  useEffect(() => {
    if (state?.valid) setModalOpen(false)
  }, [state])

  const hasMacros = protein !== "" || carbs !== "" || fat !== "";
  const computed = caloriesFromMacros(Number(protein), Number(carbs), Number(fat));
  const caloriesValue = auto ? (hasMacros ? String(computed) : "") : calories;

  return (
    <>
      <button onClick={() => setModalOpen(true)} className={goal ? "btn-ghost" : "btn-primary"}>
        {goal ? "Edit goal" : "Set goal"}
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Daily goal</h3>

          <input value={protein} onChange={(e) => setProtein(e.target.value)} name="protein" type="number" step="0.1" min="0" aria-label="Protein goal" placeholder="Protein (g)" className="input-field" />
          <input value={carbs} onChange={(e) => setCarbs(e.target.value)} name="carbs" type="number" step="0.1" min="0" aria-label="Carbohydrate goal" placeholder="Carbs (g)" className="input-field" />
          <input value={fat} onChange={(e) => setFat(e.target.value)} name="fat" type="number" step="0.1" min="0" aria-label="Fat goal" placeholder="Fat (g)" className="input-field" />

          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} className="accent-atlantis_blue" />
            Calculate calories from macros (4 / 4 / 9 kcal·g)
          </label>

          <input
            value={caloriesValue}
            onChange={(e) => setCalories(e.target.value)}
            readOnly={auto}
            name="calories"
            type="number"
            min="0"
            aria-label="Calorie goal"
            placeholder="Calories (kcal)"
            className={`input-field ${auto ? "cursor-not-allowed text-gray-300" : ""}`}
          />

          <p className="text-red-500 text-sm">{state?.message}</p>
          <button className="btn-primary" type="submit">Save goal</button>
        </form>
      </Modal>
    </>
  );
}
