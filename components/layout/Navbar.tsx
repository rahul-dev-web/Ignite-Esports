"use client";

import { Menu } from "lucide-react";
import NotificationBell from "@/components/NotificationBell";

interface NavbarProps {
  loggedIn: boolean;
  username?: string;
  avatar?: string;
  role?: string;
  onMenuClick: () => void;
  onLogout?: () => void;
}

export default function Navbar({
  loggedIn,
  username,
  avatar,
  role,
  onMenuClick,
  onLogout,
}: NavbarProps){

  return (

    <nav className="w-full flex items-center justify-between px-5 py-4 border-b border-white/10">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <button onClick={onMenuClick}>
          <Menu className="text-cyan-400 w-7 h-7" />
        </button>

        <h1 className="text-2xl font-bold bg-linear-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
          IGNITE ESPORTS
        </h1>

      </div>

      {/* RIGHT */}

      {!loggedIn ? (

        <a
          href="/login"
          className="px-6 py-2 rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-semibold"
        >
          LOGIN
        </a>

      ) : (

        <div className="flex items-center gap-4">

          <NotificationBell />

          {role === "admin" && (

  <a
    href="/admin"
    className="
      hidden
      md:flex
      items-center

      px-4
      py-2

      rounded-xl

      bg-purple-600/20
      border
      border-purple-500/30

      text-purple-300
      font-semibold

      hover:bg-purple-600/30
      transition
    "
  >
    Admin Panel
  </a>

)}

          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border border-cyan-400"
          />

          <div className="flex flex-col">

            <span className="text-sm font-semibold">
              {username}
            </span>

            <button
              onClick={onLogout}
              className="text-xs text-red-400"
            >
              Logout
            </button>

          </div>

        </div>
      )}

    </nav>
  );
}
