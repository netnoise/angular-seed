import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { CommandService } from '../../services/command.service';
import { Command } from '../../../models/layout.types';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule, A11yModule],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandPaletteComponent {
  private commandService = inject(CommandService);

  searchQuery = signal('');

  commands = this.commandService.commands;

  filteredCommands = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.commands();

    return this.commands().filter(
      cmd =>
        cmd.label.toLowerCase().includes(query) ||
        cmd.keywords?.some(k => k.toLowerCase().includes(query)) ||
        cmd.group.toLowerCase().includes(query),
    );
  });

  selectCommand(command: Command) {
    this.commandService.execute(command.id);
    this.close();
  }

  close() {
    this.commandService.close();
  }
}
