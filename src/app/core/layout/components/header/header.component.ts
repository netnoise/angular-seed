import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../../models/layout.types';
import { MoreMenuComponent } from '../more-menu/more-menu.component';
import { CommandService } from '../../services/command.service';
import { LayoutService } from '../../services/layout.service';
import { CommandPaletteComponent } from '../command-palette/command-palette.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MoreMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private commandService = inject(CommandService);
  protected readonly layoutService = inject(LayoutService);

  protected readonly navigationItems: NavigationItem[] = this.layoutService.navigationItems.filter(
    item => item.visibleIn === 'both' || item.visibleIn === 'desktop',
  );

  protected readonly moreMenuItems: NavigationItem[] = [
    { label: 'Calendar', route: '/calendar' },
    { label: 'Team', route: '/team' },
    { label: 'Reports', route: '/reports' },
  ];

  protected readonly toolIcons = [
    { label: 'Search', icon: '🔍', action: () => this.openCommandPalette() },
    { label: 'Quick Settings', icon: '⚙️' },
    { label: 'Theme Toggle', icon: '🌗', action: () => this.layoutService.toggleVisualMode() },
  ];

  openCommandPalette(): void {
    this.commandService.open(CommandPaletteComponent);
  }
}
