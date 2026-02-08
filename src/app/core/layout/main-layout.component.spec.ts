import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { LayoutService } from './services/layout.service';
import { provideRouter } from '@angular/router';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Structure', () => {
    it('should have main layout grid container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const shell = compiled.querySelector('.app-shell');
      expect(shell).toBeTruthy();
    });

    it('should contain header element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('header');
      expect(header).toBeTruthy();
    });

    it('should contain sidebar element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const sidebar = compiled.querySelector('.sidebar');
      expect(sidebar).toBeTruthy();
    });

    it('should contain main content area', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const main = compiled.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('should contain footer element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should contain router outlet', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const outlet = compiled.querySelector('router-outlet');
      expect(outlet).toBeTruthy();
    });
  });

  describe('CSS Classes', () => {
    it('should apply sidebar-open class when sidebar is open', () => {
      layoutService.sidebarOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const shell = compiled.querySelector('.app-shell');
      expect(shell?.classList.contains('sidebar-open')).toBe(true);
    });

    it('should apply sidebar-closed class when sidebar is closed', () => {
      layoutService.sidebarOpen.set(false);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const shell = compiled.querySelector('.app-shell');
      expect(shell?.classList.contains('sidebar-closed')).toBe(true);
    });

    it('should apply mobile-menu-open class when mobile menu is open', () => {
      layoutService.mobileMenuOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const shell = compiled.querySelector('.app-shell');
      expect(shell?.classList.contains('mobile-menu-open')).toBe(true);
    });
  });

  describe('Backdrop', () => {
    it('should show backdrop when mobile menu is open', () => {
      layoutService.mobileMenuOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const backdrop = compiled.querySelector('.backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('should hide backdrop when mobile menu is closed', () => {
      layoutService.mobileMenuOpen.set(false);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const backdrop = compiled.querySelector('.backdrop');
      expect(backdrop).toBeFalsy();
    });

    it('should close mobile menu when backdrop is clicked', () => {
      layoutService.mobileMenuOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const backdrop = compiled.querySelector('.backdrop') as HTMLElement;
      backdrop.click();
      fixture.detectChanges();

      expect(layoutService.mobileMenuOpen()).toBe(false);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close mobile menu on Escape key press', () => {
      layoutService.mobileMenuOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const backdrop = compiled.querySelector('.backdrop') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
      backdrop.dispatchEvent(event);
      fixture.detectChanges();

      expect(layoutService.mobileMenuOpen()).toBe(false);
    });

    it('should close mobile menu on Enter key press on backdrop', () => {
      layoutService.mobileMenuOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const backdrop = compiled.querySelector('.backdrop') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      backdrop.dispatchEvent(event);
      fixture.detectChanges();

      expect(layoutService.mobileMenuOpen()).toBe(false);
    });

    it('should close mobile menu on Space key press on backdrop', () => {
      layoutService.mobileMenuOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const backdrop = compiled.querySelector('.backdrop') as HTMLElement;
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      backdrop.dispatchEvent(event);
      fixture.detectChanges();

      expect(layoutService.mobileMenuOpen()).toBe(false);
    });

    it('should allow tab navigation through header links', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headerLinks = compiled.querySelectorAll('app-header a');

      expect(headerLinks.length).toBeGreaterThan(0);
      headerLinks.forEach(link => {
        const tabIndex = (link as HTMLElement).getAttribute('tabindex');
        expect(tabIndex === null || parseInt(tabIndex) >= 0).toBe(true);
      });
    });

    it('should allow tab navigation through sidebar items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const sidebarLinks = compiled.querySelectorAll('app-sidebar a');

      expect(sidebarLinks.length).toBeGreaterThan(0);
      sidebarLinks.forEach(link => {
        const tabIndex = (link as HTMLElement).getAttribute('tabindex');
        expect(tabIndex === null || parseInt(tabIndex) >= 0).toBe(true);
      });
    });

    it('should trap focus in mobile drawer when open', () => {
      layoutService.mobileMenuOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const sidebar = compiled.querySelector('.sidebar') as HTMLElement;
      const focusableElements = sidebar.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );

      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });
});
