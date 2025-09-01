import { Injectable, ApplicationRef, inject } from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangeDetectionService {
  private readonly appRef = inject(ApplicationRef);

  constructor() {
    this.setupCustomChangeDetection();
  }

  private setupCustomChangeDetection(): void {
    // Listen to user interactions for change detection
    const events = [
      'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove',
      'keydown', 'keyup', 'keypress', 'submit', 'focus', 'blur',
      'copy', 'cut', 'paste', 'input', 'change'
    ];

    const userEvents = merge(
      ...events.map(event => fromEvent(document, event))
    );

    // Debounce user events to avoid excessive change detection
    userEvents.pipe(
      debounceTime(10)
    ).subscribe(() => {
      this.triggerChangeDetection();
    });

    // Periodic change detection for async operations
    timer(0, 5000).subscribe(() => {
      this.triggerChangeDetection();
    });
  }

  triggerChangeDetection(): void {
    if (!this.appRef.destroyed) {
      this.appRef.tick();
    }
  }

  scheduleChangeDetection(): void {
    setTimeout(() => this.triggerChangeDetection(), 0);
  }
}