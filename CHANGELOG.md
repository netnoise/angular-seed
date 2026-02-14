# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.3] - 2026-02-14

### Added

- **Advanced Interactions & Performance** (Feature #002):
  - **Command Palette**: Implemented global action modal (Cmd+K) using `@angular/cdk/overlay` and a centralized `CommandService` for efficient action discovery.
  - **Visual FX**: Added "Cyberpunk" visual mode with neon glows, persistent `visualMode` state in `LayoutService`, and high-fidelity CSS transitions.
  - **Performance Optimization**: Optimized the critical rendering path with inlined layout CSS, preloaded fonts, and preconnect strategies, achieving zero layout shift (CLS < 0.1).
  - **Quality & SEO**: Conducted Aesthetic Excellence audit (Principle VII) and added meta description handling to satisfy Lighthouse SEO benchmarks.

## [0.2.2] - 2026-02-12

### Added

- **Navigation & Routing Refinement** (Feature #002):
  - **Hybrid Routing**: Implemented auxiliary routes (`modal` outlet) for Settings and Profile overlays, allowing utility pages to persist without context loss.
  - **Header Reorganization**: Redesigned Header layout with distinct Logo, Centered Navigation, and right-aligned Tool Icons.
  - **Responsive Layout**: Enhanced "Responsive Hide" logic to move centered header links to the mobile sidebar drawer at the 768px breakpoint.

## [0.2.1] - 2026-02-10

### Added

- **Architectural Remediation** (Feature #002):
  - **Deep Linking**: Enhanced Split-Pane view to support selection via URL parameters (`/:id`), refactoring `SplitPaneComponent` to use the Router as the single source of truth.
  - **Accessibility**: Integrated `A11yModule` (CDK) into `SidebarComponent` for initial focus management and focus trapping in mobile drawer states.
  - **Task Refinement**: Expanded quality gates and task decomposition for the refinement phase of the core layout.

## [0.2.0] - 2026-02-08

### Added

- **Core Application Layout** (Feature #002): Implemented responsive fixed-frame layout with CSS Grid
  - Created `MainLayoutComponent` with header, sidebar, footer, and scrollable main content area
  - Implemented `HeaderComponent` with responsive navigation and overflow menu
  - Implemented `SidebarComponent` with collapsible state and localStorage persistence
  - Implemented `SplitPaneComponent` for list-detail views with search and item selection
  - Implemented `MoreMenuComponent` for navigation overflow handling
  - Created `LayoutService` using Angular Signals for global layout state management
  - Added mobile-responsive behavior with backdrop and drawer pattern (<768px)
  - Integrated tablet breakpoint styles (768px-1024px)
  - Applied dark theme with JetBrains Mono and Syne fonts, neon green (#00ff9f) accent
  - Comprehensive accessibility support (WCAG 2.1 AA): semantic landmarks, ARIA labels, keyboard navigation
  - Performance-tested for 100+ items (<=100ms render/selection/filter)
  - 92 unit tests + 15 integration tests covering all 3 user stories

## [0.1.1] - 2026-02-08

docs: add planning artifacts for Core Application Layout (Spec #002)

Establishes the comprehensive planning artifacts for Feature #002, defining the technical strategy for the application's core shell.

Key changes:

- **Specification**: Created `spec.md` defining a responsive, fixed-frame layout with header, sidebar, and split-pane content.
- **Technical Plan**: Defined architecture in `plan.md` using CSS Grid for the app frame and Angular Signals for state management.
- **Task Decomposition**: Generated `tasks.md` with a 6-phase implementation strategy emphasizing TDD.
- **Visual Blueprint**: Added `docs/dashboard-layout.html` as the source of truth for the visual design.
- **Contracts**: Defined core types in `contracts/layout.types.ts`.
- **Context**: Updated `GEMINI.md` to set Feature #002 as the active development focus.

## [0.1.0] - 2026-02-05

### Summary

- feat: bootstrap Angular 19 seed with SDD workflow, documentation, and release tooling.

### Added

- **Project Structure**: Initial Angular 19 workspace setup with `core`, `shared`, and `features` directory layout.
- **Tooling**:
  - ESLint 9 with `angular-eslint` and flat config.
  - Prettier 3 integration for consistent formatting.
  - Husky and `lint-staged` for pre-commit quality checks.
- **Testing**:
  - Karma and Jasmine configuration.
  - Headless Chrome support via `npm run test:ci`.
  - Automated accessibility testing with `axe-core` and `jasmine-axe`.
- **Architecture**:
  - Enforced `OnPush` change detection strategy globally.
  - Example `ThemeService` using Angular Signals for state management.
  - HTTP Interceptor pattern example.
- **Styling**: SCSS architecture with BEM methodology and CSS Custom Properties for theming.
- **Documentation**:
  - `README.ng.md`: Implementation-specific guide.
  - `docs/structure.md`: Architectural guidelines.
  - `docs/extensions.md`: Guide for integrating third-party libraries.
  - `docs/design.md`: Design system and theming guide.

### Included patches

- 0.0.1 - 0.0.20

## [0.0.21] - 2026-02-06 (Merged: Changelog Refinement & Versioning Documentation)

### Summary

This version consolidates the final stages of changelog management, focusing on backfilling historical commit details and documenting the newly established versioning and changelog protocols. It ensures complete historical traceability and provides clear guidance for future releases, especially within the context of the SDD workflow.

### Key changes:

- **Changelog Backfill**: Comprehensive backfilling of `CHANGELOG.md` history from `v0.0.1` up to `v0.0.20`, detailing the progression of specifications, documentation updates, and tool implementations.
- **Enhanced `v0.1.0` Release Notes**: Expanded `v0.1.0` release notes with a detailed summary of added features, tooling, and architectural decisions for the initial Angular 19 bootstrap.
- **Versioning Documentation Centralization**: Created `docs/recipes/versioning-scripts.md` to centralize documentation for the custom version bump tool, its flags, and `npm` scripts.
- **Protocol Refinement**: Updated `docs/recipes/changelog-management.md` and `README.md` to reference the new versioning guide, simplifying process documentation.
- **SDD Workflow Precision**: Refined `GEMINI.md` to reflect the precise Spec-Driven Development (SDD) workflow commands (e.g., `/speckit.clarify`, `/speckit.analyze`) and expanded polish steps for agent guidance.

## [0.0.20] - 2026-02-05

### Patch

- chore: implement versioning strategy and traceable history protocol (7e26a80)

### Summary

- Establishes a formal versioning and changelog management workflow to ensure granular history preservation.

### Key changes:

- **Constitution**: Amended to v1.1.0, adding Principle VI "Traceable Project History".
- **Documentation**: Updated `changelog-management.md` with release steps (bump script usage) and updated `README.md`/`GEMINI.md` with protocol mandates.
- **App**: Exposed the current version in `AppComponent` footer.
- **Changelog**: Added `[Unreleased]` placeholder and fixed formatting in `CHANGELOG.md`.

## [0.0.19] - 2026-02-05

### Patch

- feat: Add a custom version bumping tool and release workflow (c00db96)

### Summary

- Introduces a custom version bumping tool and release workflow to streamline version management and documentation updates.
  feat: Add custom version bumping tool and release workflow

### Key changes:

- Added `tools/version-bump.mjs` to handle version bumps, update `package.json` and lockfiles, and rotate `CHANGELOG.md` sections.
- Configured npm scripts (`version:bump:*`, `version:release:*`) for patch, minor, major, and prerelease workflows.
- Implemented `src/app/version.ts` generation to expose the current version string to the application runtime.
- Added safety checks to verify `CHANGELOG.md` has unreleased content and that spec directories are clean before releasing.
- Bumped a project version to 0.1.0.

## [0.0.18] - 2026-02-05

### Patch

- docs: finalize Feature #001 and establish changelog protocol (510e04d)

### Summary

This patch focused on the crucial "Polish" phase of Feature #001, finalizing essential documentation and formally establishing the **Changelog Protocol** for the project. This ensures transparent, traceable project history, especially in a squash-merge environment, and clarifies the process for AI agent interoperability and context handoff.

### Key changes:

- **Formalized Changelog Protocol**: Established the "Accumulate Local, Publish Global" strategy, detailed in `docs/recipes/changelog-management.md`, to manage `CHANGELOG.md` updates effectively within a squash-merge workflow.
- **AI Agent Interoperability Documentation**: Updated `README.md` and `GEMINI.md` to clearly define how AI agents (like Gemini CLI) interact with the project, manage context (`GEMINI.md`, `session-summary.md`), and handoff between sessions or agents.
- **SDD Workflow Refinement**: Integrated changelog updates and versioning into the documented Spec-Driven Development (SDD) workflow, particularly within the "Polish" and "Verify" phases.
- **Documentation Structure**: Ensured the presence of key documentation files (`README.md`, `README.ng.md`, `docs/recipes/`) for comprehensive project understanding.

## [0.0.17] - 2026-02-05

### Patch

- feat: Implement Initial App Bootstrap (Spec #001) (0597109)

### Summary

This patch marks the successful execution of the entire implementation phase for Feature #001, "Initial App Bootstrap," driven by the `/speckit.implement` command. All tasks defined in `tasks.md` were completed, transforming the detailed plan into a functional, opinionated Angular 19 seed project.

### Key changes:

- **`/speckit.implement` Execution**: The command autonomously guided the creation and configuration of the Angular Seed project through all phases (Setup, Foundational, User Stories 1-4, Polish & Cross-Cutting Concerns).
- **Workspace Initialization**: Established the Angular 19 workspace with standalone components, Signals, and strict TypeScript.
- **Tooling Setup**: Configured ESLint 9 (with a11y), Prettier 3, Husky, and `lint-staged` for code quality and pre-commit checks.
- **Architectural Foundation**: Created the `core/`, `shared/`, and `features/` directory structures, along with environment-based configuration and SCSS styling.
- **Minimal Runnable App**: Implemented the `AppComponent` and a lazy-loaded `HomeComponent`, along with Karma/Jasmine unit tests and `axe-core` accessibility checks.
- **Documentation & Extensibility**: Created detailed documentation for project structure, extension points (HTTP interceptors, Signals for state), and the design system.
- **Quality Verification**: Achieved passing tests, linting, and production builds, ensuring adherence to all defined quality gates and constitutional mandates (TDD, A11y, modern Angular practices).

## [0.0.16] - 2026-02-04

### Patch

- docs: finalize bootstrap planning with quality gate and session summary (a76a42b)

### Summary

This patch focused on finalizing the bootstrap planning phase by integrating a crucial **Quality Gate** using the `/speckit.checklist` command. This ensured that the requirements for the initial app bootstrap were rigorously validated for completeness, clarity, and consistency before moving to implementation, significantly reducing future rework.

### Key changes:

- **`speckit.checklist` Usage**: Executed the `/speckit.checklist` command to generate `specs/001-initial-app-bootstrap/checklists/bootstrap-quality.md`.
- **Requirements Quality Validation**: The generated checklist served as "unit tests for requirements," evaluating the specification itself rather than the implementation.
- **Early Issue Detection**: Identified and surfaced potential ambiguities and gaps in the feature specification related to extensibility, documentation quality, and design layer abstraction.
- **Formalized Quality Gate**: Established a mandatory review point to ensure that the requirements were solid before committing resources to coding, acting as a crucial pre-implementation quality assurance step.
- **`session-summary.md` Update**: Updated the session summary to reflect the completion of the planning and quality gating phases, providing clear context for the subsequent implementation stage.

## [0.0.15] - 2026-02-04

### Patch

- docs: refactor GEMINI.md to establish AI context and SDD workflow (4e6bf34)

### Summary

This patch initiated a crucial refactoring of `GEMINI.md`, transforming it into the project's central **AI Development Context** and **Memory Hub**. This effort formalized the integration of AI agents into the Spec-Driven Development (SDD) workflow, ensuring consistent context, clear mandates, and seamless interoperability.

### Key changes:

- **`GEMINI.md` as AI Memory Hub**: Established `GEMINI.md` as the primary document for tracking the SDD state, active feature context, and project-specific mandates for AI agents.
- **Formalized SDD Workflow**: Integrated the sequential SDD steps (Specify, Plan, Task, Analyze, Implement, Polish) into `GEMINI.md`, providing a clear roadmap for AI agent operations.
- **Active Context Tracking**: Introduced sections to track the active feature, branch, directory, task list, and overall status, enhancing agent awareness.
- **Core Mandates Integration**: Incorporated project principles (Modern Angular, TDD, A11y, Reusability) from the Constitution directly into `GEMINI.md` to guide AI agent decisions.
- **Improved Interoperability**: Laid the groundwork for smooth transitions and continuous context for future AI agent interactions.

## [0.0.14] - 2026-02-04 (Merged: Task Breakdown & Refinement via SDD Analysis)

### Summary

This version consolidates the generation of the initial task breakdown (`tasks.md`) and its subsequent critical refinement for the App Bootstrap feature. This phase prominently featured the use of `/speckit.analyze` to perform cross-artifact consistency checks, ensuring the task list was robust, aligned with project mandates, and ready for efficient implementation. The analysis identified and resolved crucial gaps, transforming the task list into a highly actionable and validated roadmap.

### Key changes:

- **Initial Task Generation (`speckit.tasks`)**: A comprehensive list of tasks (`tasks.md`) was created for the Initial App Bootstrap, organizing the implementation into distinct phases.
- **SDD Analysis (`/speckit.analyze`)**: This pivotal step rigorously validated `tasks.md` against `spec.md` and `plan.md`. Its execution led to:
  - **TDD Workflow Enforcement**: Identified and corrected an initial TDD violation by explicitly reordering tasks (e.g., T013 for test creation now precedes T014 for component implementation).
  - **Mandate Adherence & Coverage**: Highlighted missing configurations for accessibility (A11y linting in T005) and gaps in concrete examples for extension points (State Management T023b, UI Library T023c). This ensured direct alignment with constitutional requirements.
  - **Quality Assurance**: Provided early detection of potential issues, preventing costly rework during the implementation phase.
- **Validated Roadmap**: As a result of `speckit.analyze` and subsequent refinements, `tasks.md` was transformed into a dependency-ordered and thoroughly validated roadmap, ensuring all critical steps for building a high-quality Angular 19 seed are covered and aligned with project principles.

## [0.0.10] - 2026-02-03

### Patch

- docs: add planning artifacts for initial app bootstrap (9a14d8b)

### Summary

This patch marks the formal initiation of the **Planning Phase** for the Initial App Bootstrap feature using the `speckit.plan` command. It involves generating key architectural and implementation strategy documents, translating the high-level specification into a concrete technical approach.

### Key changes:

- **`speckit.plan` Execution**: This step generated core planning artifacts based on the previously clarified `spec.md` and adherence to `constitution.md`.
- **`plan.md` Creation**: Established the detailed technical context, architecture, and constitutional checks for the feature implementation.
- **`research.md` Creation**: Documented technical decisions, their rationale, and alternatives considered during the planning phase.
- **`data-model.md` Creation**: Outlined any initial data entities and relationships (minimal for the bootstrap).
- **`quickstart.md` Creation**: Provided early integration scenarios and basic setup instructions, anticipating developer onboarding.
- **Constitution Check Integration**: Ensured the proposed technical plan aligns with the project's constitutional principles before implementation.

## [0.0.9] - 2026-02-02 (Merged: Initial Documentation & SDD Setup)

### Summary

This version consolidates a series of foundational patches (originally v0.0.3 to v0.0.9) that established the core documentation and the initial framework for the Spec-Driven Development (SDD) workflow. These changes laid critical groundwork by defining project standards, structure, and early AI-assisted development processes.

### Key Highlights:

- **Initial Documentation Structure**: Significant enhancements to the `README.md` for clarity and better organization, covering project overview, technology, and workflow guidance.
- **Constitution Establishment**: The project's constitution (v1.0.1) was formally amended to align `README` content and integrate SDD workflow principles, emphasizing Template Reusability.
- **Spec-Driven Development (SDD) Framework**: Initial app bootstrap specifications (`spec.md`), command definitions, and planning artifacts (`plan.md`) were introduced. This sets up the core process for how features will be specified, planned, and managed.
- **Modern Angular Standards Enforcement**: Explicit documentation was added to enforce modern Angular practices and quality gates directly within the specification documents.
- **AI Agent Context**: A session summary for Spec #001 preparation phase was added, and Gemini Code Assist configurations were introduced, beginning the formalization of AI agent context within the project.

### Included Patches (Original SHAs):

- `0.0.9` - docs: add session summary for Spec #001 preparation phase (a9f023a)
- `0.0.8` - docs: add command definitions for Spec-Driven Development workflow (9606238)
- `0.0.7` - docs: update bootstrap spec with tech stack clarifications (a13c98c)
- `0.0.6` - docs: enforce modern Angular standards and strict quality gates in specs (b98cbe0)
- `0.0.5` - docs: Add initial app bootstrap specification (86dd837)
- `0.0.4` - docs: amend constitution to v1.0.1 (README alignment, spec-driven workflow, Template Reusability) (872027f)
- `0.0.3` - Enhance README formatting and structure for clarity... (139d082)

## [0.0.2] - 2026-01-27

### Patch

- spectiy init (d7f6c39)

## [0.0.1] - 2025-05-23

### Patch

- Initial commit (bf04770)
