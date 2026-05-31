"use client";

import { useEffect, useState } from "react";

export default function CallbackPage() {

  const [status, setStatus] =
    useState("CHECKING");

  useEffect(() => {

    const login = async () => {

      try {

        /*
          GET DISCORD OAUTH CODE
        */

        const params =
          new URLSearchParams(window.location.search);

        const code = params.get("code");

        /*
          IF NO CODE FOUND
        */

        if (!code) {

          setStatus("ERROR");

          return;
        }

        /*
          SEND CODE TO API ROUTE
        */

        const response = await fetch(
          "/api/discord",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              code,
            }),
          }
        );

        /*
          GET API RESPONSE
        */

        const data = await response.json();

        console.log(
          "DISCORD RESPONSE:",
          data
        );

        /*
          USER JOINED SERVER
        */

        if (data.joined) {

          console.log(
            "USER:",
            data.user
          );

          /*
            SAVE USER SESSION
          */

          localStorage.setItem(
            "ignite_user",
            JSON.stringify(data.user)
          );

          document.cookie =
  "ignite_session=true; path=/; max-age=2592000";

          /*
            SUCCESS SCREEN
          */

          setStatus("SUCCESS");

          /*
            REDIRECT TO HOMEPAGE
          */

          setTimeout(() => {

            window.location.href = "/";

          }, 2000);

        }

        /*
          USER NOT IN SERVER
        */

        else {

          setStatus("NOT_MEMBER");
        }

      }

      catch (error) {

        console.log(error);

        setStatus("ERROR");
      }
    };

    login();

  }, []);

  /*
    LOADING SCREEN
  */

  if (status === "CHECKING") {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white">

        <div className="flex flex-col items-center gap-5">

          <div className="w-16 h-16 rounded-full border-4 border-purple-500 border-t-cyan-400 animate-spin" />

          <h1 className="text-2xl font-bold">
            Checking Discord Login...
          </h1>

          <p className="text-gray-400 text-center max-w-sm">
            Verifying your Discord account
            and server membership.
          </p>

        </div>

      </main>
    );
  }

  /*
    USER NOT MEMBER
  */

  if (status === "NOT_MEMBER") {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white p-6">

        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#0d0718] p-8 text-center">

          <h1 className="text-4xl font-bold text-red-500 mb-5">

            Access Denied

          </h1>

          <p className="text-gray-400 leading-relaxed mb-8">

            Please join our Discord server first
            before logging in to access tournaments,
            scrims, rankings and premium features.

          </p>

          <a
            href={
              process.env
                .NEXT_PUBLIC_DISCORD_INVITE
            }
            target="_blank"
            className="block w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold text-lg"
          >

            Join Discord Server

          </a>

        </div>

      </main>
    );
  }

  /*
    LOGIN SUCCESS
  */

  if (status === "SUCCESS") {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white p-6">

        <div className="w-full max-w-md rounded-3xl border border-green-500/20 bg-[#0d0718] p-8 text-center">

          <div className="text-6xl mb-5">
            ✅
          </div>

          <h1 className="text-4xl font-bold text-green-500 mb-4">

            Login Successful

          </h1>

          <p className="text-gray-400 leading-relaxed">

            Redirecting you to the Ignite Esports homepage...

          </p>

        </div>

      </main>
    );
  }

  /*
    ERROR SCREEN
  */

  return (

    <main className="min-h-screen flex items-center justify-center bg-[#05010d] text-white p-6">

      <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#0d0718] p-8 text-center">

        <h1 className="text-4xl font-bold text-red-500 mb-5">

          Something Went Wrong

        </h1>

        <p className="text-gray-400 leading-relaxed mb-8">

          Discord authentication failed.
          Please try again later.

        </p>

        <a
          href="/"
          className="block w-full py-4 rounded-2xl bg-linear-to-r from-purple-600 to-cyan-400 font-bold text-lg"
        >Return Home</a>

      </div>

    </main>
  );
}
