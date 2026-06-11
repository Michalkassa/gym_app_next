"use client"
import Modal from "@/components/Modal";
import { addWorkout } from "@/app/api/auth/actions";
import {useState, useEffect} from "react"
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  valid: false,
}

export default function AddWorkout (){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(addWorkout, initialState)

  useEffect(() => {
    if(state?.valid){
      setModalOpen(false)
    }
  }, [state])
  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
      <button onClick={() => setModalOpen(true)} className="btn-primary"> Add Workout</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Add Workout</h3>
          <div className="flex flex-col gap-3">
            <input autoComplete="false" id="name" name="name" type="text" aria-label="Workout name" placeholder="Type Name of the Workout Here..." className="input-field"></input>
            <textarea id="description" name="description" aria-label="Workout description" placeholder="Description..." className="input-field h-36"></textarea>
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
