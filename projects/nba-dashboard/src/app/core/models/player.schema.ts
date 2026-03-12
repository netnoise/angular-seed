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
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  height: z.string().nullable().optional(),
  weight: z.string().nullable().optional(),
  jersey_number: z.string().nullable().optional(),
  college: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  draft_year: z.number().nullable().optional(),
  draft_round: z.number().nullable().optional(),
  draft_number: z.number().nullable().optional(),
  team: NbaTeamSchema.nullable().optional(),
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

export const toPlayerListItem = (player: NbaPlayer): PlayerListItem => {
  const firstName = player.first_name ?? '';
  const lastName = player.last_name ?? '';
  return {
    id: player.id,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.trim() || 'Unknown Player',
    teamAbbreviation: player.team?.abbreviation ?? null,
  };
};

// Season averages schema (OpenAPI)
export const NbaSeasonAveragesSchema = z.object({
  games_played: z.number().nullable().optional(),
  player_id: z.number().nullable().optional(),
  season: z.number().nullable().optional(),
  min: z.string().nullable().optional(),
  fgm: z.number().nullable().optional(),
  fga: z.number().nullable().optional(),
  fg3m: z.number().nullable().optional(),
  fg3a: z.number().nullable().optional(),
  ftm: z.number().nullable().optional(),
  fta: z.number().nullable().optional(),
  oreb: z.number().nullable().optional(),
  dreb: z.number().nullable().optional(),
  reb: z.number().nullable().optional(),
  ast: z.number().nullable().optional(),
  stl: z.number().nullable().optional(),
  blk: z.number().nullable().optional(),
  turnover: z.number().nullable().optional(),
  pts: z.number().nullable().optional(),
  fg_pct: z.number().nullable().optional(),
  fg3_pct: z.number().nullable().optional(),
  ft_pct: z.number().nullable().optional(),
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
