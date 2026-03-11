## Context

This Angular workspace currently contains a single application. We need to add an NBA Analytics Dashboard that can be developed and deployed independently but still mount inside the host app. The discovery document describes a signals-first Angular 19+ architecture with httpResource, Zod validation, D3-based shot charting, and PrimeNG/Tailwind for UI.

## Goals / Non-Goals

**Goals:**

- Provide a standalone NBA dashboard micro-frontend with its own bootstrap, routing, and build output.
- Define a clear integration contract so the host can mount the dashboard without tight coupling.
- Implement core data access and UI building blocks (search, stats tables, shot chart) using the described pro stack.

**Non-Goals:**

- Full production hardening of NBA API (auth, caching, rate limits) beyond the contract needed for the MVP dashboard.
- Multi-team, multi-season advanced features outside the discovery scope.

## Decisions

- **Micro-frontend integration via Module Federation (default)**
  - **Why:** Allows the dashboard to be built/deployed independently while still loading inside the host app at runtime.
  - **Alternative:** Host-level redirect to a separate SPA or iframe. This is simpler but reduces integration fidelity and shared navigation.

- **Multi-project Angular workspace with a dedicated app**
  - **Why:** Keeps the dashboard isolated, with its own build target, assets, and baseHref. Supports clean ownership and independent CI.
  - **Alternative:** Single app with lazy-loaded routes. This is easier but does not provide independent deployment boundaries.

- **Signals + httpResource for data loading**
  - **Why:** Matches the discovery architecture and reduces manual RxJS state handling.
  - **Alternative:** RxJS services with explicit loading/error state management.

- **Zod for runtime validation**
  - **Why:** Protects UI from API contract drift and provides a single source of truth for data types.
  - **Alternative:** TypeScript-only interfaces (no runtime validation).

- **D3 for shot chart rendering**
  - **Why:** Needed for precise court geometry and scalable visualizations.
  - **Alternative:** Canvas-based charting libraries (less control over the custom court layout).

## Risks / Trade-offs

- **Module federation complexity** → Keep configuration minimal and document the remote entry contract clearly.
- **Third-party API instability** → Use Zod safeParse and user-facing error states to avoid UI crashes.
- **Build size growth from D3/PrimeNG** → Scope imports to required modules and lazy-load the dashboard route.

## Migration Plan

- Add the NBA dashboard app and integration contract behind a feature route in the host app.
- Validate local integration first, then enable remote entry loading in higher environments.
- Rollback by disabling the host route or reverting the remote entry config.

## Open Questions

- Confirm integration approach: Module Federation remote entry vs host redirect/iframe.
- Confirm deployment boundaries: separate domain/subpath or same-origin under a new baseHref.
