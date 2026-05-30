"use client";

import { useState }
from "react";

import { supabase }
from "@/lib/supabase";

export default function AdminAnnouncementsPage() {

  /*
    STATES
  */

  const [message,
    setMessage]

    = useState("");

  const [priority,
    setPriority]

    = useState("normal");

  const [loading,
    setLoading]

    = useState(false);

  /*
    CREATE ANNOUNCEMENT
  */

  const createAnnouncement =
    async () => {

      try {

        if (!message) return;

        setLoading(true);

        const {
          error,
        }

          = await supabase

            .from(
              "announcements"
            )

            .insert([

              {
                message,
                priority,
              },

            ]);

        if (error) {

          console.log(error);

          setLoading(false);

          return;
        }

        setMessage("");

        setPriority("normal");

        setLoading(false);

        alert(
          "Announcement published!"
        );

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

  return (

    <main className="min-h-screen bg-[#05010d] text-white p-6">

      <div className="max-w-3xl mx-auto">

        {/* TITLE */}

        <div className="mb-10">

          <h1 className="text-5xl font-black mb-3">

            Platform Announcements Center

          </h1>

          <p className="text-gray-400">

            Broadcast important updates, tournament notices, maintenance alerts and community information to all Ignite Esports members in real time.

          </p>

        </div>

        {/* FORM */}

        <div className="bg-[#0d0718] border border-white/10 rounded-3xl p-6">

          {/* MESSAGE */}

          <div className="mb-6">

            <label className="block mb-3 text-gray-400">

              Announcement Content

            </label>

            <textarea
              rows={6}

              value={message}

              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }

              placeholder="Enter announcement details for players, teams and community members..."

              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none resize-none"
            />

          </div>

          {/* PRIORITY */}

          <div className="mb-8">

            <label className="block mb-3 text-gray-400">

              Announcement Priority

            </label>

            <select
              value={priority}

              onChange={(e) =>
                setPriority(
                  e.target.value
                )
              }

              className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
            >

              <option value="normal">

                Normal

              </option>

              <option value="important">

                Important

              </option>

              <option value="urgent">

                Urgent

              </option>

            </select>

          </div>

          {/* BUTTON */}

          <button
            onClick={
              createAnnouncement
            }

            disabled={loading}

            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-400 font-bold"
          >

            {loading

              ? "Broadcasting..."

              : "Broadcast Announcement"}

          </button>

        </div>

      </div>

    </main>
  );
}