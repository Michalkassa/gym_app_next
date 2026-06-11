import NavLink from "./NavLink"
import { BsSkipStartFill } from "react-icons/bs";
import { FaWeightScale, FaDumbbell } from "react-icons/fa6";
import { IoBody } from "react-icons/io5";
import { FaClipboardList, FaHome, FaTrophy, FaAppleAlt } from "react-icons/fa";

const ICON = 20;

const navItems = [
  { href: "/dashboard", label: "Home", icon: <FaHome size={ICON} /> },
  { href: "/dashboard/runningworkout", label: "Start", icon: <BsSkipStartFill size={ICON} /> },
  { href: "/dashboard/workouts", label: "Workouts", icon: <FaClipboardList size={ICON} /> },
  { href: "/dashboard/programs", label: "Programs", icon: <FaDumbbell size={ICON} /> },
  { href: "/dashboard/exercises", label: "Exercises", icon: <IoBody size={ICON} /> },
  { href: "/dashboard/records", label: "Records", icon: <FaTrophy size={ICON} /> },
  { href: "/dashboard/nutrition", label: "Nutrition", icon: <FaAppleAlt size={ICON} /> },
  { href: "/dashboard/bodyweights", label: "Weight", icon: <FaWeightScale size={ICON} /> },
];

export default function PhoneDashboardNavbar() {
  return (
    <nav className="no-scrollbar flex w-screen items-stretch overflow-x-auto border-t border-white/10 bg-sleek_gray/95 backdrop-blur-md">
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} variant="bottom" />
      ))}
    </nav>
  )
}
