"use client"
import Modal from "@/components/Modal";
import { addNutritionEntry } from "@/app/api/auth/actions";
import { caloriesFromMacros } from "@/lib/nutrition";
import { useFormState } from "react-dom"
import { useState, useEffect } from "react"

const initialState = {
  message: "",
  valid: false,
}

export default function AddNutrition() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(addNutritionEntry, initialState)

  // Controlled so calories can be auto-derived from the macros.
  const [auto, setAuto] = useState(true);
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [calories, setCalories] = useState("");

  useEffect(() => {
    if (state?.valid) {
      setModalOpen(false);
      setProtein(""); setCarbs(""); setFat(""); setCalories("");
    }
  }, [state])

  const hasMacros = protein !== "" || carbs !== "" || fat !== "";
  const computed = caloriesFromMacros(Number(protein), Number(carbs), Number(fat));
  // In auto mode the calories field mirrors the macro-derived value (and is
  // still submitted because the input is readOnly, not disabled).
  const caloriesValue = auto ? (hasMacros ? String(computed) : "") : calories;

  return (
    <div className="flex justify-center align-center">
      <button onClick={() => setModalOpen(true)} className="btn-primary"> Add Entry</button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Log Nutrition</h3>

          <input value={protein} onChange={(e) => setProtein(e.target.value)} name="protein" type="number" step="0.1" min="0" aria-label="Protein in grams" placeholder="Protein (g)" className="input-field" />
          <input value={carbs} onChange={(e) => setCarbs(e.target.value)} name="carbs" type="number" step="0.1" min="0" aria-label="Carbohydrates in grams" placeholder="Carbs (g)" className="input-field" />
          <input value={fat} onChange={(e) => setFat(e.target.value)} name="fat" type="number" step="0.1" min="0" aria-label="Fat in grams" placeholder="Fat (g)" className="input-field" />

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
            aria-label="Calories"
            placeholder="Calories (kcal)"
            className={`input-field ${auto ? "cursor-not-allowed text-gray-300" : ""}`}
          />

          <p className="text-red-500 text-sm">{state?.message}</p>
          <button className="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
