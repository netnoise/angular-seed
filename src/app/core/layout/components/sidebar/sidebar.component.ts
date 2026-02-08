import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../../models/layout.types';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected readonly layoutService = inject(LayoutService);
  protected readonly sidebarOpen = this.layoutService.sidebarOpen;

  protected readonly sidebarClasses = computed(() => {
    return this.sidebarOpen() ? 'sidebar-content expanded' : 'sidebar-content collapsed';
  });

  protected readonly navigationItems: NavigationItem[] = [
    { label: 'Dashboard', route: '/', icon: '📊', exact: true },
    { label: 'Projects', route: '/projects', icon: '📁' },
    { label: 'Tasks', route: '/tasks', icon: '✓' },
    { label: 'Calendar', route: '/calendar', icon: '📅' },
    { label: 'Team', route: '/team', icon: '👥' },
    { label: 'Reports', route: '/reports', icon: '📈' },
    { label: 'Settings', route: '/settings', icon: '⚙️' },
  ];

  onToggle(): void {
    this.layoutService.toggleSidebar();
  }
}
