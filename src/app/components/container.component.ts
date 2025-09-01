import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: false,
  template: `
    <div class="container" [ngClass]="containerClass">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  @Input() containerClass: string = '';
}