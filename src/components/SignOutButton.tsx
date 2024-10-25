import { signOut } from "../app/api/auth/auth"
import SignOutIcon from "/exit.png"
import { IoIosLogOut } from "react-icons/io";
import { redirect } from "next/navigation";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
        redirect("/")
      }}
      className="w-full"
    >
      <button type="submit" className="w-full scale-100 hover:scale-105 duration-100">
              <div className="flex gap-3 align-middle items-center">
                <div className="flex w-full h-24">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><IoIosLogOut size={30}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>LogOut</div>
                </div>
              </div>                
      </button>
    </form>
  )
} 