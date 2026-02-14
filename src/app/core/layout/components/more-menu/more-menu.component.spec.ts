import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoreMenuComponent } from './more-menu.component';
import { provideRouter } from '@angular/router';
import { NavigationItem } from '../../../models/layout.types';

describe('MoreMenuComponent', () => {
  let component: MoreMenuComponent;
  let fixture: ComponentFixture<MoreMenuComponent>;

  const mockItems: NavigationItem[] = [
    { label: 'Calendar', route: '/calendar' },
    { label: 'Team', route: '/team' },
    { label: 'Reports', route: '/reports' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreMenuComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MoreMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Menu State', () => {
    it('should initialize with menu closed', () => {
      expect(component.isOpen()).toBe(false);
    });

    it('should toggle menu state', () => {
      component.toggle();
      expect(component.isOpen()).toBe(true);

      component.toggle();
      expect(component.isOpen()).toBe(false);
    });

    it('should close menu', () => {
      component.toggle();
      expect(component.isOpen()).toBe(true);

      component.close();
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('Rendering', () => {
    it('should render toggle button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.more-menu-toggle');
      expect(button).toBeTruthy();
    });

    it('should not show dropdown when closed', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const dropdown = compiled.querySelector('.more-menu-dropdown');
      expect(dropdown).toBeFalsy();
    });

    it('should show dropdown when open', () => {
      component.toggle();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const dropdown = compiled.querySelector('.more-menu-dropdown');
      expect(dropdown).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on toggle button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.more-menu-toggle');
      expect(button?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have aria-expanded attribute', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('.more-menu-toggle');
      expect(button?.getAttribute('aria-expanded')).toBe('false');

      component.toggle();
      fixture.detectChanges();
      expect(button?.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Items Display', () => {
    it('should render all navigation items when dropdown is open', () => {
      component.toggle();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.more-menu-item');
      expect(items.length).toBe(3);
    });

    it('should display correct item labels', () => {
      component.toggle();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.more-menu-item');
      expect(items[0].textContent?.trim()).toBe('Calendar');
      expect(items[1].textContent?.trim()).toBe('Team');
      expect(items[2].textContent?.trim()).toBe('Reports');
    });

    it('should have routerLink on items', () => {
      component.toggle();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.more-menu-item');
      expect(items[0].getAttribute('ng-reflect-router-link')).toBe('/calendar');
      expect(items[1].getAttribute('ng-reflect-router-link')).toBe('/team');
      expect(items[2].getAttribute('ng-reflect-router-link')).toBe('/reports');
    });

    it('should close dropdown when item is clicked', () => {
      component.toggle();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);

      const compiled = fixture.nativeElement as HTMLElement;
      const firstItem = compiled.querySelector('.more-menu-item') as HTMLElement;
      firstItem.click();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });

    it('should show "No items" message when items array is empty', () => {
      fixture.componentRef.setInput('items', []);
      component.toggle();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyMessage = compiled.querySelector('.more-menu-empty');
      expect(emptyMessage).toBeTruthy();
      expect(emptyMessage?.textContent).toContain('No items');
    });
  });

  describe('Visual States', () => {
    it('should display icon and label in button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const icon = compiled.querySelector('.more-icon');
      const label = compiled.querySelector('.more-label');

      expect(icon?.textContent).toBe('⋯');
      expect(label?.textContent).toBe('More');
    });

    it('should apply proper z-index for dropdown visibility', () => {
      component.toggle();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const dropdown = compiled.querySelector('.more-menu-dropdown') as HTMLElement;
      const zIndex = window.getComputedStyle(dropdown).zIndex;

      expect(parseInt(zIndex)).toBeGreaterThan(1000);
    });
  });
});
