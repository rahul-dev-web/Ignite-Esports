"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Shield,
} from "lucide-react";

const titles: Record<string, string> = {
  "/admin": "Admin Dashboard",
  "/admin/tournaments": "Tournament Management",
  "/admin/leaderboard": "Leaderboard Management",
  "/admin/announcements": "Announcements",
  "/admin/users": "User Management",
};

export default function AdminNavbar() {
  const pathname = usePathname();

  const title =
    titles[pathname] ||
    "Admin Dashboard";

  return (
    <header
      className="
      sticky
      top-0
      z-30

      border-b
      border-white/10

      bg-[#08040d]/95
      backdrop-blur-xl
      "
    >
      <div
        className="
        px-4
        py-4

        sm:px-6
        lg:px-8
        "
      >
        <div
          className="
          flex
          flex-col
          gap-4

          md:flex-row
          md:items-center
          md:justify-between
          "
        >
          {/* LEFT */}
          <div>

            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <Shield
                size={16}
                className="text-purple-400"
              />

              <p
                className="
                text-xs
                uppercase

                tracking-[0.32em]

                text-purple-300/80
                "
              >
                Ignite Admin Panel
              </p>
            </div>

            <h1
              className="
              mt-2

              text-2xl
              sm:text-3xl

              font-black
              text-white
              "
            >
              {title}
            </h1>

          </div>

          {/* RIGHT */}
          <div
            className="
            flex
            items-center
            gap-3
            "
          >
            <Link
              href="/"
              className="
              inline-flex
              items-center
              gap-2

              rounded-2xl

              border
              border-white/10

              bg-white/5

              px-4
              py-2

              text-sm
              text-white

              transition

              hover:bg-white/10
              "
            >
              <ArrowRight size={16} />

              View Live Site
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}