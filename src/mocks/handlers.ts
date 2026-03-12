import { http, HttpResponse } from 'msw';

export const handlers = [
  // 1. Mocking the players endpoint
  http.get('/v1/players', ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search');

    const players = [
      {
        id: 1,
        first_name: 'Stephen',
        last_name: 'Curry',
        position: 'G',
        height: '6-2',
        weight: '185',
        jersey_number: '30',
        college: 'Davidson',
        country: 'USA',
        draft_year: 2009,
        draft_round: 1,
        draft_number: 7,
        team: {
          id: 10,
          conference: 'West',
          division: 'Pacific',
          city: 'Golden State',
          name: 'Warriors',
          full_name: 'Golden State Warriors',
          abbreviation: 'GSW',
        },
      },
      {
        id: 2,
        first_name: 'LeBron',
        last_name: 'James',
        position: 'F',
        height: '6-9',
        weight: '250',
        jersey_number: '23',
        college: 'St. Vincent-St. Mary HS (OH)',
        country: 'USA',
        draft_year: 2003,
        draft_round: 1,
        draft_number: 1,
        team: {
          id: 14,
          conference: 'West',
          division: 'Pacific',
          city: 'Los Angeles',
          name: 'Lakers',
          full_name: 'Los Angeles Lakers',
          abbreviation: 'LAL',
        },
      },
      {
        id: 3,
        first_name: 'Nikola',
        last_name: 'Jokic',
        position: 'C',
        height: '6-11',
        weight: '284',
        jersey_number: '15',
        college: 'Mega Leks',
        country: 'Serbia',
        draft_year: 2014,
        draft_round: 2,
        draft_number: 41,
        team: {
          id: 8,
          conference: 'West',
          division: 'Northwest',
          city: 'Denver',
          name: 'Nuggets',
          full_name: 'Denver Nuggets',
          abbreviation: 'DEN',
        },
      },
    ];

    let filteredPlayers = players;
    if (searchTerm === 'trigger-429') {
      return new HttpResponse(null, {
        status: 429,
        statusText: 'Too Many Requests',
      });
    }
    if (searchTerm) {
      filteredPlayers = players.filter(p =>
        `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return HttpResponse.json({
      data: filteredPlayers,
      meta: {
        per_page: 25,
        next_cursor: null,
      },
    });
  }),

  // 2. Mocking season averages endpoint
  http.get('/v1/season_averages', ({ request }) => {
    const url = new URL(request.url);
    const playerId = url.searchParams.get('player_id');

    if (!playerId) {
      return HttpResponse.json({ data: [] });
    }

    // Mock stats for the players we defined
    const statsMap: Record<string, unknown> = {
      '1': {
        pts: 26.4,
        ast: 5.1,
        reb: 4.5,
        stl: 0.7,
        blk: 0.4,
        turnover: 2.8,
        games_played: 74,
        min: '32:42',
        fg_pct: 0.45,
        fg3_pct: 0.408,
        ft_pct: 0.923,
      },
      '2': {
        pts: 25.7,
        ast: 8.3,
        reb: 7.3,
        stl: 1.3,
        blk: 0.5,
        turnover: 3.5,
        games_played: 71,
        min: '35:18',
        fg_pct: 0.54,
        fg3_pct: 0.41,
        ft_pct: 0.75,
      },
      '3': {
        pts: 26.4,
        ast: 9.0,
        reb: 12.4,
        stl: 1.4,
        blk: 0.9,
        turnover: 3.0,
        games_played: 79,
        min: '34:36',
        fg_pct: 0.583,
        fg3_pct: 0.359,
        ft_pct: 0.817,
      },
    };

    const playerStats = statsMap[playerId] || {
      pts: 15.0,
      ast: 4.0,
      reb: 5.0,
      stl: 1.0,
      blk: 0.5,
      turnover: 2.0,
      games_played: 82,
      min: '30:00',
      fg_pct: 0.45,
      fg3_pct: 0.35,
      ft_pct: 0.8,
    };

    return HttpResponse.json({
      data: [
        {
          ...playerStats,
          player_id: parseInt(playerId),
          season: 2024,
          fgm: 9.0,
          fga: 20.0,
          fg3m: 4.0,
          fg3a: 10.0,
          ftm: 4.4,
          fta: 5.0,
          oreb: 0.7,
          dreb: 3.8,
        },
      ],
    });
  }),
];
