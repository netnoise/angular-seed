## 1. Setup

- [x] 1.1 Generate a new Angular application for the NBA dashboard micro-frontend (standalone, scss).
- [x] 1.2 Configure micro-frontend integration (module federation or equivalent) and define the remote entry contract.
- [x] 1.3 Install and configure dependencies: `d3`, `zod`, `primeng`, `tailwindcss` (plus required styles setup).

## 2. MFE Shell

- [x] 2.1 Define the dashboard shell component and internal routing structure.
- [x] 2.2 Expose the dashboard entry for host mounting and document the mount path/config.

## 3. Data Layer

- [x] 3.1 Implement Zod schemas for player totals, advanced stats, and shot chart payloads.
- [x] 3.2 Build a data service using `httpResource`/signals to fetch player stats and shot data.
- [x] 3.3 Surface loading/error signals and ensure stale request results are ignored.

## 4. UI Components

- [x] 4.1 Build the player search/autocomplete component and selection state.
- [x] 4.2 Implement the advanced stats table with PrimeNG and loading skeletons.
- [x] 4.3 Implement the D3 shot chart component and rendering lifecycle.

## 5. Integration & Verification

- [x] 5.1 Wire data services into the dashboard page and verify UI updates on player change.
- [x] 5.2 Smoke-test the dashboard micro-frontend build/serve target.
- [x] 5.3 Validate host integration (mount the dashboard and confirm internal routing works).
