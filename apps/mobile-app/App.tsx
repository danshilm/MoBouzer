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
  dsn: Constants.expoConfig?.extra?.sentryDsn,
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
      tracePropagationTargets: ['localhost', /^\//, /^https:\/\//],
      shouldCreateSpanForRequest: (url) => {
        const stringsToFilter = ['/logs', '/symbolicate'];

        if (stringsToFilter.some((string) => url.includes(string))) {
          return false;
        }

        return true;
      },
    }),
  ],

  // how often to send samples
  sampleRate: 1.0,
  tracesSampleRate: 1.0,

  // dist is either the app version or the build version when there are no OTA updates
  // else it's the update id
  // release is set to DEVELOPMENT or the full app version + build version
});

Sentry.Native.setTags({
  buildProfile: Constants.expoConfig?.extra?.buildProfile ?? 'unknown',
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
