## Why

We need the NBA Analytics Dashboard to be independently buildable and deployable while remaining pluggable into the main Angular app, enabling faster iteration and clearer ownership without coupling changes to the host.

## What Changes

- Add a standalone NBA Analytics Dashboard micro-frontend app within this workspace, with its own bootstrap, routing, and build output.
- Define an integration contract for the host app (remote entry or exposed route) so the dashboard can be mounted without tight coupling.
- Implement the core dashboard data layer and UI building blocks described in the discovery document (player search, stats tables, shot chart).
- Introduce required dependencies (D3, Zod, PrimeNG, Tailwind) and shared theming/utilities scoped to the micro-frontend.

## Capabilities

### New Capabilities

- `nba-dashboard-mfe-shell`: Independent Angular app shell, routing, and micro-frontend integration contract.
- `nba-dashboard-data`: NBA API access layer with Zod-validated schemas and resource-based loading states.
- `nba-dashboard-ui`: Core UI components (search, stats tables, shot chart) and layout for the dashboard.

### Modified Capabilities

- None.

## Impact

- New application/module structure under the workspace (additional build target and routing entry).
- New UI and visualization components in the NBA dashboard micro-frontend.
- New dependencies: `d3`, `zod`, `primeng`, `tailwindcss` (plus any required Angular build config for micro-frontend output).
- Host app integration wiring (routing or module federation configuration).
