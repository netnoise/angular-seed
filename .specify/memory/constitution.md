<!--
Sync Impact Report:
Version change: N/A → 1.0.0 (Initial constitution)
Modified principles: N/A (all new)
Added sections: Core Principles (5 principles), Technology Stack Standards, Development Workflow, Governance
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section already references constitution file
  ✅ spec-template.md - No direct constitution references, compatible
  ✅ tasks-template.md - No direct constitution references, compatible
Follow-up TODOs: None
-->

# Angular Seed Constitution

## Core Principles

### I. Modern Angular Standards (NON-NEGOTIABLE)
All code MUST follow the latest Angular best practices and patterns. Standalone components are required for all new features. Use Angular Signals for reactive state management. Prefer OnPush change detection strategy. Follow the Angular style guide and use strict TypeScript configuration. Legacy NgModule patterns are only acceptable when integrating with existing libraries that require them.

**Rationale**: As a seed project, Angular Seed must demonstrate current best practices and serve as a reference implementation for modern Angular development.

### II. Template Reusability
Every feature, component, and pattern MUST be designed for easy extraction and reuse in other projects. Code organization must be clear and modular. Configuration should be externalized and well-documented. Avoid project-specific hardcoding that would prevent reuse.

**Rationale**: Angular Seed serves as a template for future projects, so all code must be adaptable and reusable without significant refactoring.

### III. Technology Stack Experimentation
The project MUST actively explore and integrate the newest frontend tools and technological stacks. When evaluating new technologies, document the decision rationale, integration approach, and any trade-offs. Experimental features should be clearly marked and isolated from core functionality.

**Rationale**: Angular Seed is designed for coding experiments with cutting-edge technologies, enabling developers to evaluate new tools in a controlled environment.

### IV. Testing & Quality Standards
All features MUST include appropriate test coverage. Unit tests are required for services and utilities. Component tests are required for UI components. Integration tests are required for user flows. Tests must be maintainable and serve as documentation. Use Test-Driven Development (TDD) when implementing new features: write tests first, ensure they fail, then implement functionality.

**Rationale**: A template project must demonstrate quality practices and provide reliable, tested code that developers can trust and learn from.

### V. Documentation & Examples
Every feature, pattern, and configuration MUST be documented with clear examples. Code comments should explain "why" not just "what". Include usage examples, setup instructions, and common patterns. Documentation must be accessible to developers new to the project or technology stack.

**Rationale**: As a seed/template project, Angular Seed must be immediately understandable and usable by developers who may be unfamiliar with the specific technologies or patterns used.

## Technology Stack Standards

Angular Seed prioritizes modern, actively maintained technologies. When selecting dependencies:

- Prefer official Angular libraries and recommended tooling
- Choose libraries with strong TypeScript support
- Favor solutions with active communities and regular updates
- Document version choices and upgrade paths
- Mark experimental integrations clearly

Performance and bundle size considerations must be evaluated for all dependencies, especially for frontend libraries that impact user experience.

## Development Workflow

### Code Review Requirements
All changes must be reviewed for:
- Compliance with constitution principles
- Code quality and maintainability
- Test coverage adequacy
- Documentation completeness
- Reusability and template suitability

### Quality Gates
Before merging:
- All tests must pass
- Code must pass linting and formatting checks
- Documentation must be updated for new features
- Breaking changes must be documented with migration guides

### Experimentation Process
When adding experimental features:
1. Create a dedicated branch or feature flag
2. Document the technology, rationale, and integration approach
3. Include examples and usage patterns
4. Mark clearly in documentation as experimental
5. Plan for either adoption or removal based on evaluation

## Governance

This constitution supersedes all other coding practices and project guidelines. All development work must comply with these principles.

**Amendment Procedure**: Constitution amendments require:
- Documentation of the rationale for change
- Impact assessment on existing code and templates
- Update to dependent templates and documentation
- Version increment following semantic versioning

**Versioning Policy**: Constitution versions follow semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Backward incompatible principle changes or removals
- MINOR: New principles or materially expanded guidance
- PATCH: Clarifications, wording improvements, typo fixes

**Compliance Review**: All pull requests and feature implementations must verify compliance with the constitution. The Constitution Check section in implementation plans serves as a gate before proceeding with development.

**Version**: 1.0.0 | **Ratified**: 2026-01-25 | **Last Amended**: 2026-01-25
