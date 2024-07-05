import { signOut } from "../auth/auth"
 
export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">SignOut</button>
    </form>
  )
} 