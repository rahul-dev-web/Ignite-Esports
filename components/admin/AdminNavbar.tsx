"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

const titles: Record<string, string> = {
  "/admin": "Admin Dashboard",
  "/admin/tournaments": "Tournament Management",
  "/admin/leaderboard": "Leaderboard Management",
  "/admin/announcements": "Announcements",
  "/admin/users": "User Management",
};

export default function AdminNavbar() {
  const pathname = usePathname();
  const title = titles[pathname] || "Admin Dashboard";

  return (
    <header className="border-b border-white/10 bg-[#08040d] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-purple-300/80">
            Ignite Admin Panel
          </p>
          <h1 className="text-3xl font-black text-white">{title}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <ArrowRight size={16} />
            View Live Site
          </Link>
        </div>
      </div>
    </header>
  );
}
