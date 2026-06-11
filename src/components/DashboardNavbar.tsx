import {auth} from "@/app/api/auth/auth"
import Link from "next/link"
import Image from "next/image"
import { SignOutButton } from "./SignOutButton"
import LevelBadge from "./LevelBadge"
import { BsSkipStartFill } from "react-icons/bs";
import { FaWeightScale } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";
import { FaAppleAlt } from "react-icons/fa";
import { IoBody } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

export default async function DashboardNavbar(){
    const session = await auth()

    return(
        <div className="flex flex-col bg-sleek_gray items-center text-white justify-between min-h-screen min-w-72">
        <div>
        <div className="flex justify-center items-center gap-5 h-24">
        {session && <Image
        src={session?.user?.image || "/blankUserImage.webp"}
        width={65}
        height={65}
        alt="Your profile picture"
        className="rounded-2xl"
        />}
        <div>
        <p className="text-xs">{session && session?.user?.email}</p>
        </div>
        </div>
        <LevelBadge />
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
            <Link href="/dashboard/programs">
                <div className="flex w-full h-24   ">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><FaDumbbell size={25}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Programs</div>
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
            <Link href="/dashboard/records">
                <div className="flex w-full h-24   ">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><FaTrophy size={25}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Records</div>
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
            <Link href="/dashboard/nutrition">
                <div className="flex w-full h-24   ">
                <div className="flex justify-center items-center" style={{flex:'40%'}} ><FaAppleAlt size={25}/></div>
                <div className="flex items-center" style={{flex:'60%'}}>Nutrition</div>
                </div>
            </Link>
            </li>
            <li className="scale-100 hover:scale-105 duration-100">
                <Link href="/dashboard/runningworkout">
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