import { ExpoConfig } from '@expo/config-types';
import 'dotenv/config';

const expoConfig = {
  name: 'MoBouzer',
  displayName: 'MoBouzer',
  expo: {
    name: 'MoBouzer',
    slug: 'mobouzer',
    owner: 'danshilm',
    version: '0.0.1',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'mobouzer',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.mobouzer',
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.IOS_MAPS_SDK,
      },
    },
    android: {
      package: 'com.mobouzer',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      config: {
        googleMaps: {
          apiKey: process.env.ANDROID_MAPS_API_KEY,
        },
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      firebaseWebClientId: process.env.FIREBASE_WEB_CLIENT_ID,
      firebaseAndroidClientId: process.env.FIREBASE_ANDROID_CLIENT_ID,
      firebaseExpoGoClientId: process.env.FIREBASE_EXPO_GO_CLIENT_ID,
      firebaseiOSClientId: process.env.FIREBASE_IOS_CLIENT_ID,
    },
  } as ExpoConfig,
};

export default expoConfig;
