import Navbar from "@/components/Navbar"
import { SignInButton } from "@/components/SignInButton";
import { auth } from "@/app/api/auth/auth";
import { DashboardButton } from "@/components/DashboardButton";
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <div className="z-10">
        <Navbar/ >
      </div>
      <section className="bg-[url('/bg.jpg')] bg-no-repeat">
        <div className="flex justify-center items-center min-h-screen text-white">
            <div className="flex flex-col text-center z-10">
              <h1 className=" text-3xl md:text-6xl pb-4 opacity-100">Lift with Confidence.</h1>
              <p className="md:text-lg text-md pb-6">workout with a peace of mind that you are reaching your goals.</p>
              {!session && <SignInButton/>}
              {session && <DashboardButton/>}
            </div>
        </div>
      </section>
    </div>
  );
}