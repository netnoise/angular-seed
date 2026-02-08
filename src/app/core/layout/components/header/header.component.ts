import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../../models/layout.types';
import { MoreMenuComponent } from '../more-menu/more-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MoreMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly navigationItems: NavigationItem[] = [
    { label: 'Dashboard', route: '/', exact: true },
    { label: 'Projects', route: '/projects' },
    { label: 'Tasks', route: '/tasks' },
    { label: 'Settings', route: '/settings' },
  ];

  protected readonly moreMenuItems: NavigationItem[] = [
    { label: 'Calendar', route: '/calendar' },
    { label: 'Team', route: '/team' },
    { label: 'Reports', route: '/reports' },
  ];
}
