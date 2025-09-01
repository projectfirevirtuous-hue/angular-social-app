@echo off
REM Android Social App APK Build Script for Windows

REM Step 1: Install dependencies
echo Installing dependencies...
npm install

REM Step 2: Build Angular app for production
echo Building Angular app...
npm run build

REM Step 3: Sync with Capacitor
echo Syncing with Capacitor...
npx cap sync android

REM Step 4: Build Android APK
echo Building Android APK...
cd android

REM Build debug APK
echo Building debug APK...
call gradlew.bat assembleDebug

REM Build release APK (if keystore is configured)
echo Building release APK...
call gradlew.bat assembleRelease

echo Android build completed!
echo Debug APK location: android\app\build\outputs\apk\debug\app-debug.apk
echo Release APK location: android\app\build\outputs\apk\release\app-release.apk

REM Optional: Install on connected device
REM call gradlew.bat installDebug
