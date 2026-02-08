# Tasks: Core Application Layout (#002)

**Status**: Pending
**Branch**: `002-core-app-layout`

## Implementation Strategy

**Phase 1 (Setup)** establishes the project structure and shared types. **Phase 2 (Foundational)** implements the `LayoutService` state management and the base CSS Grid shell (the "App Frame") using a TDD approach. **Phase 3 (Desktop)** builds the individual components (Header, Sidebar, Panes). **Phase 4 (Navigation)** handles router integration and item selection logic. **Phase 5 (Mobile)** adds the responsive drawer behavior. **Phase 6 (Polish)** covers visual feedback, persistence, accessibility, and navigation overflow using a dedicated component. **Phase 7 (Integration & Traceability)** adds integration tests and release artifacts.

## Dependencies

- Phase 2 (Foundation) blocks Phase 3, 4, 5.
- Phase 3 (Components) blocks Phase 4, 5.
- Phase 1 must be done first.
- Phase 6 (Polish) follows Phases 3-5; Phase 7 follows Phase 6.

## Phase 1: Setup

**Goal**: Initialize directory structure and core types.

- [x] T001 Create feature directory structure `src/app/core/layout/{components,services}`
- [x] T002 Define `NavigationItem`, `ContentItem`, `DetailContent`, and `DashboardSummary` types in `src/app/core/models/layout.types.ts`
- [x] T003 [P] Create `MoreMenuComponent` skeleton in `src/app/core/layout/components/more-menu/`
- [x] T004 Create `layout.routes.ts` or equivalent route config skeleton in `src/app/core/layout/`

## Phase 2: Foundational (State & Shell)

**Goal**: Implement the state management and the fixed CSS grid shell (FR-011) with TDD.

- [x] T005 [P] Create failing unit tests for `LayoutService` (signals, state) in `src/app/core/layout/services/layout.service.spec.ts`
- [x] T006 [P] Implement `LayoutService` with Signals (`sidebarOpen`, `mobileMenuOpen`) in `src/app/core/layout/services/layout.service.ts`
- [x] T007 [P] Create failing unit tests for `MainLayoutComponent` (structure, component placement) in `src/app/core/layout/main-layout.component.spec.ts`
- [x] T008 [P] Implement `MainLayoutComponent` skeleton in `src/app/core/layout/main-layout.component.ts`
- [x] T009 Implement CSS Grid "App Frame" (Fixed Header/Sidebar/Footer) in `src/app/core/layout/main-layout.component.scss`

## Phase 3: Desktop Browsing (User Story 1)

**Goal**: Visible Header, Sidebar, and Split-Pane on Desktop (FR-001, FR-002, FR-003, FR-012) with TDD.

- [x] T010 [US1] Create failing unit tests for `HeaderComponent` in `src/app/core/layout/components/header/header.component.spec.ts`
- [x] T011 [US1] Implement `HeaderComponent` (Logo, Nav Links) in `src/app/core/layout/components/header/header.component.ts`
- [x] T012 [US1] Create failing unit tests for `SidebarComponent` in `src/app/core/layout/components/sidebar/sidebar.component.spec.ts`
- [x] T013 [US1] Implement `SidebarComponent` (Nav Items) in `src/app/core/layout/components/sidebar/sidebar.component.ts`
- [x] T014 [US1] Create failing unit tests for `FooterComponent` in `src/app/core/layout/components/footer/footer.component.spec.ts`
- [x] T015 [US1] Implement `FooterComponent` in `src/app/core/layout/components/footer/footer.component.ts`
- [x] T016 [US1] Integrate components into `MainLayoutComponent` template
- [x] T017 [US1] Implement Sidebar Collapse toggle logic in `LayoutService` and UI in `SidebarComponent`

## Phase 4: Navigation & Item Selection (User Story 2)

**Goal**: Router-linked navigation states plus split-pane interaction and Detail View logic (FR-008, FR-010) with TDD.

