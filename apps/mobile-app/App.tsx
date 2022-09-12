import Constants from 'expo-constants';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from 'sentry-expo';
import { SettingsProvider } from './src/context/SettingsContext';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

Sentry.init({
  dsn: Constants.manifest?.extra?.sentryDsn,
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

export default function App() {
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
