import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChangeDetectionStrategy } from '@angular/core';
import * as axe from 'axe-core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        set: { changeDetection: ChangeDetectionStrategy.OnPush },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-seed'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-seed');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-seed');
  });

  it('should have no accessibility violations', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const results = await axe.run(fixture.nativeElement);
    expect(results.violations).toEqual([]);
  });
});
