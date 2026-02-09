# Data Model: Core Application Layout

**Feature**: #002 Core Application Layout
**Status**: Draft

## Core Entities

### NavigationItem

Represents a link in the header or sidebar.

```typescript
interface NavigationItem {
  label: string;
  route: string | any[];
  icon?: string; // Emoji or SVG path
  exact?: boolean; // RouterLinkActive exact match
  children?: NavigationItem[]; // For nested sidebar groups
  visibleIn?: 'desktop' | 'mobile' | 'both'; // For responsive hide logic
}
```

### ToolIcon

Represents a utility action in the header's right section.

```typescript
interface ToolIcon {
  id: string; // unique identifier
  label: string;
  icon: string;
  action: () => void; // Signal/Callback
  shortcut?: string; // e.g., 'Cmd+K'
}
```

### Command

Represents an action in the Command Palette.

```typescript
interface Command {
  id: string;
  label: string;
  group: 'Navigation' | 'Actions' | 'Settings';
  icon?: string;
  action: () => void;
  keywords?: string[]; // For fuzzy search
}
```

### LayoutState

Managed by `LayoutService`.

```typescript
interface LayoutState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  visualMode: 'standard' | 'cyberpunk';
  activeModal: 'settings' | 'profile' | null; // Tracked via Router, mirrored here for UI state if needed
}
```

## Relationships

- **Header**: Contains `NavigationItem[]` (Center) and `ToolIcon[]` (Right).
- **Sidebar**: Contains `NavigationItem[]` (including those hidden from Header on mobile).
- **CommandPalette**: Aggregates `Command[]` from all registered features.
