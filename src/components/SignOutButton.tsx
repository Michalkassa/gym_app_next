import { signOut } from "../app/api/auth/auth"
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
      <button type="submit" className="nav-item w-full text-left hover:text-white">
        <IoIosLogOut size={20} />
        <span>Log out</span>
      </button>
    </form>
  )
}   