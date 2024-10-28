import Navbar from "@/components/Navbar"
import { SignInButton } from "@/components/SignInButton";
export default async function Home() {
  
  return (
    <div>
      <div className="z-10">
        <Navbar/ >
      </div>
      <section className="bg-[url('/bg.jpg')]">
        <div className="flex justify-center items-center min-h-screen text-white">
            <div className="flex flex-col text-center z-10">
              <h1 className=" text-3xl md:text-6xl pb-4 opacity-100">Lift with Confidence.</h1>
              <p className="md:text-lg text-md pb-6">workout with a peace of mind that you are reaching your goals.</p>
              <SignInButton/>
            </div>
        </div>
      </section>
    </div>
  );
}