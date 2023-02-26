import { ConfigContext, ExpoConfig } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  ...{
    name: 'MoBouzer',
    slug: 'mobouzer',
    owner: 'danshilm',
    orientation: 'portrait',
    platforms: ['android', 'ios'],
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
      url: `https://u.expo.dev/f33a6450-f743-4b82-8781-8a9389580475`,
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      googleServicesFile: process.env.GOOGLE_SERVICES_IOS_FILE,
      bundleIdentifier: config.ios?.bundleIdentifier,
      buildNumber: config.ios?.buildNumber,
      jsEngine: 'hermes',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_ANDROID_FILE,
      package: config.android?.package,
      versionCode: config.android?.versionCode,
      jsEngine: 'hermes',
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'f33a6450-f743-4b82-8781-8a9389580475',
      },
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
      mapboxToken: process.env.RNMAPBOX_TOKEN,
      sentryDsn: process.env.SENTRY_DSN,
      buildProfile: process.env.APP_ENV,
    },
    plugins: [
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      '@react-native-firebase/app',
      [
        '@rnmapbox/maps',
        {
          RNMapboxMapsImpl: 'maplibre',
        },
      ],
      'sentry-expo',
    ],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
  },
});
