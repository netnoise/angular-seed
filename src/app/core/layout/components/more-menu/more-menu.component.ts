import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-more-menu',
  standalone: true,
  imports: [],
  template: `
    <div class="more-menu">
      <!-- More menu implementation to be added -->
    </div>
  `,
  styles: [
    `
      .more-menu {
        /* Styles to be added */
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreMenuComponent {
  // Implementation to be added
}
