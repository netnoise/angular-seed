import { z } from 'zod';

// NBA team schema (OpenAPI)
export const NbaTeamSchema = z.object({
  id: z.number(),
  conference: z.string(),
  division: z.string(),
  city: z.string(),
  name: z.string(),
  full_name: z.string(),
  abbreviation: z.string(),
});

export type NbaTeam = z.infer<typeof NbaTeamSchema>;

// NBA player schema (OpenAPI)
export const NbaPlayerSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  position: z.string(),
  height: z.string(),
  weight: z.string(),
  jersey_number: z.string(),
  college: z.string(),
  country: z.string(),
  draft_year: z.number(),
  draft_round: z.number(),
  draft_number: z.number(),
  team: NbaTeamSchema,
});

export type NbaPlayer = z.infer<typeof NbaPlayerSchema>;

// UI-friendly player list item
export interface PlayerListItem {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  teamAbbreviation: string | null;
}

export const toPlayerListItem = (player: NbaPlayer): PlayerListItem => ({
  id: player.id,
  firstName: player.first_name,
  lastName: player.last_name,
  fullName: `${player.first_name} ${player.last_name}`,
  teamAbbreviation: player.team?.abbreviation ?? null,
});

// Season averages schema (OpenAPI)
export const NbaSeasonAveragesSchema = z.object({
  games_played: z.number(),
  player_id: z.number(),
  season: z.number(),
  min: z.string(),
  fgm: z.number(),
  fga: z.number(),
  fg3m: z.number(),
  fg3a: z.number(),
  ftm: z.number(),
  fta: z.number(),
  oreb: z.number(),
  dreb: z.number(),
  reb: z.number(),
  ast: z.number(),
  stl: z.number(),
  blk: z.number(),
  turnover: z.number(),
  pts: z.number(),
  fg_pct: z.number(),
  fg3_pct: z.number(),
  ft_pct: z.number(),
});

export type NbaSeasonAverages = z.infer<typeof NbaSeasonAveragesSchema>;

// Shot chart data schema
export const ShotSchema = z.object({
  x: z.number(), // Court x-coordinate
  y: z.number(), // Court y-coordinate
  made: z.boolean(),
  shotType: z.string(), // e.g., "2PT", "3PT"
  shotZone: z.string().optional(), // e.g., "Mid-Range", "Paint"
  distance: z.number().optional(), // Distance from basket in feet
});

export type Shot = z.infer<typeof ShotSchema>;

export const ShotChartDataSchema = z.object({
  playerId: z.number(),
  playerName: z.string(),
  season: z.string(),
  shots: z.array(ShotSchema),
  totalShots: z.number(),
  shotsMade: z.number(),
  fieldGoalPercentage: z.number(),
});

export type ShotChartData = z.infer<typeof ShotChartDataSchema>;

// API Response wrappers (OpenAPI)
export const NbaPlayerListResponseSchema = z.object({
  data: z.array(NbaPlayerSchema),
  meta: z
    .object({
      next_cursor: z.number().nullable().optional(),
      prev_cursor: z.number().nullable().optional(),
      per_page: z.number().optional(),
    })
    .optional(),
});

export type NbaPlayerListResponse = z.infer<typeof NbaPlayerListResponseSchema>;

export const NbaSeasonAveragesResponseSchema = z.object({
  data: z.array(NbaSeasonAveragesSchema),
});

export type NbaSeasonAveragesResponse = z.infer<typeof NbaSeasonAveragesResponseSchema>;

export const ShotChartResponseSchema = z.object({
  data: ShotChartDataSchema,
});

export type ShotChartResponse = z.infer<typeof ShotChartResponseSchema>;
