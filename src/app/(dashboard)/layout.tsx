import DashboardNavbar from '@/components/DashboardNavbar'
import PhoneDashboardNavbar from '@/components/PhoneDashboardNavbar';
import type { Metadata } from "next";
 
export const metadata: Metadata = {
    title: "Tk Atlantis Dashboard",
    description: "Keep track of your workouts",
  };
  
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-screen flex flex-col md:grid md:grid-cols-dashboard md:grid-rows-1 md:gap-3 md:min-h-screen'>
      <div className='w-screen md:h-screen md:min-h-full'>
      <div className="hidden md:inline md:fixed md:min-h-full ">
      <DashboardNavbar/>
      </div>
      <div className=" grid-rows-2 inline-flex min-w-full fixed bottom-0 justify-center md:hidden z-30">
      <PhoneDashboardNavbar/>
      </div>
      </div>
      <div className="">
      {children}
      </div>
    </div>
  )
}