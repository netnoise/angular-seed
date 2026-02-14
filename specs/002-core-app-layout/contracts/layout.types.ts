export interface NavigationItem {
  label: string;
  route: string | unknown[];
  icon?: string;
  exact?: boolean;
  children?: NavigationItem[];
  visibleIn?: 'desktop' | 'mobile' | 'both';
}

export interface ContentItem {
  id: string;
  title: string;
  status: 'Active' | 'Inactive' | 'Pending';
  description: string;
  updatedAt: Date;
}

export interface ToolIcon {
  id: string;
  label: string;
  icon: string;
  shortcut?: string;
  // Actions are typically handled by component binding, but ID helps identify them
}

export type CommandGroup = 'Navigation' | 'Actions' | 'Settings';

export interface Command {
  id: string;
  label: string;
  group: CommandGroup;
  icon?: string;
  keywords?: string[]; // For search filtering
  // Action is a function, usually passed at runtime or handled via a service map
  action?: () => void;
}

export type VisualMode = 'standard' | 'cyberpunk';

export interface LayoutState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  visualMode: VisualMode;
}
