import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  NbaPlayerListResponseSchema,
  NbaSeasonAveragesResponseSchema,
  PlayerListItem,
  ShotChartResponseSchema,
  toPlayerListItem,
  NbaPlayerListResponse,
} from '../models/player.schema';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class NbaApiService {
  private http = inject(HttpClient);
  private cache = inject(CacheService);

  private readonly API_BASE_URL = environment.apiUrl;
  private readonly SEASON_START_MONTH = 9; // October (0-based)
  private readonly PLAYER_CACHE_TTL = 3600000; // 1 hour
  private readonly STATS_CACHE_TTL = 600000; // 10 minutes

  // Selected player state
  private selectedPlayerIdSignal = signal<number | null>(null);
  private searchTermSignal = signal<string>('');

  // Public read-only access to selected player
  readonly selectedPlayerId = this.selectedPlayerIdSignal.asReadonly();

  /**
   * Resource for fetching player list
   */
  playersResource = rxResource({
    request: () => this.searchTermSignal(),
    loader: ({ request: searchTerm }) => {
      if (!searchTerm || searchTerm.length < 3) {
        return of([]);
      }

      // Check if we can filter locally from a broader cached search
      const cachedResult = this.findRefinementInCache(searchTerm);
      if (cachedResult) {
        return of(cachedResult);
      }

      const params: Record<string, string | number | boolean> = {
        search: searchTerm,
      };

      return this.http.get(`${this.API_BASE_URL}/v1/players`, { params }).pipe(
        map(response => {
          const parsed = NbaPlayerListResponseSchema.safeParse(response);
          if (parsed.success) {
            const players = parsed.data.data.map(toPlayerListItem);
            // Explicitly cache with longer TTL since it's a GET call that interceptor will also cache
            // But here we're doing it to ensure we can find it for refinements
            return players;
          }
          console.error('Player list validation failed:', parsed.error);
          return [];
        }),
        catchError(error => {
          console.error('Error fetching players:', error);
          return of([]);
        }),
      );
    },
  });

  /**
   * Tries to find a broader search in cache to filter locally
   */
  private findRefinementInCache(term: string): PlayerListItem[] | null {
    const normalizedTerm = term.toLowerCase();

    // Iterate backwards through the string to find the longest parent match
    for (let i = term.length - 1; i >= 3; i--) {
      const parentTerm = term.substring(0, i);
      // The interceptor uses urlWithParams as key
      const cacheKey = `${this.API_BASE_URL}/v1/players?search=${encodeURIComponent(parentTerm)}`;
      const cachedData = this.cache.get(cacheKey) as NbaPlayerListResponse | null;

      if (cachedData && Array.isArray(cachedData.data)) {
        const players = cachedData.data.map(p => toPlayerListItem(p));
        const filtered = players.filter((p: PlayerListItem) =>
          p.fullName.toLowerCase().includes(normalizedTerm),
        );

        // If we have results, or if the parent search was specific enough to return NO results
        // we can trust the local filter.
        // Note: This is a PoC optimization.
        return filtered;
      }
    }
    return null;
  }

  /**
   * Resource for fetching player stats
   */
  playerStatsResource = rxResource({
    request: () => ({ playerId: this.selectedPlayerIdSignal() }),
    loader: ({ request }) => {
      if (!request.playerId) {
        return of(null);
      }

      return this.http
        .get(`${this.API_BASE_URL}/v1/season_averages`, {
          params: {
            player_id: request.playerId,
            season: this.getCurrentSeasonYear(),
          },
        })
        .pipe(
          map(response => {
            const parsed = NbaSeasonAveragesResponseSchema.safeParse(response);
            if (parsed.success) {
              return parsed.data.data[0] ?? null;
            }
            console.error('Player stats validation failed:', parsed.error);
            return null;
          }),
          catchError(error => {
            console.error('Error fetching player stats:', error);
            return of(null);
          }),
        );
    },
  });

  /**
   * Resource for fetching shot chart data
   */
  shotChartResource = rxResource({
    request: () => ({ playerId: this.selectedPlayerIdSignal() }),
    loader: ({ request }) => {
      if (!request.playerId) {
        return of(null);
      }

      // Note: balldontlie.io API doesn't have shot chart data
      // This would connect to a different NBA stats API (e.g., NBA Stats API)
      // For now, returning mock structure to demonstrate the pattern
      return of({
        playerId: request.playerId,
        playerName: 'Mock Player',
        season: '2024',
        shots: [],
        totalShots: 0,
        shotsMade: 0,
        fieldGoalPercentage: 0,
      }).pipe(
        map(mockData => {
          const parsed = ShotChartResponseSchema.safeParse({ data: mockData });
          if (parsed.success) {
            return parsed.data.data;
          }
          return null;
        }),
        catchError(error => {
          console.error('Error fetching shot chart:', error);
          return of(null);
        }),
      );
    },
  });

  /**
   * Computed signals for accessing loaded data
   */
  readonly players = computed(() => this.playersResource.value() ?? []);
  readonly playerStats = computed(() => this.playerStatsResource.value());
  readonly shotChart = computed(() => this.shotChartResource.value());

  /**
   * Loading state signals
   */
  readonly isLoadingPlayers = computed(() => this.playersResource.isLoading());
  readonly isLoadingStats = computed(() => this.playerStatsResource.isLoading());
  readonly isLoadingShotChart = computed(() => this.shotChartResource.isLoading());

  /**
   * Error state signals
   */
  readonly playersError = computed(() => this.playersResource.error());
  readonly statsError = computed(() => this.playerStatsResource.error());
  readonly shotChartError = computed(() => this.shotChartResource.error());

  /**
   * Select a player to load their stats
   */
  selectPlayer(playerId: number | null): void {
    this.selectedPlayerIdSignal.set(playerId);
  }

  /**
   * Search for players by name
   */
  searchPlayers(searchTerm: string): void {
    this.searchTermSignal.set(searchTerm);
  }

  private getCurrentSeasonYear(date = new Date()): number {
    const year = date.getFullYear();
    return date.getMonth() >= this.SEASON_START_MONTH ? year : year - 1;
  }
}
