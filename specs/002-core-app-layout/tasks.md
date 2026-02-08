# Tasks: Core Application Layout (#002)

**Status**: Pending
**Branch**: `002-core-app-layout`

## Implementation Strategy

**Phase 1 (Setup)** establishes the project structure and shared types. **Phase 2 (Foundational)** implements the `LayoutService` state management and the base CSS Grid shell (the "App Frame") using a TDD approach. **Phase 3 (Desktop)** builds the individual components (Header, Sidebar, Panes). **Phase 4 (Navigation)** handles router integration and item selection logic. **Phase 5 (Mobile)** adds the responsive drawer behavior. **Phase 6 (Polish)** covers visual feedback, persistence, and navigation overflow using a dedicated component.

## Dependencies

- Phase 2 (Foundation) blocks Phase 3, 4, 5.
- Phase 3 (Components) blocks Phase 4, 5.
- Phase 1 must be done first.

## Phase 1: Setup

**Goal**: Initialize directory structure and core types.

- [ ] T001 Create feature directory structure `src/app/core/layout/{components,services,models}`
- [ ] T002 Define `NavigationItem` and `Theme` types in `src/app/core/models/navigation.model.ts`
- [ ] T003 [P] Create `MoreMenuComponent` skeleton in `src/app/core/layout/components/more-menu/`
- [ ] T004 Create `layout.routes.ts` or equivalent route config skeleton in `src/app/core/layout/`

## Phase 2: Foundational (State & Shell)

**Goal**: Implement the state management and the fixed CSS grid shell (FR-011) with TDD.

- [ ] T005 [P] Create failing unit tests for `LayoutService` (signals, state) in `src/app/core/layout/services/layout.service.spec.ts`
- [ ] T006 [P] Implement `LayoutService` with Signals (`sidebarOpen`, `mobileMenuOpen`) in `src/app/core/layout/services/layout.service.ts`
- [ ] T007 [P] Create failing unit tests for `MainLayoutComponent` (structure, component placement) in `src/app/core/layout/main-layout.component.spec.ts`
- [ ] T008 [P] Implement `MainLayoutComponent` skeleton in `src/app/core/layout/main-layout.component.ts`
- [ ] T009 Implement CSS Grid "App Frame" (Fixed Header/Sidebar/Footer) in `src/app/core/layout/main-layout.component.scss`

## Phase 3: Desktop Browsing (User Story 1)

**Goal**: Visible Header, Sidebar, and Split-Pane on Desktop (FR-001, FR-002, FR-003, FR-012) with TDD.

- [ ] T010 [US1] Create failing unit tests for `HeaderComponent` in `src/app/core/layout/components/header/header.component.spec.ts`
- [ ] T011 [US1] Implement `HeaderComponent` (Logo, Nav Links) in `src/app/core/layout/components/header/header.component.ts`
- [ ] T012 [US1] Create failing unit tests for `SidebarComponent` in `src/app/core/layout/components/sidebar/sidebar.component.spec.ts`
- [ ] T013 [US1] Implement `SidebarComponent` (Nav Items) in `src/app/core/layout/components/sidebar/sidebar.component.ts`
- [ ] T014 [US1] Create failing unit tests for `FooterComponent` in `src/app/core/layout/components/footer/footer.component.spec.ts`
- [ ] T015 [US1] Implement `FooterComponent` in `src/app/core/layout/components/footer/footer.component.ts`
- [ ] T016 [US1] Integrate components into `MainLayoutComponent` template
- [ ] T017 [US1] Implement Sidebar Collapse toggle logic in `LayoutService` and UI in `SidebarComponent`

## Phase 4: Item Selection (User Story 2)

**Goal**: Split-pane interaction and Detail View logic (FR-008) with TDD.

- [ ] T018 [P] [US2] Create failing unit tests for `SplitPaneComponent` in `src/app/core/layout/components/split-pane/split-pane.component.spec.ts`
- [ ] T019 [P] [US2] Implement `SplitPaneComponent` in `src/app/core/layout/components/split-pane/split-pane.component.ts`
- [ ] T020 [US2] Implement "Summary Mode" vs "Detail Mode" logic in the Detail Pane area (using Router outlet or signal)
- [ ] T021 [US2] Style independent scrolling for List and Detail panes in `src/app/core/layout/components/split-pane/split-pane.component.scss`

## Phase 5: Mobile Responsiveness (User Story 3)

**Goal**: Adapt layout for mobile screens (FR-005, FR-009).

- [ ] T022 [P] [US3] Implement CSS Media Queries for Mobile Breakpoints (<768px) in `src/app/core/layout/main-layout.component.scss`
- [ ] T023 [US3] Create failing unit tests for Mobile Drawer behavior in `src/app/core/layout/components/sidebar/sidebar.component.spec.ts`
- [ ] T024 [US3] Implement Mobile Overlay/Drawer behavior for Sidebar in `src/app/core/layout/components/sidebar/sidebar.component.ts`
- [ ] T025 [US3] Add Backdrop component/element that closes the drawer on click in `src/app/core/layout/main-layout.component.ts`

## Phase 6: Polish & Edge Cases

**Goal**: Visual Feedback, Persistence, Accessibility, and Overflow handling.

- [ ] T026 [P] [FR-006] Implement visual feedback (hover, active, focus states) for all interactive elements in `src/styles/_base.scss`
- [ ] T027 [P] Implement `localStorage` persistence for Sidebar state in `src/app/core/layout/services/layout.service.ts`
- [ ] T028 [P] Create failing unit tests for `MoreMenuComponent` in `src/app/core/layout/components/more-menu/more-menu.component.spec.ts`
- [ ] T029 [FR-013] Implement `MoreMenuComponent` and integrate into `HeaderComponent` for navigation overflow
- [ ] T030 Audit and fix Accessibility (ARIA labels, focus trap for mobile drawer)
- [ ] T031 Apply "Dashboard Summary" default view logic (SC-003, SC-004 verification)
