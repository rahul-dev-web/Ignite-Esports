"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Trophy,
  BarChart3,
  MessageCircle,
  Users,
  LogOut,
} from "lucide-react";

type AdminUser = {
  username?: string;
  avatar?: string;
  role?: string;
};

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/admin/tournaments",
    label: "Tournaments",
    icon: Trophy,
  },
  {
    href: "/admin/leaderboard",
    label: "Leaderboards",
    icon: BarChart3,
  },
  {
    href: "/admin/announcements",
    label: "Announcements",
    icon: MessageCircle,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("ignite_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ignite_user");
    window.location.href = "/";
  };

  return (
    <aside className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:w-70 lg:border-r lg:border-white/10 lg:bg-[#09050f] lg:px-6 lg:py-8">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] text-purple-300/80">
              Admin Console
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">Ignite Admin</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#12101f] p-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-700/20 text-white">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username ?? "Admin avatar"}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <span className="text-lg font-black">A</span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {user.username ?? "Admin User"}
                </p>
                <p className="text-xs text-gray-400">{user.role ?? "Administrator"}</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-purple-500/10 text-purple-200"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} className="text-current" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition hover:bg-white/10"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
