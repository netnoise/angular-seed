## ADDED Requirements

### Requirement: Standalone dashboard application

The system SHALL provide a standalone NBA dashboard application with its own bootstrap and routing configuration.

#### Scenario: Running the dashboard app

- **WHEN** the dashboard build/serve target is executed
- **THEN** the dashboard shell SHALL bootstrap and render its root route

### Requirement: Host integration entry

The system SHALL expose a documented integration entry that the host app can load to mount the dashboard.

#### Scenario: Host mounts the dashboard

- **WHEN** the host loads the dashboard integration entry
- **THEN** the dashboard shell SHALL render within the host container and manage its internal routes

### Requirement: Style isolation

The system SHALL scope dashboard styles to prevent global CSS collisions with the host application.

#### Scenario: Host renders dashboard

- **WHEN** the dashboard is mounted inside the host
- **THEN** host styles SHALL NOT override dashboard component styles by default
