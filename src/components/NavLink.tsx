"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  /** Mobile bottom-bar styling (stacked icon over label) vs. sidebar row. */
  variant?: "sidebar" | "bottom";
}

export default function NavLink({ href, label, icon, variant = "sidebar" }: NavLinkProps) {
  const pathname = usePathname();
  // /dashboard should only be active on exact match; others match their subtree.
  const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  if (variant === "bottom") {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`flex shrink-0 flex-col items-center justify-center gap-1 px-4 py-2 text-[11px] transition ${
          active ? "text-white" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`nav-item ${active ? "nav-item-active" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
