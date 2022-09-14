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
  debug: __DEV__,
  integrations: [new Sentry.Native.ReactNativeTracing({ routingInstrumentation })],
  sampleRate: __DEV__ ? 1.0 : 0.5,
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
