# Research: Core Application Layout Refinement

**Feature**: Core Application Layout (#002)
**Date**: 2026-02-09

## 1. Modal Routing Strategy (FR-016)

**Requirement**: Utility routes (Settings, Profile) must open as overlays _preserving_ the underlying context (Deep Linking supported).

### Options Analysis

- **A. Auxiliary Routes (Named Outlets)**:
  - _URL_: `/projects/123(modal:settings)`
  - _Pros_: Native Angular support, lazy loading, independent state.
  - _Cons_: Complex URL syntax, requires `<router-outlet name="modal">` in the shell.
- **B. Query Parameters**:
  - _URL_: `/projects/123?modal=settings`
  - _Pros_: Simple URL, easy to read.
  - _Cons_: Requires a "watcher" service to listen to params and dynamically render the component (manual component loading). Harder to genericize lazy loading.
- **C. Child Routes**:
  - _URL_: `/projects/123/settings`
  - _Pros_: Standard routing.
  - _Cons_: Destroys the parent component unless the parent explicitly keeps the `<router-outlet>` active and renders the child as an overlay. Hard to make "Global".

### Decision

**Use Auxiliary Routes (Named Outlets)**.

- **Rationale**: It is the idiomatic Angular solution for "side-by-side" or "overlay" content that needs its own routing lifecycle and lazy loading. It satisfies the "Deep Linking" requirement naturally.
- **Implementation**: Add `<router-outlet name="modal" />` to `MainLayoutComponent`. Define `{ path: 'settings', outlet: 'modal', ... }` in `app.routes.ts`.

## 2. Command Palette Implementation (FR-017)

**Requirement**: Global `Cmd+K` palette for navigation and actions.

### Options Analysis

- **A. Third-party Library**:
  - _Pros_: Fast implementation.
  - _Cons_: Dependency bloat, potential styling conflicts (especially with Cyberpunk theme).
- **B. Custom with CDK Overlay**:
  - _Pros_: Full control, leverages existing `@angular/cdk` dependency (from Focus Trap), lightweight.
  - _Cons_: Maintenance ownership.

### Decision

**Custom Implementation using `@angular/cdk/overlay`**.

- **Rationale**: We already introduced CDK for the Sidebar Focus Trap. Reusing it for the Command Palette keeps the bundle size optimal and allows perfect integration with the "Cyberpunk" theme and Signals-based state (`CommandService`).

## 3. Visual FX Toggle (FR-018)

**Requirement**: Toggle experimental visual effects without leaving Dark Mode.

### Strategy

- **State**: `LayoutService` holds a `visualMode` signal (`'standard' | 'cyberpunk'`).
- **Persistence**: Save to `localStorage`.
- **Implementation**: Apply `data-fx="cyberpunk"` attribute to the `<body>` or App Shell.
- **CSS**:
  - Standard: Flat colors, standard borders.
  - Cyberpunk: `box-shadow` glows, `backdrop-filter`, animated background gradients.
  - _Performance_: Use `transform: translate3d` for background drifts. Limit `backdrop-filter` usage to Header/Sidebar to minimize repaint cost.

## 4. Responsive Header (FR-019)

**Requirement**: Center Nav -> Hide on small screens.

### Strategy

- **CSS Grid**: Use `grid-template-columns: 1fr auto 1fr` (or similar) to enforce centering.
- **Media Queries**:
  - `@media (max-width: 1024px)`: Hide `.nav-container`.
  - Show "Menu" burger icon (if not already present/visible) to open Sidebar.
  - Ensure Mobile Sidebar contains the links that were hidden.
