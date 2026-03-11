import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { nbaApiInterceptor } from './nba-api.interceptor';
import { environment } from '../../../environments/environment';
import { RateLimiterService } from '../services/rate-limiter.service';
import { CacheService } from '../services/cache.service';

describe('NbaApiInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let rateLimiterSpy: jasmine.SpyObj<RateLimiterService>;
  let cacheSpy: jasmine.SpyObj<CacheService>;

  beforeEach(() => {
    rateLimiterSpy = jasmine.createSpyObj('RateLimiterService', [
      'canMakeRequest',
      'registerRequest',
      'exhaustQuota',
    ]);
    cacheSpy = jasmine.createSpyObj('CacheService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([nbaApiInterceptor])),
        provideHttpClientTesting(),
        { provide: RateLimiterService, useValue: rateLimiterSpy },
        { provide: CacheService, useValue: cacheSpy },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header to NBA API requests', () => {
    rateLimiterSpy.canMakeRequest.and.returnValue(true);
    cacheSpy.get.and.returnValue(null);

    httpClient.get(`${environment.apiUrl}/test`).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(environment.nbaApiKey);
  });

  it('should block requests and return error when rate limit is exceeded', done => {
    rateLimiterSpy.canMakeRequest.and.returnValue(false);
    cacheSpy.get.and.returnValue(null);

    httpClient.get(`${environment.apiUrl}/test`).subscribe({
      error: err => {
        expect(err.message).toContain('API Rate Limit Exceeded');
        done();
      },
    });

    httpMock.expectNone(`${environment.apiUrl}/test`);
  });

  it('should return cached data if available and bypass rate limit check', done => {
    const cachedBody = { cached: 'data' };
    cacheSpy.get.and.returnValue(cachedBody);
    // Rate limit should not even be checked if it's a cache hit
    // But let's verify if interceptor behavior matches our "Quota Efficiency" requirement

    httpClient.get(`${environment.apiUrl}/test`).subscribe(response => {
      expect(response).toEqual(cachedBody);
      expect(rateLimiterSpy.canMakeRequest).not.toHaveBeenCalled();
      expect(rateLimiterSpy.registerRequest).not.toHaveBeenCalled();
      done();
    });

    httpMock.expectNone(`${environment.apiUrl}/test`);
  });

  it('should cache successful GET responses', () => {
    rateLimiterSpy.canMakeRequest.and.returnValue(true);
    cacheSpy.get.and.returnValue(null);
    const responseBody = { live: 'data' };

    httpClient.get(`${environment.apiUrl}/test`).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    req.flush(responseBody);

    expect(cacheSpy.set).toHaveBeenCalledWith(`${environment.apiUrl}/test`, responseBody);
  });

  it('should exhaust quota on 429 error from backend', done => {
    rateLimiterSpy.canMakeRequest.and.returnValue(true);
    cacheSpy.get.and.returnValue(null);

    httpClient.get(`${environment.apiUrl}/test`).subscribe({
      error: () => {
        expect(rateLimiterSpy.exhaustQuota).toHaveBeenCalled();
        done();
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    req.flush('Rate Limit Exceeded', { status: 429, statusText: 'Too Many Requests' });
  });
});
