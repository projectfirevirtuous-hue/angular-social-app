import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

platformBrowser().bootstrapModule(AppModule, {
  ngZone: 'noop', // Disable Zone.js for zoneless architecture
})
  .catch(err => console.error(err));
