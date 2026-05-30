"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import Highlights from "@/components/home/Highlights";

type IgniteUser = {
  username?: string;
  avatar?: string;
  role?: string;
};

export default function HomePage() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [user, setUser] =
    useState<IgniteUser | null>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("ignite_user");

    if (storedUser) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem(
      "ignite_user"
    );

   window.location.href = "/";
};

  return (

    <main className="min-h-screen bg-[#05010d] text-white overflow-x-hidden">

      {/* HERO */}

      <Hero />

      {/* HIGHLIGHTS */}

      <Highlights />

    </main>
  );
}
