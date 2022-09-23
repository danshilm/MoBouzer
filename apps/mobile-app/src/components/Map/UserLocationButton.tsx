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
      if (!response) {
        return;
      }

      // segment adapted from
      // https://github.com/expo/expo/issues/16701#issuecomment-1080693258

      // if user accepts
      if (response.granted) {
        return await callback.whenNotFollowingUser();
      }

      // if user exited prematurely
      if (!response.granted && response.canAskAgain) {
        const tempResponse = await requestPermission();

        if (tempResponse.granted) {
          return await callback.whenNotFollowingUser();
        }
      }

      // if user rejected previously
      if (!response.granted && !response.canAskAgain) {
        const tempResponse = await requestPermission();
        if (!tempResponse.granted) {
          // open the app settings for user to allow permission
          if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:Privacy&path=LOCATION');
          } else {
            Linking.openSettings();
          }
        }
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
