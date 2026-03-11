import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RateLimiterService {
  private readonly MAX_REQUESTS = 5;
  private readonly WINDOW_MS = 60000; // 1 minute
  private requests: number[] = [];

  // Signals for UI
  private requestsSignal = signal<number[]>([]);

  readonly requestsRemaining = computed(() => {
    return Math.max(0, this.MAX_REQUESTS - this.requestsSignal().length);
  });

  readonly nextResetTime = computed(() => {
    const reqs = this.requestsSignal();
    if (reqs.length === 0) return 0;
    // The oldest request determines when a slot opens up
    return reqs[0] + this.WINDOW_MS;
  });

  constructor() {
    // Periodically clean up old requests to keep signal accurate
    setInterval(() => this.cleanup(), 1000);
  }

  /**
   * Checks if a request can be made
   */
  canMakeRequest(): boolean {
    this.cleanup();
    return this.requests.length < this.MAX_REQUESTS;
  }

  /**
   * Registers a new request
   * @returns true if registered, false if limit exceeded
   */
  registerRequest(): boolean {
    if (!this.canMakeRequest()) {
      return false;
    }
    const now = Date.now();
    this.requests.push(now);
    this.requestsSignal.set([...this.requests]);
    return true;
  }

  /**
   * Immediately exhausts the quota (e.g. on 429 from backend)
   */
  exhaustQuota(): void {
    const now = Date.now();
    // Fill the window with dummy timestamps at 'now'
    this.requests = Array(this.MAX_REQUESTS).fill(now);
    this.requestsSignal.set([...this.requests]);
  }

  /**
   * Removes requests older than the window
   */
  private cleanup(): void {
    const now = Date.now();
    const validRequests = this.requests.filter(time => now - time < this.WINDOW_MS);

    if (validRequests.length !== this.requests.length) {
      this.requests = validRequests;
      this.requestsSignal.set([...this.requests]);
    } else {
      // Just update the signal to trigger timeToNextReset re-computation if needed
      // Actually, timeToNextReset depends on the signal, but it also depends on 'now'.
      // We might need a timer signal to drive the countdown if we want it smooth,
      // but for now, this cleanup interval will update the 'requests' list which updates the count.
      // To make the countdown smooth, the component should use a timer.
    }
  }
}
