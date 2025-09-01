#!/bin/bash

# Test script for Android APK setup
echo "🧪 Testing Android APK build setup..."

# Check if all required files exist
echo "📁 Checking project files..."
files_to_check=(
    "capacitor.config.ts"
    "android/app/build.gradle"
    "android/gradlew"
    "build-android.sh"
    "ANDROID_BUILD.md"
    ".github/workflows/build-android.yml"
)

for file in "${files_to_check[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Test npm scripts
echo "📦 Testing npm scripts..."
npm run android:sync > /dev/null 2>&1
if [[ $? -eq 0 ]]; then
    echo "✅ npm run android:sync works"
else
    echo "❌ npm run android:sync failed"
fi

# Check Capacitor configuration
echo "⚙️  Checking Capacitor configuration..."
npx cap doctor 2>/dev/null | grep -E "(✅|❌|⚠️)"

# Check Android project structure
echo "🤖 Checking Android project structure..."
if [[ -d "android/app/src/main/assets/public" ]]; then
    asset_count=$(ls -1 android/app/src/main/assets/public | wc -l)
    echo "✅ Android assets synced ($asset_count files)"
else
    echo "❌ Android assets not synced"
fi

# Test build readiness
echo "🏗️  Checking build readiness..."
if [[ -f "android/app/src/main/assets/public/index.html" ]]; then
    echo "✅ Web assets ready for Android build"
else
    echo "❌ Web assets not ready"
fi

echo "🎯 Setup validation complete!"
echo ""
echo "📱 To build APK (requires Android SDK):"
echo "   ./build-android.sh"
echo ""
echo "🔄 To sync changes:"
echo "   npm run android:sync"