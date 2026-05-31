"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type IgniteUser = {
  username?: string;
  avatar?: string;
  role?: string;
};

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<IgniteUser | null>(null);

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

  if (isAdmin) {
    return <div className="min-h-screen bg-[#05010d] text-white">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#05010d] text-white">

      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR (ONLY ONE SOURCE OF TRUTH) */}
        <Navbar
          loggedIn={!!user}
          username={user?.username}
          avatar={user?.avatar}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}