import { Component, inject, signal, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbaApiService } from '../../core/services/nba-api.service';
import { PlayerListItem } from '../../core/models/player.schema';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-player-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-search.component.html',
  styleUrl: './player-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSearchComponent implements OnDestroy {
  private nbaApi = inject(NbaApiService);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  searchTerm = signal('');
  selectedPlayer = signal<PlayerListItem | null>(null);

  // Results from the API
  players = this.nbaApi.players;
  isLoading = this.nbaApi.isLoadingPlayers;

  constructor() {
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(query => {
        if (query.length >= 2) {
          this.nbaApi.searchPlayers(query);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm().trim());
  }

  onSelectPlayer(player: PlayerListItem): void {
    this.selectedPlayer.set(player);
    this.nbaApi.selectPlayer(player.id);
  }

  onClear(): void {
    this.selectedPlayer.set(null);
    this.searchTerm.set('');
    this.nbaApi.selectPlayer(null);
  }
}
