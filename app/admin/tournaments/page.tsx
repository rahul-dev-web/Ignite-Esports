"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";

import { useAdminRoute } from "@/hooks/useAdminRoute";
import { supabase } from "@/lib/supabase";
import { uploadTournamentBanner, deleteTournamentBanner } from "@/lib/storage";

type TournamentRow = {
  id: string;
  title: string;
  status: string;
  registration_open: boolean;
  banner: string;
  created_at: string;
};

export default function AdminTournamentsPage() {
  const loading = useAdminRoute();
  const [title, setTitle] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [banner, setBanner] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const [tournaments, setTournaments] = useState<TournamentRow[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const { data, error } = await supabase
          .from("tournaments")
          .select("id,title,status,registration_open,banner,created_at")
          .order("created_at", { ascending: false });

        if (error) {
          console.error(error);
          return;
        }

        setTournaments(data ?? []);
      } catch (error) {
        console.error("Failed to load tournaments", error);
      } finally {
        setFetching(false);
      }
    };

    loadTournaments();
  }, []);

  const handleCreateTournament = async () => {
    try {
      if (!title || !discordLink || !banner) {
        toast.error("Please fill all fields");
        return;
      }

      setCreating(true);

      const bannerUrl = await uploadTournamentBanner(banner);

      if (!bannerUrl) {
        toast.error("Banner upload failed");
        setCreating(false);
        return;
      }

      const { error } = await supabase.from("tournaments").insert([
        {
          title,
          banner: bannerUrl,
          discord_link: discordLink,
          status,
          registration_open: registrationOpen,
        },
      ]);

      if (error) {
        console.error(error);
        toast.error("Tournament creation failed");
        setCreating(false);
        return;
      }

      toast.success("Tournament created successfully");
      setTitle("");
      setDiscordLink("");
      setStatus("ongoing");
      setRegistrationOpen(true);
      setBanner(null);
      setPreviewUrl("");
      setCreating(false);

      const { data } = await supabase
        .from("tournaments")
        .select("id,title,status,registration_open,banner,created_at")
        .order("created_at", { ascending: false });

      setTournaments(data ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setCreating(false);
    }
  };

  const handleDeleteTournament = async (id: string, bannerUrl: string) => {
    const shouldDelete = window.confirm("Delete this tournament?");
    if (!shouldDelete) return;

    try {
      const { error } = await supabase.from("tournaments").delete().eq("id", id);
      if (error) {
        console.error(error);
        toast.error("Failed to delete tournament");
        return;
      }

      if (bannerUrl) {
        await deleteTournamentBanner(bannerUrl);
      }

      toast.success("Tournament deleted");
      setTournaments((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Delete request failed");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">
        <p>Verifying administrative permissions...</p>
      </main>
    );
  }

  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-[#0d0718] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-purple-300/80">Tournament Management</p>
            <h2 className="mt-3 text-3xl font-black text-white">Create new tournament</h2>
          </div>
          <p className="text-sm text-gray-400">Use this panel to add tournaments and keep your schedule updated.</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-[#12101f] p-6 space-y-5">
            <div>
              <label className="block text-sm text-gray-400">Tournament title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                placeholder="Weekly Squad Championship"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Discord registration link</label>
              <input
                type="text"
                value={discordLink}
                onChange={(e) => setDiscordLink(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                placeholder="https://discord.gg/..."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-gray-400">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400">Registration</label>
                <select
                  value={registrationOpen ? "open" : "closed"}
                  onChange={(e) => setRegistrationOpen(e.target.value === "open")}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400">Banner image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    toast.error("Only image files are allowed");
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("Image must be under 5MB");
                    return;
                  }

                  setBanner(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }}
                className="mt-2 w-full text-sm text-gray-200"
              />
            </div>

            {previewUrl ? (
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={previewUrl}
                  alt="Banner preview"
                  width={900}
                  height={300}
                  className="h-40 w-full object-cover"
                />
              </div>
            ) : null}

            <button
              onClick={handleCreateTournament}
              disabled={creating}
              className="w-full rounded-2xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating ? "Creating tournament..." : "Create Tournament"}
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#12101f] p-6">
            <h3 className="text-xl font-black text-white">Tournament list</h3>
            <p className="mt-2 text-sm text-gray-400">Review and remove tournaments from the live schedule.</p>

            <div className="mt-6 space-y-4">
              {fetching ? (
                <p className="text-sm text-gray-400">Loading tournaments…</p>
              ) : tournaments.length === 0 ? (
                <p className="text-sm text-gray-400">No tournaments found yet.</p>
              ) : (
                tournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="rounded-3xl border border-white/10 bg-[#0d0718] p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-purple-300/80">
                          {tournament.status}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">{tournament.title}</p>
                        <p className="text-sm text-gray-400">
                          Registration {tournament.registration_open ? "Open" : "Closed"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteTournament(tournament.id, tournament.banner)}
                        className="rounded-2xl bg-white/5 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
