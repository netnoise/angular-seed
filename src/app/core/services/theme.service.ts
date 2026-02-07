import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = signal<Theme>('light');

  readonly theme = computed(() => this.currentTheme());
  readonly isDarkMode = computed(() => this.currentTheme() === 'dark');

  toggleTheme() {
    this.currentTheme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }
}
