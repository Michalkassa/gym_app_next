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
      <button onClick={() => setModalOpen(true)} className='w-auto bg-atlantis_blue rounded-md p-5'> Add Workout</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Add Workout</h3>
          <div className="flex flex-col gap-3">
            <input autoComplete="false" id="name" name="name" type="text" placeholder="Type Name of the Workout Here..." className="input input-bordered w-full text-black p-3"></input>
            <textarea id="description" name="description" placeholder="Description..." className="input input-bordered w-full h-36 text-black p-3"></textarea>
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
