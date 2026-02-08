export interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  exact?: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  status: 'Active' | 'Inactive' | 'Pending';
  description: string;
  updatedAt: Date;
}

export type Theme = 'light' | 'dark';
