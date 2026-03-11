## ADDED Requirements

### Requirement: Unit testing for RateLimiterService

The `RateLimiterService` SHALL have comprehensive unit tests verifying its ability to track requests and enforce the 5 RPM limit.

#### Scenario: Registering within limit

- **WHEN** 5 requests are registered within 60 seconds
- **THEN** all 5 calls to `registerRequest()` return `true` and `requestsRemaining()` decreases correctly

#### Scenario: Exceeding limit

- **WHEN** a 6th request is attempted within the 60-second window
- **THEN** `registerRequest()` returns `false` and `canMakeRequest()` returns `false`

#### Scenario: Limit resets after window

- **WHEN** the 60-second window for the oldest request passes
- **THEN** `requestsRemaining()` increases and `canMakeRequest()` returns `true` again

### Requirement: Unit testing for CacheService

The `CacheService` SHALL have unit tests verifying data storage, retrieval, and expiration.

#### Scenario: Setting and getting data

- **WHEN** data is saved with a key and then retrieved
- **THEN** the retrieved data matches the original data

#### Scenario: Data expires after TTL

- **WHEN** the TTL (Time-To-Live) for a cache entry passes
- **THEN** `get()` returns `null` for that key

#### Scenario: Persistent storage in localStorage

- **WHEN** data is saved to the cache
- **THEN** it is serialized and stored in `localStorage` under the specified key

### Requirement: Unit testing for NbaApiService

The `NbaApiService` SHALL be tested using `HttpTestingController` to verify correct API calls and response mapping.

#### Scenario: Fetching players

- **WHEN** `searchPlayers('LeBron')` is called
- **THEN** an HTTP GET request is made to the correct URL with search parameters

#### Scenario: Fetching player stats

- **WHEN** `selectPlayer(237)` is called
- **THEN** an HTTP GET request is made to the `season_averages` endpoint with the player ID

### Requirement: Component testing for PlayerSearchComponent

The `PlayerSearchComponent` SHALL be tested to verify user interaction and search triggering.

#### Scenario: Searching for players

- **WHEN** a user types in the search box and clicks the "Send" button
- **THEN** the `searchPlayers()` method on the `NbaApiService` is called with the search term

#### Scenario: Selecting a player

- **WHEN** a player is selected from the suggestion list
- **THEN** the `selectPlayer()` method on the `NbaApiService` is called with the player's ID

### Requirement: Component testing for RateLimitStatusComponent

The `RateLimitStatusComponent` SHALL correctly reflect the state of the `RateLimiterService`.

#### Scenario: Displaying remaining requests

- **WHEN** the `RateLimiterService` reports 3 requests remaining
- **THEN** the component displays "3/5 available" and the progress bar reflects 60% usage

#### Scenario: Showing countdown when limit reached

- **WHEN** the rate limit is reached (0 remaining)
- **THEN** the component displays a countdown timer until the next slot opens

### Requirement: Integration testing for NbaApiInterceptor

The `NbaApiInterceptor` SHALL be tested as a unit to verify its cross-cutting concerns.

#### Scenario: Adding headers to API requests

- **WHEN** a request is made to the NBA API
- **THEN** the interceptor clones the request and adds the `Authorization` header

#### Scenario: Intercepting for Rate Limiting

- **WHEN** a request is made and the `RateLimiterService` reports no capacity
- **THEN** the interceptor blocks the request and returns an error observable

### Requirement: Quota Efficiency Verification

The system SHALL ensure that cached responses do not count against the API rate limit.

#### Scenario: Cache Hit does not consume quota

- **WHEN** a request is made for data that is already cached
- **THEN** the response is returned from cache
- **AND** the `RateLimiterService.requestsRemaining()` count does NOT decrease

### Requirement: Handling 429 Rate Limit Responses

The system SHALL gracefully handle 429 Too Many Requests responses from the API.

#### Scenario: API returns 429

- **WHEN** the backend returns a 429 status code (simulated via MSW)
- **THEN** the `RateLimiterService` synchronizes its state to block further requests
- **AND** the UI displays the rate limit error
