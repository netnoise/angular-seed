import { ChangeDetectionStrategy, Component, computed, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './services/layout.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommandService } from './services/command.service';
import { CommandPaletteComponent } from './components/command-palette/command-palette.component';

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
  protected readonly commandService = inject(CommandService);

  protected readonly sidebarOpen = this.layoutService.sidebarOpen;
  protected readonly mobileMenuOpen = this.layoutService.mobileMenuOpen;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.commandService.open(CommandPaletteComponent);
    }
  }

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

    if (this.layoutService.visualMode() === 'cyberpunk') {
      classes.push('mode-cyberpunk');
    }

    return classes.join(' ');
  });

  onBackdropClick(): void {
    this.layoutService.closeMobileMenu();
  }
}
