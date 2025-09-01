import { Component, signal, inject, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { Platform } from '@angular/cdk/platform';

// Capacitor imports
import { App as CapacitorApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('angular-social-app');
  protected readonly stateService = inject(StateService);
  private readonly platform = inject(Platform);

  async ngOnInit() {
    await this.initializeApp();
  }

  private async initializeApp() {
    if (this.platform.ANDROID || this.platform.IOS) {
      try {
        // Configure status bar
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#2c3e50' });

        // Hide splash screen after app loads
        await SplashScreen.hide();

        // Listen for app state changes
        CapacitorApp.addListener('appStateChange', ({ isActive }) => {
          console.log('App state changed. Is active?', isActive);
        });

        // Handle back button on Android
        CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            CapacitorApp.exitApp();
          } else {
            window.history.back();
          }
        });

      } catch (error) {
        console.error('Error initializing Capacitor:', error);
      }
    }
  }
}
