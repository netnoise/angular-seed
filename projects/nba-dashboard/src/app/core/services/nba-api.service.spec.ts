import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NbaApiService } from './nba-api.service';
import { effect } from '@angular/core';

describe('NbaApiService', () => {
  let service: NbaApiService;
  let httpMock: HttpTestingController;

  const mockTeam = {
    id: 14,
    conference: 'West',
    division: 'Pacific',
    city: 'Los Angeles',
    name: 'Lakers',
    full_name: 'Los Angeles Lakers',
    abbreviation: 'LAL',
  };

  const mockPlayer = {
    id: 237,
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
    team: mockTeam,
  };

  const mockStats = {
    games_played: 71,
    player_id: 237,
    season: 2024,
    min: '35:18',
    fgm: 9.6,
    fga: 17.9,
    fg3m: 2.1,
    fg3a: 5.1,
    ftm: 4.3,
    fta: 5.7,
    oreb: 0.9,
    dreb: 6.4,
    reb: 7.3,
    ast: 8.3,
    stl: 1.3,
    blk: 0.5,
    turnover: 3.5,
    pts: 25.7,
    fg_pct: 0.54,
    fg3_pct: 0.41,
    ft_pct: 0.75,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NbaApiService],
    });
    service = TestBed.inject(NbaApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch players when searchPlayers is called', done => {
    const searchTerm = 'LeBron';
    const mockResponse = {
      data: [mockPlayer],
      meta: { per_page: 25 },
    };

    TestBed.runInInjectionContext(() => {
      effect(() => {
        const players = service.players();
        if (players.length > 0) {
          expect(players[0].fullName).toBe('LeBron James');
          done();
        }
      });
    });

    service.searchPlayers(searchTerm);

    setTimeout(() => {
      const req = httpMock.expectOne(
        req => req.url.includes('/v1/players') && req.params.get('search') === searchTerm,
      );
      req.flush(mockResponse);
    }, 0);
  });

  it('should fetch player stats when selectPlayer is called', done => {
    const playerId = 237;
    const mockResponse = {
      data: [mockStats],
    };

    TestBed.runInInjectionContext(() => {
      effect(() => {
        const stats = service.playerStats();
        if (stats) {
          expect(stats.pts).toBe(25.7);
          done();
        }
      });
    });

    service.selectPlayer(playerId);

    setTimeout(() => {
      const req = httpMock.expectOne(req => req.url.includes('/v1/season_averages'));
      expect(req.request.params.get('player_id')).toBe(playerId.toString());
      req.flush(mockResponse);
    }, 0);
  });

  it('should handle API errors gracefully', done => {
    service.searchPlayers('error');

    setTimeout(() => {
      const req = httpMock.expectOne(
        req => req.url.includes('/v1/players') && req.params.get('search') === 'error',
      );
      req.error(new ErrorEvent('Network error'));

      setTimeout(() => {
        expect(service.players()).toEqual([]);
        done();
      }, 0);
    }, 0);
  });
});
