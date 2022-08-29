import { Ionicons } from '@expo/vector-icons';
import type { LocationObject } from 'expo-location';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import React, { useState } from 'react';
import type { ViewStyle } from 'react-native';
import tw from '../../lib/tailwind';
import Button from '../Common/Button';

export default function UserLocation({ style }: { style?: ViewStyle }) {
  const [_location, setLocation] = useState<LocationObject | null>(null);
  const [_errorMsg, setErrorMsg] = useState<string | null>(null);

  const requestUserLocation = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return setErrorMsg('Permission to access location was denied');
    }
    const location = await getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <Button size="sm" style={tw.style('rounded-full', style)} onPress={requestUserLocation}>
      <Ionicons name="locate-outline" size={30} />
    </Button>
  );
}
