# Research: Core Application Layout

**Feature**: Core Application Layout (#002)
**Date**: 2026-02-07

## 1. CSS Layout Strategy (Fixed App Frame)

**Requirement**: Header, Sidebar, and Footer must remain fixed. Only the internal content panes (List/Detail) should scroll.

**Alternatives Considered**:

- **Flexbox**: Possible, but requires careful `overflow: hidden` and `flex: 1` nesting. Can be brittle with complex nested scrolls.
- **Fixed Positioning**: Using `position: fixed` for Header/Sidebar. Causes issues with z-index and responsive overlapping.
- **CSS Grid**: Allows defining a rigid structure for the viewport.

**Decision**: **CSS Grid** with `grid-template-areas`.

- **Rationale**: Provides the most robust control over the "App Frame". We can define a grid that takes up `100vh` and `100vw`.
- **Implementation**:
  ```scss
  .app-shell {
    display: grid;
    height: 100vh;
    grid-template-rows: auto 1fr auto; /* Header, Content, Footer */
    grid-template-columns: auto 1fr; /* Sidebar, Main */
    grid-template-areas:
      'header header'
      'sidebar main'
      'footer footer'; /* Or footer inside main? Spec says persistent Footer. */
  }
  ```
  _Refinement_: To support the "Mobile Drawer" (FR-009), the mobile layout will change the grid or use `position: absolute` for the sidebar.

## 2. State Management & Persistence

**Requirement**: Sidebar collapse state must be persisted (Edge Case). Mobile sidebar is transient.

**Alternatives Considered**:

- **Component State**: State lives in `MainLayoutComponent`. Hard to share between Header (toggle button) and Sidebar.
- **NGRX/Global Store**: Overkill for simple layout state.
- **Service with Signals**: Lightweight, injectable singleton.

**Decision**: **`LayoutService` using Angular Signals**.

- **Rationale**: Angular Signals provide fine-grained reactivity. `effect()` makes persistence trivial.
- **Implementation**:
  ```typescript
  sidebarOpen = signal(true);
  constructor() {
    effect(() => localStorage.setItem('sidebarOpen', JSON.stringify(this.sidebarOpen())));
  }
  ```

## 3. Navigation Data Structure

**Requirement**: Header and Sidebar need links. "More" menu for overflow (FR-013).

**Decision**: **Typed Configuration Object**.

- **Rationale**: Hardcoding links in HTML makes maintenance hard. Defining them in a const/service allows easy updates and testing.
- **Structure**:
  ```typescript
  export interface NavigationItem {
    label: string;
    route: string;
    icon?: string;
    children?: NavigationItem[];
  }
  ```

## 4. Accessibility (Focus Management)

**Requirement**: Mobile sidebar drawer.

**Best Practice**:

- When drawer opens, trap focus within it (or at least ensure next tab goes into it).
- When drawer closes, return focus to the trigger button.
- Use `aria-expanded` on the toggle button.
- Use `aria-modal="true"` and `role="dialog"` for the mobile drawer.

**Decision**: Implement manual focus restoration in `LayoutService` or the component interactions, using Angular's `FocusMonitor` or standard DOM APIs if needed.
