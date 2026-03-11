## 1. Service Unit Tests

- [x] 1.1 Create `projects/nba-dashboard/src/app/core/services/rate-limiter.service.spec.ts` and verify 5 RPM logic using `fakeAsync` and `tick()`.
- [x] 1.2 Create `projects/nba-dashboard/src/app/core/services/cache.service.spec.ts` and verify storage, TTL expiration, and persistence using REAL `localStorage` (ensure cleanup in `afterEach`).
- [x] 1.3 Create `projects/nba-dashboard/src/app/core/services/nba-api.service.spec.ts` and verify HTTP requests and response mapping using `HttpTestingController`.

## 2. Interceptor Integration Tests

- [x] 2.1 Create `projects/nba-dashboard/src/app/core/interceptors/nba-api.interceptor.spec.ts` and verify `Authorization` header injection.
- [x] 2.2 Verify that the interceptor correctly blocks requests and returns an error when the `RateLimiterService` reports the limit is reached.
- [x] 2.3 Verify that the interceptor serves data from the `CacheService` for GET requests without making a network call.
- [x] 2.4 Verify Quota Efficiency: Ensure that a cache hit does NOT decrement the available request count in `RateLimiterService`.
- [x] 2.5 Define an MSW handler in `src/mocks/handlers.ts` that simulates a 429 Rate Limit error and verify the application's response.

## 3. Component Tests

- [x] 3.1 Create `projects/nba-dashboard/src/app/components/player-search/player-search.component.spec.ts` and verify input debouncing (500ms) and selection event emission.
- [x] 3.2 Create `projects/nba-dashboard/src/app/components/rate-limit-status/rate-limit-status.component.spec.ts` and verify the progress bar and countdown timer display.
- [x] 3.3 Create basic component tests for `StatsTableComponent` and `ShotChartComponent` to ensure they render correctly based on `NbaApiService` signals.
- [x] 3.4 Update `projects/nba-dashboard/src/app/app.component.spec.ts` and `projects/nba-dashboard/src/app/pages/dashboard/dashboard.component.spec.ts` to include necessary mocks for testing.

## 4. Verification

- [x] 4.1 Run all tests for the project using `npx ng test nba-dashboard --watch=false` and ensure 100% pass rate.
- [x] 4.2 Verify that no regressions were introduced to the dashboard's functionality during test implementation.
- [x] 4.3 Add a basic Playwright smoke test (`e2e/nba-dashboard.spec.ts`) to verify the dashboard mounts and can perform a simple (mocked) search.
