import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SettingsProvider } from './src/context/SettingsContext';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

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