import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useForegroundPermissions } from 'expo-location';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { Linking, Platform } from 'react-native';
import tw from '../../lib/tailwind';
import Button from '../Common/Button';

export default function UserLocationButton({
  style,
  callback,
  isFollowingUser = false,
}: {
  style?: ViewStyle;
  callback: { whenFollowingUser: () => Promise<void>; whenNotFollowingUser: () => Promise<void> };
  isFollowingUser: boolean;
}) {
  const [response, requestPermission] = useForegroundPermissions();

  const handleButtonPress = async () => {
    if (isFollowingUser) {
      await callback.whenFollowingUser();
    } else {
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
        await callback.whenNotFollowingUser();
      }
    }
  };

  return (
    <Button
      size="sm"
      style={tw.style('rounded-full', style)}
      onPress={handleButtonPress}
      accessibilityLabel="acquire user location button"
    >
      {isFollowingUser ? (
        <MaterialIcons name="my-location" size={25} color="black" />
      ) : (
        <Ionicons name="locate-outline" size={30} />
      )}
    </Button>
  );
}
