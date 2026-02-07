# Angular Seed: AI Development Context

This file serves as the primary memory and coordination hub for AI agents (Gemini CLI) working on this project. It tracks the **Spec-Driven Development (SDD)** state and project-specific mandates.

## 🚀 Spec-Driven Development (SDD) Workflow

All feature development MUST follow this lifecycle:

1.  **Specify** (`spec.md`): Define user stories, requirements, and acceptance criteria.
2.  **Clarify** (`/speckit.clarify`): Resolve ambiguities, updating `spec.md`.
3.  **Plan** (`/speckit.plan`): Map technical architecture, stack choices, and constitutional checks.
4.  **Task** (`/speckit.tasks`): Generate atomic, dependency-ordered implementation checklists.
5.  **Implement**: Execute tasks iteratively with TDD, updating `tasks.md`.
6.  **Polish**: Finalize documentation, update `CHANGELOG.md`, run version bump, and ensure `session-summary.md` is updated for agent handoff.
7.  **Analyze**: Run cross-artifact consistency checks (`/speckit.analyze`).

## 📍 Active Context

- **Feature**: #001 Initial App Bootstrap
- **Branch**: `feature/#001-ai-plan`
- **Active Directory**: `specs/001-initial-app-bootstrap/`
- **Task List**: `specs/001-initial-app-bootstrap/tasks.md`
- **Status**: Implementation Complete. Project Baseline Established.

---

## 🛠 Active Technologies & Commands

- **Stack**: Angular 19.x (Standalone, Signals), TS (Strict), SCSS (BEM), Karma/Jasmine.
- **Lint/Format**: ESLint 9 (Flat Config), Prettier 3.
- **Quality**: Husky + lint-staged (A11y validation integrated).
- **Test**: `npm test` (Karma), `npm run test:ci` (Headless)
- **Lint**: `npm run lint` (ESLint)
- **Build**: `npm run build` (Production)

---

## 📜 Core Mandates (from Constitution)

1.  **Modern Angular**: Standalone components, Signals for state, `OnPush` detection, functional APIs (`input()`, `inject()`).
2.  **TDD First**: Write tests (`.spec.ts`) before implementation logic.
3.  **A11y Standards**: WCAG AA compliance enforced via AXE and linting.
4.  **Reusability**: Code must be modularized into `core/`, `shared/`, or `features/`.
5.  **Traceable History**: Mandatory use of SemVer and "Accumulate Local, Publish Global" for changelogs.

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
