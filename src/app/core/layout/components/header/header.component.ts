import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../../models/layout.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
}
