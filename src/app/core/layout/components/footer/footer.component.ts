import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VERSION } from '../../../../version';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly version = VERSION;
}
