---
name: Angular Seed
description: High-level project overview for a reusable Angular-based template project for future development and experiments.
version: 0.1.0
status: draft
---

# Angular Seed – Project Overview

## 1. Project Summary

Angular Seed is a reusable, opinionated starter template for building modern web applications and coding experiments using the latest Angular ecosystem and adjacent technologies.

The primary purpose of this project is to:

- Provide a consistent, well-structured baseline for new Angular applications.
- Enable fast prototyping of features and architectural ideas.
- Encourage specification-driven, testable, and maintainable code.
- Serve as a reference implementation for modern front-end best practices.

This document provides a high-level, implementation-agnostic overview suitable as an input for spec-driven development and further refinement into detailed technical specifications.

---

## 2. Objectives

The Angular Seed project aims to achieve the following objectives:

1. **Rapid Project Bootstrap**  
   Minimize setup time for new initiatives by providing a ready-to-use skeleton with preconfigured tooling and recommended defaults.

2. **Consistency Across Projects**  
   Standardize project structure, coding conventions, and tooling to reduce cognitive overhead when moving between projects.

3. **Modern Technology Adoption**  
   Provide a baseline that is aligned with the latest stable Angular version and complementary technologies (e.g., TypeScript, modern build tooling, testing frameworks), while remaining upgrade-friendly.

4. **Experiment-Friendly Environment**  
   Make it straightforward to spin up feature prototypes, architectural spikes, and integration experiments without compromising core quality standards.

5. **Spec-Driven Development Alignment**  
   Support workflows where features and changes are driven by written specifications (user stories, API contracts, acceptance criteria), with clear mapping from requirements to implementation.

---

## 3. Scope

### 3.1 In-Scope

- A minimal, but opinionated Angular application structure suitable for:
  - Single-page applications (SPA).
  - Admin panels / internal tools.
  - Prototyping UI features and components.
- Core tooling setup (examples, to be finalized in detailed specs):
  - TypeScript configuration.
  - Linting and formatting.
  - Unit and component testing setup.
  - Basic end-to-end (E2E) testing hooks.
  - Build and bundling pipeline aligned with current Angular CLI capabilities.
- Baseline architecture patterns:
  - Feature-based modularization.
  - Clear separation of presentation and domain logic.
  - Reactive data flow patterns where appropriate.
- Basic infrastructure concerns:
  - Configuration management (environment-based).
  - Simple logging hooks.
  - Basic error handling strategy.

### 3.2 Out-of-Scope (Initial Version)

- Domain-specific business logic or UI design systems.
- Backend services or APIs (only client integration points and contracts).
- Production-grade deployment pipelines (can provide simple CI hooks, but no full DevOps stack).
- Non-web platforms (e.g., native mobile, desktop), beyond compatibility with standard web targets.

---

## 4. Target Audience & Use Cases

### 4.1 Target Audience

- Frontend engineers starting new Angular-based projects.
- Teams evaluating or prototyping new libraries, patterns, or architecture styles within the Angular ecosystem.
- Technical leads defining standards for multiple Angular projects.
- Individuals experimenting with modern web techniques in a controlled, repeatable environment.

### 4.2 Primary Use Cases

- **New Application Bootstrap**: Clone Angular Seed, rename, and extend to serve as the foundation of a production application.
- **Prototype / Spike**: Quickly spin up experimental branches or forks to validate new ideas with minimal initial setup.
- **Reference Implementation**: Use as a canonical example for structure, configuration, and coding guidelines across the organization.
- **Training / Onboarding**: Use the template as a learning playground for new team members getting familiar with Angular and project standards.

---

## 5. High-Level Architecture

Angular Seed adopts a modular, feature-oriented architecture focused on clarity, testability, and composability.

### 5.1 Core Architectural Principles

- **Feature Modularity**
  Group code by domain feature (e.g., `auth`, `dashboard`, `settings`), rather than by technical layer only.

- **Separation of Concerns**
  Distinguish between:
  - UI components (presentational components).
  - Smart/feature components (container components).
  - Services handling domain and integration logic.

- **Reactive and Declarative UIs**
  Encourage the use of observable patterns and unidirectional data flow where appropriate.

- **Configuration over Convention Points**
  Provide clear extension points (interfaces, tokens, configuration objects) where customization is expected.

### 5.2 Angular Best Practices

This project follows modern Angular development standards. For detailed coding guidelines, see [`angular_guidelines.md`](./angular_guidelines.md).

