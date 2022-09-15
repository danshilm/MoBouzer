import Constants from 'expo-constants';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider } from './src/context/SettingsContext';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation, { routingInstrumentation } from './src/navigation';
import Sentry from './src/utils/sentry';

Sentry.init({
  dsn: Constants.manifest?.extra?.sentryDsn,
  enableInExpoDevelopment: true,
  maxBreadcrumbs: 150,
  debug: __DEV__,

  // release health
  enableAutoSessionTracking: true,

  // performance
  enableAutoPerformanceTracking: true,

  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
      enableAppStartTracking: true,
      enableNativeFramesTracking: true,
      // tracingOrigins: ['localhost', /^\//, /^https:\/\//],
      beforeNavigate: (context) => {
        // my solution to both
        // [ReactNavigationInstrumentation] Will not send transaction "<screen name>" due to beforeNavigate.
        // [Tracing] Discarding transaction because its trace was not chosen to be sampled.
        // but this causes
        // [NativeFrames] Could not fetch native frames for navigation transaction <screen name>. Not adding native frames measurements.
        context.sampled = true;
        return context;
      },
    }),
  ],
  sampleRate: 1.0,
});

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SettingsProvider>
          <Navigation colorScheme="light" />
          <StatusBar style="dark" />
        </SettingsProvider>
      </SafeAreaProvider>
    );
  }
}

export default Sentry.Native.wrap(App);
