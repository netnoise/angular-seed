# Quickstart: Core Application Layout

**Feature**: #002 Core Application Layout

## Overview

The Core Layout provides the application shell, including the Header, Sidebar, Command Palette, and Split-Pane content area.

## Usage

### 1. Using the Layout

The layout is applied via the Router. Ensure your root route uses `MainLayoutComponent`.

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Your feature routes here
    ],
  },
];
```

### 2. Registering Commands (Command Palette)

Inject `CommandService` to register global commands.

```typescript
export class MyFeatureComponent {
  constructor(private commandService: CommandService) {
    this.commandService.register({
      id: 'my-feature:action',
      label: 'Create New Item',
      group: 'Actions',
      action: () => this.createItem(),
    });
  }
}
```

### 3. Adding Tool Icons

Tool icons in the header are managed by the `HeaderComponent` (currently static, but designed to be driven by configuration).

### 4. Opening Modals (Settings/Profile)

To open a modal that preserves the underlying view, use the `modal` auxiliary outlet.

```typescript
// Router Link
<a [routerLink]='[{ outlets: { modal: [\'settings\'] } }]'>Settings</a>

// Programmatic
this.router.navigate([{ outlets: { modal: ['settings'] } }]);
```

### 5. Visual FX Toggle

The layout supports a "Cyberpunk" visual mode. This is toggled via the `LayoutService` or the Theme Toggle tool in the header.

```typescript
this.layoutService.setVisualMode('cyberpunk');
```
