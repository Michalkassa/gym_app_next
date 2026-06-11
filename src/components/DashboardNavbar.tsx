import { auth } from "@/app/api/auth/auth"
import Image from "next/image"
import Link from "next/link"
import { SignOutButton } from "./SignOutButton"
import LevelBadge from "./LevelBadge"
import NavLink from "./NavLink"
import { BsSkipStartFill } from "react-icons/bs";
import { FaWeightScale, FaDumbbell } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";
import { FaClipboardList, FaHome, FaTrophy, FaAppleAlt } from "react-icons/fa";

const ICON = 20;

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <FaHome size={ICON} /> },
  { href: "/dashboard/runningworkout", label: "Start Workout", icon: <BsSkipStartFill size={ICON} /> },
  { href: "/dashboard/workouts", label: "Workouts", icon: <FaClipboardList size={ICON} /> },
  { href: "/dashboard/programs", label: "Programs", icon: <FaDumbbell size={ICON} /> },
  { href: "/dashboard/exercises", label: "Exercises", icon: <IoBody size={ICON} /> },
  { href: "/dashboard/records", label: "Records", icon: <FaTrophy size={ICON} /> },
  { href: "/dashboard/nutrition", label: "Nutrition", icon: <FaAppleAlt size={ICON} /> },
  { href: "/dashboard/bodyweights", label: "Body Weight", icon: <FaWeightScale size={ICON} /> },
];

export default async function DashboardNavbar() {
  const session = await auth();

  return (
    <div className="flex h-screen w-72 flex-col border-r border-white/5 bg-sleek_gray">
      {/* Brand */}
      <Link href="/dashboard" className="flex items-center gap-2 px-6 py-5">
        <Image src="/logo.png" alt="LockedIn logo" width={28} height={28} className="rounded" />
        <span className="text-lg font-semibold tracking-tight text-white">LockedIn</span>
      </Link>

      {/* Profile + level */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3">
          {session && (
            <Image
              src={session.user?.image || "/blankUserImage.webp"}
              width={40}
              height={40}
              alt="Your profile picture"
              className="rounded-full"
            />
          )}
          <p className="truncate text-xs text-gray-400">{session?.user?.email}</p>
        </div>
        <LevelBadge />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </nav>

      {/* Sign out */}
      <div className="border-t border-white/5 p-3">
        <SignOutButton />
      </div>
    </div>
  )
}
