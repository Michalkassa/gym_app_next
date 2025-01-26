"use client"
import Modal from "@/components/Modal";
import { addExercise } from "@/app/api/auth/actions";
import {useState} from "react"

export default function AddExercise (){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
      <button onClick={() => setModalOpen(true)} className='w-auto bg-atlantis_blue rounded-md p-3 text-lg text-white'> Add Exercise</button>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={addExercise} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Add Exercise</h3>
          <div className="flex flex-col gap-3">
            <input autoComplete="false" id="name" name="name" type="text" placeholder="Type Name of the Exercise Here..." className="input input-bordered w-full text-black p-3"></input>
            <textarea id="description" name="description" placeholder="Description..." className="input input-bordered w-full h-36 text-black p-3"></textarea>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 p-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              onClick={() => {setModalOpen(false)}}
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
