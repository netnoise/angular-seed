import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor() {}

  onNavLinkClick(event: MouseEvent): void {
    // Manage active class
    // Remove 'active' class and aria-current from all links
    const allLinks = (event.currentTarget as HTMLElement)
      .closest('.sidebar')
      ?.querySelectorAll('.sidebar-menu a');
    allLinks?.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current'); // Remove aria-current
    });

    // Add 'active' class and aria-current to the clicked link
    const clickedLink = event.currentTarget as HTMLElement;
    clickedLink.classList.add('active');
    clickedLink.setAttribute('aria-current', 'page'); // Set aria-current

    // Prevent default if it's a '#' link and you're handling navigation via Angular router later
    // event.preventDefault();
  }
}
