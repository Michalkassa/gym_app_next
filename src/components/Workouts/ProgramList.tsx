import { getPublicTemplates } from "@/app/api/auth/actions"
import UseProgramButton from "@/components/Workouts/UseProgramButton"

export default async function ProgramList() {
  const templates = await getPublicTemplates()

  if (templates.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center flex-wrap gap-3">
        <p className="text-gray-400">No programs available yet. Run the database seed to add them.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-row justify-center flex-wrap gap-4 p-3">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex flex-col gap-3 bg-sleek_gray rounded-md p-6 text-white w-72"
        >
          <h2 className="text-2xl font-bold text-center">{template.name}</h2>
          <p className="text-sm text-gray-300 text-center">{template.description}</p>
          <ul className="text-sm text-gray-300 list-disc list-inside flex-1">
            {template.exercises.map((pair) => (
              <li key={pair.id}>{pair.exercise.name}</li>
            ))}
          </ul>
          <UseProgramButton templateId={template.id} />
        </div>
      ))}
    </div>
  )
}
