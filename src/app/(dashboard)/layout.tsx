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
    <div className="min-h-screen md:grid md:grid-cols-dashboard">
      {/* Desktop sidebar — sticky full-height column */}
      <aside className="hidden md:block sticky top-0 h-screen">
        <DashboardNavbar />
      </aside>

      {/* Content */}
      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 md:px-8 md:pb-12">
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <div className="fixed inset-x-0 bottom-0 z-30 md:hidden">
        <PhoneDashboardNavbar />
      </div>
    </div>
  )
}