"use client"
import Modal from "@/components/Modal";
import { addLogFromForm } from "@/app/api/auth/actions";
import {useState, useEffect} from "react"
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  valid: false,
}

export default function AddLog (props : {exerciseId: string}){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(addLogFromForm, initialState)

  useEffect(() => {
    if(state?.valid){
      setModalOpen(false)
    }
  }, [state])


  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
      <button onClick={() => setModalOpen(true)} className='w-auto bg-atlantis_blue rounded-md p-5'> Add new Log</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Add new Log</h3>
          <div className="flex flex-col gap-3">
            <input type="hidden" id="exerciseId" name="exerciseId" value={props.exerciseId}/>
            <input  autoComplete="false" id="weight" name="weight" type="number" step="0.01" placeholder="Weight... (kg)" className="input input-bordered w-full text-black p-3" min="0" ></input>
            <input autoComplete="false" id="reps" name="reps" type="number" placeholder="Repetitions... " className="input input-bordered w-full text-black p-3" min="0"></input>
            <p className="text-red-600">{state?.message}</p>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 p-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              type="submit"
            >
              Submit
            </button>

          </div>
        </form>
      </Modal>
    </div>
  );
};
