import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  computed,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
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
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly items = input.required<ContentItem[]>();
  readonly id = input<string>(); // Route param binding
  readonly itemSelected = output<ContentItem>();

  readonly searchQuery = signal<string>('');

  // Internal state for when not using routing (fallback)
  private readonly internalSelectedId = signal<string | null>(null);

  // Computed ID that prefers the route param 'id' over internal state
  readonly selectedItemId = computed(() => this.id() ?? this.internalSelectedId());

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
    // Navigate relative to current route to support "Deep Linking" (FR-014)
    // We use './' if no ID is present, or '../' to replace the existing ID.
    const currentId = this.id ? this.id() : undefined;
    const commands =
      currentId !== undefined && currentId !== null ? ['../', item.id] : ['./', item.id];

    this.router.navigate(commands, {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });

    this.internalSelectedId.set(item.id);
    this.itemSelected.emit(item);
  }
}
