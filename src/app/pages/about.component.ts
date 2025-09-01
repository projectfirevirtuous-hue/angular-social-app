import { Component, inject } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-about',
  standalone: false,
  template: `
    <app-container>
      <div class="about-page">
        <header class="page-header">
          <h1>About Social App</h1>
          <p class="lead">Connecting people through innovative technology</p>
        </header>

        <section class="about-section">
          <div class="content-grid">
            <div class="content-block">
              <div class="icon-wrapper">
                <span class="icon">🚀</span>
              </div>
              <h2>Our Mission</h2>
              <p>
                We believe in the power of authentic connections. Our social app is designed to 
                bring people together in meaningful ways, fostering genuine relationships and 
                shared experiences in the digital age.
              </p>
            </div>

            <div class="content-block">
              <div class="icon-wrapper">
                <span class="icon">💡</span>
              </div>
              <h2>Innovation</h2>
              <p>
                Built with cutting-edge Angular 20 technology and zoneless architecture, 
                our platform delivers a fast, responsive, and engaging user experience 
                that adapts to your needs.
              </p>
            </div>

            <div class="content-block">
              <div class="icon-wrapper">
                <span class="icon">🔒</span>
              </div>
              <h2>Privacy First</h2>
              <p>
                Your privacy and security are our top priorities. We implement the latest 
                security standards and give you complete control over your data and 
                how it's shared.
              </p>
            </div>
          </div>
        </section>

        <section class="story-section">
          <h2>Our Story</h2>
          <div class="story-content">
            <p>
              Founded in 2024, Social App emerged from a simple idea: social media should 
              enhance real relationships, not replace them. Our team of passionate developers 
              and designers set out to create a platform that prioritizes authentic connections 
              over superficial metrics.
            </p>
            <p>
              Today, we continue to innovate and evolve, always keeping our users' needs and 
              well-being at the center of everything we do. We're not just building an app; 
              we're fostering a community where everyone belongs.
            </p>
          </div>
        </section>

        <section class="features-section">
          <h2>What Makes Us Different</h2>
          <div class="features-grid">
            <div class="feature-item">
              <h3>🎯 Purpose-Driven</h3>
              <p>Every feature is designed with intention to improve real connections</p>
            </div>
            <div class="feature-item">
              <h3>⚡ Lightning Fast</h3>
              <p>Zoneless architecture ensures optimal performance and responsiveness</p>
            </div>
            <div class="feature-item">
              <h3>🎨 Beautiful Design</h3>
              <p>Thoughtfully crafted user experience that's both elegant and intuitive</p>
            </div>
            <div class="feature-item">
              <h3>🌱 Growing Together</h3>
              <p>We evolve based on community feedback and changing social needs</p>
            </div>
          </div>
        </section>

        <section class="cta-section">
          <div class="cta-content">
            <h2>Ready to Connect?</h2>
            <p>Join thousands of users who are already building meaningful relationships</p>
            @if (!stateService.isAuthenticated()) {
              <a routerLink="/login" class="cta-button">Get Started Today</a>
            } @else {
              <p class="welcome-back">Welcome back, {{stateService.user()?.username}}!</p>
            }
          </div>
        </section>
      </div>
    </app-container>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  protected readonly stateService = inject(StateService);

  ngOnInit(): void {
    this.stateService.setCurrentPage('about');
  }
}