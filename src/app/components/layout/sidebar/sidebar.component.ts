import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'], // Corrected 'styleUrl' to 'styleUrls'
})
export class SidebarComponent {
  @Output() itemClicked = new EventEmitter<void>();

  // This method will be called when a navigation item is clicked.
  onItemClick(): void {
    this.itemClicked.emit();
  }
}
