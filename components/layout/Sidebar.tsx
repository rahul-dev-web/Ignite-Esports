"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

import {
  Home,
  Trophy,
  BarChart3,
  Users,
  UserCircle,
  X,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {

  const pathname = usePathname();

  return (

    <AnimatePresence>

      {open && (

        <div className="fixed inset-0 z-50 flex">

          {/* SIDEBAR */}

          <motion.div

            initial={{ x: -280 }}

            animate={{ x: 0 }}

            exit={{ x: -280 }}

            transition={{
              duration: 0.25,
            }}

            className="
            w-[260px]
            min-h-screen

            bg-[#0d0718]

            border-r
            border-white/10

            p-6

            flex
            flex-col
            "
          >

            {/* HEADER */}

            <div className="flex items-center justify-between mb-10">

              <h2 className="text-3xl font-black text-purple-400">

                MENU

              </h2>

              <button
                onClick={onClose}
                className="
                p-2
                rounded-xl

                hover:bg-white/5
                transition
                "
              >
                <X className="w-6 h-6 text-white" />
              </button>

            </div>

            {/* NAVIGATION */}

            <div className="flex flex-col gap-3">

              <SidebarItem
                icon={<Home />}
                label="Home"
                route="/"
                pathname={pathname}
                onClick={onClose}
              />

              <SidebarItem
                icon={<Trophy />}
                label="Tournaments"
                route="/tournaments"
                pathname={pathname}
                onClick={onClose}
              />

              <SidebarItem
                icon={<BarChart3 />}
                label="Leaderboard"
                route="/leaderboard"
                pathname={pathname}
                onClick={onClose}
              />

              <SidebarItem
                icon={<Users />}
                label="Collaboration"
                route="/collaboration"
                pathname={pathname}
                onClick={onClose}
              />

              <SidebarItem
                icon={<UserCircle />}
                label="Profile"
                route="/profile"
                pathname={pathname}
                onClick={onClose}
              />

            </div>

            {/* USER SECTION */}

            <div className="mt-auto">

              <div
                className="
                border
                border-white/10

                bg-black/20

                rounded-2xl

                p-4
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                    w-12
                    h-12

                    rounded-full

                    bg-purple-500/20

                    flex
                    items-center
                    justify-center
                    "
                  >

                    <UserCircle
                      className="
                      w-8
                      h-8
                      text-purple-400
                      "
                    />

                  </div>

                  <div>

                    <p className="font-semibold">

                      Ignite User

                    </p>

                    <p className="text-sm text-gray-400">

                      Member

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

          {/* BACKDROP */}

          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            onClick={onClose}

            className="
            flex-1

            bg-black/60

            backdrop-blur-sm
            "
          />

        </div>

      )}

    </AnimatePresence>
  );
}

function SidebarItem({
  icon,
  label,
  route,
  pathname,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  route: string;
  pathname: string;
  onClick: () => void;
}) {

  const active = pathname === route;

  return (

    <Link
      href={route}
      onClick={onClick}
      className={`
      flex
      items-center
      gap-4

      px-4
      py-3

      rounded-2xl

      transition-all
      duration-200

      ${
        active

          ? "bg-purple-500/20 text-purple-400 border border-purple-500/20"

          : "text-gray-300 hover:bg-white/5 hover:text-cyan-400"
      }
      `}
    >

      {icon}

      <span className="font-medium">

        {label}

      </span>

    </Link>
  );
}