import { getNutritionSummary } from "@/app/api/auth/actions";
import SetGoalButton from "@/components/Nutrition/SetGoalButton";

function pct(consumed: number, goal: number): number {
  return goal > 0 ? Math.min(100, Math.round((consumed / goal) * 100)) : 0;
}

function MacroBar({ label, consumed, goal }: { label: string; consumed: number; goal: number }) {
  const remaining = Math.max(0, goal - consumed);
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-medium text-white">{Math.round(remaining)}g left</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-atlantis_blue transition-all" style={{ width: `${pct(consumed, goal)}%` }} />
      </div>
      <p className="mt-1 text-xs text-gray-500">{Math.round(consumed)} / {Math.round(goal)} g</p>
    </div>
  );
}

/** Today's remaining calories/macros against the user's daily goal. */
export default async function NutritionGoalCard() {
  const { goal, consumed } = await getNutritionSummary();

  if (!goal) {
    return (
      <div className="card flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Daily goal</h2>
          <p className="mt-1 text-gray-500">Set a daily calorie &amp; macro goal to track what’s remaining.</p>
        </div>
        <SetGoalButton goal={null} />
      </div>
    );
  }

  const remainingCals = goal.calories - consumed.calories;
  const showMacros = goal.protein > 0 || goal.carbs > 0 || goal.fat > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Today</h2>
        <SetGoalButton goal={goal} />
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className={`text-4xl font-semibold ${remainingCals < 0 ? "text-red-400" : "text-white"}`}>
          {Math.round(remainingCals)}
        </span>
        <span className="mb-1 text-gray-500">kcal {remainingCals < 0 ? "over" : "remaining"}</span>
      </div>
      <p className="mt-1 text-xs text-gray-500">{Math.round(consumed.calories)} of {goal.calories} kcal consumed</p>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-atlantis_blue transition-all" style={{ width: `${pct(consumed.calories, goal.calories)}%` }} />
      </div>

      {showMacros && (
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <MacroBar label="Protein" consumed={consumed.protein} goal={goal.protein} />
          <MacroBar label="Carbs" consumed={consumed.carbs} goal={goal.carbs} />
          <MacroBar label="Fat" consumed={consumed.fat} goal={goal.fat} />
        </div>
      )}
    </div>
  );
}
