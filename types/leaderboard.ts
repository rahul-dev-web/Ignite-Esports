export interface ScrimLeaderboard {

  id: string;

  slot: string;

  top_limit: number;

  active: boolean;

  created_at: string;
}

export interface LeaderboardEntry {

  id: string;

  leaderboard_id: string;

  rank: number;

  team_name: string;

  points: number;

  logo_url?: string;
}
