"use client";

import { useEffect, useState } from "react";
import TournamentCardSkeleton from "@/components/tournaments/TournamentCardSkeleton";
import { supabase } from "@/lib/supabase";

import TournamentCard from "@/components/tournaments/TournamentCard";

import { Tournament } from "@/types/tournament";

export default function TournamentsPage() {

  /*
    STATES
  */

  const [tournaments, setTournaments]
    = useState<Tournament[]>([]);

  const [activeTab, setActiveTab]
    = useState("ongoing");

  const [loading, setLoading]
    = useState(true);

  /*
    CHECK LOGIN
  */

  const loggedIn =
    typeof window !== "undefined"

      ? !!localStorage.getItem(
          "ignite_user"
        )

      : false;

  /*
    FETCH TOURNAMENTS
  */

  useEffect(() => {

    const fetchTournaments =
      async () => {

        const {

          data,

          error,

        }

          = await supabase

            .from("tournaments")

            .select("*")

            .order(
              "created_at",
              { ascending: false }
            );

        if (error) {

          console.log(error);

          setLoading(false);

          return;
        }

        setTournaments(data);

        setLoading(false);
      };

    fetchTournaments();

  }, []);

  /*
    FILTERED TOURNAMENTS
  */

  const filteredTournaments =

    tournaments.filter(

      (tournament) =>

        tournament.status ===
        activeTab
    );

  /*
    LOADING SCREEN
  */

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">

        <p className="text-xl">
          <TournamentCardSkeleton />
        </p>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#05010d] text-white p-6">

      {/* PAGE TITLE */}

      <div className="mb-10">

        <h1 className="text-5xl font-black mb-3">

          TOURNAMENTS

        </h1>

        <p className="text-gray-400">

          Explore ongoing, upcoming
          and past esports events.

        </p>

      </div>

      {/* TABS */}

      <div className="flex gap-3 mb-10 overflow-x-auto">

        {[
          "ongoing",
          "upcoming",
          "past",
        ].map((tab) => (

          <button
            key={tab}

            onClick={() =>
              setActiveTab(tab)
            }

            className={`px-6 py-3 rounded-2xl capitalize transition whitespace-nowrap

            ${
              activeTab === tab

                ? "bg-linear-to-r from-purple-600 to-cyan-400 text-white"

                : "bg-white/5 border border-white/10"
            }`}
          >

            {tab}

          </button>
        ))}
      </div>

      {/* TOURNAMENT GRID */}

      {filteredTournaments.length === 0 ? (

        <div className="text-center text-gray-400 py-20">

          No tournaments found.

        </div>

      ) : (

        <div className="grid gap-6">

          {filteredTournaments.map(
            (tournament) => (

              <TournamentCard

                key={tournament.id}

                title={tournament.title}

                banner={tournament.banner}

                status={tournament.status}

                registrationOpen={
                  tournament.registration_open
                }

                discordLink={
                  tournament.discord_link
                }

                loggedIn={loggedIn}
              />
            )
          )}

        </div>
      )}

    </main>
  );
}
