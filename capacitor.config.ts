import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.angularsocialapp.app',
  appName: 'Angular Social App',
  webDir: 'dist/angular-social-app/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3498db',
      showSpinner: true,
      spinnerColor: '#ffffff'
    },
    StatusBar: {
      style: 'default',
      backgroundColor: '#3498db'
    }
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
