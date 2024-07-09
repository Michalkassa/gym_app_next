import DashboardNavbar from '@/components/DashboardNavbar'
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
    <div className='grid grid-cols-dashboard grid-rows-1 gap-3'>
      <div className='h-screen row-span-2 col-span-1'>
       <DashboardNavbar/>
      </div>
        {children}
    </div>
  )
}