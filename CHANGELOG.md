# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

## [0.0.17] - 2026-02-05

### Patch

- feat: Implement Initial App Bootstrap (Spec #001) (0597109)

## [0.0.16] - 2026-02-04

### Patch

- docs: finalize bootstrap planning with quality gate and session summary (a76a42b)

## [0.0.15] - 2026-02-04

### Patch

- docs: refactor GEMINI.md to establish AI context and SDD workflow (4e6bf34)

## [0.0.14] - 2026-02-04

### Patch

- docs: update tasks.md with TDD flow and integration examples (7967124)

## [0.0.13] - 2026-02-04

### Patch

- docs: add task breakdown for initial app bootstrap (e28aaba)

## [0.0.12] - 2026-02-04

### Patch

- chore: add Gemini Code Assist configuration (8d1845d)

## [0.0.11] - 2026-02-03

### Patch

- docs: Initialize Gemini Code Assist commands and context (6a89c6c)

## [0.0.10] - 2026-02-03

### Patch

- docs: add planning artifacts for initial app bootstrap (9a14d8b)

## [0.0.9] - 2026-02-02

### Patch

- docs: add session summary for Spec #001 preparation phase (a9f023a)

## [0.0.8] - 2026-02-01

### Patch

- docs: add command definitions for Spec-Driven Development workflow (9606238)

## [0.0.7] - 2026-02-01

### Patch

- docs: update bootstrap spec with tech stack clarifications (a13c98c)

## [0.0.6] - 2026-02-01

### Patch

- docs: enforce modern Angular standards and strict quality gates in specs (b98cbe0)

## [0.0.5] - 2026-02-01

### Patch

- docs: Add initial app bootstrap specification (86dd837)

## [0.0.4] - 2026-01-27

### Patch

- docs: amend constitution to v1.0.1 (README alignment, spec-driven workflow, Template Reusability) (872027f)

## [0.0.3] - 2026-01-27

### Patch

- Enhance README formatting and structure for clarity, including updated sections on technology stack, getting started, development workflow, and contribution guidelines. Added emphasis on key points and improved organization of prerequisites and installation instructions. (139d082)

## [0.0.2] - 2026-01-27

### Patch

- spectiy init (d7f6c39)

## [0.0.1] - 2025-05-23

### Patch

- Initial commit (bf04770)
