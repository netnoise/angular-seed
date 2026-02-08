import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  readonly sidebarOpen = signal<boolean>(this.loadSidebarState());
  readonly mobileMenuOpen = signal<boolean>(false);

  constructor() {
    // Persist sidebar state changes to localStorage
    effect(() => {
      localStorage.setItem('sidebarOpen', JSON.stringify(this.sidebarOpen()));
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

  private loadSidebarState(): boolean {
    const stored = localStorage.getItem('sidebarOpen');
    return stored !== null ? JSON.parse(stored) : true;
  }
}
