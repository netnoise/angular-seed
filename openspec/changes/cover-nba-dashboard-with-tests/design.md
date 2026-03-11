## Context

The `nba-dashboard` feature contains several critical logic paths:

- **Rate Limiting**: Ensuring exactly 5 requests per 60 seconds.
- **Caching**: Avoiding redundant network calls for 5 minutes.
- **Input Debouncing**: Throttling user input to prevent rapid-fire API requests.

These features currently lack automated tests, making them susceptible to regressions during refactoring or feature expansion.

## Goals / Non-Goals

**Goals:**

- **Unit Coverage**: Achieve 100% logic coverage for `RateLimiterService` and `CacheService`.
- **Component Integrity**: Verify UI-to-Service interaction for `PlayerSearchComponent` and `RateLimitStatusComponent`.
- **Integration Reliability**: Ensure the `nbaApiInterceptor` correctly identifies cache hits and enforces rate limits before hitting the network.

**Non-Goals:**

- **End-to-End Testing**: This change does not include Playwright/Cypress E2E tests.
- **Visual Regression**: No visual snapshot testing.
- **Performance Benchmarking**: Only functional testing is in scope.

## Decisions

### 1. Test Runner & Framework

- **Decision**: Use Jasmine and Karma (project standard).
- **Rationale**: Consistent with the existing `app.component.spec.ts` and the project's root `karma.conf.js`.

### 2. Time Manipulation in Service Tests

- **Decision**: Use `fakeAsync` and `tick()` for `RateLimiterService`.
- **Rationale**: The service relies on `Date.now()` and `setInterval`. `fakeAsync` allows precise simulation of the 60-second window without waiting for real time.

### 3. HTTP Mocking

- **Decision**: Use `HttpTestingController` from `@angular/common/http/testing`.
- **Rationale**: This is the standard Angular way to mock backend responses and verify request URLs/params/headers without a real server.

### 4. Component Interaction

- **Decision**: Mock `NbaApiService` when testing components.
- **Rationale**: Isolates component logic from service implementation details and prevents accidental real network calls during component tests.

### 5. Interceptor Testing

- **Decision**: Test the interceptor in isolation by providing it in a `TestBed` with `provideHttpClient(withInterceptors([nbaApiInterceptor]))`.
- **Rationale**: Verifies that the interceptor correctly manipulates the request/response stream in an integrated environment.

## Risks / Trade-offs

- **[Risk]** → Tests for `RateLimiterService` might be sensitive to internal `setInterval` logic.
  - **Mitigation**: Use `discardPeriodicTasks()` in `afterEach` or clear intervals explicitly.
- **[Risk]** → `localStorage` usage in `CacheService` might persist between test runs.
  - **Mitigation**: Mock `localStorage` or ensure `localStorage.clear()` is called in `beforeEach`.
