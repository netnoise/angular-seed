## ADDED Requirements

### Requirement: Zod-validated data models

The system SHALL define Zod schemas for player totals, advanced stats, and shot chart data.

#### Scenario: Validating API responses

- **WHEN** the dashboard receives NBA API JSON payloads
- **THEN** the data SHALL be validated against the corresponding Zod schema before use

### Requirement: Resource-based data fetching

The system SHALL use resource-based data fetching with reactive loading and error state.

#### Scenario: Player selection changes

- **WHEN** the selected player changes
- **THEN** the system SHALL trigger new data requests and expose loading state to the UI

### Requirement: Stale request cancellation

The system SHALL cancel or ignore stale in-flight requests when a newer player selection occurs.

#### Scenario: Rapid player changes

- **WHEN** a new player is selected before prior requests resolve
- **THEN** only the latest request results SHALL be applied to the UI state
