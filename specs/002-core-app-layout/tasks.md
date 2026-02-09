# Tasks: Core Application Layout Refinement

**Status**: Pending
**Branch**: `002-core-app-layout`

## Implementation Strategy

The project is initialized, and core layout components (Header, Sidebar, Split-Pane) are implemented. This task list focuses on **Phase 8 (Remediation)** and **Phase 9 (Refinement)** to address deep linking, accessibility gaps, and new layout requirements (centered nav, command palette, visual FX). We will also implement the **Phase 10 (Advanced Interactions)** for the Command Palette and **Phase 11 (Modal Routing)** for utility overlays.

**Note on completed phases:** Phases 1-7 (Core Layout) are largely complete. I will list them for context but focus the actionable tasks on the new phases.

## Dependencies

- Phase 8 (Remediation) blocks Phase 11.
- Phase 9 (Header Refinement) blocks Phase 10.
- Phase 10 & 11 can be parallelized.

## Phase 8: Remediation (Post-Analysis)

**Goal**: Fix critical architectural and accessibility flaws (FR-014, FR-015).

- [x] T048 [FR-014] Update `app.routes.ts` to support optional `:id` parameter for SplitPane view in `src/app/app.routes.ts`
- [x] T049 [FR-014] Refactor `SplitPaneComponent` to read selection from Router (params) instead of local signal in `src/app/core/layout/components/split-pane/split-pane.component.ts`
- [x] T050 [FR-015] Integrate `A11yModule` (CDK) into `SidebarComponent` to trap focus when mobile drawer is open in `src/app/core/layout/components/sidebar/sidebar.component.ts`

## Phase 9: Header Layout Refinement

**Goal**: Reorganize header layout for centered navigation and right-aligned tools icons (FR-001, FR-013, FR-019).

- [x] T051 [FR-001] Update `HeaderComponent` template to create distinct sections: Logo (Left), Nav (Middle), Tools/Actions (Right) in `src/app/core/layout/components/header/header.component.html`
- [x] T052 [FR-001] Implement "Tools Icons" section in `HeaderComponent` with placeholder utility icons (e.g., Search, Settings) in `src/app/core/layout/components/header/header.component.ts`
- [x] T053 [FR-001] Adjust Header SCSS for centered alignment of the `nav-container` and right-alignment of `actions-container` in `src/app/core/layout/components/header/header.component.scss`
- [x] T054 [FR-001] Update Header responsiveness to maintain centered nav or collapse gracefully on mobile in `src/app/core/layout/components/header/header.component.scss`
- [x] T055 [FR-001] Add unit tests for the new header structure and tools section in `src/app/core/layout/components/header/header.component.spec.ts`

## Phase 10: Advanced Interactions (Command Palette & Visual FX)

**Goal**: Implement global Command Palette (FR-017) and Visual FX Toggle (FR-018).

- [ ] T056 [US-Cmd] Create `CommandService` to manage command registry and execution in `src/app/core/layout/services/command.service.ts`
- [ ] T057 [US-Cmd] Implement `CommandPaletteComponent` using CDK Overlay for the modal UI in `src/app/core/layout/components/command-palette/command-palette.component.ts`
- [ ] T058 [US-Cmd] Wire up "Search" icon in Header to open Command Palette via `CommandService` in `src/app/core/layout/components/header/header.component.ts`
- [ ] T059 [US-Cmd] Add global keyboard shortcut (`Cmd+K` / `Ctrl+K`) listener in `MainLayoutComponent` to toggle palette
- [ ] T060 [US-FX] Add `visualMode` signal ('standard' | 'cyberpunk') to `LayoutService` with localStorage persistence in `src/app/core/layout/services/layout.service.ts`
- [ ] T061 [US-FX] Implement "Cyberpunk" CSS variables and class toggling on `MainLayoutComponent` (e.g., `.mode-cyberpunk`) in `src/app/core/layout/main-layout.component.ts`
- [ ] T062 [US-FX] Connect "Theme Toggle" icon in Header to switch `visualMode` via `LayoutService` in `src/app/core/layout/components/header/header.component.ts`

## Phase 11: Modal Routing Strategy (Utility Overlays)

**Goal**: Implement "Hybrid" routing for Settings/Profile modals (FR-016).

- [ ] T063 [US-Modal] Add auxiliary router outlet (name="modal") to `MainLayoutComponent` template in `src/app/core/layout/main-layout.component.html`
- [ ] T064 [US-Modal] Configure auxiliary routes for `settings` and `profile` in `src/app/app.routes.ts`
- [ ] T065 [US-Modal] Create `SettingsModalComponent` wrapper with dismissible backdrop in `src/app/core/layout/components/settings-modal/settings-modal.component.ts`
- [ ] T066 [US-Modal] Update "Settings" and "Profile" links in Header/Sidebar to use `[routerLink]="[{ outlets: { modal: ['settings'] } }]"` in `src/app/core/layout/components/header/header.component.html`

## Phase 12: Polish & Verification

**Goal**: Final cleanup, edge cases, and documentation.

- [ ] T067 Ensure "Responsive Hide" logic (FR-019) moves hidden header links to Mobile Sidebar in `src/app/core/layout/components/sidebar/sidebar.component.ts`

- [ ] T068 Verify Focus Trap works for Command Palette and Settings Modal (A11y check)

- [ ] T069 Update `quickstart.md` with examples for Command registration and Modal linking

- [ ] T070 Run full test suite and ensure no regressions from new components

## Phase 13: Performance Optimization

**Goal**: Mitigate Lighthouse FCP (1.8s) and LCP (2.8s) issues for faster initial load.

- [ ] T071 Analyze critical rendering path for initial page load and identify blocking resources.

- [ ] T072 Implement critical CSS extraction and inline it in `index.html` or `styles.scss` for `MainLayoutComponent`.

- [ ] T073 Preload web fonts (JetBrains Mono, Syne) using `<link rel="preload">` in `index.html`.

- [ ] T074 Add `font-display: swap` to all font declarations in `_variables.scss` or `styles.scss`.

- [ ] T075 Review `MainLayoutComponent` and `HomeComponent` for potential LCP elements and ensure they load efficiently.

- [ ] T076 Implement `preconnect` or `dns-prefetch` for external domains (e.g., Google Fonts).

- [ ] T077 Audit initial bundle size and identify opportunities for further code splitting.
