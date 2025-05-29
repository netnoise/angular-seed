import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() navLinkClick = new EventEmitter<void>();

  constructor() { }

  onItemClick(): void {
    this.navLinkClick.emit();
  }
}
