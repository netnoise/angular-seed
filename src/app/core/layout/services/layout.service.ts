import { Injectable, signal, effect } from '@angular/core';
import { VisualMode, NavigationItem } from '../../models/layout.types';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  readonly sidebarOpen = signal<boolean>(this.loadSidebarState());
  readonly mobileMenuOpen = signal<boolean>(false);
  readonly visualMode = signal<VisualMode>(this.loadVisualMode());

  readonly navigationItems: NavigationItem[] = [
    { label: 'Dashboard', route: '/', exact: true, icon: '📊', visibleIn: 'both' },
    { label: 'Projects', route: '/projects', icon: '📁', visibleIn: 'both' },
    { label: 'Tasks', route: '/tasks', icon: '✓', visibleIn: 'both' },
    { label: 'Calendar', route: '/calendar', icon: '📅', visibleIn: 'mobile' },
    { label: 'Team', route: '/team', icon: '👥', visibleIn: 'mobile' },
    { label: 'Reports', route: '/reports', icon: '📈', visibleIn: 'mobile' },
  ];

  constructor() {
    // Persist layout states to localStorage
    effect(() => {
      localStorage.setItem('sidebarOpen', JSON.stringify(this.sidebarOpen()));
    });
    effect(() => {
      localStorage.setItem('visualMode', this.visualMode());
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(value => !value);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleVisualMode(): void {
    this.visualMode.update(mode => (mode === 'standard' ? 'cyberpunk' : 'standard'));
  }

  private loadSidebarState(): boolean {
    const stored = localStorage.getItem('sidebarOpen');
    return stored !== null ? JSON.parse(stored) : true;
  }

  private loadVisualMode(): VisualMode {
    const stored = localStorage.getItem('visualMode');
    return stored === 'cyberpunk' || stored === 'standard' ? (stored as VisualMode) : 'standard';
  }
}
