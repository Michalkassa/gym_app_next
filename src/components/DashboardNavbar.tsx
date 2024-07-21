import {auth} from "@/auth/auth"
import Link from "next/link"
import Image from "next/image"
import { SignOutButton } from "./SignOutButton"
import { BsSkipStartFill } from "react-icons/bs";
import { FaWeightScale } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export default async function DashboardNavbar(){
    const session = await auth()

    return(
        <div className="flex flex-col h-full bg-sleek_gray items-center text-white justify-between">
        <div>
        <div className="flex justify-center items-center gap-5 h-24">
        {session && <Image
        src={session?.user?.image || "/blankUserImage.webp"}
        width={65}
        height={65}
        alt="Picture of the author"
        className="rounded-2xl"
        />}
        <div>
        <p>{session && session?.user?.name}</p>
        <p className="text-xs">{session && session?.user?.email}</p>
        </div>
        </div>
        <ul className="w-full">
            <li className="scale-100 hover:scale-105 duration-100">
            <Link href="/dashboard">
                <div className="flex w-full h-24">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><FaHome size={25}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Dashboard</div>
                </div>
            </Link>
            </li>
            <li className="scale-100 hover:scale-105 duration-100">
            <Link href="/dashboard/workouts">
                <div className="flex w-full h-24   ">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><FaClipboardList size={25}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Workouts</div>
                </div>
            </Link>
            </li>
            <li className="scale-100 hover:scale-105 duration-100">
            <Link href="/dashboard/exercises">
                <div className="flex w-full h-24   ">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><IoBody size={25}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Exercises</div>
                </div>
            </Link>
            </li>
            <li className="scale-100 hover:scale-105 duration-100">
            <Link href="/dashboard/bodyweights">
                <div className="flex w-full h-24   ">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><FaWeightScale size={25}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Body Weight</div>
                </div>
            </Link>
            </li>
            <li className="scale-100 hover:scale-105 duration-100">
                <Link href="/#">
                <div className="flex w-full h-24   ">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><BsSkipStartFill size={30}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Start Workout</div>
                </div>
                </Link>
            </li>
        </ul>
        </div>
        <div className="w-full">
        <SignOutButton />
        </div>
        </div>
    )
}