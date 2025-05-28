import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  constructor() { }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onNavLinkClick(event: MouseEvent): void {
    // Optional: Close mobile menu when a link is clicked
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }

    // Manage active class
    // Remove 'active' class and aria-current from all links
    const links = (event.currentTarget as HTMLElement).closest('.main-nav')?.querySelectorAll('a');
    links?.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current'); // Remove aria-current
    });

    // Add 'active' class and aria-current to the clicked link
    const clickedLink = event.currentTarget as HTMLElement;
    clickedLink.classList.add('active');
    clickedLink.setAttribute('aria-current', 'page'); // Set aria-current
    
    // Prevent default if it's a '#' link and you're handling navigation differently
    // event.preventDefault(); 
  }
}
