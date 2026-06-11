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
            <button onClick={() => setModalOpen(true)} className="btn-primary"> Add Exercise</button>
            </div>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold">No exercises available</h3>
                <p className="text-gray-400">Create some exercises first, then add them here.</p>
                <button className="btn-ghost" onClick={() => {setModalOpen(false)}} type="button">
                  Close
                </button>
                </div>
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
      <button onClick={() => setModalOpen(true)} className="btn-primary"> Add Exercise</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" className="flex flex-col gap-3" onSubmit={handleSumbit}>
          <label className="text-lg font-bold text-white">Add an exercise to this workout</label>
            <select required onChange={e => setExerciseId(e.target.value)} className="input-field">
            <option value='DEFAULT'>Choose an Exercise</option>
            {props.exercises.map((exercise: ExerciseProps) => (
            <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
            ))}
            </select>
            <p className="text-red-500 text-sm">{errorMessage}</p>
            <button className="btn-primary" type="submit">
              Submit
            </button>
        </form>
      </Modal>
    </div>
  );
};
