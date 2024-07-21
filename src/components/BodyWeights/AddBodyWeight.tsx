"use client"
import Modal from "@/components/Modal";
import { addBodyWeight } from "@/app/api/actions";
import {useState} from "react"

export default function AddBodyWeight (){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className='btn btn-wide w-full bg-atlantis_blue rounded-3xl p-3 mb-5'> Add new BodyWeight</button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={addBodyWeight} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Add new Body Weight</h3>
          <div className="flex gap-3">
            <input autoComplete="false" id="weight" name="weight" type="number" step="0.01" min="0" placeholder="Type Here" className="input input-bordered w-full text-black p-3"></input>
            <button
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 p-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              onClick={() => {setModalOpen(false); }}
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
