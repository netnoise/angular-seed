import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandPaletteComponent } from './command-palette.component';
import { CommandService } from '../../services/command.service';
import { signal } from '@angular/core';
import { Command } from '../../../models/layout.types';

describe('CommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;
  let mockCommandService: jasmine.SpyObj<CommandService>;

  beforeEach(async () => {
    mockCommandService = jasmine.createSpyObj(
      'CommandService',
      ['execute', 'getCommands', 'close'],
      {
        commands: signal<Command[]>([
          { id: '1', label: 'Cmd 1', group: 'Actions', action: jasmine.createSpy('action') },
          { id: '2', label: 'Cmd 2', group: 'Navigation', action: jasmine.createSpy('action') },
        ]),
      },
    );

    await TestBed.configureTestingModule({
      imports: [CommandPaletteComponent],
      providers: [{ provide: CommandService, useValue: mockCommandService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list commands', () => {
    const items = fixture.nativeElement.querySelectorAll('.command-item');
    expect(items.length).toBe(2);
  });

  it('should filter commands', () => {
    component.searchQuery.set('Cmd 1');
    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('.command-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Cmd 1');
  });

  it('should execute command on selection', () => {
    component.selectCommand(mockCommandService.commands()[0]);
    expect(mockCommandService.execute).toHaveBeenCalledWith('1');
    expect(mockCommandService.close).toHaveBeenCalled();
  });
});
