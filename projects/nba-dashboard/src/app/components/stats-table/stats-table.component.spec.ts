import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsTableComponent } from './stats-table.component';
import { NbaApiService } from '../../core/services/nba-api.service';
import { signal, WritableSignal } from '@angular/core';
import { NbaSeasonAverages } from '../../core/models/player.schema';

describe('StatsTableComponent', () => {
  let component: StatsTableComponent;
  let fixture: ComponentFixture<StatsTableComponent>;
  let nbaApiSpy: jasmine.SpyObj<NbaApiService>;

  const mockPlayerStats: WritableSignal<NbaSeasonAverages | null> = signal(null);
  const mockIsLoadingStats = signal(false);

  beforeEach(async () => {
    nbaApiSpy = jasmine.createSpyObj('NbaApiService', [], {
      playerStats: mockPlayerStats,
      isLoadingStats: mockIsLoadingStats,
    });

    await TestBed.configureTestingModule({
      imports: [StatsTableComponent],
      providers: [{ provide: NbaApiService, useValue: nbaApiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state', () => {
    mockIsLoadingStats.set(true);
    fixture.detectChanges();
    expect(component.isLoading()).toBeTrue();
    // Verify skeleton existence
    const skeleton = fixture.nativeElement.querySelector('p-skeleton');
    expect(skeleton).toBeTruthy();
  });

  it('should transform player stats into table rows', () => {
    const stats = {
      pts: 25.7,
      reb: 7.3,
      ast: 8.3,
      fg_pct: 0.54,
      fg3_pct: 0.41,
      ft_pct: 0.75,
      stl: 1.3,
      blk: 0.5,
      turnover: 3.5,
      games_played: 71,
    };
    mockPlayerStats.set(stats);
    fixture.detectChanges();

    const rows = component.statsRows();
    expect(rows.length).toBe(10);
    expect(rows.find(r => r.stat === 'Points Per Game')?.value).toBe('25.7');
    expect(rows.find(r => r.stat === 'Field Goal %')?.value).toBe('54.0%');
  });

  it('should handle missing data gracefully', () => {
    mockPlayerStats.set(null);
    fixture.detectChanges();
    expect(component.hasData()).toBeFalse();
    expect(component.statsRows()).toEqual([]);
  });
});
