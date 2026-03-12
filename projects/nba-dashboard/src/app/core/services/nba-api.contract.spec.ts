import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NbaApiService } from './nba-api.service';
import { CacheService } from './cache.service';
import { RateLimiterService } from './rate-limiter.service';
import {
  NbaPlayerListResponseSchema,
  NbaSeasonAveragesResponseSchema,
} from '../models/player.schema';

describe('NbaApiService Optimization & Contract', () => {
  let service: NbaApiService;
  let httpMock: HttpTestingController;
  let cache: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NbaApiService, CacheService, RateLimiterService],
    });
    service = TestBed.inject(NbaApiService);
    httpMock = TestBed.inject(HttpTestingController);
    cache = TestBed.inject(CacheService);

    // Resource doesn't trigger network call for empty search now
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('Contract Validation (Zod)', () => {
    it('should validate a real player list response structure', () => {
      const mockResponse = {
        data: [
          {
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
        ],
        meta: { per_page: 25 },
      };

      const result = NbaPlayerListResponseSchema.safeParse(mockResponse);
      expect(result.success).toBeTrue();
    });

    it('should validate a real stats response structure', () => {
      const mockResponse = {
        data: [
          {
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
          },
        ],
      };

      const result = NbaSeasonAveragesResponseSchema.safeParse(mockResponse);
      expect(result.success).toBeTrue();
    });
  });

  describe('Search Refinement (Local Filtering)', () => {
    it('should filter locally if a broader search is in cache', done => {
      const broadTerm = 'James';
      const specificTerm = 'James Harden';

      const mockBroadResponse = {
        data: [
          { id: 1, first_name: 'James', last_name: 'Harden', team: { abbreviation: 'LAC' } },
          { id: 2, first_name: 'LeBron', last_name: 'James', team: { abbreviation: 'LAL' } },
        ],
      };

      // 1. Manually prime the cache as if the interceptor did it
      const cacheKey = `/v1/players?search=${broadTerm}`;
      cache.set(cacheKey, mockBroadResponse);

      // 2. Trigger search for specific term
      service.searchPlayers(specificTerm);

      // 3. Access players signal. It should NOT trigger a network call
      // because specificity logic in NbaApiService should find 'James' in cache.
      service.players();

      // Verification: expectOne should throw if no request made, but we verify
      // by not having any pending requests after tick()
      setTimeout(() => {
        const results = service.players();
        expect(results.length).toBe(1);
        expect(results[0].fullName).toBe('James Harden');
        httpMock.expectNone(req => req.url.includes('search=James%20Harden'));
        done();
      }, 0);
    });
  });
});
