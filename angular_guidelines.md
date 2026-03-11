You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking.
- Prefer type inference when the type is obvious.
- **Strictly avoid the `any` type**; use `unknown` or specific interfaces/types instead. This applies to services, specs, and mock handlers.
- Use `@ts-expect-error` instead of `@ts-ignore` when suppressing a TypeScript error is absolutely unavoidable (explain why in a comment).
- Ensure all variables, imports, and parameters are used; remove unused code immediately.

## Angular Best Practices

- Always use standalone components over NgModules.
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management.
- Implement lazy loading for feature routes.
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead.
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.
- **Interactive Elements**: Every `click` handler on a non-interactive element (like `div`, `li`, `span`) MUST be accompanied by a keyboard event (e.g., `(keyup.enter)`) or, preferably, be replaced by a `<button type="button">`.
- **Focusable Interaction**: Any element with an interaction handler must be focusable (e.g., have a `tabindex` or be a native interactive element).

## Design & UX

- **Aesthetic Excellence**: Aim for professional-grade visual polish.
- **Motion**: Use smooth, purposeful transitions and animations to enhance the user experience.
- **Typography**: Maintain consistent and refined typography using defined design tokens.
- **Layout**: Use a consistent spacing system (e.g., 4px or 8px grid) to ensure alignment and rhythm.

### Components

- Keep components small and focused on a single responsibility.
- Use `input()` and `output()` functions instead of decorators.
- Use `computed()` for derived state.
- **Mandatory Change Detection**: Every component MUST set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Prefer inline templates for small components.
- Prefer Reactive forms instead of Template-driven ones.
- Do NOT use `ngClass`, use `class` bindings instead.
- Do NOT use `ngStyle`, use `style` bindings instead.
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for the local component state.
- Use `computed()` for derived state.
- Keep state transformations pure and predictable.
- Do NOT use `mutate` on signals, use `update` or `set` instead.

## Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the async pipe to handle observables.
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility.
- Use the `providedIn: 'root'` option for singleton services.
- Use the `inject()` function instead of constructor injection.
- **API Quota Management**: Implement debouncing (e.g., `debounceTime(500)`) for user-triggered API searches to prevent unnecessary network calls and quota exhaustion.

## Workspace & Quality

- **Workspace-Wide Linting**: Ensure linting commands analyze all projects in the workspace (including sub-projects in `projects/`).
- **Prettier Enforcement**: Formatting is strictly enforced via Prettier; run `npm run format` before committing.
