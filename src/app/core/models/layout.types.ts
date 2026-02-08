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

export interface DetailContent {
  id: string;
  title: string;
  content: string;
}

export interface DashboardSummary {
  title: string;
  message: string;
}
