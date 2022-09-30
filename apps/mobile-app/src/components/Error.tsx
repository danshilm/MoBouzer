import { Ionicons } from '@expo/vector-icons';
import { reloadAsync } from 'expo-updates';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../lib/tailwind';

export default function Error({ code }: { code?: number }) {
  const getErrorMessage = (code?: number) => {
    switch (code) {
      case 404:
        return '404 - Screen Not found';
      case 500:
        return '500 - Internal Server Error';
      default:
        return 'Oops, something went wrong';
    }
  };

  return (
    <SafeAreaView style={tw`items-center justify-center flex-1 bg-white`}>
      <View style={tw`items-center`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-xl`}>😥</Text>
        </View>
        <Text style={tw`mt-2 text-xl text-gray-800 font-inter-medium`}>
          {getErrorMessage(code)}
        </Text>
        {!__DEV__ && (
          <Pressable
            style={({ pressed }) =>
              tw.style(`flex-row items-center mt-2 rounded-lg p-2`, pressed && 'bg-gray-200')
            }
            onPress={() => reloadAsync()}
          >
            <Ionicons name="reload-outline" size={20} />
            <Text style={tw`ml-3 text-base font-inter`}>Reload the app</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
