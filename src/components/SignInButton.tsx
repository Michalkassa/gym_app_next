
import { signIn } from "../auth/auth"
 
export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("GoogleProvider",{redirectTo: '/dashboard'})
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 