**Key principles**:

- **Standalone components** (default in Angular 19+, no NgModules)
- **Signals for state management** (`signal()`, `computed()`)
- **Modern control flow** (`@if`, `@for`, `@switch` instead of structural directives)
- **OnPush change detection** for all components
- **Functional APIs** (`input()`, `output()`, `inject()` instead of decorators)
- **Strict TypeScript** with type safety enforcement
- **Accessibility first** (WCAG AA compliance, AXE testing)

### 5.3 Layered View (High-Level)

- **Presentation Layer**
  - Components, layouts, and routing.
  - Styling, theming, and UI state.

- **Domain / Application Layer**
  - Services encapsulating business logic.
  - Application-level state management (if used).
  - Interactors/use-cases (optional, based on chosen pattern).

- **Infrastructure / Integration Layer**
  - HTTP clients and API gateways.
  - Adapters for external services (e.g., logging, analytics).
  - Environment-specific configuration providers.

---

## 6. Technology Stack (Baseline)

> **Note**: Concrete versions and tools are intentionally abstracted here and should be specified in a separate technical specification document.

### 6.1 Core

- Angular (latest stable major version).
- TypeScript (aligned with Angular requirements).
- Angular CLI for project scaffolding, bundling, and configuration.

### 6.2 Tooling (Indicative, to be finalized)

- **Linting**: TypeScript/Angular-compatible linter.
- **Formatting**: Common formatter (e.g., opinionated, enforced in CI).
- **Unit Testing**: Angular-compatible test runner and assertion library.
- **E2E Testing**: Headless browser-based or modern web testing framework.
- **Package Management**: Node-based package manager.

### 6.3 Optional / Extensible

- State management (e.g., store/observable-based, if needed).
- UI component libraries or design system integrations.
- Internationalization and localization tooling.
- Accessibility testing integrations.

---

## 7. Project Structure (Conceptual)

A conceptual directory layout (subject to refinement):

```
root/
  src/
    app/
      core/            # Singleton services, configuration, global guards/interceptors
      shared/          # Reusable components, directives, pipes, utilities
      features/
        feature-a/
        feature-b/
      app-routing/     # Routing configuration
      app.component.*  # Root component and shell
    assets/
    environments/      # Environment-specific configuration
  tools/               # Custom scripts or tooling (optional)
  config/              # Linting, formatting, build configs (optional)
```

---

## 8. Getting Started

### 8.1 Prerequisites

Before using Angular Seed, ensure you have the following installed:

- **Node.js**: Version 18.x or higher (LTS recommended).
- **npm** or **yarn**: Package manager for dependency management.
- **Git**: Version control system.

### 8.2 Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd angular-seed
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Verify installation:
   ```bash
   npm run verify
   # or
   yarn verify
   ```

### 8.3 Development Server

Start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:4200` by default.

### 8.4 Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

Production artifacts will be generated in the `dist/` directory.

---

## 9. Development Workflow

### 9.1 Code Quality

The project enforces code quality through:

- **Linting**: Automated code analysis using ESLint or similar.
- **Formatting**: Consistent code style via Prettier or similar.
- **Type Checking**: Strict TypeScript configuration.
- **Pre-commit Hooks**: Automated checks before commits (optional).

### 9.2 Testing

Run tests using the following commands:

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# Test coverage
npm run test:coverage
```

### 9.3 Feature Development

When adding new features:

1. Create a feature branch from `main`.
2. Follow the feature-based structure in `src/app/features/`.
3. Write tests alongside implementation.
4. Update documentation as needed.
5. Submit a pull request for review.

### 9.4 Spec-Driven Development

This project strictly follows Spec-Driven Development (SDD) using the `speckit` toolset. The workflow ensures that implementation never precedes clear, documented intent.

**Core Workflow:**

1.  **Specify**: Use `/speckit.specify` to define requirements in `specs/`.
2.  **Clarify**: Use `/speckit.clarify` to resolve ambiguities.
3.  **Plan**: Use `/speckit.plan` to generate technical strategy and architecture.
4.  **Task**: Use `/speckit.tasks` to break down the plan into actionable items.
5.  **Implement**: Use `/speckit.implement` to execute tasks and generate code.
6.  **Verify**: Ensure tests pass and update `CHANGELOG.md` with new features/fixes.
7.  **Analyze**: Use `/speckit.analyze` for cross-artifact consistency checks.

