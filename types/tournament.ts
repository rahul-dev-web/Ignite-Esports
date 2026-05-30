export interface Tournament {

  id: string;

  title: string;

  banner: string;

  discord_link: string;

  status:
    | "ongoing"
    | "upcoming"
    | "past";

  registration_open: boolean;

  created_at: string;
}
