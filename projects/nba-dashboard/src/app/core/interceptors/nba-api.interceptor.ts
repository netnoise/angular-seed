import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap, throwError, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RateLimiterService } from '../services/rate-limiter.service';
import { CacheService } from '../services/cache.service';

export const nbaApiInterceptor: HttpInterceptorFn = (req, next) => {
  const rateLimiter = inject(RateLimiterService);
  const cache = inject(CacheService);

  if (req.url.startsWith(environment.apiUrl)) {
    // 1. Check Cache (only for GET requests)
    if (req.method === 'GET') {
      const cacheKey = req.urlWithParams;
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        // Return cached response wrapped in HttpResponse
        return of(new HttpResponse({ body: cachedData, status: 200 }));
      }
    }

    // 2. Check Rate Limit
    if (!rateLimiter.canMakeRequest()) {
      return throwError(
        () => new Error('API Rate Limit Exceeded (5 req/min). Please wait a moment.'),
      );
    }

    // 3. Register the request (optimistic registration)
    rateLimiter.registerRequest();

    const authReq = req.clone({
      setHeaders: {
        Authorization: environment.nbaApiKey,
      },
    });

    // 4. Execute Request & Cache Response
    return next(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse && req.method === 'GET') {
          cache.set(req.urlWithParams, event.body);
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 429) {
          rateLimiter.exhaustQuota();
        }
        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