---

## 10. Configuration

### 10.1 Environment Configuration

Environment-specific settings are managed through:

- `src/environments/environment.ts` - Development defaults.
- `src/environments/environment.prod.ts` - Production overrides.

### 10.2 Build Configuration

Build settings are configured in:

- `angular.json` - Angular CLI workspace configuration.
- `tsconfig.json` - TypeScript compiler options.
- `tsconfig.app.json` - Application-specific TypeScript settings.

### 10.3 Linting and Formatting

Code style is enforced via:

- `.eslintrc.json` or similar - Linting rules.
- `.prettierrc` or similar - Code formatting rules.
- Editor configuration files (`.editorconfig`, `.vscode/settings.json`).

---

## 11. Contributing

### 11.1 Contribution Guidelines

Contributions are welcome! Please follow these guidelines:

1. **Fork and Branch**: Create a feature branch from `main`.
2. **Follow Standards**: Adhere to the project's coding standards and conventions.
3. **Write Tests**: Include tests for new features and bug fixes.
4. **Update Documentation**: Keep documentation current with code changes.
5. **Submit PR**: Open a pull request with a clear description of changes.

### 11.2 Code Review Process

All contributions require:

- Passing CI/CD checks.
- Code review approval.
- Compliance with project constitution principles.
- Updated documentation where applicable.

### 11.3 Reporting Issues

When reporting issues, please include:

- Clear description of the problem.
- Steps to reproduce.
- Expected vs. actual behavior.
- Environment details (OS, Node version, etc.).
- Relevant logs or error messages.

---

## 12. Documentation

### 12.1 Project Documentation

Additional documentation can be found in:

- `docs/` - Detailed guides and references.
- `angular_guidelines.md` - Angular coding standards and best practices.
- `.specify/` - Specification-driven development artifacts.
- `.cursor/rules/` - Cursor AI agent rules and guidelines.

### 12.2 API Documentation

Generate API documentation:

```bash
npm run docs
# or
yarn docs
```

### 12.3 Architecture Decision Records

Significant architectural decisions are documented in:

- `docs/adr/` - Architecture Decision Records (ADRs).

---

## 13. License

[License information to be specified]

---

## 14. Acknowledgments

- Built with [Angular](https://angular.io/).
- Inspired by modern frontend development practices.
- Community contributions and feedback.

---

## 15. Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed list of changes, features, and bug fixes. The project follows the [Accumulate Local, Publish Global](docs/recipes/changelog-management.md) strategy to ensure a granular history is preserved even in squash-merge workflows.

---

## 16. Versioning

This project adheres to [Semantic Versioning (SemVer)](https://semver.org/). Versioning is managed via a custom local script to ensure all metadata (including the in-app version display) stays in sync. For detailed usage, refer to the [Versioning Scripts & Options](docs/recipes/versioning-scripts.md) guide.

- **Bump Version**: `npm run version:bump [patch|minor|major]`
- **In-App Display**: The current version is automatically exposed to the Angular application via `src/app/version.ts`.

---

## 17. Support

For questions, issues, or contributions:

- **Issues**: Open an issue on the repository.
- **Discussions**: Use repository discussions for questions.
- **Documentation**: Check the `docs/` directory for detailed guides.

---

**Last Updated**: 2026-01-25  
**Version**: 0.1.0  
**Status**: Draft

---

## 18. AI Agent Interoperability & Handoff

To ensure a seamless experience when switching between different AI agents (e.g., Gemini CLI, Cursor, Claude, etc.), this project employs a "State Snapshot" strategy.

### 18.1 The Handoff Hub

The file `GEMINI.md` (or agent-specific variants like `CLAUDE.md`) serves as the **Active Context Hub**. Before switching agents:

- Ensure `session-summary.md` in the active feature directory is updated.
- Update the "Task State" and "Active Constraints" in the agent-specific memory file.

### 18.2 Global Context Files

Agents should always read these files upon initialization:

- `README.md` & `README.ng.md`: Project and Tech Stack overview.
- `.specify/memory/constitution.md`: Core governance principles.
- `angular_guidelines.md`: Coding standards and prohibited patterns.
- `GEMINI.md`: Current development state and active focus.

### 18.3 Resuming Work

When a new agent takes over, the recommended first command is:

> "Read the latest `session-summary.md` and `GEMINI.md` to establish context, then check `tasks.md` for the next pending item."
