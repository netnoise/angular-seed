import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { NbaApiService } from '../../core/services/nba-api.service';

interface StatsRow {
  stat: string;
  value: string | number;
}

@Component({
  selector: 'app-stats-table',
  imports: [CommonModule, TableModule, SkeletonModule],
  templateUrl: './stats-table.component.html',
  styleUrl: './stats-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsTableComponent {
  private nbaApi = inject(NbaApiService);

  isLoading = computed(() => this.nbaApi.isLoadingStats());
  hasData = computed(() => !!this.nbaApi.playerStats());

  // Transform stats into table rows
  statsRows = computed<StatsRow[]>(() => {
    const stats = this.nbaApi.playerStats();
    if (!stats) return [];

    return [
      { stat: 'Games Played', value: stats.games_played ?? 0 },
      { stat: 'Points Per Game', value: (stats.pts ?? 0).toFixed(1) },
      { stat: 'Rebounds Per Game', value: (stats.reb ?? 0).toFixed(1) },
      { stat: 'Assists Per Game', value: (stats.ast ?? 0).toFixed(1) },
      { stat: 'Field Goal %', value: ((stats.fg_pct ?? 0) * 100).toFixed(1) + '%' },
      { stat: 'Three Point %', value: ((stats.fg3_pct ?? 0) * 100).toFixed(1) + '%' },
      { stat: 'Free Throw %', value: ((stats.ft_pct ?? 0) * 100).toFixed(1) + '%' },
      { stat: 'Steals Per Game', value: (stats.stl ?? 0).toFixed(1) },
      { stat: 'Blocks Per Game', value: (stats.blk ?? 0).toFixed(1) },
      { stat: 'Turnovers Per Game', value: (stats.turnover ?? 0).toFixed(1) },
    ];
  });

  skeletonRows = Array(10)
    .fill({})
    .map(() => ({ stat: '', value: '' }));
}
