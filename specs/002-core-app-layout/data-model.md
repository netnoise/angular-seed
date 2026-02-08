# Data Model: Core Application Layout

**Feature**: #002 Core Application Layout

## Entities

### NavigationItem

Represents a navigation link in the Header or Sidebar.

| Field   | Type      | Description                                           |
| ------- | --------- | ----------------------------------------------------- |
| `label` | `string`  | Display text for the link.                            |
| `route` | `string`  | The Angular Router path to navigate to.               |
| `icon`  | `string`  | (Optional) Icon class or name (e.g., for Sidebar).    |
| `exact` | `boolean` | (Optional) Whether router link match should be exact. |

### LayoutState (Internal)

Represents the transient state of the UI.

| Field                | Type                | Description                                 |
| -------------------- | ------------------- | ------------------------------------------- |
| `isSidebarCollapsed` | `boolean`           | Desktop: True if sidebar is in "Mini" mode. |
| `isMobileMenuOpen`   | `boolean`           | Mobile: True if sidebar drawer is visible.  |
| `activeTheme`        | `'light' \| 'dark'` | Current visual theme.                       |

## relationships

- `LayoutService` manages the `LayoutState`.
- `MainLayoutComponent` consumes `LayoutState` to adjust CSS classes.
- `SidebarComponent` renders a list of `NavigationItem`s.
- `HeaderComponent` renders a list of `NavigationItem`s.
