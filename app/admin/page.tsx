"use client";

import { useState } from "react";
import Image from "next/image";

import { useAdminRoute } from "@/hooks/useAdminRoute";
import { supabase } from "@/lib/supabase";

import {
  uploadTournamentBanner,
} from "@/lib/storage";

export default function AdminPage() {

  /*
    ADMIN PROTECTION
  */

  const loading =
    useAdminRoute();

  /*
    FORM STATES
  */

  const [title, setTitle] =
    useState("");

  const [discordLink, setDiscordLink] =
    useState("");

  const [status, setStatus] =
    useState("ongoing");

  const [registrationOpen,
    setRegistrationOpen] =
    useState(true);

  const [banner,
    setBanner] =
    useState<File | null>(null);

  const [previewUrl,
    setPreviewUrl] =
    useState("");

  const [creating,
    setCreating] =
    useState(false);

  /*
    CREATE TOURNAMENT
  */

  const handleCreateTournament =
    async () => {

      try {
        const {
  data: { user },
} = await supabase.auth.getUser();

console.log("Supabase User:", user);

        if (
          !title ||
          !discordLink ||
          !banner
        ) {

          alert(
            "Please fill all fields"
          );

          return;
        }

        setCreating(true);

        /*
          UPLOAD IMAGE
        */

        const bannerUrl =
          await uploadTournamentBanner(
            banner
          );

        if (!bannerUrl) {

          alert(
            "Banner upload failed"
          );

          setCreating(false);

          return;
        }

        /*
          SAVE TO DATABASE
        */

        const { error } =
          await supabase

            .from("tournaments")

            .insert([
              {
                title,

                banner:
                  bannerUrl,

                discord_link:
                  discordLink,

                status,

                registration_open:
                  registrationOpen,
              },
            ]);

        if (error) {

          console.log(error);

          alert(
            "Tournament creation failed"
          );

          setCreating(false);

          return;
        }

        /*
          SUCCESS
        */

        alert(
          "Tournament created successfully"
        );

        /*
          RESET FORM
        */

        setTitle("");

        setDiscordLink("");

        setStatus("ongoing");

        setRegistrationOpen(true);

        setBanner(null);

        setPreviewUrl("");

        setCreating(false);

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );

        setCreating(false);
      }
    };

  /*
    LOADING
  */

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">

        <p>
          Verifying administrative permissions...
        </p>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-[#05010d] text-white p-6">

      {/* TITLE */}

      <div className="mb-10">

        <h1 className="text-5xl font-black mb-3">

         Tournament Control Center

        </h1>

        <p className="text-gray-400">

         Create, organize and manage competitive tournaments across the Ignite Esports ecosystem.

        </p>

      </div>

      {/* FORM */}

      <div className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 space-y-6">

        {/* TITLE */}

        <div>

          <label className="block mb-2 text-sm text-gray-400">

            Example: Weekly Squad Championship

          </label>

          <input
            type="text"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"

            placeholder="Enter tournament title"
          />

        </div>

        {/* DISCORD LINK */}

        <div>

          <label className="block mb-2 text-sm text-gray-400">

            Paste the official Discord registration channel link

          </label>

          <input
            type="text"

            value={discordLink}

            onChange={(e) =>
              setDiscordLink(
                e.target.value
              )
            }

            className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"

            placeholder="Enter Discord channel link"
          />

        </div>

        {/* STATUS */}

        <div>

          <label className="block mb-2 text-sm text-gray-400">

            Tournament Status

          </label>

          <select
            value={status}

            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }

            className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
          >

            <option value="ongoing">
              Ongoing
            </option>

            <option value="upcoming">
              Upcoming
            </option>

            <option value="past">
              Past
            </option>

          </select>

        </div>

        {/* REGISTRATION */}

        <div className="flex items-center justify-between">

          <span className="text-gray-300">

            Allow Tournament Registration

          </span>

          <input
            type="checkbox"

            checked={registrationOpen}

            onChange={(e) =>
              setRegistrationOpen(
                e.target.checked
              )
            }
          />

        </div>

        {/* BANNER */}

        <div>

          <label className="block mb-2 text-sm text-gray-400">

            Tournament Banner Image

          </label>

          <input
            type="file"

            accept="image/*"

            onChange={(e) => {

              const file =
                e.target.files?.[0];

              if (!file) return;

              /*
                IMAGE VALIDATION
              */

              if (
                !file.type.startsWith(
                  "image/"
                )
              ) {

                alert(
                  "Only image files are allowed"
                );

                return;
              }

              /*
                MAX SIZE 5MB
              */

              if (
                file.size >
                5 * 1024 * 1024
              ) {

                alert(
                  "Image must be under 5MB"
                );

                return;
              }

              setBanner(file);

              setPreviewUrl(
                URL.createObjectURL(file)
              );
            }}
          />

          {/* PREVIEW */}

          {previewUrl && (

            <div className="mt-4">

              <Image
                src={previewUrl}
                alt="Tournament Banner Preview"
                width={1200}
                height={600}
                className="rounded-2xl border border-white/10 object-cover"
              />

            </div>
          )}

        </div>

        {/* BUTTON */}

        <button
          onClick={
            handleCreateTournament
          }

          disabled={creating}

          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-400 font-bold disabled:opacity-50"
        >

          {creating
            ? "Uploading Banner & Publishing Tournament..."
            : "Publish Tournament"}

        </button>

      </div>

    </main>
  );
}