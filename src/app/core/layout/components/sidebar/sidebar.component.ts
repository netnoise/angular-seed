import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { NavigationItem } from '../../../models/layout.types';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, A11yModule],
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

  protected readonly navigationItems: NavigationItem[] = this.layoutService.navigationItems;

  onToggle(): void {
    this.layoutService.toggleSidebar();
  }
}
