"use client";

import { useEffect, useState }
from "react";

import Image
from "next/image";

import { supabase }
from "@/lib/supabase";

export default function ProfilePage() {

  /*
    STATES
  */

  const [user,
    setUser]

    = useState<any>(null);

  const [loading,
    setLoading]

    = useState(true);

  /*
    AVAILABLE AVATARS
  */

  const avatars = [

    "/avatars/avatar_1.png",

    "/avatars/avatar_2.png",

    "/avatars/avatar_3.png",

    "/avatars/avatar_4.png",

    "/avatars/avatar_5.png",
  ];

  /*
    FETCH USER
  */

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "ignite_user"
      );

    if (!storedUser) {

      window.location.href =
        "/login";

      return;
    }

    const parsedUser =
      JSON.parse(storedUser);

    setUser(parsedUser);

    setLoading(false);

  }, []);

  /*
    CHANGE AVATAR
  */

  const changeAvatar =
    async (
      avatar: string
    ) => {

      try {

        if (!user) return;

        /*
          UPDATE DATABASE
        */

        const {
          error,
        }

          = await supabase

            .from("users")

            .update({

              selected_avatar:
                avatar,
            })

            .eq(
              "discord_id",
              user.discord_id
            );

        if (error) {

          console.log(error);

          return;
        }

        /*
          UPDATE LOCAL USER
        */

        const updatedUser = {

          ...user,

          selected_avatar:
            avatar,
        };

        localStorage.setItem(
          "ignite_user",

          JSON.stringify(
            updatedUser
          )
        );

        setUser(updatedUser);

      } catch (error) {

        console.log(error);
      }
    };

  /*
    LOGOUT
  */

  const logout = () => {

    localStorage.removeItem(
      "ignite_user"
    );

    document.cookie =
      "ignite_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    window.location.href =
      "/";
  };

  /*
    LOADING
  */

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">

        Loading Profile...

      </main>
    );
  }

  /*
    NO USER
  */

  if (!user) {

    return null;
  }

  /*
    DISCORD AVATAR
  */

  const discordAvatar =

    user.avatar

      ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.png`

      : "/default-avatar.png";

  /*
    SELECTED AVATAR
  */

  const normalizeAvatar = (avatar?: string): string => {
    if (!avatar) return "/default-avatar.png";
    if (avatar.startsWith("/") || avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }
    return `/avatars/${avatar}`;
  };

  const displayAvatar =

    user.selected_avatar
      ? normalizeAvatar(user.selected_avatar)
      : discordAvatar;

  return (

    <main className="min-h-screen bg-[#05010d] text-white p-6">

      <div className="max-w-4xl mx-auto">

        {/* TITLE */}

        <div className="mb-10">

          <h1 className="text-5xl font-black mb-3">

            MY PROFILE

          </h1>

          <p className="text-gray-400">

            Manage your esports identity.

          </p>

        </div>

        {/* PROFILE CARD */}

        <div className="bg-[#0d0718] border border-white/10 rounded-3xl p-6 md:p-8">

          {/* TOP */}

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">

            {/* AVATAR */}

            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500">

              <Image
                src={displayAvatar}
                alt="avatar"
                fill
                className="object-cover"
              />

            </div>

            {/* USER INFO */}

            <div>

              <h2 className="text-3xl font-bold mb-2">

                {user.username}

              </h2>

              {/* ROLE */}

              <div className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold mb-4">

                {user.role}

              </div>

              {/* INFO */}

              <div className="space-y-2 text-gray-400">

                <p>

                  Discord ID:
                  {" "}
                  {user.discord_id}

                </p>

                <p>

                  Joined Server:
                  {" "}

                  {user.joined_server
                    ? "Yes"
                    : "No"}

                </p>

                <p>

                  First Login:
                  {" "}

                  {new Date(
                    user.first_login
                  ).toLocaleString()}

                </p>

              </div>

            </div>

          </div>

          {/* AVATAR SELECTOR */}

          <div className="mb-10">

            <h3 className="text-2xl font-bold mb-5">

              Choose Avatar

            </h3>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">

              {avatars.map(
                (avatar) => (

                  <button
                    key={avatar}

                    onClick={() =>
                      changeAvatar(
                        avatar
                      )
                    }

                    className={`relative h-24 rounded-2xl overflow-hidden border-2 transition

                    ${
                      user.selected_avatar === avatar

                        ? "border-cyan-400"

                        : "border-white/10"
                    }`}
                  >

                    <Image
                      src={avatar}
                      alt="avatar"

                      fill

                      className="object-cover"
                    />

                  </button>
                )
              )}

            </div>

          </div>

          {/* LOGOUT */}

          <button
            onClick={logout}

            className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 transition font-bold"
          >

            Logout

          </button>

        </div>

      </div>

    </main>
  );
}