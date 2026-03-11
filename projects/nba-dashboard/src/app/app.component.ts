import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RateLimitStatusComponent } from './components/rate-limit-status/rate-limit-status.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RateLimitStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'nba-dashboard';
}
