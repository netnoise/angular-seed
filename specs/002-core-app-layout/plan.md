# Implementation Plan: Core Application Layout

**Branch**: `002-core-app-layout` | **Date**: 2026-02-07 | **Spec**: [specs/002-core-app-layout/spec.md](specs/002-core-app-layout/spec.md)
**Input**: Feature specification from `specs/002-core-app-layout/spec.md`

## Summary

Implement the foundational application layout using Angular 19 Standalone components and Signals. The layout includes a Header, Collapsible Sidebar, Split-Pane Main Content Area, and Footer. It must be fully responsive (Desktop/Tablet/Mobile) and accessible (WCAG AA). Navigation state will be router-linked, while UI state (sidebar collapse) will be managed via Signals and persisted to localStorage.

## Technical Context

**Language/Version**: TypeScript 5.x / Angular 19.x
**Primary Dependencies**: `@angular/router`, `@angular/common`
**Storage**: `localStorage` (for sidebar state persistence)
**Testing**: Karma, Jasmine
**Target Platform**: Modern Web Browsers (Mobile, Tablet, Desktop)
**Project Type**: Web Application
**Performance Goals**: See SC-003 and SC-004 in the spec for performance targets.
**Constraints**: WCAG 2.1 AA Compliance, "Fixed App Frame" behavior (internal scrolling)
**Scale/Scope**: Core application shell, used on every page.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **I. Modern Angular Standards**: Uses Standalone Components, Signals for state (`sidebarOpen`), and OnPush detection.
- [x] **II. Template Reusability**: Components structured in `core/layout` for application-wide use.
- [x] **III. Technology Stack Experimentation**: Uses Angular 19 control flow (`@if`, `@for`).
- [x] **IV. Testing & Quality Standards**: TDD approach for layout logic and responsiveness.
- [x] **V. Documentation & Examples**: `quickstart.md` will document layout usage.
- [x] **VI. Traceable Project History**: Follows SDD (Spec -> Plan -> Tasks).

## Project Structure

### Documentation (this feature)

```text
specs/002-core-app-layout/
├── plan.md              # This file
├── research.md          # Layout strategy and state management
├── data-model.md        # Types for Navigation and Content items
├── quickstart.md        # Guide for modifying navigation
├── contracts/           # TypeScript interfaces
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
src/app/core/
├── layout/
│   ├── components/
│   │   ├── header/
│   │   ├── sidebar/
│   │   ├── footer/
│   │   └── split-pane/
│   ├── services/
│   │   └── layout.service.ts
│   └── main-layout.component.ts
└── models/
    └── layout.types.ts
```

**Structure Decision**: Layout components are Singletons by nature, placing them in `core/layout` ensures they are loaded once. `LayoutService` will handle cross-component communication (e.g., Header toggling Sidebar) using Signals.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       |            |                                      |
