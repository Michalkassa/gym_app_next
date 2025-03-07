"use client"
import Modal from "@/components/Modal";
import { addExerciseToWorkout} from "@/app/api/auth/actions";
import {useState} from "react"
import { ExerciseProps } from "@/Props";


export default function AddExerciseToWorkout (props : {exercises: ExerciseProps[], workoutId:string}){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [exerciseId, setExerciseId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("")

    if(!props.exercises){
        return(
            <div className="w-full">
            <div className="w-full flex justify-center">
            <button onClick={() => setModalOpen(true)} className='w-auto bg-atlantis_blue rounded-md p-5'> Add new Exercise</button>
            </div>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <h1>No exercises available, go create some exercises</h1>
                    <button
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 p-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              onClick={() => {setModalOpen(false)}}
              type="submit"
            >
              close
            </button>
            </Modal>
            </div>
        )
    }

    async function handleSumbit(e: any){
        e.preventDefault()
        if(exerciseId == 'DEFAULT'){
          setErrorMessage("please choose an exercise to add")
          return
        }
        if (!exerciseId || exerciseId == ""){
          setErrorMessage("please choose an exercise to add")
          return
        }
        setErrorMessage("")
        setModalOpen(false)
        setExerciseId("")
        await addExerciseToWorkout(props.workoutId, exerciseId)
    }


  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
      <button onClick={() => setModalOpen(true)} className='w-auto bg-atlantis_blue rounded-md p-5'> Add new Exercise</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" className="flex flex-col gap-3 text-black" onSubmit={handleSumbit}>
          <label className="text-white text-lg">Add an exercise to this workout</label>
            <select required onChange={e => setExerciseId(e.target.value)}>
            <option value='DEFAULT'>Choose an Exercise</option>
            {props.exercises.map((exercise: ExerciseProps) => (
            <option className="text-black" key={exercise.id} value={exercise.id}>{exercise.name}</option>
            ))}
            </select>
            <p className="text-red-600">{errorMessage}</p>
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
};
