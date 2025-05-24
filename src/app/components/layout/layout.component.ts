import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isSmallScreen = false;
  // isSidebarCollapsed is used to control the class for mini-variant style, not actual open/close for large screens
  isSidebarCollapsed = false;

  private destroy$ = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall, // (max-width: 599.98px)
      Breakpoints.Small   // (min-width: 600px) and (max-width: 959.98px)
    ]).pipe(
      takeUntil(this.destroy$),
      delay(0) // Introduce a small delay to avoid ExpressionChangedAfterItHasBeenCheckedError
    )
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        if (this.isSmallScreen) {
          // On small screens, the sidebar is in 'over' mode.
          // We ensure it's closed initially unless explicitly opened.
          if (this.sidenav && this.sidenav.opened) {
            this.sidenav.close();
          }
          this.isSidebarCollapsed = false; // Not applicable in 'over' mode
        } else {
          // On larger screens, the sidebar is in 'side' mode.
          // It's opened by default unless isSidebarCollapsed is true (for mini-variant)
          // This part depends on how you want to manage collapsed state for large screens.
          // For now, if not small screen, ensure it's open (unless you implement persistence for isSidebarCollapsed)
          if (this.sidenav) {
             if(this.isSidebarCollapsed) {
                // If you have specific logic for a "mini" sidebar variant that's always "open" but visually collapsed
                // this.sidenav.open(); // Ensure it's technically open
             } else {
                this.sidenav.open();
             }
          }
        }
        this.cdRef.detectChanges(); // Manually trigger change detection
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // This method is called by the header's (toggleSidenav) event
  handleSidenavToggle(): void {
    if (this.isSmallScreen) {
      this.sidenav.toggle();
    } else {
      // On larger screens, toggle the 'mini-variant' style
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      // The sidenav itself remains 'opened' in 'side' mode.
      // The visual collapse is handled by CSS through [class.layout-sidenav--collapsed].
    }
  }

  onSidebarItemClicked(): void {
    if (this.isSmallScreen) {
      this.sidenav.close(); // Close sidenav on item click on small screens
    }
    // On larger screens, clicking an item doesn't change sidebar state by default
  }
}
