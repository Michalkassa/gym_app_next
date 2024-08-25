"use client"
import Modal from "@/components/Modal";
import { addExerciseToWorkout , getExercises} from "@/app/api/actions";
import {useState} from "react"
import Select from "react-select";
import Exercise from "../Exercises/Exercise";

interface props {
    workoutId : string
    exercises : any
}



export default function AddExerciseToWorkout ({workoutId , exercises} : props){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [exerciseId, setExerciseId] = useState<string>("");

    if(!exercises){
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
    let options = []
    exercises.forEach((exercise) => {
        options.push({value : exercise.id , label  : exercise.name})
    });
     options = [];

    async function handleSumbit(e){
        e.preventDefault()
        console.log(exerciseId)
        console.log(workoutId)
        await addExerciseToWorkout(workoutId, exerciseId)
        setModalOpen(false)
    }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
      <button onClick={() => setModalOpen(true)} className='w-auto bg-atlantis_blue rounded-md p-5'> Add new Exercise</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" className="flex flex-col gap-3" onSubmit={handleSumbit}>
            <select onChange={e => setExerciseId(e.target.value)}>
            <option></option>
            {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
            ))}
            </select>
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
