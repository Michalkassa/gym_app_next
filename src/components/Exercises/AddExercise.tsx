"use client"
import Modal from "@/components/Modal";
import { addExercise, getExerciseCatalog } from "@/app/api/auth/actions";
import { useState, useEffect } from "react"
import { useFormState } from "react-dom";
import Select from "react-select";

const initialState = {
  message: "",
  valid: false,
}

type CatalogItem = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  instructions: string;
};

type Option = { value: string; label: string; item: CatalogItem };
type Group = { label: string; options: Option[] };

export default function AddExercise (){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(addExercise, initialState)

  const [groups, setGroups] = useState<Group[]>([]);
  // Controlled fields so picking a catalog exercise can prefill them.
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [equipment, setEquipment] = useState("");

  useEffect(() => {
    if (state?.valid) {
      setModalOpen(false);
      setName("");
      setDescription("");
      setMuscleGroup("");
      setEquipment("");
    }
  }, [state])

  // Load the global exercise catalog once and group it by muscle group.
  useEffect(() => {
    let active = true;
    getExerciseCatalog().then((catalog) => {
      if (!active) return;
      const byGroup = new Map<string, Option[]>();
      for (const item of catalog as CatalogItem[]) {
        const option: Option = { value: item.id, label: item.name, item };
        const existing = byGroup.get(item.muscleGroup) ?? [];
        existing.push(option);
        byGroup.set(item.muscleGroup, existing);
      }
      setGroups(
        Array.from(byGroup.entries()).map(([label, options]) => ({ label, options })),
      );
    });
    return () => {
      active = false;
    };
  }, [])

  const handlePick = (option: Option | null) => {
    if (!option) return;
    const { item } = option;
    // Exercise name column is short; keep within the 15-char limit.
    setName(item.name.slice(0, 15));
    setDescription(item.instructions);
    setMuscleGroup(item.muscleGroup);
    setEquipment(item.equipment);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
      <button onClick={() => setModalOpen(true)} className="btn-primary"> Add Exercise</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Add Exercise</h3>
          <div className="flex flex-col gap-3">
            <label htmlFor="catalog" className="text-sm text-gray-600">Pick from library (optional)</label>
            <Select<Option, false, Group>
              inputId="catalog"
              aria-label="Pick an exercise from the library"
              options={groups}
              onChange={handlePick}
              isClearable
              placeholder="Search the exercise library..."
              className="text-black"
            />
            <input autoComplete="false" id="name" name="name" type="text" aria-label="Exercise name" placeholder="Type Name of the Exercise Here..." value={name} onChange={(e) => setName(e.target.value)} className="input-field"></input>
            <textarea id="description" name="description" aria-label="Exercise description" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="input-field h-36"></textarea>
            {muscleGroup && (
              <p className="text-sm text-gray-400">{muscleGroup}{equipment ? ` · ${equipment}` : ""}</p>
            )}
            <input type="hidden" name="muscleGroup" value={muscleGroup} />
            <input type="hidden" name="equipment" value={equipment} />
            <p className="text-red-500 text-sm">{state?.message}</p>
            <button className="btn-primary" type="submit">
              Submit
            </button>

          </div>
        </form>
      </Modal>
    </div>
  );
};
