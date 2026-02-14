# Gemini CLI: Prompt Engineering Best Practices

This guide outlines the standards for interacting with the Gemini CLI within the **Angular Seed** project. Adhering to these practices ensures that the AI agent generates maintainable, high-performance, and constitutionally aligned code.

## 1. Clarity: Precise Language

Avoid vague instructions. Use precise, imperative language that targets specific architectural layers and project artifacts.

- **Target Symbols**: Reference specific classes, services, or components (e.g., `LayoutService`, `SidebarComponent`).
- **Reference Specs**: Cite specific requirements from `spec.md` (e.g., "Implement behavior per §FR-011").
- **Avoid Ambiguity**: Instead of "Fix the menu," use "Resolve the z-index collision between the `HeaderComponent` and the `CDK Overlay` in the `CommandPalette`."

## 2. Structure: Requirements Modeling

Structure complex requests using the **Context-Action-Constraint (CAC)** framework:

- **Context**: Define the scope (e.g., "Regarding Feature #002 Refinement...").
- **Action**: Define the discrete operation (e.g., "Implement auxiliary routing for utility modals...").
- **Constraints**: Define the boundaries (e.g., "Must use Angular Signals for state, maintain `OnPush` change detection, and not exceed the 200ms TBT budget").

## 3. Terminology: Professional Domain Standards

Leverage the professional terminology established in the **Angular Seed Constitution** and modern Angular documentation.

- **State Management**: Use "Signals," "Computed," and "Effect" instead of "Variables" or "Watchers."
- **Architecture**: Use "Standalone Components," "Dependency Injection," and "Functional Guards."
- **Performance**: Use "Core Web Vitals," "FCP," "LCP," and "Critical Rendering Path."
- **UI/UX**: Use "BEM Methodology," "Focus Traps," and "Aesthetic Excellence."

## 4. Outcomes: Measurable Success Criteria

Define "Done" using measurable criteria that the agent can verify autonomously.

- **Quantitative Targets**: "Ensure the final production bundle remains under 120kB gzipped."
- **Verification Commands**: "The task is complete only if `npm run lint` and `npm test` pass with zero warnings."
- **Visual Stability**: "The implementation must result in a Cumulative Layout Shift (CLS) of < 0.1 as verified by Lighthouse."

## 🚀 SDD Workflow Integration

To maintain the **Spec-Driven Development (SDD)** lifecycle, explicitly guide the agent through the quality gates:

> "Using the `/speckit.analyze` results, propose a technical plan that aligns with **Constitution Principle VII (Aesthetic Excellence)**. Ensure that the implementation includes unit tests in `src/app/core/layout/services/command.service.spec.ts` before the service logic is finalized."

---

_Last Updated: 2026-02-14_
