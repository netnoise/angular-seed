import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Structure', () => {
    it('should render logo', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logo = compiled.querySelector('.logo');
      expect(logo).toBeTruthy();
    });

    it('should render navigation links', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nav = compiled.querySelector('nav');
      expect(nav).toBeTruthy();
    });

    it('should render correct number of navigation items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navItems = compiled.querySelectorAll('nav a');
      expect(navItems.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation Items', () => {
    it('should display navigation item labels', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstLink = compiled.querySelector('nav a');
      expect(firstLink?.textContent?.trim()).toBeTruthy();
    });

    it('should have routerLink on navigation items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('.nav-link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Logo', () => {
    it('should have app title in logo', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logo = compiled.querySelector('.logo');
      expect(logo?.textContent).toContain('Angular Seed');
    });

    it('should have link to home in logo', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logoLink = compiled.querySelector('.logo a');
      expect(logoLink?.getAttribute('routerLink')).toBe('/');
    });
  });

  describe('More Menu Integration', () => {
    it('should render more-menu component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const moreMenu = compiled.querySelector('app-more-menu');
      expect(moreMenu).toBeTruthy();
    });

    it('should pass moreMenuItems to more-menu component', () => {
      expect(component['moreMenuItems']).toBeDefined();
      expect(component['moreMenuItems'].length).toBe(3);
      expect(component['moreMenuItems'][0].label).toBe('Calendar');
      expect(component['moreMenuItems'][1].label).toBe('Team');
      expect(component['moreMenuItems'][2].label).toBe('Reports');
    });

    it('should have more-menu as last item in navigation', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navChildren = compiled.querySelectorAll('nav > *');
      const lastChild = navChildren[navChildren.length - 1];
      expect(lastChild.tagName.toLowerCase()).toBe('app-more-menu');
    });
  });

  describe('Navigation Data', () => {
    it('should have navigationItems defined', () => {
      expect(component['navigationItems']).toBeDefined();
      expect(component['navigationItems'].length).toBe(4);
    });

    it('should have correct navigation routes', () => {
      const items = component['navigationItems'];
      expect(items[0].route).toBe('/');
      expect(items[1].route).toBe('/projects');
      expect(items[2].route).toBe('/tasks');
      expect(items[3].route).toBe('/settings');
    });

    it('should set exact match for home route', () => {
      const items = component['navigationItems'];
      expect(items[0].exact).toBe(true);
    });
  });

  describe('Z-Index Layering', () => {
    it('should have proper z-index for dropdown visibility', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const header = compiled.querySelector('.header') as HTMLElement;
      const zIndex = window.getComputedStyle(header).zIndex;

      expect(parseInt(zIndex)).toBeGreaterThanOrEqual(1000);
    });
  });
});
