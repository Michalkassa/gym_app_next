import Navbar from "@/components/Navbar"
import { SignInButton } from "@/components/SignInButton";
import { SignUpButton } from "@/components/SignUpButton";
import { DashboardButton } from "@/components/DashboardButton";
import { auth } from "@/app/api/auth/auth";
import { FaDumbbell, FaChartLine, FaAppleAlt } from "react-icons/fa";

const features = [
  { icon: <FaDumbbell size={20} />, title: "Track every set", text: "Log workouts and watch your estimated 1RM climb over time." },
  { icon: <FaChartLine size={20} />, title: "See your progress", text: "Volume trends, personal records and a year-long activity heatmap." },
  { icon: <FaAppleAlt size={20} />, title: "Stay accountable", text: "Daily nutrition goals, programs and streak-building XP." },
];

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Background image + dark gradient overlay */}
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark_gray/70 via-dark_gray/85 to-dark_gray" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <span className="chip mb-6">Your training, locked in</span>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Lift with confidence.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-300 md:text-lg">
            Log your workouts, track your strength, and stay on top of your goals — all in one clean, focused app.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            {!session && <SignUpButton />}
            {!session && <SignInButton />}
            {session && <DashboardButton />}
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid gap-4 text-left sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-atlantis_blue text-white">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
