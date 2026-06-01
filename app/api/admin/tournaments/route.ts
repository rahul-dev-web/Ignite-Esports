import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      banner,
      discord_link,
      status,
      registration_open,
      discord_id,
    } = body;

    if (
      !title ||
      !banner ||
      !discord_link ||
      !discord_id
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    /*
      VERIFY ADMIN
    */

    const { data: user, error: userError } =
      await supabase
        .from("users")
        .select("role")
        .eq("discord_id", discord_id)
        .single();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 403 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 403 }
      );
    }

    /*
      CREATE TOURNAMENT
    */

    const { error } =
      await supabase
        .from("tournaments")
        .insert([
          {
            title,
            banner,
            discord_link,
            status,
            registration_open,
          },
        ]);

    if (error) {
      console.log(error);

      return NextResponse.json(
        {
          success: false,
          error: "Tournament creation failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}