- [x] T018 [P] [US2] Create failing unit tests for `SplitPaneComponent` in `src/app/core/layout/components/split-pane/split-pane.component.spec.ts`
- [x] T019 [P] [US2] Implement `SplitPaneComponent` in `src/app/core/layout/components/split-pane/split-pane.component.ts`
- [x] T020 [US2] Implement "Summary Mode" vs "Detail Mode" logic in the Detail Pane area (using Router outlet or signal)
- [x] T021 [US2] Style independent scrolling for List and Detail panes in `src/app/core/layout/components/split-pane/split-pane.component.scss`
- [x] T032 [P] [FR-010] Create failing unit tests for router-linked active states in Header and Sidebar
- [x] T033 [FR-010] Implement `routerLinkActive` bindings and active-state styles for Header and Sidebar navigation
- [x] T034 [P] [US2] Create failing unit tests for search filtering and "No items found" state in `SplitPaneComponent`
- [x] T035 [US2] Implement search input, filtering logic, and "No items found" message in `SplitPaneComponent`

## Phase 5: Mobile Responsiveness (User Story 3)

**Goal**: Adapt layout for mobile screens (FR-005, FR-009).

- [x] T022 [P] [US3] Implement CSS Media Queries for Mobile Breakpoints (<768px) in `src/app/core/layout/main-layout.component.scss`
- [x] T023 [US3] Create failing unit tests for Mobile Drawer behavior in `src/app/core/layout/components/sidebar/sidebar.component.spec.ts`
- [x] T024 [US3] Implement Mobile Overlay/Drawer behavior for Sidebar in `src/app/core/layout/components/sidebar/sidebar.component.ts`
- [x] T025 [US3] Add Backdrop component/element that closes the drawer on click in `src/app/core/layout/main-layout.component.ts`
- [x] T036 [US3] Implement Tablet breakpoint styles (768px-1024px) in `src/app/core/layout/main-layout.component.scss`

## Phase 6: Polish & Edge Cases

**Goal**: Visual Feedback, Persistence, Accessibility, and Overflow handling.

- [x] T026 [P] [FR-006] Implement visual feedback (hover, active, focus states) for all interactive elements in `src/styles/_base.scss`
- [x] T027 [P] Implement `localStorage` persistence for Sidebar state in `src/app/core/layout/services/layout.service.ts`
- [ ] T028 [P] Create failing unit tests for `MoreMenuComponent` in `src/app/core/layout/components/more-menu/more-menu.component.spec.ts`
- [ ] T029 [FR-013] Implement `MoreMenuComponent` and integrate into `HeaderComponent` for navigation overflow
- [x] T030 Implement semantic landmarks, ARIA labels, keyboard navigation support, and mobile drawer focus management
- [x] T031 Apply "Dashboard Summary" default view logic (FR-008, Edge Case)
- [ ] T037 [SC-005] Apply typography and theme tokens matching `dashboard-layout.html` in base and layout styles
- [ ] T038 [SC-003/SC-004] Add performance checks for item selection updates and search filtering (<=100ms for 100 items)
- [ ] T039 [SC-002] Run automated a11y audit (configured tool) and record results in `specs/002-core-app-layout/changes.md`
- [ ] T046 [P] [FR-007] Create failing unit tests for keyboard navigation and focus management (header links, sidebar items, mobile drawer)
- [x] T047 [Edge Case] Apply truncation/wrapping rules for long list titles in `src/app/core/layout/components/split-pane/split-pane.component.scss`

## Phase 7: Integration & Traceability

**Goal**: Integration tests and traceable release artifacts.

- [ ] T040 [US1] Create failing integration tests for fixed frame layout and breakpoint rendering in `src/app/core/layout/main-layout.integration.spec.ts`
- [ ] T041 [US2] Create failing integration tests for item selection and summary fallback in `src/app/core/layout/main-layout.integration.spec.ts`
- [ ] T042 [US3] Create failing integration tests for mobile drawer/backdrop behavior in `src/app/core/layout/main-layout.integration.spec.ts`
- [x] T043 Update `specs/002-core-app-layout/changes.md` with implemented changes (Accumulate)
- [ ] T044 Append feature entries to root `CHANGELOG.md` under `## [Unreleased]`
- [ ] T045 Run `npm run version:bump [patch|minor|major]` and verify version artifacts
