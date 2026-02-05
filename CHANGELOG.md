# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-02-04

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

### Changed

- Renamed default Angular `README.md` to `README.ng.md`.
- Restored project-level `README.md` with high-level objectives.
