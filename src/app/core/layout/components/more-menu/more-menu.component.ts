import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../../models/layout.types';

@Component({
  selector: 'app-more-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './more-menu.component.html',
  styleUrl: './more-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreMenuComponent {
  readonly items = input<NavigationItem[]>([]);
  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update(open => !open);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
