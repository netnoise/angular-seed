import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Sidebar State', () => {
    it('should initialize with sidebarOpen as true by default', () => {
      expect(service.sidebarOpen()).toBe(true);
    });

    it('should toggle sidebar state', () => {
      service.toggleSidebar();
      expect(service.sidebarOpen()).toBe(false);
      service.toggleSidebar();
      expect(service.sidebarOpen()).toBe(true);
    });

    it('should persist sidebar state to localStorage', done => {
      service.toggleSidebar();

      // Give effect time to run
      setTimeout(() => {
        const stored = localStorage.getItem('sidebarOpen');
        expect(stored).toBe('false');
        done();
      }, 10);
    });

    it('should load sidebar state from localStorage on initialization', () => {
      localStorage.setItem('sidebarOpen', 'false');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});

      const newService = TestBed.inject(LayoutService);
      expect(newService.sidebarOpen()).toBe(false);
    });
  });

  describe('Mobile Menu State', () => {
    it('should initialize with mobileMenuOpen as false', () => {
      expect(service.mobileMenuOpen()).toBe(false);
    });

    it('should toggle mobile menu state', () => {
      service.toggleMobileMenu();
      expect(service.mobileMenuOpen()).toBe(true);
      service.toggleMobileMenu();
      expect(service.mobileMenuOpen()).toBe(false);
    });

    it('should close mobile menu', () => {
      service.toggleMobileMenu();
      expect(service.mobileMenuOpen()).toBe(true);
      service.closeMobileMenu();
      expect(service.mobileMenuOpen()).toBe(false);
    });

    it('should not persist mobile menu state to localStorage', done => {
      service.toggleMobileMenu();

      setTimeout(() => {
        const stored = localStorage.getItem('mobileMenuOpen');
        expect(stored).toBeNull();
        done();
      }, 10);
    });
  });
});
