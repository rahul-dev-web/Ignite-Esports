"use client";

import { useState }
from "react";

import { supabase }
from "@/lib/supabase";

type TeamRow = {
  team_name: string;
  points: number;
};

import { useAdminRoute }
from "@/hooks/useAdminRoute";

export default function AdminLeaderboardPage() {

  /*
    ADMIN PROTECTION
  */

  const loading =
    useAdminRoute();

  /*
    STATES
  */

  const [slot, setSlot]
    = useState("12 PM");

  const [topLimit,
    setTopLimit]

    = useState(5);

  const [teams,
    setTeams]

    = useState<TeamRow[]>([

      {
        team_name: "",
        points: 0,
      },

    ]);

  const [publishing,
    setPublishing]

    = useState(false);

  /*
    ADD TEAM ROW
  */

  const addTeamRow = () => {

    setTeams([

      ...teams,

      {
        team_name: "",
        points: 0,
      },
    ]);
  };

  /*
    UPDATE TEAM
  */

  const updateTeam = (
    index: number,
    field: keyof TeamRow,
    value: TeamRow[keyof TeamRow]
  ) => {

    const updatedTeams =
      [...teams];

    updatedTeams[index] = {

      ...updatedTeams[index],

      [field]: value,
    };

    setTeams(updatedTeams);
  };

  /*
    PUBLISH LEADERBOARD
  */

  const publishLeaderboard =
    async () => {

      try {

        setPublishing(true);

        /*
          CREATE LEADERBOARD
        */

        const {

          data: leaderboard,

          error:
            leaderboardError,

        }

          = await supabase

            .from(
              "scrim_leaderboards"
            )

            .insert([

              {
                slot,

                top_limit:
                  topLimit,

                active: true,
              },

            ])

            .select()

            .single();

        if (
          leaderboardError
        ) {

          console.log(
            leaderboardError
          );

          setPublishing(false);

          return;
        }

        /*
          CREATE ENTRIES
        */

        const entries =

          teams.map(
            (team, index) => ({

              leaderboard_id:
                leaderboard.id,

              rank:
                index + 1,

              team_name:
                team.team_name,

              points:
                team.points,
            })
          );

        const {
          error: entriesError,
        }

          = await supabase

            .from(
              "leaderboard_entries"
            )

            .insert(entries);

        if (entriesError) {

          console.log(
            entriesError
          );

          setPublishing(false);

          return;
        }

        alert(
          "Leaderboard published"
        );

        setPublishing(false);

      } catch (error) {

        console.log(error);

        setPublishing(false);
      }
    };

  /*
    LOADING
  */

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">

        Loading...

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#05010d] text-white p-6">

      {/* TITLE */}

      <div className="mb-10">

        <h1 className="text-5xl font-black mb-3">

          Scrim Rankings Management

        </h1>

        <p className="text-gray-400">

          Create official scrim leaderboards, manage rankings and publish match results for the Ignite Esports community.

        </p>

      </div>

      {/* PANEL */}

      <div className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 space-y-6">

        {/* SLOT */}

        <div>

          <label className="block mb-2 text-gray-400">

           Scrim Time Slot

          </label>

          <select
            value={slot}

            onChange={(e) =>
              setSlot(
                e.target.value
              )
            }

            className="w-full p-4 rounded-2xl bg-black/30 border border-white/10"
          >

            <option>12 PM</option>
            <option>3 PM</option>
            <option>4 PM</option>
            <option>5 PM</option>
            <option>6 PM</option>
            <option>9 PM</option>

          </select>

        </div>

        {/* TOP LIMIT */}

        <div>

          <label className="block mb-2 text-gray-400">

            Leaderboard Size

          </label>

          <select
            value={topLimit}

            onChange={(e) =>
              setTopLimit(
                Number(
                  e.target.value
                )
              )
            }

            className="w-full p-4 rounded-2xl bg-black/30 border border-white/10"
          >

            <option value={3}>
              Top 3
            </option>

            <option value={5}>
              Top 5
            </option>

            <option value={10}>
              Top 10
            </option>

            <option value={25}>
              Top 25
            </option>

          </select>

        </div>

        {/* TEAMS */}

        <div className="space-y-4">

          {teams.map(
            (team, index) => (

              <div
                key={index}

                className="grid grid-cols-3 gap-3"
              >

                {/* RANK */}

                <div className="flex items-center justify-center rounded-2xl bg-black/20 border border-white/10">

                  #{index + 1}

                </div>

                {/* TEAM */}

                <input
                  type="text"

                  placeholder="Enter Team Name"

                  value={team.team_name}

                  onChange={(e) =>
                    updateTeam(
                      index,
                      "team_name",
                      e.target.value
                    )
                  }

                  className="p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
                />

                {/* POINTS */}

                <input
                  type="number"

                  placeholder="Enter Total Points"

                  value={team.points}

                  onChange={(e) =>
                    updateTeam(
                      index,
                      "points",
                      Number(
                        e.target.value
                      )
                    )
                  }

                  className="p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
                />

              </div>
            )
          )}

        </div>

        {/* ADD TEAM */}

        <button
          onClick={addTeamRow}

          className="w-full py-4 rounded-2xl border border-white/10"
        >

          Add Another Team

        </button>

        {/* PUBLISH */}

        <button
          onClick={
            publishLeaderboard
          }

          disabled={publishing}

          className="w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold"
        >

          {publishing
            ? "Publishing..."
            : "Publish Scrim Rankings"}

        </button>

      </div>

    </main>
  );
}
