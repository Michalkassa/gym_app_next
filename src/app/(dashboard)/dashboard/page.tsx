import BodyWeightChart from "@/components/BodyWeights/BodyWeightChart"
import MostPopularExercisesList from "@/components/Exercises/MostPopularExercisesList";
import TrainingSummary from "@/components/Analytics/TrainingSummary";
import { redirect } from "next/navigation"
import { auth } from "@/app/api/auth/auth";
import Link from "next/link"
import { BsSkipStartFill } from "react-icons/bs";
import { FaClipboardList, FaTrophy } from "react-icons/fa";
import { IoBody } from "react-icons/io5";

export default async function Dashboard() {
  const session = await auth();
  if (!session) return redirect("/")

  const quickLinks = [
    { href: "/dashboard/runningworkout", label: "Start Workout", icon: <BsSkipStartFill size={22} />, accent: true },
    { href: "/dashboard/workouts", label: "Workouts", icon: <FaClipboardList size={22} /> },
    { href: "/dashboard/exercises", label: "Exercises", icon: <IoBody size={22} /> },
    { href: "/dashboard/records", label: "Records", icon: <FaTrophy size={22} /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="page-header">Dashboard</h1>
        <p className="mt-1 text-gray-500">Your training at a glance.</p>
      </header>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-2xl border p-4 font-medium text-white transition hover:brightness-110 active:scale-[.98] ${
              link.accent
                ? "border-transparent bg-atlantis_blue"
                : "border-white/5 bg-sleek_gray hover:bg-white/[0.06]"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Link href="/dashboard/bodyweights" className="card transition hover:border-white/10">
          <h2 className="text-lg font-semibold text-white">Bodyweight Progress</h2>
          <div className="mt-4 h-56">
            <BodyWeightChart />
          </div>
        </Link>
        <div className="card">
          <h2 className="text-lg font-semibold text-white">Popular Exercises</h2>
          <div className="mt-4">
            <MostPopularExercisesList />
          </div>
        </div>
      </div>

      <TrainingSummary />
    </div>
  )
}
