import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { ChangeDetectionService } from '../services/change-detection.service';

@Component({
  selector: 'app-login',
  standalone: false,
  template: `
    <app-container containerClass="centered">
      <div class="auth-container">
        <div class="auth-header">
          <h1>{{isLoginMode() ? 'Welcome Back' : 'Join Us'}}</h1>
          <p>{{isLoginMode() ? 'Sign in to your account' : 'Create your account to get started'}}</p>
        </div>

        <div class="auth-tabs">
          <button 
            [class.active]="isLoginMode()"
            (click)="setLoginMode(true)"
            class="tab-button"
          >
            Login
          </button>
          <button 
            [class.active]="!isLoginMode()"
            (click)="setLoginMode(false)"
            class="tab-button"
          >
            Register
          </button>
        </div>

        <form class="auth-form" (ngSubmit)="onSubmit($event)">
          @if (!isLoginMode()) {
            <div class="form-group">
              <label for="fullName">Full Name</label>
              <input 
                type="text" 
                id="fullName"
                name="fullName"
                [(ngModel)]="formData().fullName"
                (input)="updateFormData('fullName', $event)"
                placeholder="Enter your full name"
                class="form-input"
                required
              />
            </div>
          }

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              [(ngModel)]="formData().email"
              (input)="updateFormData('email', $event)"
              placeholder="Enter your email"
              class="form-input"
              required
            />
          </div>

          @if (!isLoginMode()) {
            <div class="form-group">
              <label for="username">Username</label>
              <input 
                type="text" 
                id="username"
                name="username"
                [(ngModel)]="formData().username"
                (input)="updateFormData('username', $event)"
                placeholder="Choose a username"
                class="form-input"
                required
              />
            </div>
          }

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              [(ngModel)]="formData().password"
              (input)="updateFormData('password', $event)"
              placeholder="Enter your password"
              class="form-input"
              required
            />
          </div>

          @if (!isLoginMode()) {
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword"
                name="confirmPassword"
                [(ngModel)]="formData().confirmPassword"
                (input)="updateFormData('confirmPassword', $event)"
                placeholder="Confirm your password"
                class="form-input"
                required
              />
            </div>
          }

          @if (errorMessage()) {
            <div class="error-message">
              {{errorMessage()}}
            </div>
          }

          <button 
            type="submit" 
            class="submit-button"
            [disabled]="stateService.isLoading()"
          >
            @if (stateService.isLoading()) {
              <span class="loading-spinner"></span>
              {{isLoginMode() ? 'Signing in...' : 'Creating account...'}}
            } @else {
              {{isLoginMode() ? 'Sign In' : 'Create Account'}}
            }
          </button>
        </form>

        <div class="auth-footer">
          <p>
            {{isLoginMode() ? "Don't have an account?" : 'Already have an account?'}}
            <button 
              (click)="setLoginMode(!isLoginMode())"
              class="link-button"
            >
              {{isLoginMode() ? 'Sign up' : 'Sign in'}}
            </button>
          </p>
        </div>
      </div>
    </app-container>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly router = inject(Router);
  protected readonly stateService = inject(StateService);
  private readonly changeDetection = inject(ChangeDetectionService);

  protected readonly isLoginMode = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly formData = signal({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  ngOnInit(): void {
    this.stateService.setCurrentPage('login');
  }

  protected setLoginMode(isLogin: boolean): void {
    this.isLoginMode.set(isLogin);
    this.errorMessage.set('');
    this.resetForm();
    this.changeDetection.scheduleChangeDetection();
  }

  protected updateFormData(field: string, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.formData.update(data => ({
      ...data,
      [field]: target.value
    }));
    this.changeDetection.scheduleChangeDetection();
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    this.stateService.setLoading(true);
    this.errorMessage.set('');

    // Simulate API call
    setTimeout(() => {
      try {
        const data = this.formData();
        
        if (this.isLoginMode()) {
          // Simulate login
          this.stateService.login(data.email.split('@')[0], data.email);
        } else {
          // Simulate registration
          this.stateService.login(data.username, data.email);
        }
        
        this.router.navigate(['/']);
      } catch (error) {
        this.errorMessage.set('Authentication failed. Please try again.');
      } finally {
        this.stateService.setLoading(false);
        this.changeDetection.scheduleChangeDetection();
      }
    }, 1500);
  }

  private validateForm(): boolean {
    const data = this.formData();
    
    if (!data.email || !data.password) {
      this.errorMessage.set('Please fill in all required fields.');
      return false;
    }

    if (!this.isLoginMode()) {
      if (!data.fullName || !data.username) {
        this.errorMessage.set('Please fill in all required fields.');
        return false;
      }
      
      if (data.password !== data.confirmPassword) {
        this.errorMessage.set('Passwords do not match.');
        return false;
      }
      
      if (data.password.length < 6) {
        this.errorMessage.set('Password must be at least 6 characters long.');
        return false;
      }
    }

    return true;
  }

  private resetForm(): void {
    this.formData.set({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
  }
}