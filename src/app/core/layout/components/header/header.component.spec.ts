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
      const links = compiled.querySelectorAll('nav a[routerLink]');
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
});
