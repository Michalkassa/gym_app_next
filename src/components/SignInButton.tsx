
import { signIn } from "../app/api/auth/auth"
 
export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("GoogleProvider",{redirectTo: '/dashboard'})
      }}
    >
      <button type="submit" className="text-white bg-atlantis_blue p-3 px-8 rounded-xl text-sm">Sign in</button>
    </form>
  )
} 