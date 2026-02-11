import { TestBed } from '@angular/core/testing';
import { CommandService } from './command.service';
import { Command } from '../../models/layout.types';
import { Overlay, OverlayRef, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {}

describe('CommandService', () => {
  let service: CommandService;
  let mockOverlay: jasmine.SpyObj<Overlay>;
  let mockOverlayRef: jasmine.SpyObj<OverlayRef>;

  beforeEach(() => {
    mockOverlayRef = jasmine.createSpyObj('OverlayRef', [
      'attach',
      'dispose',
      'backdropClick',
      'hasAttached',
    ]);
    mockOverlayRef.backdropClick.and.returnValue(of(new MouseEvent('click')));
    mockOverlay = jasmine.createSpyObj('Overlay', ['create', 'position', 'scrollStrategies']);
    mockOverlay.create.and.returnValue(mockOverlayRef);

    // Create a more complete mock for position strategy to reduce 'any'
    const mockPositionStrategy = jasmine.createSpyObj('GlobalPositionStrategy', [
      'global',
      'centerHorizontally',
      'top',
    ]);
    mockPositionStrategy.global.and.returnValue(mockPositionStrategy);
    mockPositionStrategy.centerHorizontally.and.returnValue(mockPositionStrategy);
    mockPositionStrategy.top.and.returnValue(mockPositionStrategy);

    mockOverlay.position.and.returnValue(
      mockPositionStrategy as unknown as ReturnType<Overlay['position']>,
    );
    mockOverlay.scrollStrategies = {
      block: () => ({}) as ScrollStrategy,
    } as unknown as typeof mockOverlay.scrollStrategies;

    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [CommandService, { provide: Overlay, useValue: mockOverlay }],
    });
    service = TestBed.inject(CommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a command', () => {
    const command: Command = {
      id: 'test-cmd',
      label: 'Test Command',
      group: 'Actions',
      action: jasmine.createSpy('action'),
    };

    service.register(command);

    const commands = service.commands();
    expect(commands.length).toBe(1);
    expect(commands[0]).toEqual(command);
  });

  it('should execute a command', () => {
    const spyAction = jasmine.createSpy('action');
    const command: Command = {
      id: 'exec-cmd',
      label: 'Execute Me',
      group: 'Actions',
      action: spyAction,
    };
    service.register(command);
    service.execute('exec-cmd');
    expect(spyAction).toHaveBeenCalled();
  });

  it('should open overlay', () => {
    service.open(TestComponent);
    expect(mockOverlay.create).toHaveBeenCalled();
    expect(mockOverlayRef.attach).toHaveBeenCalled();
  });

  it('should close overlay', () => {
    service.open(TestComponent);
    service.close();
    expect(mockOverlayRef.dispose).toHaveBeenCalled();
  });
});
