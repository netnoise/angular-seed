import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitPaneComponent } from './split-pane.component';
import { ContentItem } from '../../../models/layout.types';

describe('SplitPaneComponent', () => {
  let component: SplitPaneComponent;
  let fixture: ComponentFixture<SplitPaneComponent>;

  const mockItems: ContentItem[] = [
    {
      id: '1',
      title: 'Item 1',
      status: 'Active',
      description: 'Description 1',
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      title: 'Item 2',
      status: 'Inactive',
      description: 'Description 2',
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: '3',
      title: 'Item 3',
      status: 'Pending',
      description: 'Description 3',
      updatedAt: new Date('2024-01-03'),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitPaneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SplitPaneComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Structure', () => {
    it('should have list pane', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const listPane = compiled.querySelector('.list-pane');
      expect(listPane).toBeTruthy();
    });

    it('should have detail pane', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const detailPane = compiled.querySelector('.detail-pane');
      expect(detailPane).toBeTruthy();
    });

    it('should have search input', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const searchInput = compiled.querySelector('input[type="search"]');
      expect(searchInput).toBeTruthy();
    });
  });

  describe('List Rendering', () => {
    it('should render all items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.list-item');
      expect(items.length).toBe(3);
    });

    it('should display item titles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstItem = compiled.querySelector('.list-item .item-title');
      expect(firstItem?.textContent).toContain('Item 1');
    });

    it('should display item status', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstItem = compiled.querySelector('.list-item .item-status');
      expect(firstItem?.textContent).toContain('Active');
    });
  });

  describe('Search Functionality', () => {
    it('should filter items by search query', () => {
      component.searchQuery.set('Item 1');
      fixture.detectChanges();

      expect(component.filteredItems().length).toBe(1);
      expect(component.filteredItems()[0].title).toBe('Item 1');
    });

    it('should be case insensitive', () => {
      component.searchQuery.set('item 2');
      fixture.detectChanges();

      expect(component.filteredItems().length).toBe(1);
      expect(component.filteredItems()[0].title).toBe('Item 2');
    });

    it('should show all items when search is empty', () => {
      component.searchQuery.set('');
      fixture.detectChanges();

      expect(component.filteredItems().length).toBe(3);
    });

    it('should show "No items found" message when no results', () => {
      component.searchQuery.set('nonexistent');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const noResults = compiled.querySelector('.no-results');
      expect(noResults).toBeTruthy();
      expect(noResults?.textContent).toContain('No items found');
    });
  });

  describe('Item Selection', () => {
    it('should select item on click', () => {
      const spy = spyOn(component.itemSelected, 'emit');

      const compiled = fixture.nativeElement as HTMLElement;
      const firstItem = compiled.querySelector('.list-item') as HTMLElement;
      firstItem.click();

      expect(spy).toHaveBeenCalledWith(mockItems[0]);
    });

    it('should apply active class to selected item', () => {
      component.selectedItemId.set('1');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const firstItem = compiled.querySelector('.list-item');
      expect(firstItem?.classList.contains('active')).toBe(true);
    });

    it('should update selectedItemId on selection', () => {
      component.onItemClick(mockItems[1]);
      expect(component.selectedItemId()).toBe('2');
    });
  });

  describe('Detail Pane', () => {
    it('should show summary when no item selected', () => {
      component.selectedItemId.set(null);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const summary = compiled.querySelector('.summary-view');
      expect(summary).toBeTruthy();
    });

    it('should show detail when item selected', () => {
      component.selectedItemId.set('1');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const detail = compiled.querySelector('.detail-view');
      expect(detail).toBeTruthy();
    });

    it('should display selected item details', () => {
      component.selectedItemId.set('1');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const detailTitle = compiled.querySelector('.detail-title');
      expect(detailTitle?.textContent).toContain('Item 1');
    });
  });

  describe('Scrolling', () => {
    it('should have independent scroll containers', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const listPane = compiled.querySelector('.list-pane') as HTMLElement;
      const detailPane = compiled.querySelector('.detail-pane') as HTMLElement;

      const listOverflow = window.getComputedStyle(listPane).overflowY;
      const detailOverflow = window.getComputedStyle(detailPane).overflowY;

      expect(['auto', 'scroll']).toContain(listOverflow);
      expect(['auto', 'scroll']).toContain(detailOverflow);
    });
  });
});
