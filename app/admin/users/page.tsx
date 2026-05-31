"use client";

import { useEffect, useState } from "react";

import { useAdminRoute } from "@/hooks/useAdminRoute";
import { supabase } from "@/lib/supabase";

type UserRow = {
  id: number;
  username: string;
  discord_id: string;
  role: string;
  created_at: string;
};

export default function AdminUsersPage() {
  const loading = useAdminRoute();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id,username,discord_id,role,created_at")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) {
          console.error(error);
          return;
        }

        setUsers(data ?? []);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setFetching(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">
        <p>Verifying administrative permissions...</p>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#0d0718] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-purple-300/80">User management</p>
            <h2 className="mt-3 text-3xl font-black text-white">Platform users</h2>
          </div>
          <p className="text-sm text-gray-400">Review the latest registered users and their roles.</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#12101f]">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-[#0d0718]">
              <tr>
                <th className="px-4 py-3 text-gray-400">Username</th>
                <th className="px-4 py-3 text-gray-400">Discord ID</th>
                <th className="px-4 py-3 text-gray-400">Role</th>
                <th className="px-4 py-3 text-gray-400">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {fetching ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-gray-400">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5">
                    <td className="px-4 py-4 text-white">{user.username}</td>
                    <td className="px-4 py-4 text-gray-300">{user.discord_id}</td>
                    <td className="px-4 py-4 text-gray-300">{user.role}</td>
                    <td className="px-4 py-4 text-gray-300">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
