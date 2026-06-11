"use client"
import Modal from "@/components/Modal";
import { addBodyWeight } from "@/app/api/auth/actions";
import {useFormState} from "react-dom"
import {useState, useEffect} from "react"

const initialState = {
    message: "",
    valid: false,
}
export default function AddBodyWeight (){
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [state, formAction] = useFormState(addBodyWeight, initialState)

  useEffect(() => {
    if(state.valid){
      setModalOpen(false)
    }
  }, [state])

  return (
    <div className="flex justify-center align-center">
      <button onClick={() => setModalOpen(true)} className="btn-primary"> Add Weight</button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form autoComplete="off" action={formAction} className="flex flex-col gap-3">
          <h3 className="font-bold text-lg">Add new Body Weight</h3>
          <div className="flex gap-3">
            <input autoComplete="false" id="weight" name="weight" type="number" step="0.01" min="0" aria-label="Body weight in kilograms"
            placeholder="Weight (kg)" className="input-field"></input>
            <button className="btn-primary" type="submit">
              Submit
            </button>
          </div>
          <p className="text-red-500 text-sm">{state?.message}</p>
        </form>
      </Modal>
    </div>
  );
};
