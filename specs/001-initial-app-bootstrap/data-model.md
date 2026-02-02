# Data Model: Initial App Bootstrap

**Feature**: Initial App Bootstrap
**Date**: 2026-02-02

## Entities

No domain-specific data entities are defined in the initial bootstrap specification.

The primary "entities" are architectural concepts described in the specification:

- **ProjectStructure**: Defines the organization of code into `core/`, `shared/`, and `features/`.
- **ExtensionPoint**: Represents documented integration slots for third-party libraries.
- **DesignLayer**: Defines the theming and styling approach via SCSS and CSS variables.

These are not data models that will be stored or manipulated by the application at runtime but are concepts that define the template's architecture. Future feature specifications will define concrete data models as needed.
