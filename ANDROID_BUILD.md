# Android APK Build Guide

This guide explains how to build the Angular Social App as an Android APK using Ionic Capacitor.

## Prerequisites

### Required Software
1. **Node.js** (18.19+ or 20.9+) - Already installed
2. **npm** (10+) - Already installed
3. **Java Development Kit (JDK)** 17+ - Already installed
4. **Android Studio** or **Android SDK Command Line Tools**
5. **Android SDK Build Tools**
6. **Android SDK Platform Tools**

### Android SDK Setup

#### Option 1: Android Studio (Recommended)
1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio and go to SDK Manager
3. Install the following:
   - Android SDK Platform (API level 33 or higher)
   - Android SDK Build-Tools (33.0.0 or higher)
   - Android SDK Platform-Tools
   - Google Play services

#### Option 2: Command Line Tools Only
1. Download Android SDK Command Line Tools from https://developer.android.com/studio#command-tools
2. Extract to a directory (e.g., `/opt/android-sdk`)
3. Set environment variables:
   ```bash
   export ANDROID_HOME=/opt/android-sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
4. Install required packages:
   ```bash
   sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
   ```

## Build Instructions

### Quick Build (Automated)
Run the automated build script:
```bash
./build-android.sh
```

### Manual Build Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the Angular app:**
   ```bash
   npm run build
   ```

3. **Sync with Capacitor:**
   ```bash
   npx cap sync android
   ```

4. **Build the Android APK:**
   ```bash
   cd android
   ./gradlew assembleDebug    # For debug APK
   ./gradlew assembleRelease  # For release APK
   ```

### NPM Scripts
The following npm scripts are available:

- `npm run android:build` - Complete build process
- `npm run android:sync` - Build Angular app and sync with Capacitor
- `npm run android:run` - Run on connected Android device
- `npm run android:open` - Open project in Android Studio

## Output Locations

After successful build, APK files will be located at:

- **Debug APK:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK:** `android/app/build/outputs/apk/release/app-release.apk`

## App Configuration

### App Information
- **App Name:** Angular Social App
- **Package Name:** com.angularsocialapp.app
- **Target SDK:** Android 13 (API level 33)
- **Minimum SDK:** Android 7.0 (API level 24)

### Features
- Internet permission enabled
- Web view optimized for Angular app
- Splash screen configured
- Status bar styling
- Mobile-optimized viewport settings

## Troubleshooting

### Common Issues

1. **Gradle build fails with network errors:**
   - Ensure internet connectivity
   - Check proxy settings if behind corporate firewall
   - Try building with `--offline` flag if dependencies are cached

2. **Android SDK not found:**
   - Verify ANDROID_HOME environment variable
   - Check SDK installation path
   - Ensure required SDK packages are installed

3. **Java version issues:**
   - Ensure JDK 17+ is installed and in PATH
   - Check JAVA_HOME environment variable

4. **Build tools version conflicts:**
   - Update Android SDK Build Tools to latest version
   - Sync Gradle files after SDK updates

### Debug Commands

```bash
# Check Capacitor doctor for issues
npx cap doctor

# Verify Android configuration
npx cap doctor android

# Clean build cache
cd android
./gradlew clean

# Build with verbose output
./gradlew assembleDebug --info
```

## Development and Testing

### Running on Device/Emulator
```bash
# Install debug APK on connected device
cd android
./gradlew installDebug

# Or use Capacitor command
npm run android:run
```

### Opening in Android Studio
```bash
npm run android:open
```

This opens the Android project in Android Studio for advanced debugging and testing.

## Release Build

For production release:

1. Generate a signing key:
   ```bash
   keytool -genkey -v -keystore release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Configure signing in `android/app/build.gradle`

3. Build release APK:
   ```bash
   ./gradlew assembleRelease
   ```

## Next Steps

- Test the APK on various Android devices
- Add app icons and splash screens
- Configure push notifications if needed
- Optimize for different screen sizes
- Add native Android features using Capacitor plugins
- Prepare for Google Play Store deployment