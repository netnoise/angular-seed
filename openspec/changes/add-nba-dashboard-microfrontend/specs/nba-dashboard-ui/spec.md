## ADDED Requirements

### Requirement: Dashboard layout

The system SHALL present a dashboard layout that includes player search, key stats, and a shot chart view.

#### Scenario: Initial dashboard view

- **WHEN** the dashboard loads
- **THEN** the layout SHALL render the search area, stats tables, and shot chart region

### Requirement: Player search interaction

The system SHALL allow users to search and select a player using an autocomplete control.

#### Scenario: Selecting a player

- **WHEN** the user selects a player from the search suggestions
- **THEN** the dashboard SHALL update the selected player state and refresh displayed data

### Requirement: Stats table rendering

The system SHALL render advanced stats in a sortable, filterable table with loading placeholders.

#### Scenario: Data loading

- **WHEN** player stats are loading
- **THEN** the dashboard SHALL display skeleton or placeholder rows until data resolves

### Requirement: Shot chart visualization

The system SHALL render a shot chart visualization derived from shot location data.

#### Scenario: Shot data available

- **WHEN** shot chart data is resolved
- **THEN** the dashboard SHALL render the shot chart using the configured court geometry
