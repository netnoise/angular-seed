import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [A11yModule],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsModalComponent {
  private router = inject(Router);

  close(): void {
    // Navigate to the same URL but with the 'modal' outlet set to null
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
