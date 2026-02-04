# Angular Seed

A reusable, opinionated Angular 19 starter template following modern best practices and Spec-Driven Development (SDD) principles.

## Features

- **Angular 19.x**: Standalone components, Signals, Modern Control Flow (`@if`, `@for`), and Functional APIs.
- **Strict TypeScript**: Enforced strict mode and no `any` usage.
- **OnPush Change Detection**: Default strategy for all components.
- **Scalable Architecture**: Feature-based modularization (`core/`, `shared/`, `features/`).
- **Modern Styling**: SCSS with BEM methodology and CSS Custom Properties for theming.
- **Quality Tooling**: ESLint 9 (Flat Config), Prettier 3, Husky, and lint-staged.
- **Testing**: Karma and Jasmine for unit testing; AXE for automated accessibility testing.
- **Accessibility**: WCAG AA compliance out of the box.

## Quickstart

### Prerequisites

- Node.js 18.x LTS
- npm 9.x+

### Installation

```bash
nvm use # Uses version from .nvmrc
npm install
```

### Development

```bash
npm start # Serves at http://localhost:4200/
npm test  # Runs unit tests
npm run lint # Runs ESLint and Prettier
```

### Building

```bash
npm run build # Production build
```

## Project Structure

Refer to [docs/structure.md](docs/structure.md) for a detailed overview of the directory layout and architectural guidelines.

## Extensibility

Refer to [docs/extensions.md](docs/extensions.md) for instructions on integrating third-party libraries (State Management, UI Components, etc.).

## Design System

Refer to [docs/design.md](docs/design.md) for information on the styling methodology and theming.

## License

MIT
