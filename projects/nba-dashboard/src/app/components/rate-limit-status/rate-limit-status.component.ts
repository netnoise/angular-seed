import {
  Component,
  inject,
  signal,
  computed,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RateLimiterService } from '../../core/services/rate-limiter.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, startWith } from 'rxjs';

@Component({
  selector: 'app-rate-limit-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-limit-status.component.html',
  styleUrl: './rate-limit-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RateLimitStatusComponent {
  private rateLimiter = inject(RateLimiterService);
  private platformId = inject(PLATFORM_ID);

  requestsRemaining = this.rateLimiter.requestsRemaining;

  // A signal that emits every 100ms to drive the countdown
  private timer = isPlatformBrowser(this.platformId)
    ? toSignal(
        interval(100).pipe(
          startWith(0),
          map(() => Date.now()),
        ),
        { initialValue: Date.now() },
      )
    : signal(Date.now());

  timeToReset = computed(() => {
    const resetTime = this.rateLimiter.nextResetTime();
    if (resetTime === 0) return 0;
    return Math.max(0, resetTime - this.timer());
  });

  usagePercentage = computed(() => {
    return ((5 - this.requestsRemaining()) / 5) * 100;
  });

  isLimitReached = computed(() => this.requestsRemaining() === 0);
  isWarning = computed(() => this.requestsRemaining() <= 2 && this.requestsRemaining() > 0);
}
