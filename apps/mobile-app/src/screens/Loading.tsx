import React from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../lib/tailwind';

export default function Loading() {
  return (
    <SafeAreaView style={tw`flex items-center justify-center flex-1`}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}
