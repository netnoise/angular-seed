import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Content', () => {
    it('should display copyright text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('.footer');
      expect(footer?.textContent).toContain('©');
    });

    it('should display current year', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('.footer');
      const currentYear = new Date().getFullYear();
      expect(footer?.textContent).toContain(currentYear.toString());
    });

    it('should have footer element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('footer');
      expect(footer).toBeTruthy();
    });
  });
});
