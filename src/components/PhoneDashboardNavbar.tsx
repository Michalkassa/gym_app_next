import {auth} from "@/auth/auth"
import Link from "next/link"
import { BsSkipStartFill } from "react-icons/bs";
import { FaWeightScale } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export default async function PhoneDashboardNavbar(){
    const session = await auth()

    return(
            <ul className="flex justify-around items-start bg-sleek_gray min-w-full text-white min-h-28">
                <li className="">
                    <Link href="/dashboard">
                        <div className="flex flex-col w-full justify-center items-center h-20 gap-2">
                        <div className="flex justify-center items-center"><FaHome size={25}/></div>
                        <div className="flex items-center text-xs">Dashboard</div>
                        </div>
                    </Link>
                </li>
                <li className="">
                    <Link href="/dashboard/workouts">
                        <div className="flex flex-col w-full justify-center items-center h-20 gap-2">
                        <div className="flex justify-center items-center"><FaClipboardList size={25}/></div>
                        <div className="flex items-center text-xs">Workouts</div>
                        </div>
                    </Link>
                </li>
                <li className="">
                    <Link href="/dashboard/runningworkout">
                        <div className="flex flex-col w-full justify-center items-center h-20 gap-2">
                        <div className="flex justify-center items-center"><BsSkipStartFill size={30}/></div>
                        <div className="flex items-center text-xs">Start Workout</div>
                        </div>
                </Link>
                </li>
                <li className="scale-100 hover:scale-105 duration-100">
                    <Link href="/dashboard/exercises">
                        <div className="flex flex-col w-full justify-center items-center h-20 gap-2">
                        <div className="flex justify-center items-center"><IoBody size={25}/></div>
                        <div className="flex items-center text-sm" >Exercises</div>
                        </div>
                    </Link>
                </li>
                <li className="scale-100 hover:scale-105 duration-100">
                    <Link href="/dashboard/bodyweights">
                        <div className="flex flex-col w-full justify-center items-center h-20 gap-2">
                        <div className="flex justify-center items-center"><FaWeightScale size={25}/></div>
                        <div className="flex items-center text-xs">Body Weight</div>
                        </div>
                    </Link>
                </li>
            </ul>
    )
}