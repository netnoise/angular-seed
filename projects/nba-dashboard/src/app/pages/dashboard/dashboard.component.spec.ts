import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { NbaApiService } from '../../core/services/nba-api.service';
import { signal } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let nbaApiSpy: jasmine.SpyObj<NbaApiService>;

  beforeEach(async () => {
    nbaApiSpy = jasmine.createSpyObj('NbaApiService', [], {
      players: signal([]),
      isLoadingPlayers: signal(false),
      playerStats: signal(null),
      isLoadingStats: signal(false),
      shotChart: signal(null),
      isLoadingShotChart: signal(false),
    });

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: NbaApiService, useValue: nbaApiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-player-search')).toBeTruthy();
    expect(compiled.querySelector('app-stats-table')).toBeTruthy();
    expect(compiled.querySelector('app-shot-chart')).toBeTruthy();
  });
});
