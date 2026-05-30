"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase }
from "@/lib/supabase";

export function useAdminRoute() {

  const router =
    useRouter();

  const [loading,
    setLoading]

    = useState(true);

  useEffect(() => {

    const checkAdmin =
      async () => {

        try {

          /*
            LOCAL USER
          */

          const storedUser =

            localStorage.getItem(
              "ignite_user"
            );

          if (!storedUser) {

            router.push("/");

            return;
          }

          const localUser =

            JSON.parse(
              storedUser
            );

          /*
            DATABASE ROLE CHECK
          */

          const {

            data: dbUser,

            error,

          }

            = await supabase

              .from("users")

              .select(
                "role"
              )

              .eq(
                "discord_id",
                localUser.discord_id
              )

              .single();

          /*
            DB ERROR
          */

          if (
            error ||
            !dbUser
          ) {

            console.log(
              error
            );

            router.push("/");

            return;
          }

          /*
            ROLE VALIDATION
          */

          if (
            dbUser.role !==
            "admin"
          ) {

            router.push("/");

            return;
          }

          /*
            ACCESS GRANTED
          */

          setLoading(false);

        } catch (error) {

          console.log(
            "ADMIN CHECK ERROR:",
            error
          );

          router.push("/");
        }
      };

    checkAdmin();

  }, [router]);

  return loading;
}