import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import tw from '../lib/tailwind';

export default function Loading() {
  useDeviceContext(tw);

  return (
    <SafeAreaView>
      <View style={tw`flex items-center justify-center h-full`}>
        <ActivityIndicator size="large" />
      </View>
    </SafeAreaView>
  );
}
