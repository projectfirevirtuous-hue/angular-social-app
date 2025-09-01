import { Component, signal, inject } from '@angular/core';
import { StateService } from '../services/state.service';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-home',
  standalone: false,
  template: `
    <app-container>
      <div class="home-page">
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">Welcome to Social App</h1>
            <p class="hero-subtitle">
              Connect, share, and build meaningful relationships in a modern social platform
            </p>
            @if (!stateService.isAuthenticated()) {
              <div class="hero-actions">
                <a routerLink="/login" class="cta-button primary">Get Started</a>
                <a routerLink="/about" class="cta-button secondary">Learn More</a>
              </div>
            } @else {
              <div class="welcome-section">
                <h2>Welcome back, {{stateService.user()?.username}}! 👋</h2>
                <p>Ready to connect and explore what's new today?</p>
              </div>
            }
          </div>
          <div class="hero-visual">
            <div class="floating-cards">
              <div class="card card-1">🌟</div>
              <div class="card card-2">💬</div>
              <div class="card card-3">🤝</div>
              <div class="card card-4">📱</div>
            </div>
          </div>
        </section>

        <section class="features-section">
          <h2>Why Choose Social App?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Built with Angular 20 and zoneless architecture for optimal performance</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Your data is secure with our advanced privacy controls and encryption</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Intuitive interface designed for the best user experience</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌐</div>
              <h3>Global Community</h3>
              <p>Connect with people from around the world and build lasting friendships</p>
            </div>
          </div>
        </section>

        <section class="demo-section">
          <h2>Try Our Custom Date Range Picker</h2>
          <p>Experience our innovative components in action</p>
          <div class="demo-container">
            <app-date-range-picker 
              [initialRange]="selectedDateRange()"
              (rangeChange)="onDateRangeChange($event)"
            ></app-date-range-picker>
            @if (selectedDateRange().startDate || selectedDateRange().endDate) {
              <div class="range-display">
                <h4>Selected Range:</h4>
                <p>
                  <strong>Start:</strong> {{formatDate(selectedDateRange().startDate) || 'Not selected'}}
                </p>
                <p>
                  <strong>End:</strong> {{formatDate(selectedDateRange().endDate) || 'Not selected'}}
                </p>
              </div>
            }
          </div>
        </section>

        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">10K+</div>
              <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50K+</div>
              <div class="stat-label">Messages Sent</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">25K+</div>
              <div class="stat-label">Connections Made</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">99%</div>
              <div class="stat-label">Uptime</div>
            </div>
          </div>
        </section>

        @if (!stateService.isAuthenticated()) {
          <section class="cta-section">
            <div class="cta-content">
              <h2>Ready to Join?</h2>
              <p>Start building meaningful connections today</p>
              <a routerLink="/login" class="cta-button large">Sign Up Now</a>
            </div>
          </section>
        }
      </div>
    </app-container>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected readonly stateService = inject(StateService);
  protected readonly selectedDateRange = signal<DateRange>({ startDate: null, endDate: null });

  ngOnInit(): void {
    this.stateService.setCurrentPage('home');
  }

  protected onDateRangeChange(range: DateRange): void {
    this.selectedDateRange.set(range);
  }

  protected formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}