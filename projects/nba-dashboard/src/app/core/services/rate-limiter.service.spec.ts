import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { RateLimiterService } from './rate-limiter.service';

describe('RateLimiterService', () => {
  let service: RateLimiterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // We don't inject here yet to control the zone
  });

  afterEach(fakeAsync(() => {
    discardPeriodicTasks();
  }));

  it('should be created', fakeAsync(() => {
    service = TestBed.inject(RateLimiterService);
    expect(service).toBeTruthy();
  }));

  it('should allow up to 5 requests', fakeAsync(() => {
    service = TestBed.inject(RateLimiterService);
    expect(service.canMakeRequest()).toBeTrue();
    expect(service.requestsRemaining()).toBe(5);

    for (let i = 0; i < 5; i++) {
      expect(service.registerRequest()).toBeTrue();
    }

    expect(service.requestsRemaining()).toBe(0);
    expect(service.canMakeRequest()).toBeFalse();
    expect(service.registerRequest()).toBeFalse();
  }));

  it('should reset quota after 1 minute window (fakeAsync)', fakeAsync(() => {
    service = TestBed.inject(RateLimiterService);
    // Register 5 requests at different times
    service.registerRequest(); // t=0
    tick(10000); // 10s pass
    service.registerRequest(); // t=10s
    tick(10000); // 20s pass
    service.registerRequest();
    service.registerRequest();
    service.registerRequest(); // t=20s (all 5 registered)

    expect(service.canMakeRequest()).toBeFalse();
    expect(service.requestsRemaining()).toBe(0);

    // Wait until 1 minute since first request (t=60s)
    // We need to wait 60001 - current time (20000) = 40001
    tick(40001);

    // Now 1st request should be cleaned up
    expect(service.canMakeRequest()).toBeTrue();
    expect(service.requestsRemaining()).toBe(1);

    // Wait until 1 minute since 2nd request (t=70s)
    // 2nd request was at 10s. 70s - 60s (current) = 10s
    tick(10000);
    expect(service.requestsRemaining()).toBe(2);

    // Wait until 1 minute since last requests (t=80s)
    // Last requests were at 20s. 80s - 70s = 10s
    tick(10000);
    expect(service.requestsRemaining()).toBe(5);
  }));

  it('should correctly calculate nextResetTime', fakeAsync(() => {
    service = TestBed.inject(RateLimiterService);
    const startTime = Date.now();
    service.registerRequest();

    expect(service.nextResetTime()).toBe(startTime + 60000);

    tick(30000);
    // Still the same reset time because the oldest request hasn't expired
    expect(service.nextResetTime()).toBe(startTime + 60000);

    tick(31000);
    // After cleanup, nextResetTime should be 0 because no requests are left
    expect(service.nextResetTime()).toBe(0);
  }));

  it('should immediately exhaust quota when exhaustQuota is called', fakeAsync(() => {
    service = TestBed.inject(RateLimiterService);
    expect(service.canMakeRequest()).toBeTrue();

    service.exhaustQuota();

    expect(service.canMakeRequest()).toBeFalse();
    expect(service.requestsRemaining()).toBe(0);
    expect(service.nextResetTime()).toBeGreaterThan(0);
  }));
});
