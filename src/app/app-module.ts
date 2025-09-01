import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ChangeDetectionService } from './services/change-detection.service';

// Components
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { ContainerComponent } from './components/container.component';
import { DateRangePickerComponent } from './components/date-range-picker.component';

// Pages
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';

@NgModule({
  declarations: [
    App,
    NavbarComponent,
    FooterComponent,
    ContainerComponent,
    DateRangePickerComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    PlatformModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    ChangeDetectionService
  ],
  bootstrap: [App]
})
export class AppModule {
  constructor(private changeDetection: ChangeDetectionService) {
    // Initialize change detection service
  }
}
