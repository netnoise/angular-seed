import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() isSidenavOpened = false; // Renamed to match input from LayoutComponent

  onLogoClick(): void {
    // For now, just log to console. Later, this could navigate to the home page.
    console.log('Logo clicked');
    // Example: this.router.navigate(['/']);
  }

  onToggleSidenav(): void {
    // No need to manage isSidenavOpened state here directly for the aria-expanded,
    // as it's passed as an Input. The actual toggle action is emitted.
    this.toggleSidenav.emit();
  }

  // Getter for aria-expanded to use the input property
  get ariaExpandedState(): boolean {
    return this.isSidenavOpened;
  }
}
