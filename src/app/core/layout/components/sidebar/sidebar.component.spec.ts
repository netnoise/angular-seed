import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { LayoutService } from '../../services/layout.service';
import { provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
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
    it('should render navigation items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navItems = compiled.querySelectorAll('.sidebar-item');
      expect(navItems.length).toBeGreaterThan(0);
    });

    it('should render toggle button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleBtn = compiled.querySelector('.toggle-btn');
      expect(toggleBtn).toBeTruthy();
    });
  });

  describe('Navigation Items', () => {
    it('should display item labels when expanded', () => {
      layoutService.sidebarOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const labels = compiled.querySelectorAll('.item-label');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should have routerLink on items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('a[routerLink]');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should display icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icons = compiled.querySelectorAll('.item-icon');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Toggle Functionality', () => {
    it('should call toggleSidebar when toggle button is clicked', () => {
      const spy = spyOn(layoutService, 'toggleSidebar');
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleBtn = compiled.querySelector('.toggle-btn') as HTMLElement;

      toggleBtn.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should apply collapsed class when sidebar is closed', () => {
      layoutService.sidebarOpen.set(false);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const sidebar = compiled.querySelector('.sidebar-content');
      expect(sidebar?.classList.contains('collapsed')).toBe(true);
    });

    it('should apply expanded class when sidebar is open', () => {
      layoutService.sidebarOpen.set(true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const sidebar = compiled.querySelector('.sidebar-content');
      expect(sidebar?.classList.contains('expanded')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on toggle button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleBtn = compiled.querySelector('.toggle-btn');
      expect(toggleBtn?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have proper semantic nav element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nav = compiled.querySelector('nav');
      expect(nav).toBeTruthy();
    });
  });
});
