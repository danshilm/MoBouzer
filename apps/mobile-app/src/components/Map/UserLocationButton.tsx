import { Ionicons } from '@expo/vector-icons';
import { useForegroundPermissions } from 'expo-location';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { Linking, Platform } from 'react-native';
import tw from '../../lib/tailwind';
import Button from '../Common/Button';

export default function UserLocationButton({
  style,
  callback,
}: {
  style?: ViewStyle;
  callback: () => Promise<void>;
}) {
  const [response, requestPermission] = useForegroundPermissions();

  const requestUserLocation = async () => {
    await requestPermission();

    if (!response?.granted && !response?.canAskAgain) {
      const secondResponse = await requestPermission();
      if (!secondResponse.granted) {
        // open the app settings to ask again
        if (Platform.OS === 'ios') {
          Linking.openURL('App-Prefs:Privacy&path=LOCATION');
        } else {
          await Linking.openSettings();
        }
      }
    }

    if (response?.granted) {
      await callback();
    }
  };

  return (
    <Button
      size="sm"
      style={tw.style('rounded-full', style)}
      onPress={requestUserLocation}
      accessibilityLabel="acquire user location button"
    >
      <Ionicons name="locate-outline" size={30} />
    </Button>
  );
}
