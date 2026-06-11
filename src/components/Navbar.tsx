import Link from "next/link"
import { SignInButton } from "./SignInButton"
import { SignUpButton } from "./SignUpButton";
import { DashboardButton } from "./DashboardButton";
import { auth } from "@/app/api/auth/auth";

export default async function Navbar() {
  const session = await auth()
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-12">
      <Link className="text-xl font-semibold tracking-tight text-white md:text-2xl" href="/">LockedIn</Link>
      <nav className="flex items-center gap-3">
        {!session && <SignInButton/>}
        {!session && <SignUpButton/>}
        {session && <DashboardButton/>}
      </nav>
    </header>
  );
}
