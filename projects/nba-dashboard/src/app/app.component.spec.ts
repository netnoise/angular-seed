import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { RateLimiterService } from './core/services/rate-limiter.service';
import { signal } from '@angular/core';

describe('AppComponent', () => {
  let rateLimiterSpy: jasmine.SpyObj<RateLimiterService>;

  beforeEach(async () => {
    rateLimiterSpy = jasmine.createSpyObj('RateLimiterService', [], {
      requestsRemaining: signal(5),
      nextResetTime: signal(0),
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), { provide: RateLimiterService, useValue: rateLimiterSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'nba-dashboard' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('nba-dashboard');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('NBA Player Analytics Dashboard');
  });
});
