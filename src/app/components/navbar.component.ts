import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { ChangeDetectionService } from '../services/change-detection.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <a routerLink="/" (click)="onNavigate()">Social App</a>
        </div>
        
        <div class="nav-menu" [class.active]="isMenuOpen()">
          <a routerLink="/" class="nav-link" (click)="onNavigate()">Home</a>
          <a routerLink="/about" class="nav-link" (click)="onNavigate()">About</a>
          <a routerLink="/contact" class="nav-link" (click)="onNavigate()">Contact</a>
          
          @if (stateService.isAuthenticated()) {
            <span class="nav-user">Welcome, {{stateService.user()?.username}}</span>
            <button class="nav-button" (click)="logout()">Logout</button>
          } @else {
            <a routerLink="/login" class="nav-link" (click)="onNavigate()">Login</a>
          }
        </div>

        <div class="nav-burger" (click)="toggleMenu()">
          <span class="burger-line" [class.active]="isMenuOpen()"></span>
          <span class="burger-line" [class.active]="isMenuOpen()"></span>
          <span class="burger-line" [class.active]="isMenuOpen()"></span>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly router = inject(Router);
  protected readonly stateService = inject(StateService);
  private readonly changeDetection = inject(ChangeDetectionService);
  
  protected readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
    this.changeDetection.scheduleChangeDetection();
  }

  onNavigate(): void {
    this.isMenuOpen.set(false);
    this.changeDetection.scheduleChangeDetection();
  }

  logout(): void {
    this.stateService.logout();
    this.router.navigate(['/']);
    this.onNavigate();
  }
}