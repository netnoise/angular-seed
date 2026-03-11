import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  NbaPlayerListResponseSchema,
  NbaSeasonAveragesResponseSchema,
  ShotChartResponseSchema,
  toPlayerListItem,
} from '../models/player.schema';

@Injectable({
  providedIn: 'root',
})
export class NbaApiService {
  private http = inject(HttpClient);

  private readonly API_BASE_URL = environment.apiUrl;
  private readonly SEASON_START_MONTH = 9; // October (0-based)

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
      const params: Record<string, string | number | boolean> = {};
      if (searchTerm) {
        params['search'] = searchTerm;
      }

      return this.http.get(`${this.API_BASE_URL}/v1/players/active`, { params }).pipe(
        map(response => {
          const parsed = NbaPlayerListResponseSchema.safeParse(response);
          if (parsed.success) {
            return parsed.data.data.map(toPlayerListItem);
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
