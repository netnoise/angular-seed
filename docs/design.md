# Design System & Styling

This project uses SCSS, BEM methodology, and CSS Custom Properties for a scalable and maintainable design layer.

## Theming with CSS Custom Properties

Global design tokens are defined in `src/styles/_variables.scss`. Use these variables throughout the application to ensure consistency.

### Usage Example

```scss
.my-component {
  background-color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}
```

### Dark Mode

Dark mode is supported via the `[data-theme='dark']` attribute selector. The `ThemeService` can be used to toggle this attribute on the `body` or `html` element.

## BEM Methodology

We follow the Block-Element-Modifier (BEM) methodology for naming CSS classes.

- **Block**: `card`
- **Element**: `card__title`, `card__content`
- **Modifier**: `card--featured`, `card__title--large`

Example:

```html
<div class="card card--featured">
  <h2 class="card__title">Title</h2>
  <div class="card__content">Content goes here.</div>
</div>
```

## Component Styling

Each component should have its own SCSS file (`[component].component.scss`). Avoid global styles unless they are truly universal (e.g., typography, layout grid).
