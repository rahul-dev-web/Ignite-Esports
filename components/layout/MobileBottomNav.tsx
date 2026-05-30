"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Trophy,
  BarChart3,
  User,
} from "lucide-react";

export default function MobileBottomNav() {

  const pathname = usePathname();

  const links = [

    {
      name: "Home",
      href: "/",
      icon: Home,
    },

    {
      name: "Tournaments",
      href: "/tournaments",
      icon: Trophy,
    },

    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: BarChart3,
    },

    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (

    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      h-16

      bg-[#0d0718]/95
      backdrop-blur-xl

      border-t
      border-white/10

      flex
      justify-around
      items-center

      md:hidden

      z-50
      "
    >

      {links.map((link) => {

        const Icon = link.icon;

        const active =
          pathname === link.href;

        return (

          <Link
            key={link.href}
            href={link.href}
            className="
            flex
            flex-col
            items-center
            gap-1
            "
          >

            <Icon
              size={20}
              className={
                active
                  ? "text-purple-400"
                  : "text-gray-400"
              }
            />

            <span
              className={`
              text-xs
              ${
                active
                  ? "text-purple-400"
                  : "text-gray-400"
              }
              `}
            >
              {link.name}
            </span>

          </Link>
        );
      })}
    </nav>
  );
}