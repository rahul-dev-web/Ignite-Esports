import { NextResponse }
from "next/server";

import { supabase }
from "@/lib/supabase";

export async function POST(
  req: Request
) {

  try {

    /*
      GET AUTHORIZATION CODE
    */

    const body =
      await req.json();

    const code =
      body.code;

    /*
      VALIDATE CODE
    */

    if (!code) {

      return NextResponse.json({

        success: false,

        error:
          "Authorization code missing",
      });
    }

    /*
      STEP 1
      EXCHANGE DISCORD TOKEN
    */

    const tokenResponse =
      await fetch(

        "https://discord.com/api/oauth2/token",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams({

            client_id:
              process.env
                .DISCORD_CLIENT_ID!,

            client_secret:
              process.env
                .DISCORD_CLIENT_SECRET!,

            grant_type:
              "authorization_code",

            code,

            redirect_uri:
              process.env
                .DISCORD_REDIRECT_URI!,
          }),
        }
      );

    /*
      TOKEN RESPONSE
    */

    const tokenData =
      await tokenResponse.json();

    /*
      ACCESS TOKEN
    */

    const accessToken =
      tokenData.access_token;

    /*
      TOKEN FAILED
    */

    if (!accessToken) {

      console.log(
        "TOKEN ERROR:",
        tokenData
      );

      return NextResponse.json({

        success: false,

        error:
          "Discord token exchange failed",
      });
    }

    /*
      STEP 2
      FETCH DISCORD USER
    */

    const userResponse =
      await fetch(

        "https://discord.com/api/users/@me",

        {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        }
      );

    const discordUser =
      await userResponse.json();

    /*
      USER FETCH FAILED
    */

    if (!discordUser.id) {

      console.log(
        "USER FETCH ERROR:",
        discordUser
      );

      return NextResponse.json({

        success: false,

        error:
          "Failed to fetch Discord user",
      });
    }

    /*
      STEP 3
      VERIFY GUILD MEMBERSHIP
    */

    const guildResponse =
      await fetch(

        `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordUser.id}`,

        {
          headers: {
            Authorization:
              `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        }
      );

    /*
      USER NOT IN SERVER
    */

    if (guildResponse.status === 404) {

      return NextResponse.json({

        success: false,

        joined: false,
      });
    }

    /*
      DISCORD AVATAR URL
    */

    const avatarUrl =

      discordUser.avatar

        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`

        : `https://cdn.discordapp.com/embed/avatars/0.png`;

    /*
      STEP 4
      CHECK EXISTING USER
    */

    const {

      data: existingUser,

      error: fetchError,

    }

      = await supabase

        .from("users")

        .select("*")

        .eq(
          "discord_id",
          discordUser.id
        )

        .single();

    /*
      IGNORE NO ROW ERROR
    */

    if (
      fetchError &&
      fetchError.code !== "PGRST116"
    ) {

      console.log(
        "FETCH USER ERROR:",
        fetchError
      );

      return NextResponse.json({

        success: false,

        error:
          "Database fetch failed",
      });
    }

    /*
      USER DOES NOT EXIST
    */

    if (!existingUser) {

      const {

        data: newUser,

        error: createError,

      }

        = await supabase

          .from("users")

          .insert([

            {

              discord_id:
                discordUser.id,

              username:
                discordUser.username,

              avatar:
                avatarUrl,

              joined_server:
                true,

              role:
                "user",

              selected_avatar:
                "/avatars/avatar_1.png",

                 first_login:
    new Date().toISOString(),
            },

          ])

          .select()

          .single();

      /*
        CREATE USER FAILED
      */

      if (createError) {

        console.log(
          "CREATE USER ERROR:",
          createError
        );

        return NextResponse.json({

          success: false,

          error:
            "Failed to create user",
        });
      }

      /*
        RETURN NEW USER
      */

      return NextResponse.json({

        success: true,

        joined: true,

        user: newUser,
      });
    }

    /*
      EXISTING USER FOUND
    */

    return NextResponse.json({

      success: true,

      joined: true,

      user: existingUser,
    });

  }

  catch (error) {

    console.log(
      "DISCORD AUTH ERROR:",
      error
    );

    return NextResponse.json({

      success: false,

      error:
        "Authentication failed",
    });
  }
}
