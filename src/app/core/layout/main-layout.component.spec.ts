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
});
