# Tasks: Initial App Bootstrap

**Feature**: Initial App Bootstrap
**Status**: Pending
**Spec**: [spec.md](./spec.md)

## Dependencies

- **Phase 1 (Setup)**: Blocks Phase 2
- **Phase 2 (Foundational)**: Blocks User Stories
- **Phase 3 (US1)**: Independent, but blocked by Foundational.
- **Phase 4 (US2)**: Depends on Phase 3
- **Phase 5 (US3)**: Depends on Phase 3 (can run parallel with US4)
- **Phase 6 (US4)**: Depends on Phase 3 (can run parallel with US3)

## Phase 1: Setup

**Goal**: Initialize the project repository and toolchain.

- [ ] T001 Initialize Angular 19 workspace in project root
- [ ] T002 Update `tsconfig.json` to enable strict mode and align with Angular 19
- [ ] T003 Create `.nvmrc` file in project root
- [ ] T004 Create `.editorconfig` file in project root
- [ ] T005 Install and configure ESLint 9, Prettier 3, and `angular-eslint` (including a11y plugins) in `package.json` and `.eslintrc.json`
- [ ] T006 Install and configure Husky and lint-staged in `package.json` and `.husky/`

## Phase 2: Foundational

**Goal**: Establish the core project structure and shared configurations.

- [ ] T007 Create core directory structure in `src/app/core/`
- [ ] T008 Create shared directory structure in `src/app/shared/`
- [ ] T009 Create features directory structure in `src/app/features/`
- [ ] T010 Configure SCSS support in `angular.json`
- [ ] T011 Create environment configuration files in `src/environments/`

## Phase 3: User Story 1 - Minimal Runable App

**Goal**: Deliver a running, testable single-page application shell.
**Priority**: P1

- [ ] T012 [US1] Configure Karma and Jasmine in `karma.conf.js`
- [ ] T013 [US1] Create baseline unit test for AppComponent in `src/app/app.component.spec.ts` (TDD: Write first)
- [ ] T014 [US1] Implement minimal `AppComponent` in `src/app/app.component.ts` to pass baseline test
- [ ] T015 [US1] Verify `npm start` command in `package.json`
- [ ] T016 [US1] Verify `npm run build` command in `package.json`
- [ ] T017 [US1] Configure AXE for accessibility testing in `src/test.ts` (or setup script)

## Phase 4: User Story 2 - Extensible Project Structure

**Goal**: Prove the feature-based architecture.
**Priority**: P2

- [ ] T018 [US2] Create documentation for project structure in `docs/structure.md`
- [ ] T019 [US2] Create example 'home' feature module in `src/app/features/home/home.module.ts` (or routes if standalone)
- [ ] T020 [US2] Create example 'home' component in `src/app/features/home/home.component.ts`
- [ ] T021 [US2] Register 'home' feature in `src/app/app.routes.ts`

## Phase 5: User Story 3 - Library and Framework Extension Points

**Goal**: Demonstrate how to integrate third-party libraries.
**Priority**: P3

- [ ] T022 [US3] Create documentation for extension points in `docs/extensions.md`
- [ ] T023 [US3] Create example HTTP interceptor in `src/app/core/interceptors/example.interceptor.ts`
- [ ] T023b [US3] [P] Create concrete code example/pattern for State Management integration (e.g. Signal store)
- [ ] T023c [US3] [P] Create concrete code example/pattern for UI Component Library integration
- [ ] T024 [US3] Register example interceptor in `src/app/app.config.ts` (or `app.module.ts`)

## Phase 6: User Story 4 - Design Layer Abstraction

**Goal**: Enable theming and design customization.
**Priority**: P4

- [ ] T025 [US4] Define CSS custom properties in `src/styles/_variables.scss`
- [ ] T026 [US4] Create main styles file importing variables in `src/styles.scss`
- [ ] T027 [US4] Create documentation for design system in `docs/design.md`

## Phase 7: Polish & Cross-Cutting Concerns

**Goal**: Final cleanup and documentation.

- [ ] T028 Update `README.md` with project overview and quickstart instructions
- [ ] T029 Verify all linting rules pass with `npm run lint`
- [ ] T030 Verify production build with `npm run build`

## Implementation Strategy

- **MVP**: Complete Phase 1, 2, and 3. This gives a working Angular app with the correct tooling.
- **Full Scope**: Complete Phases 4, 5, and 6 to fully realize the "Seed" aspect with examples and documentation.
