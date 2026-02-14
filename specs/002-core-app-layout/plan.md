# Implementation Plan: Core Application Layout Refinement

**Branch**: `002-core-app-layout` | **Date**: 2026-02-09 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `spec.md` (updated with Phase 8 & 9 requirements)

## Summary

Refine the Core Application Layout to support advanced navigation patterns, visual experimentation, and robust accessibility. Key additions include a "Hybrid" routing strategy for modal-based utility pages (Settings/Profile), a global Command Palette (Cmd+K), a "Visual FX" toggle for Cyberpunk aesthetics, and a responsive "Hide" strategy for the centered header navigation. This plan also incorporates **performance optimizations to improve FCP and LCP** based on Lighthouse reports.

## Technical Context

**Language/Version**: TypeScript 5.x / Angular 19.x
**Primary Dependencies**: `@angular/router`, `@angular/common`, `@angular/cdk` (A11y, Overlay, Portal)
**Storage**: `localStorage` (Sidebar state, Theme preference)
**Testing**: Karma, Jasmine (Unit & Integration)
**Target Platform**: Modern Web Browsers (Mobile, Tablet, Desktop)
**Project Type**: Web Application
**Performance Goals**: FCP < 1.5s, LCP < 2.5s, TBT < 200ms, CLS < 0.1 on Fast 3G (1.6 Mbps / 150ms RTT); <100ms interaction latency
**Constraints**: WCAG 2.1 AA Compliance, Mandatory Dark Mode (Base), Zero-layout-shift on header updates.
**Scale/Scope**: Core application shell enhancements.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- [x] **I. Modern Angular Standards**: Uses Signals for new UI states (Command Palette, FX Toggle), Standalone components for all new features.
- [x] **II. Template Reusability**: Command Palette designed as a shared service/component.
- [x] **III. Technology Stack Experimentation**: "Cyberpunk" Visual FX mode allows CSS experimentation. Command Palette explores CDK Overlay.
- [x] **IV. Testing & Quality Standards**: TDD for all new interaction flows (Focus Trap, Command Palette).
- [x] **V. Documentation & Examples**: Updates to `quickstart.md` for new shell features.
- [x] **VI. Traceable Project History**: Follows SDD (Spec -> Plan -> Tasks) for Phase 8/9 updates.
- [x] **VII. Polished UI/UX & Aesthetic Excellence**: Audit task T078 ensures high-fidelity polish and transition smoothness.

## Project Structure

### Documentation (this feature)

```text
specs/002-core-app-layout/
├── plan.md              # This file
├── research.md          # Layout strategy, Modal routing, Command Palette tech
├── data-model.md        # Types for Tools, Commands, Theme State
├── quickstart.md        # Updated guide for layout usage
├── contracts/           # Interfaces for CommandService
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
src/app/core/
├── layout/
│   ├── components/
│   │   ├── header/          # Updated with Center Nav, Tools
│   │   ├── command-palette/ # NEW: Global command modal
│   │   ├── settings-modal/  # NEW: Wrapper for settings
│   │   └── sidebar/
│   ├── services/
│   │   ├── layout.service.ts # Updated with FX state, Modal state
│   │   └── command.service.ts # NEW: Command registry
│   └── main-layout.component.ts
└── models/
    └── layout.types.ts      # Updated with ToolIcon, Command definitions
```

**Structure Decision**:

- **Command Palette**: Placed in `core/layout` as it's a fundamental part of the shell.
- **Routing**: Utility modals (Settings) will likely use **Auxiliary Routes** or **Query Params** to maintain the underlying view state (Split Pane). This requires research.

## Complexity Tracking

| Violation                 | Why Needed                            | Simpler Alternative Rejected Because                             |
| ------------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| Auxiliary Routes/Overlays | "Hybrid" routing requirement (FR-016) | Standard routing loses context of the underlying view.           |
| Command Palette           | Global navigation speed (FR-017)      | Simple search bar is insufficient for "Actions" vs "Navigation". |
