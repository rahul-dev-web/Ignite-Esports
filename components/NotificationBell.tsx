"use client";

import { useEffect, useState } from "react";

import { Bell, } from "lucide-react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

export default function NotificationBell() {

  /*
    STATES
  */

  const [announcements,
    setAnnouncements]

    = useState<any[]>([]);

  const [open,
    setOpen]

    = useState(false);

  /*
    FETCH EXISTING
  */

  useEffect(() => {

    fetchAnnouncements();

    /*
      REALTIME SUBSCRIBE
    */

    const channel =

      supabase

        .channel(
          "announcement-channel"
        )

        .on(

          "postgres_changes",

          {
            event: "INSERT",

            schema: "public",

            table:
              "announcements",
          },

          (payload) => {

            const newAnnouncement =

              payload.new;

            /*
              TOAST POPUP
            */

            toast.success(
              newAnnouncement.message
            );

            /*
              UPDATE STATE
            */

            setAnnouncements(
              (prev) => [

                newAnnouncement,

                ...prev,
              ]
            );
          }
        )

        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );
    };

  }, []);

  /*
    FETCH FUNCTION
  */

  const fetchAnnouncements =
    async () => {

      const {
        data,
      }

        = await supabase

          .from(
            "announcements"
          )

          .select("*")

          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (data) {

        setAnnouncements(
          data
        );
      }
    };

  return (

    <div className="relative">

      {/* BELL */}

      <button
        onClick={() =>
          setOpen(!open)
        }

        className="relative"
      >

        <Bell size={24} />

        {/* UNREAD */}

        {announcements.length > 0 && (

          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center">

            {announcements.length}

          </div>
        )}

      </button>

      {/* DROPDOWN */}

      {open && (

        <div className="absolute right-0 mt-4 w-80 bg-[#0d0718] border border-white/10 rounded-2xl p-4 z-50">

          <h2 className="text-lg font-bold mb-4">

            Announcements

          </h2>

          <div className="space-y-3 max-h-96 overflow-y-auto">

            {announcements.map(
              (item) => (

                <div
                  key={item.id}

                  className="p-4 rounded-2xl bg-black/30 border border-white/10"
                >

                  <p className="mb-2">

                    {item.message}

                  </p>

                  <span className="text-xs text-gray-400">

                    {item.priority}

                  </span>

                </div>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
}