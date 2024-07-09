import Link from "next/link"
import { SignInButton } from "./SignInButton"
import { SignOutButton } from "./SignOutButton";
import { auth } from "@/auth/auth";
import Image from "next/image"

export default async function Navbar() {
  const session = await auth()
  return (
        <div className="flex flex-row justify-between bg-sleek_gray pl-12 pr-12 h-24 rounded-3xl items-center text-white ">
            <Link className="flex" href="/">TK Atlantis</Link>
            <ul className="flex flex-row gap-5 items-center">
            {session && <Image
      src={session?.user?.image || "/blankUserImage.webp"}
      width={50}
      height={50}
      alt="Picture of the author"
      className="rounded-xl"
    />}
              {session && session?.user?.name}
              <li>
                {!session && <SignInButton/>}
              </li>
              <li>
                {session && <SignOutButton/>}
              </li>
              <li>
                {session && <Link href="/dashboard">Dashboard</Link>}
              </li>
            </ul>
        </div>
  );
}
