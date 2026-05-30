"use client";

import { useState }
from "react";

import {
  Mail,
  MessageCircle,
  Globe,
  Disc,
} from "lucide-react";

import { supabase }
from "@/lib/supabase";

export default function CollaborationPage() {

  /*
    STATES
  */

  const [name,
    setName]

    = useState("");

  const [platform,
    setPlatform]

    = useState("Sponsor");

  const [message,
    setMessage]

    = useState("");

  const [loading,
    setLoading]

    = useState(false);

  const [success,
    setSuccess]

    = useState(false);

  /*
    SUBMIT FORM
  */

  const submitRequest =
    async () => {

      try {

        setLoading(true);

        const {
          error,
        }

          = await supabase

            .from(
              "collaboration_requests"
            )

            .insert([

              {
                name,
                platform,
                message,
              },

            ]);

        if (error) {

          console.log(error);

          setLoading(false);

          return;
        }

        setSuccess(true);

        setName("");
        setPlatform("Sponsor");
        setMessage("");

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);
      }
    };

  return (

    <main className="min-h-screen bg-[#05010d] text-white p-6">

      {/* HERO */}

      <div className="max-w-5xl mx-auto">

        <div className="mb-14 text-center">

          <h1 className="text-5xl md:text-6xl font-black mb-5">

            Want To Collaborate?

          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">

            Partner with IGNITE ESPORTS
            for tournaments, sponsorships,
            creator campaigns and esports
            community growth.

          </p>

        </div>

        {/* CONTACT BUTTONS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">

          {/* GMAIL */}

          <a
            href="mailto:jarahul989@gmail.com"

            className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:border-purple-500/40 transition"
          >

            <Mail size={34} />

            <p className="mt-3 font-semibold">

              Gmail

            </p>

          </a>

          {/* WHATSAPP */}

          <a
            href="https://wa.me/9981977828"

            target="_blank"

            className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:border-green-500/40 transition"
          >

            <MessageCircle size={34} />

            <p className="mt-3 font-semibold">

              WhatsApp

            </p>

          </a>

          {/* DISCORD */}

          <a
            href={
              process.env
                .NEXT_PUBLIC_DISCORD_INVITE
            }

            target="_blank"

            className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:border-cyan-400/40 transition"
          >

            <Disc size={34} />

            <p className="mt-3 font-semibold">

              Discord

            </p>

          </a>

          {/* INSTAGRAM */}

          <a
            href="https://instagram.com"

            target="_blank"

            className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center hover:border-pink-500/40 transition"
          >

            <Globe size={34} />

            <p className="mt-3 font-semibold">

              Instagram

            </p>

          </a>

        </div>

        {/* FORM */}

        <div className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 md:p-8">

          <h2 className="text-3xl font-bold mb-6">

            Collaboration Request

          </h2>

          {/* SUCCESS */}

          {success && (

            <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400">

              Collaboration request submitted successfully.

            </div>
          )}

          <div className="space-y-5">

            {/* NAME */}

            <div>

              <label className="block mb-2 text-gray-400">

                Your Name

              </label>

              <input
                type="text"

                value={name}

                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }

                placeholder="Enter your name"

                className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
              />

            </div>

            {/* PLATFORM */}

            <div>

              <label className="block mb-2 text-gray-400">

                Collaboration Type

              </label>

              <select
                value={platform}

                onChange={(e) =>
                  setPlatform(
                    e.target.value
                  )
                }

                className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
              >

                <option>
                  Sponsor
                </option>

                <option>
                  Tournament Partner
                </option>

                <option>
                  Creator Collaboration
                </option>

                <option>
                  Organization Partnership
                </option>

              </select>

            </div>

            {/* MESSAGE */}

            <div>

              <label className="block mb-2 text-gray-400">

                Message

              </label>

              <textarea
                rows={6}

                value={message}

                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }

                placeholder="Describe your collaboration proposal..."

                className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none resize-none"
              />

            </div>

            {/* SUBMIT */}

            <button
              onClick={submitRequest}

              disabled={loading}

              className="w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold"
            >

              {loading
                ? "Submitting..."
                : "Send Collaboration Request"}

            </button>

          </div>

        </div>

      </div>

    </main>
  );
}
