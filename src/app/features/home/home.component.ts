import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SplitPaneComponent } from '../../core/layout/components/split-pane/split-pane.component';
import { ContentItem } from '../../core/models/layout.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SplitPaneComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly id = input<string>();

  readonly mockItems: ContentItem[] = [
    {
      id: '1',
      title: 'Project Alpha',
      status: 'Active',
      description: 'Main dashboard implementation project.',
      updatedAt: new Date('2024-02-01'),
    },
    {
      id: '2',
      title: 'Marketing Campaign',
      status: 'Pending',
      description: 'Q1 Outreach materials and planning.',
      updatedAt: new Date('2024-02-05'),
    },
    {
      id: '3',
      title: 'System Audit',
      status: 'Inactive',
      description: 'Security compliance review for 2024.',
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '4',
      title: 'Client Onboarding',
      status: 'Active',
      description: 'New client setup and training materials.',
      updatedAt: new Date('2024-02-08'),
    },
  ];
}
