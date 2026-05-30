import { supabase }
from "./supabase";

export async function uploadTournamentBanner(
  file: File
) {

  const fileName =

    `${Date.now()}-${file.name}`;

  const { error } =

    await supabase.storage

      .from("tournament-banners")

      .upload(fileName, file);

  if (error) {

    console.log(error);

    return null;
  }

  const {

    data: publicUrlData,

  }

    = supabase.storage

      .from("tournament-banners")

      .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
export async function uploadAvatar(
  file: File
) {

  const fileName =
    `${Date.now()}-${file.name}`;

  const { error } =
    await supabase.storage

      .from("avatars")

      .upload(
        fileName,
        file
      );

  if (error)
    throw error;

  const { data } =
    supabase.storage

      .from("avatars")

      .getPublicUrl(fileName);

  return data.publicUrl;
}