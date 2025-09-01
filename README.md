# Angular Social App 🌐

A modern social media platform built with **Angular 20** featuring cutting-edge zoneless architecture and signal-based state management. Connect, share, and build meaningful relationships in a beautifully designed, privacy-first social environment.

## 🚀 Features

- **🔐 User Authentication** - Secure login/logout system with persistent state management
- **📱 Responsive Design** - Beautiful, mobile-first interface that works on all devices  
- **📅 Custom Date Picker** - Interactive date range selection component with real-time updates
- **⚡ Zoneless Architecture** - Built with Angular 20's experimental zoneless approach for optimal performance
- **🎯 Signal-Based State** - Modern reactive state management using Angular signals
- **🔒 Privacy First** - Advanced privacy controls and data protection measures
- **🎨 Modern UI/UX** - Intuitive interface with floating animations and smooth interactions
- **📊 Real-time Statistics** - Live user engagement metrics and community stats

## 🛠️ Technology Stack

- **Framework**: Angular 20.2.0 with zoneless architecture
- **Language**: TypeScript 5.9.2  
- **State Management**: Angular Signals
- **Mobile**: Ionic Capacitor 7.4.3 for native Android builds
- **Styling**: CSS3 with modern design patterns
- **Testing**: Karma + Jasmine
- **Build Tool**: Angular CLI with esbuild
- **Code Quality**: Prettier formatting

## 📁 Project Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── navbar/        # Navigation component
│   │   ├── footer/        # Footer component  
│   │   ├── container/     # Layout container
│   │   └── date-range-picker/ # Custom date picker
│   ├── pages/             # Route components
│   │   ├── home/          # Homepage with features showcase
│   │   ├── about/         # About page with mission/story
│   │   ├── login/         # Authentication page
│   │   └── contact/       # Contact information
│   ├── services/          # Business logic services
│   │   ├── state.service.ts    # Global state management
│   │   └── change-detection.service.ts # Performance optimization
│   ├── app-routing-module.ts   # Route configuration
│   └── app-module.ts          # Main application module
└── public/                # Static assets
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18.19+ or 20.9+
- npm 10+ or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/projectfirevirtuous-hue/angular-social-app.git
   cd angular-social-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you modify source files.

## 🧰 Development Commands

### Development Server
```bash
npm start           # Start dev server on http://localhost:4200
ng serve           # Alternative Angular CLI command
```

### Building
```bash
npm run build      # Production build (optimized)
ng build           # Build with current configuration
npm run watch      # Development build with file watching
```

### Testing
```bash
npm test           # Run unit tests with Karma
ng test            # Alternative Angular CLI command
```

### Code Generation
```bash
ng generate component component-name    # Generate new component
ng generate service service-name        # Generate new service
ng generate module module-name          # Generate new module
ng generate --help                      # See all available schematics
```

### Code Quality
```bash
npx prettier --write .                  # Format all files
npx prettier --check .                  # Check formatting
```

### Android Development
```bash
npm run android:build    # Complete Android APK build process
npm run android:sync     # Build Angular app and sync with Capacitor
npm run android:run      # Run on connected Android device/emulator
npm run android:open     # Open Android project in Android Studio
./test-android-setup.sh  # Validate Android development setup
```

## 🌟 Key Components

### Home Page
- Hero section with dynamic authentication state
- Feature showcase grid
- Interactive date picker demonstration  
- Live statistics display
- Call-to-action sections

### Authentication System
- Signal-based state management
- Persistent login state
- Secure user session handling
- Dynamic UI updates based on auth status

### Custom Date Range Picker
- Two-way data binding with signals
- Smooth animations and transitions
- Accessible keyboard navigation
- Real-time validation and feedback

## 🚀 Deployment

### Production Build
```bash
npm run build
```

Build artifacts will be stored in the `dist/angular-social-app/` directory.

### Environment Configuration
The app includes optimized production builds with:
- Code splitting and lazy loading
- Tree shaking for minimal bundle size
- Service worker ready (PWA capabilities)
- Performance budgets (500kB initial, 4kB component styles)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style
- Follow Angular style guide
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## 📝 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/projectfirevirtuous-hue/angular-social-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/projectfirevirtuous-hue/angular-social-app/discussions)
- **Documentation**: [Angular CLI Documentation](https://angular.dev/tools/cli)

## 🎯 Roadmap

- [ ] Progressive Web App (PWA) features
- [ ] Real-time messaging system
- [ ] Advanced user profiles
- [ ] Content sharing capabilities
- [x] Mobile app development (Android APK)
- [ ] Third-party integrations

## 📱 Android App

This Angular Social App can be built as an Android APK using Ionic Capacitor with full CI/CD automation.

### Quick Start (Android)
```bash
# Automated build (recommended)
npm run android:build

# Manual step-by-step process
npm run build                    # Build Angular app
npm run android:sync            # Sync with Capacitor
cd android && ./gradlew assembleDebug  # Build debug APK

# Validate setup
./test-android-setup.sh         # Test Android development environment
```

### Prerequisites for Android Build
- Node.js 18+ and npm
- Java JDK 17+
- Android SDK and Build Tools
- Android Studio (recommended)

📖 **Detailed instructions:** See [ANDROID_BUILD.md](./ANDROID_BUILD.md)

### APK Output Locations
- **Debug APK:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK:** `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Automated CI/CD
The repository includes GitHub Actions workflow (`.github/workflows/build-android.yml`) that automatically:
- Builds APKs on every push to main branch
- Runs on pull requests for validation
- Uploads debug and release APK artifacts
- Supports manual workflow dispatch

---

Built with ❤️ using Angular 20 and modern web technologies.
