import React from 'react';
import { Text, View } from 'react-native';
import tw from '../lib/tailwind';

export default function OnboardingFooter() {
  return (
    <View style={tw`flex flex-row justify-center mb-8`}>
      <Text style={tw`text-gray-700 dark:text-gray-300`}>Terms of Use</Text>
      <Text style={tw`mx-3 text-gray-900 dark:text-gray-400`}>|</Text>
      <Text style={tw`text-gray-700 dark:text-gray-300`}>Privacy Policy</Text>
    </View>
  );
}
