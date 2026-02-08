import { ChangeDetectionStrategy, Component, input, output, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ContentItem } from '../../../models/layout.types';

@Component({
  selector: 'app-split-pane',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './split-pane.component.html',
  styleUrl: './split-pane.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitPaneComponent {
  readonly items = input.required<ContentItem[]>();
  readonly itemSelected = output<ContentItem>();

  readonly searchQuery = signal<string>('');
  readonly selectedItemId = signal<string | null>(null);

  readonly filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.items();
    }

    return this.items().filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query),
    );
  });

  readonly selectedItem = computed(() => {
    const id = this.selectedItemId();
    if (!id) return null;
    return this.items().find(item => item.id === id) || null;
  });

  onSearchChange(value: string): void {
    this.searchQuery.set(value);
  }

  onItemClick(item: ContentItem): void {
    this.selectedItemId.set(item.id);
    this.itemSelected.emit(item);
  }
}
