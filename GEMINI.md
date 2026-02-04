# Angular Seed: AI Development Context

This file serves as the primary memory and coordination hub for AI agents (Gemini CLI) working on this project. It tracks the **Spec-Driven Development (SDD)** state and project-specific mandates.

## 🚀 Spec-Driven Development (SDD) Workflow

All feature development MUST follow this lifecycle:
1.  **Specify** (`spec.md`): Define user stories, requirements, and acceptance criteria.
2.  **Plan** (`plan.md`): Map technical architecture, stack choices, and constitutional checks.
3.  **Task** (`tasks.md`): Generate atomic, dependency-ordered implementation checklists.
4.  **Analyze**: Run cross-artifact consistency checks.
5.  **Implement**: Execute tasks iteratively with TDD.

---

## 📍 Active Context

- **Feature**: #001 Initial App Bootstrap
- **Branch**: `feature/#001-ai-plan`
- **Active Directory**: `specs/001-initial-app-bootstrap/`
- **Task List**: `specs/001-initial-app-bootstrap/tasks.md`
- **Status**: Tasks generated and validated. Ready for implementation.

---

## 🛠 Active Technologies & Commands

- **Stack**: Angular 19.x (Standalone, Signals), TS (Strict), SCSS (BEM), Karma/Jasmine.
- **Lint/Format**: ESLint 9 (Flat Config), Prettier 3.
- **Quality**: Husky + lint-staged (A11y validation integrated).
- **Test**: `npm test` (Karma)
- **Lint**: `npm run lint` (ESLint)
- **Build**: `npm run build` (Production)

---

## 📜 Core Mandates (from Constitution)

1.  **Modern Angular**: Standalone components, Signals for state, `OnPush` detection, functional APIs (`input()`, `inject()`).
2.  **TDD First**: Write tests (`.spec.ts`) before implementation logic.
3.  **A11y Standards**: WCAG AA compliance enforced via AXE and linting.
4.  **Reusability**: Code must be modularized into `core/`, `shared/`, or `features/`.

---

## 📚 Knowledge Base

- **Decision Log**: See `specs/001-initial-app-bootstrap/research.md` (e.g., Why Karma vs Vitest).
- **Data Model**: See `specs/001-initial-app-bootstrap/data-model.md`.
- **Extension Patterns**: See `docs/extensions.md` (to be created in Phase 5).

---

## 🕒 Recent Activity

- **2026-02-04**: Generated `tasks.md`.
- **2026-02-04**: Performed consistency analysis; identified and fixed TDD ordering and A11y linting gaps.
- **2026-02-04**: Finalized 32 tasks across 7 phases for Initial App Bootstrap.