# Angular Seed: AI Development Context

This file serves as the primary memory and coordination hub for AI agents (Gemini CLI) working on this project. It tracks the **Spec-Driven Development (SDD)** state and project-specific mandates.

## 🚀 Spec-Driven Development (SDD) Workflow

All feature development MUST follow this lifecycle:

1.  **Specify** (`spec.md`): Define user stories, requirements, and acceptance criteria.
2.  **Clarify** (`/speckit.clarify`): Resolve ambiguities, updating `spec.md`.
3.  **Plan** (`/speckit.plan`): Map technical architecture, stack choices, and constitutional checks.
4.  **Task** (`/speckit.tasks`): Generate atomic, dependency-ordered implementation checklists.
5.  **Implement**: Execute tasks iteratively with TDD, updating `tasks.md`.
    /conm6. **Polish**: Finalize documentation, update `CHANGELOG.md`, run version bump, and ensure the feature's `session-summary.md` (now in `docs/session-summaries/`) is updated for agent handoff.
6.  **Analyze**: Run cross-artifact consistency checks (`/speckit.analyze`).

## 📍 Active Context

- **Feature**: #002 Core Application Layout
- **Branch**: `002-core-app-layout`
- **Active Directory**: `specs/002-core-app-layout/`
- **Task List**: `specs/002-core-app-layout/tasks.md`
- **Session Summary**: `docs/session-summaries/002-core-app-layout.md`
- **Status**: Phase 13: Performance Optimization.

---

## 🛠 Active Technologies & Commands

- **Stack**: Angular 19.x (Standalone, Signals), TS (Strict), SCSS (BEM), Karma/Jasmine.
- **Visuals**: CSS Custom Properties, Advanced SCSS, Motion/Animations (Pending choice).
- **Lint/Format**: ESLint 9 (Flat Config), Prettier 3.
- **Quality**: Husky + lint-staged (A11y validation integrated).
- **Test**: `npm test` (Karma), `npm run test:ci` (Headless)
- **Lint**: `npm run lint` (ESLint)
- **Build**: `npm run build` (Production)

---

## 📜 Core Mandates (from Constitution)

1.  **Modern Angular**: Standalone components, Signals for state, `OnPush` detection, functional APIs (`input()`, `inject()`).
2.  **High-Fidelity UI/UX**: All features must deliver a "polished and standing out" design. Aesthetics, smooth transitions, and refined typography are high-priority requirements.
3.  **TDD First**: Write tests (`.spec.ts`) before implementation logic.
4.  **A11y Standards**: WCAG AA compliance enforced via AXE and linting.
5.  **Reusability**: Code must be modularized into `core/`, `shared/`, or `features/`.
6.  **Traceable History**: Mandatory use of SemVer and "Accumulate Local, Publish Global" for changelogs.
7.  **Checklist Enforcement**: During the 'Implement' and 'Verify' phases, all checklists generated in the feature's `specs/<feature-id>/checklists/` directory MUST be actively consulted and enforced as quality gates.

---

## 🔄 Changelog & Versioning Protocol ("Manual Transmission")

1.  **Accumulate**: During development, maintain granular changes in `specs/{id}/changes.md`.
2.  **Publish**: In the final "Polish" phase, append bullets to the root `CHANGELOG.md` under `## [Unreleased]`.
3.  **Bump**: Run `npm run version:bump [patch|minor|major]` to update project files.
4.  **Tag**: Manually commit and tag the release (or use `--git` flag if automated tagging is desired).

**Example Entry in root CHANGELOG:**

```markdown
## [0.2.0] - YYYY-MM-DD

### Feature #002 - Dashboard

- Added `DashboardComponent` with lazy loading
- Implemented `WidgetService` using Signals
- Fixed layout bug in `GridSystem`
```

---

## 📚 Knowledge Base

- **Decision Log**: See `specs/001-initial-app-bootstrap/research.md`.
- **Data Model**: See `specs/001-initial-app-bootstrap/data-model.md`.
- **Architecture**: See `docs/structure.md`.
- **Extensions**: See `docs/extensions.md`.

---

## 🕒 Recent Activity

- **2026-02-04**: Implementation of Feature #001 complete.
- **2026-02-04**: Workspace initialized, structure established, tests passing.
- **2026-02-04**: `CHANGELOG.md` generated for v0.1.0.

## Active Technologies

- TypeScript 5.x / Angular 19.x + `@angular/router`, `@angular/common`, `@angular/cdk` (A11y, Overlay, Portal) (002-core-app-layout)
- `localStorage` (Sidebar state, Theme preference) (002-core-app-layout)

- TypeScript 5.x / Angular 19.x + `@angular/router`, `@angular/common` (002-core-app-layout)
- `localStorage` (for sidebar state persistence) (002-core-app-layout)

## Recent Changes

- 002-core-app-layout: Added TypeScript 5.x / Angular 19.x + `@angular/router`, `@angular/common`
