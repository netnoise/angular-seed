# Quickstart: Core Application Layout

## Using the Main Layout

The core layout is the shell for the application. It is typically defined in `app.routes.ts` as a parent route or used directly in `app.component.html`.

### 1. Route Configuration

To use the layout, wrap your feature routes inside the `MainLayoutComponent`:

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // ... other routes
    ],
  },
];
```

### 2. Customizing Navigation

Navigation links are defined in `CoreModule` or `LayoutService`.

**Adding a Sidebar Link:**
Modify `src/app/core/layout/config/sidebar.config.ts` (or equivalent):

```typescript
export const SIDEBAR_ITEMS: NavigationItem[] = [
  { label: 'New Feature', route: '/new-feature', icon: 'star' },
];
```

### 3. Using the Split-Pane

For features needing the split-pane layout:

```html
<div class="split-pane-container">
  <div class="list-pane">
    <!-- List Content -->
  </div>
  <div class="detail-pane">
    <!-- Detail Content -->
  </div>
</div>
```

Ensure your component structure adheres to the CSS Grid areas defined in `_layout.scss`.
