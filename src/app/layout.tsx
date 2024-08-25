import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Tkatlantis Gymapp",
  description: "Keep track of your workouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div className={inter.className}>
        {children}
      </div>
      </body>
    </html>
  );
}
