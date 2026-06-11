"use Client"

import {Dialog, DialogPanel, DialogBackdrop} from '@headlessui/react'
import { IoIosClose } from "react-icons/io";

interface ModalProps{
    modalOpen:boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children : React.ReactNode;
}
export default function Modal({ modalOpen, setModalOpen , children} : ModalProps){

return(
    <Dialog open={modalOpen} as="div" className="relative z-10 focus:outline-none text-white" onClose={setModalOpen}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/65" />
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4">
      <div className="flex min-h-full items-center justify-center">
        <DialogPanel
          transition
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-sleek_gray p-6 shadow-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
        >
        <button aria-label="Close" className="absolute right-3 top-3 rounded-full p-1 text-gray-400 transition hover:bg-white/10 hover:text-white" onClick={() => setModalOpen(false)} ><IoIosClose size={26} /></button>
        {children}
        </DialogPanel>
      </div>
    </div>
  </Dialog>
)

}

/* <div className="mt-4">
            <button
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              onClick={() => setModalOpen(false)}
            >
              Add New weight
            </button>
          </div> */