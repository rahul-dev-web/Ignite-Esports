"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LeaderboardSkeleton from "@/components/leaderboard/LeaderboardSkeleton";

type LeaderboardEntry = {
  id: string;
  rank: number;
  team_name: string;
  points: number;
};

type Leaderboard = {
  id: string;
  slot: string;
  top_limit: number;
  leaderboard_entries?: LeaderboardEntry[];
};

type User = {
  joined_server?: boolean;
};

export default function LeaderboardPage() {
  /*
    STATES
  */
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  /*
    HYDRATION SAFE USER LOAD
  */
  useEffect(() => {
    const storedUser = localStorage.getItem("ignite_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setHydrated(true);
  }, []);

  /*
    FETCH LEADERBOARDS
  */
  useEffect(() => {
    const fetchLeaderboards = async () => {
      const { data, error } = await supabase
        .from("scrim_leaderboards")
        .select(`
          *,
          leaderboard_entries(*)
        `)
        .eq("active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        setLoading(false);
        return;
      }

      setLeaderboards(data || []);
      setLoading(false);
    };

    fetchLeaderboards();
  }, []);

  /*
    LOADING STATE (SAFE FOR HYDRATION)
  */
  if (!hydrated || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">
        <LeaderboardSkeleton />
      </main>
    );
  }

  /*
    ACCESS CONTROL (AFTER HYDRATION ONLY)
  */
  if (!user?.joined_server) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white p-6">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-black mb-4 text-red-500">
            Access Restricted
          </h1>

          <p className="text-gray-400 mb-6">
            Join our Discord server and login to unlock scrim leaderboards.
          </p>

          <a
            href={process.env.NEXT_PUBLIC_DISCORD_INVITE}
            target="_blank"
            className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-400"
          >
            Join Discord Server
          </a>
        </div>
      </main>
    );
  }

  /*
    MAIN UI
  */
  return (
    <main className="min-h-screen bg-[#05010d] text-white p-6">

      {/* TITLE */}
      <div className="mb-10">
        <h1 className="text-5xl font-black mb-3">
          SCRIM LEADERBOARDS
        </h1>

        <p className="text-gray-400">
          Daily esports rankings and scrim standings.
        </p>
      </div>

      {/* LEADERBOARDS */}
      <div className="space-y-8">
        {leaderboards.map((leaderboard) => (
          <div
            key={leaderboard.id}
            className="bg-[#0d0718] border border-white/10 rounded-3xl overflow-hidden"
          >
            {/* HEADER */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {leaderboard.slot} Scrim
                </h2>

                <p className="text-gray-400">
                  Top {leaderboard.top_limit}
                </p>
              </div>
            </div>

            {/* TABLE */}
            <div>
              {[...(leaderboard.leaderboard_entries || [])]
                .sort((a, b) => a.rank - b.rank)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between px-5 py-4 border-b border-white/5"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-black text-purple-400">
                        #{entry.rank}
                      </div>

                      <p className="font-semibold">
                        {entry.team_name}
                      </p>
                    </div>

                    {/* POINTS */}
                    <div className="font-bold text-cyan-400">
                      {entry.points} pts
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}