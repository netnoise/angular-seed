## Why

The `nba-dashboard` feature was implemented with several key services (Rate Limiting, Caching) and interactive components, but it lacks comprehensive test coverage. Adding tests will ensure the stability of the feature, prevent regressions in the rate-limiting and caching logic, and improve long-term maintainability.

## What Changes

- Add unit tests for `NbaApiService`, `RateLimiterService`, and `CacheService`.
- Add component tests for `PlayerSearchComponent`, `StatsTableComponent`, `ShotChartComponent`, and `RateLimitStatusComponent`.
- Add integration tests for the `nbaApiInterceptor` to verify caching and rate-limiting behavior at the HTTP level.
- Update `AppComponent` and `DashboardComponent` to have verified test coverage.

## Capabilities

### New Capabilities

- `nba-dashboard-testing`: Comprehensive test suite covering services, components, and interceptors for the NBA dashboard feature.

### Modified Capabilities

<!-- No requirement changes to existing features, only adding tests. -->

## Impact

- **Affected Code**: All components and services within `projects/nba-dashboard/src/app/`.
- **Dependencies**: None.
- **Risk**: Low, as no functional code is being changed, only tests are being added.
