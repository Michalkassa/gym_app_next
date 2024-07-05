import {auth} from "@/auth/auth"
import Link from "next/link"
import Image from "next/image"

export default async function DashboardNavbar(){
    const session = await auth()
    return(
        <div className="flex flex-col h-full bg-sleek_gray justify-around items-center rounded-xl text-white">
        <div>
        {session && <Image
      src={session?.user?.image || ""}
      width={80}
      height={80}
      alt="Picture of the author"
    />}
        <p>{session && session?.user?.name}</p>
        </div>
        <ul>
            <li>
                <Link href="/#">Workouts</Link>
            </li>
            <li>
                <Link href="/#">Exercises</Link>
            </li>
            <li>
                <Link href="/dashboard/bodyweights">Body Weight</Link>
            </li>
        </ul>
        <button> Start workout </button>
        </div>
    )
}