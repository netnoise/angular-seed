import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PlayerSearchComponent } from '../../components/player-search/player-search.component';
import { StatsTableComponent } from '../../components/stats-table/stats-table.component';
import { ShotChartComponent } from '../../components/shot-chart/shot-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [PlayerSearchComponent, StatsTableComponent, ShotChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
