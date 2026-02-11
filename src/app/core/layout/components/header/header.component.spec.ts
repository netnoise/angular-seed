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

    it('should render navigation links in nav-container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nav = compiled.querySelector('.nav-container');
      expect(nav).toBeTruthy();
    });

    it('should render correct number of navigation items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navItems = compiled.querySelectorAll('.nav-container a');
      expect(navItems.length).toBeGreaterThan(0);
    });

    it('should render tool icons section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tools = compiled.querySelector('.tools-section');
      expect(tools).toBeTruthy();
    });

    it('should render correct number of tool icons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toolBtns = compiled.querySelectorAll('.tool-btn');
      expect(toolBtns.length).toBe(3);
    });
  });

  describe('Navigation Items', () => {
    it('should display navigation item labels', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstLink = compiled.querySelector('.nav-container a');
      expect(firstLink?.textContent?.trim()).toBeTruthy();
    });

    it('should have routerLink on navigation items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const links = compiled.querySelectorAll('.nav-link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('Logo', () => {
    it('should have updated app logo text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logo = compiled.querySelector('.logo');
      expect(logo?.textContent).toContain('⚡ TRYOUT');
    });

    it('should have link to home in logo', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const logoLink = compiled.querySelector('.logo-container a');
      expect(logoLink?.getAttribute('routerLink')).toBe('/');
    });
  });

  describe('More Menu Integration', () => {
    it('should render more-menu component in nav-container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const moreMenu = compiled.querySelector('.nav-container app-more-menu');
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
      const navChildren = compiled.querySelectorAll('.nav-container > *');
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
      expect(items[3].route).toEqual([{ outlets: { modal: ['settings'] } }]);
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
