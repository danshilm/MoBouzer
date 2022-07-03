import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EditScreenInfo from '../components/EditScreenInfo';
import tw from '../lib/tailwind';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={tw`flex items-center justify-center flex-1 bg-white dark:bg-zinc-900`}>
      <Text style={tw`text-xl font-bold dark:text-gray-100`}>Tab Two</Text>
      <View style={tw`w-4/5 h-px my-8 bg-gray-300 dark:bg-gray-50`} />
      <EditScreenInfo path="/src/screens/TabTwoScreen.tsx" />
    </SafeAreaView>
  );
}
