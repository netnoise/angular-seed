import { Injectable, signal, inject } from '@angular/core';
import { Command } from '../../models/layout.types';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;

  commands = signal<Command[]>([]);

  register(command: Command): void {
    if (!this.commands().find(c => c.id === command.id)) {
      this.commands.update(prev => [...prev, command]);
    }
  }

  getCommands(): Command[] {
    return this.commands();
  }

  execute(commandId: string): void {
    const command = this.commands().find(c => c.id === commandId);
    if (command && command.action) {
      command.action();
    }
  }

  open<T>(component: ComponentType<T>): void {
    if (this.overlayRef?.hasAttached()) {
      return;
    }

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().top('10%'),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const portal = new ComponentPortal(component);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
