import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PlayerSearchComponent } from './player-search.component';
import { NbaApiService } from '../../core/services/nba-api.service';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('PlayerSearchComponent', () => {
  let component: PlayerSearchComponent;
  let fixture: ComponentFixture<PlayerSearchComponent>;
  let nbaApiSpy: jasmine.SpyObj<NbaApiService>;

  beforeEach(async () => {
    nbaApiSpy = jasmine.createSpyObj('NbaApiService', ['searchPlayers', 'selectPlayer'], {
      players: signal([]),
      isLoadingPlayers: signal(false),
    });

    await TestBed.configureTestingModule({
      imports: [PlayerSearchComponent, FormsModule],
      providers: [{ provide: NbaApiService, useValue: nbaApiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce search input (500ms)', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('input');

    // Simulate typing
    input.value = 'Le';
    input.dispatchEvent(new Event('input'));
    component.searchTerm.set('Le');
    component.onSearchChange();

    tick(300);
    expect(nbaApiSpy.searchPlayers).not.toHaveBeenCalled();

    input.value = 'LeBron';
    input.dispatchEvent(new Event('input'));
    component.searchTerm.set('LeBron');
    component.onSearchChange();

    tick(500);
    expect(nbaApiSpy.searchPlayers).toHaveBeenCalledWith('LeBron');
    expect(nbaApiSpy.searchPlayers).toHaveBeenCalledTimes(1);
  }));

  it('should not search if term length < 2', fakeAsync(() => {
    component.searchTerm.set('L');
    component.onSearchChange();
    tick(500);
    expect(nbaApiSpy.searchPlayers).not.toHaveBeenCalled();
  }));

  it('should call selectPlayer when a player is selected', () => {
    const mockPlayer = {
      id: 237,
      firstName: 'LeBron',
      lastName: 'James',
      fullName: 'LeBron James',
      teamAbbreviation: 'LAL',
    };
    component.onSelectPlayer(mockPlayer);

    expect(component.selectedPlayer()).toEqual(mockPlayer);
    expect(nbaApiSpy.selectPlayer).toHaveBeenCalledWith(237);
  });

  it('should clear selection and reset state', () => {
    component.selectedPlayer.set({ id: 1 } as PlayerListItem);
    component.searchTerm.set('LeBron');

    component.onClear();

    expect(component.selectedPlayer()).toBeNull();
    expect(component.searchTerm()).toBe('');
    expect(nbaApiSpy.selectPlayer).toHaveBeenCalledWith(null);
  });
});
