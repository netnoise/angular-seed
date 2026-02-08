import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './services/layout.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  protected readonly layoutService = inject(LayoutService);
  protected readonly sidebarOpen = this.layoutService.sidebarOpen;
  protected readonly mobileMenuOpen = this.layoutService.mobileMenuOpen;

  protected readonly shellClasses = computed(() => {
    const classes = ['app-shell'];

    if (this.sidebarOpen()) {
      classes.push('sidebar-open');
    } else {
      classes.push('sidebar-closed');
    }

    if (this.mobileMenuOpen()) {
      classes.push('mobile-menu-open');
    }

    return classes.join(' ');
  });

  onBackdropClick(): void {
    this.layoutService.closeMobileMenu();
  }
}
