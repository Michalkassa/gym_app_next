import Link from "next/link"
import { SignInButton } from "./SignInButton"
import { SignOutButton } from "./SignOutButton";
import { auth } from "@/app/api/auth/auth";
import Image from "next/image"

export default async function Navbar() {
  const session = await auth()
  return (
        <div className="flex flex-row justify-between bg-sleek_gray h-10 p-10 md:pl-28 md:pr-28 rounded items-center text-white ">
            <Link className="flex md:text-3xl text-xl" href="/">TK Atlantis</Link>
            <ul className="flex flex-row gap-5 items-right items-center text-sm">
            {session && <Image
      src={session?.user?.image || "/blankUserImage.webp"}
      width={50}
      height={50}
      alt="Picture of the author"
      className="rounded-xl hidden sm:flex"
    />}
              {session && <p className="hidden sm:flex">{session?.user?.name}</p>}
                {!session && <li className=""><SignInButton/></li>}
                {session && <li className=""><SignOutButton/></li>}
                {session && <li><Link href="/dashboard" className="">Dashboard</Link></li>}
            </ul>
        </div>
  );
}
