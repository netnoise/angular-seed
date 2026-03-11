import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ShotChartComponent } from './shot-chart.component';
import { NbaApiService } from '../../core/services/nba-api.service';
import { signal, WritableSignal } from '@angular/core';
import { ShotChartData } from '../../core/models/player.schema';

describe('ShotChartComponent', () => {
  let component: ShotChartComponent;
  let fixture: ComponentFixture<ShotChartComponent>;

  let mockShotChart: WritableSignal<ShotChartData | null>;
  let mockIsLoadingShotChart: WritableSignal<boolean>;

  beforeEach(async () => {
    mockShotChart = signal<ShotChartData | null>(null);
    mockIsLoadingShotChart = signal(false);

    const nbaApiMock = {
      shotChart: mockShotChart,
      isLoadingShotChart: mockIsLoadingShotChart,
    };

    await TestBed.configureTestingModule({
      imports: [ShotChartComponent],
      providers: [{ provide: NbaApiService, useValue: nbaApiMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShotChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading overlay when loading', () => {
    mockIsLoadingShotChart.set(true);
    fixture.detectChanges();
    expect(component.isLoading()).toBeTrue();
    const loadingElem = fixture.nativeElement.querySelector('.nba-shot-chart__loading');
    expect(loadingElem).toBeTruthy();
  });

  it('should render SVG when data is present', fakeAsync(() => {
    mockShotChart.set({
      playerId: 237,
      playerName: 'LeBron James',
      season: '2024',
      totalShots: 2,
      shotsMade: 1,
      fieldGoalPercentage: 0.5,
      shots: [
        { x: 0, y: 0, made: true, shotType: '2PT' },
        { x: 10, y: 10, made: false, shotType: '3PT' },
      ],
    });

    tick(); // Let signal effect run
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg.shot-chart');
    expect(svg).toBeTruthy();

    const shots = fixture.nativeElement.querySelectorAll('circle.shot');
    expect(shots.length).toBe(2);
  }));

  it('should handle empty shots list', fakeAsync(() => {
    mockShotChart.set({
      playerId: 237,
      playerName: 'LeBron James',
      season: '2024',
      totalShots: 0,
      shotsMade: 0,
      fieldGoalPercentage: 0,
      shots: [],
    });

    tick();
    fixture.detectChanges();

    expect(component.hasData()).toBeFalse();
    const noDataElem = fixture.nativeElement.querySelector('.nba-shot-chart__empty');
    expect(noDataElem).toBeTruthy();
  }));
});
