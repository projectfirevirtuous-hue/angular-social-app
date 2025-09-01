#!/bin/bash

# Android Social App APK Build Script
# This script builds the Angular Social App as an Android APK using Capacitor

echo "🚀 Building Angular Social App for Android..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build Angular app for production
echo "🔨 Building Angular app..."
npm run build

# Step 3: Sync with Capacitor
echo "🔄 Syncing with Capacitor..."
npx cap sync android

# Step 4: Build Android APK
echo "📱 Building Android APK..."
cd android

# Build debug APK
echo "🔧 Building debug APK..."
./gradlew assembleDebug

# Build release APK (if keystore is configured)
echo "🔧 Building release APK..."
./gradlew assembleRelease

echo "✅ Android build completed!"
echo "📍 Debug APK location: android/app/build/outputs/apk/debug/app-debug.apk"
echo "📍 Release APK location: android/app/build/outputs/apk/release/app-release.apk"

# Optional: Install on connected device
# ./gradlew installDebug