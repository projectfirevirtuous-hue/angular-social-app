import { Component, signal, inject } from '@angular/core';
import { StateService } from '../services/state.service';
import { ChangeDetectionService } from '../services/change-detection.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  template: `
    <app-container>
      <div class="contact-page">
        <header class="page-header">
          <h1>Get in Touch</h1>
          <p class="lead">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </header>

        <div class="contact-content">
          <div class="contact-info">
            <h2>Contact Information</h2>
            
            <div class="info-item">
              <div class="info-icon">📧</div>
              <div class="info-content">
                <h3>Email</h3>
                <p>hello@socialapp.com</p>
                <p>support@socialapp.com</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">📱</div>
              <div class="info-content">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Monday - Friday, 9AM - 6PM EST</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">📍</div>
              <div class="info-content">
                <h3>Address</h3>
                <p>123 Innovation Street</p>
                <p>Tech Valley, CA 94043</p>
              </div>
            </div>

            <div class="social-section">
              <h3>Follow Us</h3>
              <div class="social-links">
                <a href="#" class="social-link">📘 Facebook</a>
                <a href="#" class="social-link">🐦 Twitter</a>
                <a href="#" class="social-link">💼 LinkedIn</a>
                <a href="#" class="social-link">📷 Instagram</a>
              </div>
            </div>
          </div>

          <div class="contact-form-container">
            <h2>Send us a Message</h2>
            
            @if (showSuccessMessage()) {
              <div class="success-message">
                <span class="success-icon">✅</span>
                Thank you for your message! We'll get back to you soon.
              </div>
            }

            <form class="contact-form" (ngSubmit)="onSubmit($event)">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    [(ngModel)]="formData().firstName"
                    (input)="updateFormData('firstName', $event)"
                    placeholder="Your first name"
                    class="form-input"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    [(ngModel)]="formData().lastName"
                    (input)="updateFormData('lastName', $event)"
                    placeholder="Your last name"
                    class="form-input"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  [(ngModel)]="formData().email"
                  (input)="updateFormData('email', $event)"
                  placeholder="your.email@example.com"
                  class="form-input"
                  required
                />
              </div>

              <div class="form-group">
                <label for="subject">Subject *</label>
                <select 
                  id="subject"
                  name="subject"
                  [(ngModel)]="formData().subject"
                  (change)="updateFormData('subject', $event)"
                  class="form-select"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  [(ngModel)]="formData().message"
                  (input)="updateFormData('message', $event)"
                  placeholder="Tell us how we can help..."
                  class="form-textarea"
                  rows="6"
                  required
                ></textarea>
              </div>

              @if (errorMessage()) {
                <div class="error-message">
                  {{errorMessage()}}
                </div>
              }

              <button 
                type="submit" 
                class="submit-button"
                [disabled]="isSubmitting()"
              >
                @if (isSubmitting()) {
                  <span class="loading-spinner"></span>
                  Sending...
                } @else {
                  Send Message
                }
              </button>
            </form>
          </div>
        </div>

        <section class="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-grid">
            <div class="faq-item">
              <h3>How quickly will you respond?</h3>
              <p>We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div class="faq-item">
              <h3>Do you offer technical support?</h3>
              <p>Yes! Our technical support team is available to help with any issues you encounter.</p>
            </div>
            <div class="faq-item">
              <h3>Can I suggest new features?</h3>
              <p>Absolutely! We love hearing feature suggestions from our community.</p>
            </div>
            <div class="faq-item">
              <h3>Is my data secure?</h3>
              <p>Your privacy and security are our top priorities. All communications are encrypted.</p>
            </div>
          </div>
        </section>
      </div>
    </app-container>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  protected readonly stateService = inject(StateService);
  private readonly changeDetection = inject(ChangeDetectionService);

  protected readonly formData = signal({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  protected readonly isSubmitting = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly showSuccessMessage = signal(false);

  ngOnInit(): void {
    this.stateService.setCurrentPage('contact');
  }

  protected updateFormData(field: string, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
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

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    // Simulate API call
    setTimeout(() => {
      try {
        // Simulate successful submission
        this.showSuccessMessage.set(true);
        this.resetForm();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage.set(false);
          this.changeDetection.scheduleChangeDetection();
        }, 5000);
      } catch (error) {
        this.errorMessage.set('Failed to send message. Please try again.');
      } finally {
        this.isSubmitting.set(false);
        this.changeDetection.scheduleChangeDetection();
      }
    }, 1500);
  }

  private validateForm(): boolean {
    const data = this.formData();
    
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
      this.errorMessage.set('Please fill in all required fields.');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.errorMessage.set('Please enter a valid email address.');
      return false;
    }

    return true;
  }

  private resetForm(): void {
    this.formData.set({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  }
}