import React from 'react';
import { Text, View } from 'react-native';
import ViewWithSearchBar from '../components/BetterSearchBar/ViewWithSearchBar';
import EditScreenInfo from '../components/EditScreenInfo';
import tw from '../lib/tailwind';

export default function TabOneScreen() {
  return (
    <ViewWithSearchBar style={tw`flex flex-1 bg-white dark:bg-zinc-900`}>
      <View style={tw`flex items-center justify-center flex-1`}>
        <Text style={tw`text-xl font-bold text-center dark:text-gray-100`}>Tab One</Text>
        <View style={tw`w-4/5 h-px my-8 bg-gray-300 dark:bg-gray-100`} />
        <EditScreenInfo path="/src/screens/TabOneScreen.tsx" />
      </View>
    </ViewWithSearchBar>
  );
}
